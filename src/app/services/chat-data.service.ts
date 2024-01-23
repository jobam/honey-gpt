import { Injectable } from '@angular/core';
import { ChatHistoryDetails } from '../shared/models/chat-history-details.model';
import OpenAI from "openai";
import ChatCompletionMessageParam = OpenAI.ChatCompletionMessageParam;

@Injectable({
  providedIn: 'root',
})
export class ChatDataService {
  totalChatConversation: number = 0;

  constructor() {}

  public setLocalStorageForAllChat(chatHistory: ChatHistoryDetails): void {
    localStorage.setItem(`${chatHistory.id}`, JSON.stringify(chatHistory));
  }

  public setLocalStorageForSingleChat(
    chatName: string,
    chatData: ChatCompletionMessageParam
  ): void {
    localStorage.setItem(`${chatName}`, JSON.stringify(chatData));
  }

  public getLocalStorage(chatName: string) {
    return localStorage.getItem(chatName);
  }

  public setTotalChatConversation(chatCount: number) {
    this.totalChatConversation += chatCount;
  }

  public getTotalChatConversation(): number {
    return this.totalChatConversation;
  }

  public setAPIKeyToLocalStore(key: string) {
    localStorage.setItem('apiKey', key);
  }

  public getAPIKeyFromLocalStore(): string | null {
    const apiKey = localStorage.getItem('apiKey');
    if (apiKey) {
      return apiKey;
    }
    return null;
  }
}
