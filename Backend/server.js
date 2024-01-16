const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const app = express()

const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/userRoutes')
// middleware

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})


app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)


mongoose.connect(process.env.DB)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Backend side is running..');
    })
})

