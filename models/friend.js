import mongoose from "mongoose";
import Battles from '../models/battle.js'

const { ObjectId } = mongoose.Schema;
const friendlybattleSchema = mongoose.Schema({
    user_one: String,
    user_two: String,
    code: String,
    battle_id: {
        type: ObjectId,
        ref: Battles,
    },
    winner: String
});

const FriendlyBattle = mongoose.model('FriendlyBattle', friendlybattleSchema);
export default FriendlyBattle;

