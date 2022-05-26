import Language from '../models/language.js';
export const getLanguage = (async(req,res)=> {
    try{
        const languages = await Language.find()
        res.json(languages)
    }catch(err){
        //res.send({'Error'+err});
    }
}); 


export const createLanguage = (async(req,res)=>{
    const language = new Language({
        language_name: req.body.language_name,
        language_description: req.body.language_description
      }) 
    
    try{
         const l1 = await language.save();
         res.json(l1);
    }catch(err){
        res.send('Error'+ err)
    }
});