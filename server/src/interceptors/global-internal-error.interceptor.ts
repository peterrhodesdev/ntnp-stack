import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  NotFoundException,
  CallHandler,
  InternalServerErrorException,
  HttpException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { CustomException } from "../exceptions/custom.exception";
import { IdNotFoundException } from "../exceptions/id-not-found.exception";

@Injectable()
export class GlobalInternalErrorInterceptor implements NestInterceptor {
  private handleCustomException(err: CustomException): Error {
    switch (err.constructor) {
      case IdNotFoundException:
        return new NotFoundException(err.message);
      default:
        return new InternalServerErrorException();
    }
  }

  intercept(context: ExecutionContext, stream$: CallHandler): Observable<any> {
    return stream$.handle().pipe(
      catchError((err) => {
        switch (true) {
          case err instanceof HttpException:
            throw err;
          case err instanceof CustomException:
            throw this.handleCustomException(err);
          default:
            throw new InternalServerErrorException();
        }
      }),
    );
  }
}
