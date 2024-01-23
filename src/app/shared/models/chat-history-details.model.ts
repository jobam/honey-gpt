import OpenAI from "openai";
import ChatCompletionMessageParam = OpenAI.ChatCompletionMessageParam;

export interface ChatHistoryDetails {
  id: string;
  title: string;
  messages: ChatCompletionMessageParam[];
}
