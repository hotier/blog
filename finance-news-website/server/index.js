import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import 'dotenv/config';

// 错误处理中间件
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '服务器内部错误', error: err.message });
};

const app = express();
app.use(express.json());

// 数据库连接
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/finance_news').then(() => console.log('MongoDB连接成功'))
.catch(err => console.error('数据库连接失败:', err));

// 路由配置
app.use('/api/auth', authRoutes);

// 错误处理中间件必须在所有路由之后
app.use(errorHandler);

// 处理未找到的路由
app.use((req, res) => {
  res.status(404).json({ message: '未找到请求的资源' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});