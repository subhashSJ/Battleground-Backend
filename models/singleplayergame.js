import mongoose from "mongoose";

const {ObjectId} = mongoose.Schema;
const singleplayergameSchema= mongoose.Schema({
    user_id:{
        type: ObjectId,
        ref:'User',
        required:true
    },
    battle_id:{
        type: ObjectId,
        ref:'Battle',
        required:true
    },
    language_id: {
        type: ObjectId,
        ref: 'Language',
        required:true
    },
    score: Number,
    best_code: String,
});
const SinglePlayerGame = mongoose.model('SinglePlayerGame',singleplayergameSchema);
export default SinglePlayerGame;