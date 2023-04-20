const {Schema, model} = require('mongoose');

const commentSchema = new Schema({
    commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    commentAuthor: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Comment = model("Comment", commentSchema);
module.exports = Comment