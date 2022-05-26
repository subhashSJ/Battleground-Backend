import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;
const categorySchema = mongoose.Schema({
    language_id: {
        type: ObjectId,
        ref: 'Language',
        required: true
    },
    title: String
});

const Category = mongoose.model('Category', categorySchema);
export default Category;