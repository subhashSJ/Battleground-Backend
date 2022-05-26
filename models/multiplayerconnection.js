import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const multiplayerconnectionSchema = mongoose.Schema({
    language_id: {
        type: ObjectId,
        ref: 'Language'
    },
    user_id: {
        type: ObjectId,
        ref: 'User',
        unique: true
    },
    trophyCount: Number
})

const Multiplayerconnection = mongoose.model('Multiplayerconnection',multiplayerconnectionSchema);
export default Multiplayerconnection;