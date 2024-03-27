const express=require("express");
const app=express();
const db = require('./connection').connect();
const http=require('http').createServer(app)
const { STATUS } = require('./utils/enum');
const Product = require('./models/productModel')
const taskRoute = require("./routes/taskRoute");
const cors = require(`cors`);


app.use(cors());
app.use(
  cors({
    origin: "*",
  })
);

// const serveIndex=require("serve-index")
// const morgan = require("morgan");
// const bodyParser = require("body-parser");
// require("dotenv").config();
// var cookieParser= require("cookie-parser");
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/task", taskRoute);
// //MIDDLEWARE
// app.use(morgan('dev'));
// app.use(bodyParser.json({limit:"5mb"}));
// app.use(bodyParser.urlencoded({
//     limit:"5mb",
//     extended:true
// }));
// app.use(cookieParser());
// app.use(cors());


// //port 
// const port = process.env.PORT || 3000

app.get('/',(req,res)=>{
    res.send("Welcome to node")
})

app.get('/home', (req, res)=> {
    res.send('Hello home')
  })
  
app.get("/taskview/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    }
    catch(err) {
        console.log(err.message)
        res.status(500).json({message:err.message})
    }
})

//delete

app.delete("/taskRemove/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id,req.body);

        if(!product){
            console.log(product);
            return res.status(404).json({message:`cannot find the task with ID ${id}`})
        }
        res.status(200).json(product)
    }
    catch(err) {
        console.log(err.message)
        res.status(500).json({message:err.message})
    }
})





app.listen(3000, ()=>{
    console.log(`server is running on port 3000`)
})
