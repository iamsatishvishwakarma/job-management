import { NextFunction, Request, Response } from 'express'
import { THttpError } from '@/types/http'

export default (err: THttpError, _: Request, res: Response, __: NextFunction) => {
    res.status(err.statusCode || 500).json(err)
}
