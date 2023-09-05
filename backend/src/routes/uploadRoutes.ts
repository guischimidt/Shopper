import express from 'express'
import multer from 'multer'
import UploadController from '../controllers/UploadController'

const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/upload-csv', upload.single('csvFile'), UploadController.uploadCsv)

export default router
