import { Component } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-chat-route',
  imports: [ChatComponent],
  templateUrl: './chat-route.component.html',
  styleUrl: './chat-route.component.scss',
})
export class ChatRouteComponent {}
