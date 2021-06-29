const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')
const authRouter = require('./authRouter')
const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())

const fixSettings = () => {
    mongoose.set('useNewUrlParser', true);
    mongoose.set("useFindAndModify", false);
    mongoose.set('useCreateIndex', true);
}

app.use(express.json())
app.use("/auth", authRouter)

const start = async () => {
    try {
        fixSettings()//установил значения для исключения ошибок в будущем
        await mongoose.connect(`mongodb+srv://vlad:vlad2281@cluster0.pwnbs.mongodb.net/auth-test?retryWrites=true&w=majority`, {useUnifiedTopology: true })
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()