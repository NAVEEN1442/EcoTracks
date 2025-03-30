const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const {cloudinaryConnect} = require("./config/cloudinaryConnect")
const cors = require("cors")
const userRouter = require("./routes/User");

const PORT = process.env.PORT || 4000;
database.connect();
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use(cookieParser());
cloudinaryConnect();
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

app.use("/api/v1/auth",userRouter);

app.use(cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true,              // Allow cookies and headers like 'Authorization'
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include OPTIONS for preflight
    allowedHeaders: ['Content-Type', 'Authorization'],    // Include required headers
}));

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is running up and running..."
    })
})

app.listen(PORT,()=>{
    console.log(`This server is running at : ${PORT} `)
})

