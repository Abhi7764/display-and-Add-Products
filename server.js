const express=require("express");
const app=express();

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
const client=require("mongodb").MongoClient;
//(err,database)
// catch :-received the error
//then:- received the database
let dbinstance; 
let productssInstance;

client.connect("mongodb+srv://userroot:Abhi7764@cluster0.mfmsaea.mongodb.net/?retryWrites=true&w=majority").then((database)=>{
    dbinstance=database.db("Project2");
    productssInstance=dbinstance.collection("Products");
    console.log("database connected");
})

//app.use(express.static("."))

app.get("/getData",(req,res)=>{
    //! for one value
    // studentsInstance.findOne().then((result)=>{
    //     console.log(result);
    //     res.end();
    // });
    
    productssInstance.find({}).toArray().then((result)=>{
        // console.log(result);
        // res.end();
        res.render("home",{data:result});
    });
})
app.get("/add",(req,res)=>{
    res.render("add")
})
app.post("/storeData",(req,res)=>{
    let obj={"name":req.body.name,"Price":req.body.price,"description":req.body.description,"currency":"$","img":"https://picsum.photos/200"};
    productssInstance.insertOne(obj).then((result)=>{
        // console.log(result);
        // res.end(); 
        //res.render("home",{data:result});
        res.redirect("/getData");
    })
})
app.listen(3000,(err)=>{
    console.log("Server Started.....")
})