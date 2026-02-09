const express = require('express');
const path = require('path');
const app = express();

// إعداد الفولدرات العامة عشان الصور والملفات تشتغل
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// أهم سطر: يخلي اللينك يفتح صفحة index.html أول ما تدخله
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// مسارات الصفحات التانية عشان التنقل يشتغل
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));
app.get('/details', (req, res) => res.sendFile(path.join(__dirname, 'details.html')));

let products = []; // قائمة المنتجات (مؤقتة)

app.get('/api/products', (req, res) => res.json(products));

// التصدير لـ Vercel عشان يشتغل كـ Function
module.exports = app;
