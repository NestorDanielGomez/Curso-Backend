import mongoose from 'mongoose'
import config from '../config/index'

export const initDb = () => {
    return mongoose.connect(config.MONGO_ATLAS_URL, { useNewUrlParser: true })
}