import User from '../models/user.js'
import MultiPlayerGame from '../models/multiplayergame.js';
import Battle from '../models/battle.js';
import Multiplayerconnection from '../models/multiplayerconnection.js';
import { ObjectId } from 'mongodb';
import UserTrophy from '../models/usertrophy.js';

export const hasBattleStarted = (async (req, res) => {
    let connectionID = req.query.connectionID
    res.json(await MultiPlayerGame.findOne({ connection_id: connectionID }).select('_id'))
})

const getConnectionData = (async (connectionID, req, res) => {
    let connectionData = await Multiplayerconnection.findOne({ connection_id: connectionID })
    return {
        userID: connectionData.user_id,
        languageID: connectionData.language_id,
        trophyCount: connectionData.trophyCount
    }
})
const getBattle = (async (trophyCount, req, res) => {
    let difficulty = (trophyCount / 10)
    let battles = await Battle.find({ difficulty_level: { $gte: difficulty - 10 } && { $lte: difficulty + 10 } })

    let random = Math.floor(Math.random() * battles.length)
    return battles[random]._id
})
export const deleteConnectionPool = (async (req, res) => {
    let connectionID = req.query.connectionID
    await Multiplayerconnection.remove({ _id: ObjectId(connectionID) })
})

export const startBattle = (async (req, res) => {
    let connectionID = req.query.connectionID
    let userName = req.query.userName
    let connectionData = await getConnectionData(connectionID)
    let battleID = await getBattle(connectionData.trophyCount)
    let user_id_two = await User.findOne({ user_name: userName }).select('_id')

    await Multiplayerconnection.remove({ _id: ObjectId(connectionID) })

    const multiPlayerGame = new MultiPlayerGame({
        user_id_one: connectionData.userID,
        user_id_two: user_id_two,
        battle_id: battleID,
        connection_id: connectionID,
    })
    await multiPlayerGame.save()
    res.json(await MultiPlayerGame.findOne({ connection_id: connectionID }).select('_id'))
})

export const getBattleData = (async (req, res) => {
    let gameID = req.query.gameID
    let gameData = await MultiPlayerGame.findOne({ _id: gameID })

    let user_name_one = await User.findOne({ _id: gameData.user_id_one }).select('user_name')
    let user_name_two = await User.findOne({ _id: gameData.user_id_two }).select('user_name')
    let battleLink = await Battle.findOne({ _id: gameData.battle_id }).select('link')
    let battleColors = await Battle.findOne({ _id: gameData.battle_id }).select('colors')
    res.json({
        user_one: user_name_one.user_name,
        user_two: user_name_two.user_name,
        link: battleLink.link,
        colors: battleColors.colors
    })
})

const updateTrophies = (async (gameData, userID) => {
    let battleData = await Battle.findOne({ _id: gameData.battle_id })
    let winner = userID
    let loser = undefined
    if (gameData.user_id_one == userID) { loser == gameData.user_id_two }
    else { loser = gameData.user_id_one }
    let change = battleData.difficulty_level / 5
    let trophyCountWinner = await UserTrophy.findOne({user_id: winner, language_id: battleData.language_id}).select('multi_player_trophies')
    let trophyCountLoser = await UserTrophy.findOne({user_id: loser, language_id: battleData.language_id}).select('multi_player_trophies')
    let winnerTrophies = trophyCountWinner.multi_player_trophies + change
    let loserTrophies = trophyCountLoser.multi_player_trophies - change
    if(loserTrophies < 0) { loserTrophies = 0 }
    await UserTrophy.updateOne({user_id: winner, language_id: battleData.language_id}, {$set: {multi_player_trophies: winnerTrophies}})
    await UserTrophy.updateOne({user_id: loser, language_id: battleData.language_id}, {$set: {multi_player_trophies: loserTrophies}})
})

export const submitBattle = (async (req, res) => {
    let gameID = req.query.gameID
    let userName = req.query.userName
    let gameData = await MultiPlayerGame.findOne({ _id: gameID })
    if (gameData.winner == null) {
        let userID = await User.findOne({ user_name: userName }).select('_id')
        await MultiPlayerGame.updateOne({ _id: gameID }, { $set: { winner: userID } })
        updateTrophies(gameData, userID)
    }
    gameData = await MultiPlayerGame.findOne({ _id: gameID })
    res.json(await User.findOne({ _id: gameData.winner }).select('user_name'))
})


