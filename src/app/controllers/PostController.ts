import { Request, Response } from 'express';
import { Controller, Get, HBS_helper} from '../../typex/Controller';

import { Post } from '../models/Post';


export class PostController extends Controller {

    @Get('/save-post/:title')
    async setPosts(req: Request, res: Response) {

        let post = new Post({title: req.params.title});

        let saved = await post.save();

        let posts = await post.findSimilar();

        res.render('main', this.response({ posts }));

    }

    @Get('/get-posts')
    async getPosts(req: Request, res: Response) {

        let posts = await Post.find();

        res.render('main', this.response({ posts }));

    }

    @HBS_helper
    puppy(name: string) {
        return 'PUPPY :3 -> ' + name;
    }

}
