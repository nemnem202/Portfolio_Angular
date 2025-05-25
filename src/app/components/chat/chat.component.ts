import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { InferenceClient } from '@huggingface/inference';
import config from './chat.config.json';
import { ConversationItem } from '../../classes';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatChipsModule,
    NgIf,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements AfterViewInit, OnInit {
  @ViewChild('chat') chatRef!: ElementRef;
  private viewInit: boolean = false;
  private inputValue: string = '';
  public outputValue: string | null = '';

  client = new InferenceClient(config.token);

  private _conversation: ConversationItem[] = [];

  get conversation(): ConversationItem[] {
    return this._conversation;
  }

  set conversation(value: ConversationItem[]) {
    this._conversation = value;
    this.onConversationChanged();
  }

  onConversationChanged() {
    localStorage.setItem('conversation', JSON.stringify(this._conversation));
    const lastOne: ConversationItem =
      this._conversation[this._conversation.length - 1];
    if (this.viewInit) {
      this.addParagraph(lastOne.isFromUser, lastOne.message);
    }
  }

  ngOnInit() {
    const raw = localStorage.getItem('conversation');
    this.conversation = raw ? JSON.parse(raw) : [];
  }

  ngAfterViewInit() {
    this.viewInit = true;
    const chat = this.chatRef.nativeElement as HTMLElement;
    chat.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' });
    this.conversation.forEach((item) => {
      this.addParagraph(item.isFromUser, item.message);
    });
    if (this.conversation.length === 0) {
      this.sendToLLM(config.init);
    }
  }

  updateInputValue(input: string) {
    this.inputValue = input;
  }

  send(): void {
    if (this.inputValue === '') return;
    const newItem = new ConversationItem();
    newItem.isFromUser = true;
    newItem.message = this.inputValue;
    this.conversation = [...this.conversation, newItem];
    this.sendToLLM(newItem.message);
  }

  addParagraph(isFromUser: boolean, text: string) {
    const chat = this.chatRef.nativeElement as HTMLElement;
    const userParagraph = document.createElement('p');
    userParagraph.innerText = text;
    userParagraph.classList.add(
      isFromUser ? 'user-message' : 'chatbot-message'
    );
    chat.appendChild(userParagraph);
    chat.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' });
  }

  async sendToLLM(input: string) {
    let out = '';

    const messages = [
      {
        role: 'system',
        content: config.system,
      },
      {
        role: 'system',
        content:
          'Voici des exemples de question-réponse: ' + config.examples.join(''),
      },
      {
        role: 'user',
        content: input,
      },
    ];

    console.log(
      messages[0].content + messages[1].content + messages[2].content
    );

    const stream = this.client.chatCompletionStream({
      provider: 'hf-inference',
      model: config.model,
      max_tokens: 200,
      messages: messages,
    });

    for await (const chunk of stream) {
      if (chunk.choices && chunk.choices.length > 0) {
        const newContent = chunk.choices[0].delta.content;
        out += newContent;
        this.outputValue = out;
      }
    }
    const message = new ConversationItem();
    message.isFromUser = false;
    message.message = this.outputValue || '';
    this.outputValue = null;
    this.conversation = [...this.conversation, message];
  }

  // parseConversation(conversation: ConversationItem[]): string {
  //   let dialog: string = '';
  //   conversation.forEach((e) => {
  //     const subject = e.isFromUser
  //       ? "Question de l'utilisateur"
  //       : "Réponse de l'assistant";
  //     dialog += `[${subject}] : ${e.message}. `;
  //   });
  //   return dialog;
  // }
}
