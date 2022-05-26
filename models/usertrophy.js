import mongoose from "mongoose";

const {ObjectId} = mongoose.Schema;
const usertrophySchema= mongoose.Schema({
    user_id:{
        type: ObjectId,
        ref:'User',
        required:true
    },
    language_id:{
        type: ObjectId,
        ref:'Language',
        required:true
    },
    single_player_trophies:Number,
    multi_player_trophies:Number
});

const UserTrophy = mongoose.model('UserTrophy',usertrophySchema);
export default UserTrophy;