import SinglePlayerGame from '../models/singleplayergame.js';
import User from '../models/user.js';
import Language from '../models/language.js'
import Battle from '../models/battle.js';
import UserTrophy from '../models/usertrophy.js';

export const getUser = (async (req, res) => {
    let userName = req.query.userName
    try {
        let user = await User.findOne({ user_name: userName })
        let userID = user._id
        res.json(user);
    } catch (error) {
        console.log(error)
        res.json({
            status: "failed",
        })
    }
});

export const createUser = (async (req, res) => {
    const user = new User({
        user_name: req.body.userName,
        location: req.body.location,
        github: req.body.github,
        bio: req.body.bio
    })
    try {
        res.json(await user.save());
    } catch (error) {
        console.log(error)
        res.send({
            status: "failed",
        })
    }
});

export const updateUser = (async (req, res) => {
    let { userID, userName, location, github, bio } = req.body
    try {
        await User.updateOne({ _id: userID }, { $set: { user_name: userName, location: location, github: github, bio: bio } })
        res.json({
            status: "success",
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "failed",
        })
    }
})

export const deleteUser = (async (req, res) => {
    let userName = req.query.userName
    try {
        await User.findOneAndDelete({ user_name: userName })
        res.json({
            status: "success",
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "failed",
        })
    }
})

export const isCompleted = (async (req, res) => {
    let userID = req.query.userID
    let battleID = req.query.battleID
    try {
        let game = await SinglePlayerGame.findOne({ user_id: userID, battle_id: battleID })
        let score = game.score
        res.json({
            status: "success",
            score: score,
        })
    } catch (error) {
        res.json({
            status: "failed"
        })
    }
})

export const totalBattlesCompleted = (async (req, res) => {
    let userID = req.query.userID
    let languageName = req.query.languageName
    try {
        let languageData = await Language.findOne({ language_name: languageName })
        let completedCount = await SinglePlayerGame.count({ language_id: languageData._id, user_id: userID })
        let totalCount = await Battle.count({ language_id: languageData._id })
        res.json({
            completed: completedCount,
            total: totalCount,
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "failed"
        })
    }
})


export const getPosition = (async (req, res)=>{
    let userID = req.query.userID
    let languageName = req.query.languageName
    try{
        let languageData = await Language.findOne({language_name:languageName}) 
        let userData = await UserTrophy.findOne({user_id:userID})
        let userRank = await UserTrophy.find({language_id:languageData._id, multi_player_trophies:{'$gt':userData.multi_player_trophies}}).count()
        let total = await User.count()
        res.json({
            rank:userRank+1,
            total:total
        })
    }
    catch(error){
        console.log(error)
        res.json({
            status:"failed"
        })
    }
})