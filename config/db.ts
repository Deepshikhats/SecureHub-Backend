import mongoose from 'mongoose'
import dotenv from 'dotenv'

/**
 * db.config.ts
 * @description :: Exports database connection using mongoose
 */

// Load environment variables from .env file
dotenv.config()

// Ensure the environment variable is defined
const uri: string = process.env.DB_URL || ''

if (!uri) {
  throw new Error('DATABASE_URL environment variable is not defined')
}

const config: object = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error('Error in MongoDB connection:', err)
    process.exit(1) // Exit the process if the connection fails
  }
}

connectToDatabase()

const db = mongoose.connection

db.on('error', (err) => {
  console.error('MongoDB connection error:', err)
})

export default mongoose
