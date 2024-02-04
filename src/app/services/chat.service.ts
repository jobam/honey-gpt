import {Injectable} from '@angular/core';
import OpenAI from 'openai';
import {BehaviorSubject, Observable} from 'rxjs';
import {ChatDataService} from './chat-data.service';
import {Chat} from "openai/resources";
import ChatCompletionMessageParam = Chat.ChatCompletionMessageParam;

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  openai!: OpenAI;
  standardModel: string = 'gpt-4-1106-preview'
  visionModel: string = 'gpt-4-vision-preview'

  messages: ChatCompletionMessageParam[] = [];
  private messagesSubject = new BehaviorSubject<ChatCompletionMessageParam[]>(
    []
  );

  constructor(private chatDataService: ChatDataService) {
    this.updateConfiguration();
  }

  public updateConfiguration(): void {
    this.openai = new OpenAI({
      apiKey: this.chatDataService.getAPIKeyFromLocalStore() ?? '',
      dangerouslyAllowBrowser: true,
    });
  }

  createCompletionViaOpenAI(messages: ChatCompletionMessageParam[], isFileAttached = true) {
    return this.openai.chat.completions.create({
        messages: messages,
        model: isFileAttached ? this.visionModel : this.standardModel,
        max_tokens: isFileAttached ? 4096 : null,
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  }

  async getTitleFromChatGpt(messages: ChatCompletionMessageParam[]) {
    return this.openai.chat.completions.create(
      {
        model: this.standardModel,
        messages: [
          {
            role: 'user',
            content: `create a max 10 character title from below messages. ${JSON.stringify(
              messages
            )}`,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
      }
    );
  }

  public setMessagesSubject(event: ChatCompletionMessageParam[]) {
    this.messagesSubject.next(event);
  }

  public getMessagesSubject(): Observable<ChatCompletionMessageParam[]> {
    return this.messagesSubject.asObservable();
  }
}
