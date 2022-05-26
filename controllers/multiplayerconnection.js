import Multiplayerconnection from "../models/multiplayerconnection.js";
import UserTrophy from "../models/usertrophy.js";
import User from "../models/user.js";
import Language from "../models/language.js";

const getUserData = (async (userName, languageName, req, res) => {
    let userID = await User.findOne({ user_name: userName }).select('_id')
    let languageID = await Language.findOne({ language_name: languageName }).select('_id')
    let trophyCount = await UserTrophy.findOne({ user_id: userID, language_id: languageID }).select('multi_player_trophies -_id')
    return {
        userID: userID._id,
        languageID: languageID._id,
        trophyCount: trophyCount.multi_player_trophies,
    }
})

export const checkConnectionPool = (async (req, res) => {
    let userName = req.query.userName
    let languageName = req.query.languageName
    let data = await getUserData(userName, languageName)
    const connectionID = await Multiplayerconnection.findOne({ language_id: data.languageID, trophyCount: { $gte: data.trophyCount - 50 } && { $lte: data.trophyCount + 50 } }).select('_id')
    res.json(connectionID)
})

export const createConnectionPool = (async (req, res) => {
    let userName = req.query.userName
    let languageName = req.query.languageName
    let data = await getUserData(userName, languageName)
    const multiplayerconnection = new Multiplayerconnection({
        user_id: data.userID,
        language_id: data.languageID,
        trophyCount: data.trophyCount
    })
    await multiplayerconnection.save()
    res.json(await Multiplayerconnection.findOne({ user_id: data.userID }).select('_id'))
})
