const mongoose = require('mongoose')
const password = encodeURIComponent("Joyal12345");
const username =encodeURIComponent("joyal")
const url = `mongodb+srv://${username}:${password}@testdb.7tzam0k.mongodb.net/?retryWrites=true&w=majority&appName=testDB`;

exports.connect = ()=>{
    mongoose.set("strictQuery",false)
mongoose.connect(url)
.then(()=>{
    console.log('connected....')
})
.catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
  })
}