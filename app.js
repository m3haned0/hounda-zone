const express = require('express');
const path = require('path');
const app = express();

// إعداد الفولدرات العامة
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// أهم سطر: يخلي اللينك يفتح صفحة index.html أول ما تدخله
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// مسارات الصفحات التانية
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));
app.get('/details', (req, res) => res.sendFile(path.join(__dirname, 'details.html')));

let products = []; // المنتجات (هتتحفظ مؤقتاً)

app.get('/api/products', (req, res) => res.json(products));

module.exports = app;
