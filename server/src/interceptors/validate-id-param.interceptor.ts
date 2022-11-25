import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import validator from "validator";

@Injectable()
export class ValidateIdParamInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, stream$: CallHandler): Observable<any> {
    const params = context.switchToHttp().getRequest().params;
    if (params.hasOwnProperty("id") && validator.isUUID(params.id)) {
      return stream$.handle();
    }
    throw new BadRequestException("invalid id");
  }
}
