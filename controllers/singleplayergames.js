import SinglePlayerGame from '../models/singleplayergame.js';
import User from '../models/user.js'
import Battle from '../models/battle.js';
import UserTrophy from '../models/usertrophy.js';

export const getBestScore = (async (req, res) => {
  let userName = req.query.userName
  let battleID = req.query.battleID
  try {
    let userID = await User.findOne({ user_name: userName }).select('_id')
    let gameData = await SinglePlayerGame.findOne({ user_id: userID, battle_id: battleID }).select('score')
    res.json({
      status: "success",
      score: gameData.score,
    })
  } catch (error) {
    res.json({
      status: "failed",
    })
  }
})

const updateTrophies = (async (userID, battleData) => {
  try {
    let increment = battleData.difficulty_level / 5
    let trophyCount = await UserTrophy.findOne({user_id: userID, language_id: battleData.language_id}).select('single_player_trophies')
    let finalCount = trophyCount.single_player_trophies + increment
    await UserTrophy.updateOne({user_id: userID, language_id: battleData.language_id}, {$set: {single_player_trophies: finalCount}})
  }
  catch(error) {
    console.log(error)
  }
})

export const createGame = (async (req, res) => {
  const { userName, battleID, score, code } = req.body;
  try {
    let userID = await User.findOne({ user_name: userName }).select('_id')
    let battleData = await Battle.findOne({ _id: battleID })
    const game = new SinglePlayerGame({
      user_id: userID,
      battle_id: battleID,
      language_id: battleData.language_id,
      score: score,
      best_code: code,
    })
    await game.save()
    await updateTrophies(userID, battleData)

    res.json({
      status: "success",
    })
  }
  catch (error) {
    res.json({
      status: "failed",
    })
  }
})

export const updateGame = (async (req, res) => {
  const { userName, battleID, score, code } = req.body;
  try {
    let userID = await User.findOne({ user_name: userName }).select('_id')
    let gameID = await SinglePlayerGame.findOne({ user_id: userID, battle_id: battleID }).select('_id')
    await SinglePlayerGame.updateOne(
      { _id: gameID },
      { $set: { score: score, best_code: code } })
    res.json({
      status: "success",
    })
  } catch (error) {
    res.json({
      status: "failed",
    })
  }
})

export const getUserBattles = (async (req, res) => {
  let userName = req.query.userName
  try {
    let userID = await User.findOne({ user_name: userName }).select('_id')
    let gameData = await SinglePlayerGame.find({ user_id: userID })
    res.json({
      status: "success",
      gameData: gameData,
    })
  } catch (error) {
    res.json({
      status: "failed",
    })
  }
})

export const getBestCode = (async (req, res) => {
  let userName = req.query.userName
  let battleID = req.query.battleID
  try {
    let userID = await User.findOne({ user_name: userName }).select('_id')
    let bestCode = await SinglePlayerGame.findOne({ user_id: userID, battle_id: battleID }).select('best_code')
    res.json({
      status: "success",
      bestCode: bestCode
    })
  } catch (error) {
    res.json({
      status: "failed",
    })
  }
})