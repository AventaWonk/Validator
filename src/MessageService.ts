import IMessageService from './Interfaces/IMessageService';

export default class MessageService implements IMessageService {
  public showMessages(input: HTMLInputElement, messageArray: string[]) {
    let div: HTMLDivElement = document.createElement('div');
    div.dataset.msgInfo = "1";
    for (let i = 0; i < messageArray.length; i++) {
      let p: HTMLParagraphElement = document.createElement('p');
      let span: HTMLSpanElement = document.createElement('span');
      span.innerHTML = messageArray[i];
      p.appendChild(span);
      div.appendChild(p);
    }
    input.parentNode.appendChild(div);
  }

  public deleteMessages(input: HTMLInputElement) {
    let msg: HTMLDivElement = input.parentNode.lastChild as HTMLDivElement;
    if (msg.dataset.msgInfo) {
      input.parentNode.removeChild(msg);
    }
  }
}
