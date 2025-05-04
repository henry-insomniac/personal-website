#!/bin/bash

# 设置变量
DEPLOY_DIR="$1"
PORT="$2"
PASSWORD="dangdang112358$"

# 检查目录是否存在
if [ ! -d "$DEPLOY_DIR" ]; then
    echo "错误：部署目录不存在"
    exit 1
fi

# 检查并安装 nvm
if [ ! -d "$HOME/.nvm" ]; then
    echo "安装 nvm..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

# 加载 nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# 安装并使用 Node.js 16
echo "$PASSWORD" | sudo -S nvm install 16
echo "$PASSWORD" | sudo -S nvm use 16

# 检查并安装 PM2
if ! command -v pm2 &> /dev/null; then
    echo "安装 PM2..."
    echo "$PASSWORD" | sudo -S npm install -g pm2@latest
fi

# 进入部署目录
cd $DEPLOY_DIR

# 安装依赖
echo "安装项目依赖..."
npm install

# 检查并处理 PM2 进程
if pm2 list | grep -q "blog"; then
    echo "停止并删除现有 PM2 进程..."
    pm2 stop blog
    pm2 delete blog
    sleep 2
fi

# 启动项目
echo "启动项目..."
cd $DEPLOY_DIR
NODE_ENV=production PORT=$PORT pm2 start npm --name blog -- run start

# 等待进程启动
sleep 5

# 检查 PM2 进程状态
if ! pm2 list | grep -q "blog"; then
    echo "错误：PM2 进程未启动"
    exit 1
fi

# 检查进程是否正常运行
if ! pm2 list | grep "blog" | grep -q "online"; then
    echo "错误：PM2 进程未正常运行"
    pm2 logs blog --lines 20
    exit 1
fi

# 保存 PM2 配置
pm2 save

# 设置 PM2 开机自启
echo "$PASSWORD" | sudo -S pm2 startup
