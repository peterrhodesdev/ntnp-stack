export default class CreateExampleDto {
  title: string;
  amount: number;
  dateOn: Date;

  constructor() {
    this.title = "";
    this.amount = 0;
    this.dateOn = new Date();
  }
}
