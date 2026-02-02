import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import responseMessage from '@/constants/response.message.constant';
import httpError from '@/utils/httpError';
import globalErrorHandlerMiddleware from '@/middlewares/global.error.handler.middleware';

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 404 Handler
app.use((req: Request, _: Response, next: NextFunction) => {
  try {
    throw new Error(responseMessage.NOT_FOUND('route'))
  } catch (err) {
    httpError(next, err, req, 404)
  }
})

// Global Error Handler
app.use(globalErrorHandlerMiddleware)


export default app

