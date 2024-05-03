const path=require("path")
const express=require('express')
const dotenv=require('dotenv')
const cookieParser=require("cookie-parser")
const authRoutes=require("./routes/authroutes")
const messageRoutes=require("./routes/messageroutes")
const userRoutes=require("./routes/userroutes")
const connectToMongoDB=require("./db/connectToMongoDB")
const cors = require('cors');

const {app,server}=require('./socket/socket.js')

dotenv.config()

app.use(cors());
app.use(express.json())
app.use(cookieParser())


app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)

app.use(express.static(path.join(__dirname,"/frontend/dist")))

 __dirname=path.resolve();
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

app.get('/', (req, res) => {
    res.send("hiii");
  });
  

const PORT=process.env.PORT || 5000


server.listen(PORT,()=>{
    connectToMongoDB()
    console.log(`Server started on Port ${PORT}`)
})



