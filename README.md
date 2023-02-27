# sharp-img

# 安装之前先设置sharp的镜像地址，否则安装不成功
1. `npm config set sharp_binary_host "https://npmmirror.com/mirrors/sharp"`
2. `npm config set sharp_libvips_binary_host "https://npmmirror.com/mirrors/sharp-libvips"`

# 使用方法
1. 在scripts中添加"sharp":"node node_modules/sharp-img/index.js"
2. 在命令行中执行npm run sharp -- --in src/imgs --out src/img --re 0.8 --qu 60

+ --in:压缩的图片文件夹
+ --out:导出图片的文件夹
+ --re:图片缩放大小比例，0 - 1之间
+ -qu:图片压缩质量大小0-100之间
