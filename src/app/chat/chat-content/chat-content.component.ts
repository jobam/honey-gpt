import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {MarkdownService} from 'ngx-markdown';
import {ApiKeyService} from 'src/app/services/api-key.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Chat} from "openai/resources";
import ChatCompletionMessageParam = Chat.ChatCompletionMessageParam;
import {ChatCompletionContentPart, ChatCompletionContentPartImage} from "openai/src/resources/chat/completions";


@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.css'],
})
export class ChatContentComponent
  implements OnInit, AfterViewChecked, AfterViewInit {
  constructor(
    private chatService: ChatService,
    private markdownService: MarkdownService,
    private apiKeyService: ApiKeyService,
    private snackBar: MatSnackBar
  ) {
  }

  @ViewChild('window') window!: any;
  public messages: ChatCompletionMessageParam[] = [];
  apiKey: string | null = '';
  isBusy: boolean = false;
  currChatSelected: string = '';
  @ViewChild('textInput', {static: true}) textInputRef!: ElementRef;
  promptValue: string = '';
  imageUrl: string = '';

  ngOnInit(): void {
    this.scrollToBottom();

    // Subscribe to messages
    this.chatService.getMessagesSubject().subscribe((messages) => {
      this.messages = messages;
    });

    // Subscribe to the api key.
    this.apiKeyService.getApiKey().subscribe((apiKey) => {
      this.apiKey = apiKey;
    });
  }

  ngAfterViewInit() {
    this.textInputRef.nativeElement.focus();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  createCompletion(element: HTMLTextAreaElement) {
    const prompt = element.value;
    if (prompt.length <= 1 || this.isBusy) {
      element.value = '';
      return;
    }
    element.value = '';
    const message: ChatCompletionMessageParam = {
      role: 'user',
      content: [
        {
          "type": "text",
          "text": prompt
        }
      ]
    };
    if (this.imageUrl !== '') {
      (message.content as Array<ChatCompletionContentPart>).push({
        "type": "image_url",
        "image_url": {
          "url": this.imageUrl
        }
      });
    }
    this.messages.push(message);
    this.isBusy = true;
    this.chatService.createCompletionViaOpenAI(
      this.messages, this.imageUrl !== ''
    ).then(completion => {
        const completionMessage = this.markdownService.parse(
          completion.choices[0].message?.content!
        );
        const responseMessage: any = {
          role: 'assistant',
          content: [
            {
              type: 'text',
              text: completionMessage
            }
          ]
        };

        this.messages.push(responseMessage);
        this.imageUrl = '';
        this.chatService.setMessagesSubject(this.messages);
        this.isBusy = false;
        this.scrollToBottom();
      },
      err => {
        console.error(err);
        this.imageUrl = '';
        this.snackBar.open(
          'API Request Failed, please check after some time or verify the OpenAI key.',
          'Close',
          {
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            duration: 5000,
          }
        );
        this.isBusy = false;
        this.scrollToBottom();
      });

  }

  scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  fileUploaded(url: string) {
    this.imageUrl = url;
    // this.promptValue = `${this.promptValue}\n ${url}`;
  }

  castMessageContent(src: any): ChatCompletionContentPart {
    return src as ChatCompletionContentPart;
  }

  castToImageContent(src: any): ChatCompletionContentPartImage {
    return src as ChatCompletionContentPartImage;
  }
}
