import UserTrophy from '../models/usertrophy.js';
import Language from '../models/language.js';
import User from '../models/user.js'

export const getSinglePlayerLeaderBoard = (async (req, res) => {
    let languageName = req.query.languageName
    let languageData = await Language.findOne({ language_name: languageName })
    let response = []

    let leaderboardData = await UserTrophy.find({ language_id: languageData._id }).sort({ single_player_trophies: -1 }).limit(10)
    for (let data of leaderboardData) {
        let user = await User.findOne({ _id: data.user_id })
        response.push({
            userName: user.user_name,
            score: data.single_player_trophies,
        })
    };
    res.send(response);
});

export const getMultiPlayerLeaderBoard = (async (req, res) => {
    let languageName = req.query.languageName
    let languageData = await Language.findOne({ language_name: languageName })

    let response = []
    let leaderboardData = await UserTrophy.find({ language_id: languageData._id }).sort({ multi_player_trophies: -1 }).limit(10)
    for (let data of leaderboardData) {
        let user = await User.findOne({ _id: data.user_id })
        response.push({
            userName: user.user_name,
            score: data.multi_player_trophies,
        })
    }
    res.send(response)
});


export const createUserTrophies = (async (userID, languageName, req, res) => {
    try{
        let languageID = await Language.findOne({language_name: languageName}).select('_id')
        let user = new UserTrophy({
            user_id: userID,
            language_id: languageID._id,
            single_player_trophies: 0,
            multi_player_trophies: 0
        })
        await user.save()
    }catch(error) {
        console.log(error)
        res.json({
            status: "failed",
        })
    }
})