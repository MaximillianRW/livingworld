// Run this script manually or as part of your build process
const fs = require('fs');
const path = require('path');

const bannerDir = path.join(__dirname, '..', '..', '..', 'public', 'imagens', 'Banner');
const outputFile = path.join(bannerDir, 'images.json');

const files = fs.readdirSync(bannerDir)
    .filter(file => /\.(png|jpg|jpeg|gif)$/i.test(file));

fs.writeFileSync(outputFile, JSON.stringify(files, null, 2));
console.log('images.json updated:', files);