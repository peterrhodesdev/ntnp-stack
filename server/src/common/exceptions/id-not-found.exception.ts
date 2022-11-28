import { CustomException } from "./custom.exception";

export class IdNotFoundException extends CustomException {
  constructor(id: string) {
    super(`Entity not found with id = ${id}`);
  }
}
