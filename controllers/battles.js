import Battles from '../models/battle.js'
import Categories from '../models/categories.js'

export const getRandomBattle = (async (req, res) => {
    const battles = await Battles.find()
    let random = Math.floor(Math.random() * battles.length)
    res.json(battles[random])
})

export const getBattles = (async (req, res) => {
    let categoryTitle = req.query.categoryTitle
    let categoryID = await Categories.findOne({ title: categoryTitle }).select('_id')
    res.json(await Battles.find({ category_id: categoryID }))
})

export const getBattleData = (async (req, res) => {
    let battleID = req.query.battleID
    let temp = (await Battles.findOne({ _id: battleID }))
    res.json(temp)
})  

