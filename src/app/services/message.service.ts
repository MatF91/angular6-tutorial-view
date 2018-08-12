import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];
  datePipe = new DatePipe("en-US"); //by default only en-US is available

  constructor() { }

  add(message: string): void {
    this.messages.push("[" + this.datePipe.transform(new Date(), "yyyy-MM-dd H:mm:ss") + "] " + message);
  }

  clear(): void {
    this.messages = [];
  }
}
