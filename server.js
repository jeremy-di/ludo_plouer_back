import express from 'express'
import db from './db/db.js'
import userRoute from './routes/user.route.js'
import memberRoute from './routes/member.route.js'
import archivesActivityRoute from './routes/archiveActivity.route.js'
import activityRoute from './routes/activity.route.js'
import cors from 'cors'
import scheduleDailyArchive from './cron/archive.cron.js'

const app = express()

app.use(express.json())

db()

app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}));

const port  = process.env.PORT

app.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`)
})

scheduleDailyArchive()

app.use('/users', userRoute)
app.use('/members', memberRoute)
app.use('/activities', activityRoute)
app.use('/archives', archivesActivityRoute)

