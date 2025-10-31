// server/routes/upload.js
import express from 'express'
import { v2 as cloudinary } from 'cloudinary'
import { protect } from '../middleware/auth.js'
import { Readable } from 'stream'

const router = express.Router()

router.post('/', protect, async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: 'No image uploaded' })
    }

    const file = req.files.image

    // Create readable stream from file buffer
    const stream = Readable.from(file.data)

    // Upload to Cloudinary using stream
    cloudinary.uploader.upload_stream(
      { folder: 'blog-posts' },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error)
          return res.status(500).json({ message: 'Upload failed' })
        }
        res.json({
          url: result.secure_url,
          public_id: result.public_id
        })
      }
    ).end(file.data)  // ← CORRECT WAY

    // OR use pipe:
    stream.pipe(cloudinary.uploader.upload_stream({ folder: 'blog-posts' }, (error, result) => {
      if (error) {
        console.error('Cloudinary upload error:', error)
        return res.status(500).json({ message: 'Upload failed' })
      }
      res.json({
        url: result.secure_url,
        public_id: result.public_id
      })
    }))

  } catch (err) {
    console.error('Upload route error:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router