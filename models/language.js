import mongoose from "mongoose";

const languageSchema = mongoose.Schema({
    language_name:{
        type: String,
        require: true,
    },
    language_description:{
        type: String,
    },
    logo: {
        type: String,
    }
});

const Language = mongoose.model('Language',languageSchema);
export default Language;
