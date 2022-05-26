import mongoose from "mongoose";

const {ObjectId} = mongoose.Schema;
const multiplayergameSchema= mongoose.Schema({
    
    user_id_one:{
        type: ObjectId,
        ref:'User',
        required:true
    },
    user_id_two:{
        type: ObjectId,
        ref:'User',
        required:true
    },
    battle_id:{
        type: ObjectId,
        ref:'Battle',
        required:true
    },
    winner:{
        type: ObjectId,
        ref:'User',
    },
    connection_id: {
        type: ObjectId,
        ref: 'Multiplayerconnection'
    }
});
const MultiPlayerGame = mongoose.model('MultiPlayerGame',multiplayergameSchema);
export default MultiPlayerGame;