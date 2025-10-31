import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js'
import authRoutes from './routes/auth.js'
import uploadRoutes from './routes/upload.js'
import { v2 as cloudinary } from 'cloudinary'
import fileUpload from 'express-fileupload'

dotenv.config()

const app = express()

// CORS
app.use(cors())
app.use(express.json())
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}))
// CONNECT TO MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err))

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Routes
app.use('/api/posts', postRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/upload', uploadRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})