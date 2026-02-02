import { NextFunction, Request } from 'express'
import errorObject from '@/utils/errorObject'

export default (nextFunc: NextFunction, err: Error | unknown, req: Request, errorStatusCode: number = 500): void => {
    const errorObj = errorObject(err, req, (err as any).statusCode || errorStatusCode)
    return nextFunc(errorObj)
}
