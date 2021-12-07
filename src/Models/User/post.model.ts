import mongoose from 'mongoose';

const post = new mongoose.Schema({

    postImage : {
        type : String
    },
    text : {
        type : String
    }
});

export const PostModel = mongoose.model('post', post);