// modules
require('dotenv').config()
const express = require('express')
const { PrismaClient } = require('@prisma/client')
const cors = require('cors')
const path = require('path')

// files
const TaskRouter = require('./router/taskRouter')
const TaskService = require('./service/taskService')

const app = express()
const prisma = new PrismaClient()
const taskService = new TaskService(prisma)

// middlewares
app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

async function main() {
    if (process.env.NODE_ENV === 'production') {
        const __dirname = path.resolve();
        app.use(express.static(path.join(__dirname, 'frontend/dist')));

        app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')))
    } else {
        app.use('/api', new TaskRouter(express, taskService).route())
    }
}

app.listen(process.env.PORT, () => {
    console.log(`app listening on ${process.env.PORT}`)
})

main()
    .then(async () => {
        // await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        // await prisma.$disconnect()
        // process.exit(1)
    })
