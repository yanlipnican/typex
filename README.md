# typex
Typescript mini framework using express for building Node backend apps <br>

**IN DEVELOPMENT**

Goal is to make symfony (php) like framework for express in typescript.

TODOS: 
* Create Build suite (tx g controller UserController)
* Better integrate MongoDB (mongoose)
* Integrate other DB drivers

## Example usage

This will definitely change :)

#### App

```typescript
import { Server } from 'typex/Server';

import * as mongoose from 'mongoose';

// Controllers
import { PostController } from './controllers/PostController';

export class App extends Server{

    onInit() {

        mongoose.connect(`mongodb://vagrant.dev/testDB`);

        this.controller(PostController);

    }

}
```

#### Controller

```typescript
import { Request, Response } from 'express';
import { Controller, Get, HBS_helper} from 'typex/Controller';

import { Post } from '../models/Post';


export class PostController extends Controller {

    // Framework uses typescript decorators
    // @Post(url)
    @Get('/get-posts')
    async getPosts(req: Request, res: Response) {

        let posts = await new Post().find();

        res.render('main', this.response({ posts }));

    }
   
    // if handlebars is enabled you can specify helper function
    // for this controller
    @HBS_helper
    puppy(name: string) {
        return 'PUPPY :3 -> ' + name;
    }

}
```
#### Model

```typescript
import { Model } from 'typex/Mongo';

interface IPost {
    title: string;
}

export class Post extends Model<IPost> {
    
    // just specify model name in db
    name = 'Post';

    // and db types of model
    options = {
        title : { type: String }
    };

}

```