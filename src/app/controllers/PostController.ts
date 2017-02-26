import { Request, Response } from 'express';
import { Controller, Post, Get} from 'system/Controller';

export class PostController extends Controller {

    public route = '/test';

    @Get('/get-posts')
    public get(req: Request, res: Response) {
        res.json({msg: 'Hello world'});
    }

}
