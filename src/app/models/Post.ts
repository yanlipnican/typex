import { model, Model, modelDec } from '../../typex/Mongo';

interface IPost {
    title: string;
}

@modelDec
export class Post extends Model {

    data: IPost;

    public static find(query?) {};

    public static model = model<IPost>('Post', {

        title: { type : String, required: true },

    });

    public async findSimilar() {
        return Post.find({title: new RegExp(this.data.title.split(' ')[0] + '*')});
    }

}
