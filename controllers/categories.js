import Language from '../models/language.js';
import Categories from '../models/categories.js'


export const getCategories = (async(req, res) => {
    let languageName = req.query.languageName
    let languageID = await Language.findOne({language_name: languageName}).select('_id')
    res.json(await Categories.find({language_id: languageID}))
})

