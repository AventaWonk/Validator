export default interface IMessageService {
  showMessages(input: HTMLInputElement, messageArray: string[]): void
  deleteMessages(input: HTMLInputElement): void
}
