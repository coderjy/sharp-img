const sharp = require('sharp');
const imageSize = require('image-size')
const fs = require('fs');
const path = require('path');

let inputFolder;
let outputFolder;
let resize = 0.6;
let quality = 60;
if(process.argv.indexOf('--in')>0){
   inputFolder = process.argv[process.argv.indexOf('--in') + 1];
}
if(process.argv.indexOf('--out')>0){
  outputFolder = process.argv[process.argv.indexOf('--out') + 1];
}

if(process.argv.indexOf('--re')>0){
  resize = process.argv[process.argv.indexOf('--re') + 1];
}

if(process.argv.indexOf('--qu')>0){
  quality = parseInt(process.argv[process.argv.indexOf('--qu') + 1]);
}

if (!fs.existsSync(inputFolder)) {
  console.error('请输入需要压缩的图片文件夹！')
  return
}

// 创建输出文件夹
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}
console.log(inputFolder,'inputFolder')
// 遍历图片文件夹
fs.readdir(path.join(__dirname,'../../',inputFolder), (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    const inputPath = path.resolve(__dirname,'../../',inputFolder, file);
    const outputPath = path.resolve(__dirname,'../../',outputFolder, file);
    
    const { width, height } = imageSize(inputPath);
    const resizeHeight = parseInt(height*resize);
    const resizeWidth = parseInt(width*resize);
    // 判断是否为图片文件
    if (/\.(png|jpg|jpeg)$/.test(file)) {
      // 压缩图片
      sharp(inputPath)
        .resize({width:resizeWidth,height:resizeHeight})
        .jpeg({ 
          quality: quality,
          progressive:true, 
          chromaSubsampling: '4:4:4'
        })
        .png({ 
          quality: quality, 
          progressive:true,
        })
        .toFile(outputPath, (err, info) => {
          if (err) throw err;
          console.log(info);
        });
    }
  });
});
