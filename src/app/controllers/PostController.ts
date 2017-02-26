import { Request, Response } from 'express';
import { Controller, Post, Get, HBS_helper} from 'typex/Controller';

export class PostController extends Controller {

    janko = 'janko';

    @Get('/get-posts/:name')
    getPosts(req: Request, res: Response) {
        res.render('main', this.response({name: req.params.name}));
    }

    @HBS_helper
    puppy(name: string) {
        return this.janko + ' PUPPY :3 -> ' + name;
    }

}
