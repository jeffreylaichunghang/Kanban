// modules
require('dotenv').config()
const https = require('https')
const fs = require('fs')
const express = require('express')
const { PrismaClient } = require('@prisma/client')
const cors = require('cors')
const path = require('path')
const passport = require('passport')
const jwt = require('jsonwebtoken')

// files
const TaskRouter = require('./router/taskRouter')
const TaskService = require('./service/taskService')
const AuthRouter = require('./router/authRouter')
const AuthService = require('./service/authService')
const secureRoute = require('./router/secureRoute')

const app = express()
const prisma = new PrismaClient()
const taskService = new TaskService(prisma)
const authService = new AuthService(prisma)
require('./auth/auth')(passport, prisma)

// middlewares
app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(passport.initialize())

async function main() {
    app.use('/api', passport.authenticate('jwt', { session: false }), new TaskRouter(express, taskService).route())
    app.use('/auth', new AuthRouter(express, passport, jwt, authService).route())
    app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute) // for testing purpose
    if (process.env.NODE_ENV === 'production') {
        const __dirname = path.resolve();
        app.use(express.static(path.join(__dirname, 'frontend/dist')));

        app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')))
    }
}

const options = {
    cert: fs.readFileSync(process.env.SERVER_CERT_PATH),
    key: fs.readFileSync(process.env.SERVER_KEY_PATH)
}

// app.listen(process.env.PORT, () => {
//     console.log(`app listening on ${process.env.PORT}`)
// })
https.createServer(options, app).listen(process.env.PORT)

main()
    .then(async () => {
        // await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        // await prisma.$disconnect()
        // process.exit(1)
    })
