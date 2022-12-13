import GetOneExampleDto from "./get-one-example.dto";

export default class UpdateFullExampleDto {
  title: string;
  amount: number;
  dateOn: Date;

  static from(getOneExampleDto: GetOneExampleDto): UpdateFullExampleDto {
    // eslint-disable-next-line no-unused-vars
    const { id, ...updateFullExampleDto } = getOneExampleDto;
    return updateFullExampleDto;
  }
}
