import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;
const battleSchema = mongoose.Schema({
    language_id: {
        type: ObjectId,
        ref: 'Language',
        required: true,
    },
    category_id: {
        type: ObjectId,
        ref: 'Category',
        required: true,
    },
    difficulty_level: Number,
    link: String,
    colors: String
});

const Battle = mongoose.model('Battle', battleSchema);
export default Battle;