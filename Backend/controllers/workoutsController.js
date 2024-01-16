const mongoose = require('mongoose')
const Workout = require('../models/workoutModel')

const getAllWorkouts = async (req, res) => {

    const workouts = await Workout.find({}).sort({ createdAt: -1 })
    res.status(201).json(workouts)

}

const getSingleWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findById({ _id: id })
    if (!workout) {
        return res.status(404).json({ error: 'No such workout' })
    }

    res.status(201).json(workout)


}

const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body
    const emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!reps) {
        emptyFields.push('reps')
    }

    if (!load) {
        emptyFields.push('load')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try {

        const workout = await Workout.create({ title, reps, load })
        res.status(201).json(workout)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }
    try {

        const workout = await Workout.findByIdAndDelete({ _id: id })
        res.status(201).json(workout)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }
    try {

        const workout = await Workout.findByIdAndUpdate(id, {
            ...req.body
        })
        if (!workout) {
            return res.status(404).json({ error: 'No such workout' })
        }

        res.status(201).json(workout)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}




module.exports = {
    getAllWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}