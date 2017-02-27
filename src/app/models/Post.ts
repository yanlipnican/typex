import { Model } from '../../typex/Mongo';

interface IPost {
    title: string;
}

export class Post extends Model<IPost> {

    name = 'Post';

    options = {
        title : { type: String }
    };

}
