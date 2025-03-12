import dotenv from 'dotenv';
import connectDB from './Db/Server.js';
import { app } from "./App.js";
dotenv.config({
    path:'./.env'
});

connectDB()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(` Server is running at port : http://localhost:${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})