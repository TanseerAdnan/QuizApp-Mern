import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import pythonRoute from "./apiRoutes/pythonRoute.js"
import javaRoute from "./apiRoutes/javaRoute.js"
import jsRoute from "./apiRoutes/jsRoute.js"
import cRoute from  "./apiRoutes/cRoute.js"
import storingGameRec from "./apiRoutes/storingGameRec.js"
import displayGameRec from "./apiRoutes/displayGameRec.js"

//This is to access require while using module as a type in package.json
import { createRequire } from "module";
const require = createRequire(import.meta.url);

//Configuration for out Environment Variable
const dotenv = require('dotenv');
dotenv.config();

const app = express()

//Middlewear functions
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send("This page is Routed")
  })

//Calling API's
app.use('/pythonQ',pythonRoute)
app.use('/javaQ',javaRoute)
app.use('/jsQ',jsRoute)
app.use('/cQ',cRoute)
app.use('/storingScore',storingGameRec)
app.use('/displayScore',displayGameRec)

// Connecting DB & Listening to the Server
mongoose
    .connect(process.env.MongoURL)
    .then(()=>{
        console.log("App is connected to DB");

        app.listen(process.env.PORT,()=>{
            console.log("Server is listening to the PORT")
        })
    })
    .catch((error)=>{
        console.log(error)
    })