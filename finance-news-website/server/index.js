import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import 'dotenv/config';

const app = express();
app.use(express.json());

// 数据库连接
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/finance_news').then(() => console.log('MongoDB连接成功'))
.catch(err => console.error('数据库连接失败:', err));

// 路由配置
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});