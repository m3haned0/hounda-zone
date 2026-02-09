const express = require('express');
const path = require('path');
const app = express();

// إعداد الفولدرات العامة والملفات
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// يخلي اللينك يفتح صفحة index.html أول ما تدخله
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// مسارات الصفحات التانية
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));
app.get('/details', (req, res) => res.sendFile(path.join(__dirname, 'details.html')));

let products = []; // قائمة المنتجات (مؤقتة)

app.get('/api/products', (req, res) => res.json(products));

// التصدير لـ Vercel
module.exports = app;
