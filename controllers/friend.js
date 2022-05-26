import Battles from '../models/battle.js'
import FriendlyBattle from '../models/friend.js'

export const generateCode = (async (req, res) => {
    let user_one = req.query.userName
    let code = Math.random() * Math.pow(10, 17)
    const battles = await Battles.find()
    let random = Math.floor(Math.random() * battles.length)
    let battleID = battles[random]._id
    const friendlyBattle = new FriendlyBattle({
        user_one: user_one,
        code: code,
        battle_id: battleID
    })
    await friendlyBattle.save()
    res.json(await FriendlyBattle.findOne({ code: code }))
})

export const hasBattleStarted = (async (req, res) => {
    let gameID = req.query.gameID
    let temp = await FriendlyBattle.findOne({ _id: gameID })
    if (temp.user_two == null) res.json(null)
    else res.json(temp.user_two)
})

export const getBattleData = (async (req, res) => {
    let gameID = req.query.gameID
    let temp = await FriendlyBattle.findOne({ _id: gameID })
    let battleID = temp.battle_id
    let battleData = await Battles.findOne({ _id: battleID })
    res.json({
        gameID: gameID,
        user_one: temp.user_one,
        user_two: temp.user_two,
        battle_id: temp.battle_id,
        link: battleData.link,
        colors: battleData.colors
    })
})

export const findGame = (async (req, res) => {
    let code = req.query.code
    res.json(await FriendlyBattle.findOne({ code: code }).select('_id'))
})

export const startBattle = (async (req, res) => {
    let gameID = req.query.gameID
    let userName = req.query.userName
    await FriendlyBattle.updateOne({ _id: gameID }, { $unset: { code: 1 } })
    await FriendlyBattle.updateOne({ _id: gameID }, { $set: { user_two: userName } })
        .then(
            res.json({
                status: "success"
            })
        )
})

export const getWinner = (async (req, res) => {
    let gameID = req.query.gameID
    let userName = req.query.userName
    let temp = await FriendlyBattle.findOne({ _id: gameID })
    if (temp.winner == null) {
        await FriendlyBattle.updateOne({ _id: gameID }, { $set: { winner: userName } })
    }
    res.json(await FriendlyBattle.findOne({ _id: gameID }))
})

export const deleteBattle = (async (req, res) => {
    let gameID = req.query.gameID
    await FriendlyBattle.deleteOne({ _id: gameID })
    .then(
        res.json({
            status: "success"
        })
    )
})