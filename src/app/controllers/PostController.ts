import { Controller, Post } from 'system/Controller';

export class PostController extends Controller {

    public route = 'post';

    @Post('get-posts')
    public get() {
        console.log('workd');
    }

}