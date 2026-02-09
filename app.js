const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// إعداد التخزين المؤقت لأن Vercel لا يدعم حفظ الملفات الدائم
const storage = multer.diskStorage({
    destination: '/tmp/', 
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

app.use(express.static('public'));
app.use(express.json());

let products = []; 

app.post('/add-product', upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'extraImages', maxCount: 5 }
]), (req, res) => {
    try {
        const newProduct = {
            id: Date.now(),
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            mainImage: req.files['mainImage'] ? '/uploads/' + req.files['mainImage'][0].filename : '',
            extraImages: req.files['extraImages'] ? req.files['extraImages'].map(f => '/uploads/' + f.filename) : []
        };
        products.push(newProduct);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

app.get('/api/products', (req, res) => res.json(products));
app.get('/api/product/:id', (req, res) => {
    const p = products.find(prod => prod.id == req.params.id);
    res.json(p);
});

// هذا هو السطر الأهم لـ Vercel
module.exports = app;
