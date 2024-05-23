const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { Kofia, Tracks, Pensi, Tshirt, Sweta } = require('./models/ImageModels');
const DeletedImageModel = require('./models/DeletedImageModel');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/Images', express.static(path.join(__dirname, 'public/Images')));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const upload = multer({ storage: multer.memoryStorage() });

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    endpoint: `https://${process.env.AWS_ENDPOINT}`, // Using the provided AWS endpoint
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});


app.post('/api/upload/:productType', upload.array('images', 10), async (req, res) => {
    const { productType } = req.params;
    const models = {
        kofia: Kofia,
        tracks: Tracks,
        pensi: Pensi,
        tshirt: Tshirt,
        sweta: Sweta
    };

    const Model = models[productType.toLowerCase()];
    if (!Model) {
        return res.status(400).send('Invalid product type');
    }

    const productDir = path.join(__dirname, 'public', 'Images', productType.toLowerCase());
    try {
        if (!await fs.stat(productDir).catch(() => false)) {
            await fs.mkdir(productDir, { recursive: true });
        }

        const images = await Promise.all(req.files.map(async file => {
            const compressedImageBuffer = await sharp(file.buffer)
                .resize({ width: 800 })
                .jpeg({ quality: 80 })
                .toBuffer();

            const filename = `${Date.now()}-${file.originalname}`;
            const filePath = path.join(productDir, filename);

            await fs.writeFile(filePath, compressedImageBuffer);

            const s3Params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `${productType.toLowerCase()}/${filename}`,
                Body: compressedImageBuffer,
                ContentType: file.mimetype
            };
            const command = new PutObjectCommand(s3Params);
            await s3Client.send(command);

            return {
                filename,
                contentType: file.mimetype,
                url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${productType.toLowerCase()}/${filename}`,
                title: file.originalname,
                description: 'Sample description',
                uploadDate: new Date()
            };
        }));

        const savedImages = await Model.insertMany(images);

        res.status(201).send(savedImages);
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).send(error);
    }
});

const models = {
    kofia: { model: Kofia, folder: 'Kofia' },
    tracks: { model: Tracks, folder: 'Tracks' },
    pensi: { model: Pensi, folder: 'Pensi' },
    tshirt: { model: Tshirt, folder: 'Tshirt' },
    sweta: { model: Sweta, folder: 'Sweta' },
};

Object.entries(models).forEach(([key, config]) => {
    app.get(`/getAll${config.folder}Images`, async (req, res) => {
        try {
            const items = await config.model.find();
            res.json(items);
        } catch (error) {
            res.status(500).json(error);
        }
    });
});

app.delete('/api/deleteImage/:category/:imageId', async (req, res) => {
    try {
        const { category, imageId } = req.params;
        const Model = models[category.toLowerCase()].model;

        if (!Model) {
            return res.status(400).send('Invalid category type');
        }

        const imageToDelete = await Model.findById(imageId);

        if (!imageToDelete) {
            return res.status(404).send('Image not found');
        }

        const deletedImage = new DeletedImageModel({
            phoneNumber: req.body.phoneNumber,
            imageId,
            category,
            filename: imageToDelete.filename,
            contentType: imageToDelete.contentType,
            url: imageToDelete.url,
            title: imageToDelete.title,
            description: imageToDelete.description,
            uploadDate: imageToDelete.uploadDate
        });

        await deletedImage.save();

        const oldFilePath = path.join(__dirname, 'public', 'Images', category.toLowerCase(), imageToDelete.filename);
        const newFilePath = path.join(__dirname, 'public', 'Images', 'SoldProducts', imageToDelete.filename);
        await fs.rename(oldFilePath, newFilePath);

        await Model.findByIdAndDelete(imageId);

        const filename = imageToDelete.filename;
        if (!filename) {
            throw new Error('Filename is undefined or empty.');
        }

        const s3Params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${category.toLowerCase()}/${filename}`
        };
        const command = new DeleteObjectCommand(s3Params);
        await s3Client.send(command);

        res.status(200).json({ message: 'Image copied to deleted images collection and deleted successfully.' });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).send(error);
    }
});

app.delete('/api/deleteImage/:imageId', async (req, res) => {
    const { imageId } = req.params;
    try {
        const deletedImage = await DeletedImageModel.findByIdAndDelete(imageId);
        if (!deletedImage) {
            return res.status(404).json({ error: "Image not found" });
        }

        const filePath = path.join(__dirname, 'public', 'Images', 'SoldProducts', deletedImage.filename);
        await fs.unlink(filePath);

        const s3Params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `SoldProducts/${deletedImage.filename}`,
        };
        const command = new DeleteObjectCommand(s3Params);
        await s3Client.send(command);

        res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Total count endpoints
Object.entries(models).forEach(([path, config]) => {
    app.get(`/total_${config.folder.toLowerCase()}`, async (req, res) => {
        try {
            const total = await config.model.countDocuments();
            res.json({ total });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
});

app.get('/total_sales', async (req, res) => {
    try {
      const totalSales = await DeletedImageModel.countDocuments();
      res.json({ total: totalSales });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.get('/api/deletedImages', async (req, res) => {
    try {
        const deletedImages = await DeletedImageModel.find();
        res.json(deletedImages);
    } catch (error) {
        console.error('Error fetching deleted images:', error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   
    console.log(`Server is running on port ${PORT}`);
});
