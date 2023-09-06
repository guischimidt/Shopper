import express from 'express'
import multer from 'multer'
import UploadController from '../controllers/UploadController'
import PriceUpdateController from '../controllers/PriceUpdateController'

const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/upload-csv', upload.single('csvFile'), UploadController.uploadCsv)
router.post('/update-prices', PriceUpdateController.updatePrices)

export default router
