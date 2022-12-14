import CreateExampleDto from "./create-example.dto";
import GetOneExampleDto from "./get-one-example.dto";

export default class UpdateFullExampleDto extends CreateExampleDto {
  static from(getOneExampleDto: GetOneExampleDto): UpdateFullExampleDto {
    // eslint-disable-next-line no-unused-vars
    const { id, ...updateFullExampleDto } = getOneExampleDto;
    return updateFullExampleDto;
  }
}
