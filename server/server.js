const express = require('express');
const cors  = require('cors')
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./router/userRouter');
const blogRoutes = require('./router/postRouter');
dotenv.config();
connectDB();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded());

app.use("/user",userRoutes);
app.use("/blog", blogRoutes);

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on port ${process.env.PORT}`);
})