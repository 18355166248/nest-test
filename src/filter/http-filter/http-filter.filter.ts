import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';

interface CommonResponseProps {
  data: number;
  time: number;
  success: boolean;
  path: string;
  status: number;
  message?: string;
}

@Catch()
export class HttpFilterFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionRes = exception.getResponse();

    console.log('exception', exception);

    const res: CommonResponseProps = {
      data: 500, // 错误码
      time: Date.now(),
      success: false,
      path: request.url,
      status,
    };
    if (Array.isArray(exceptionRes) && exceptionRes.length > 0) {
      const constraints = exceptionRes[0]?.constraints || {};
      const msg = Object.values(constraints)[0] as string;
      res.message = msg;
    }

    response.status(status).json(res);
  }
}
