 const mongoose = require('mongoose');
 const validator = require('validator');
mongoose.connect("mongodb://127.0.0.1:27017/test", {useNewUrlParser: true,  useUnifiedTopology: true})
.then(()=>console.log("connected"))
.catch((err)=>console.log(err));

// schema
const playListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        // uppercase:true,
        lowercase: true,
        // trim: true,
        minlength: 2,
        maxlength: 10
    },
    type: String,
    email: {
     type: String,
     required: true,
     uinque: true,
     validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Email is not validde");
      }
     }
    },
    active: Boolean,
})

// Model or creact collection
const PlayList = new mongoose.model("PlayList", playListSchema);

// creat or insert document
// const creatDocument = async () =>{
//     try{


// const reactPlayList = new PlayList({
//     name: "Node Js",
//     type: "Back End",
//     active: true,
// })
// const resulte = await reactPlayList.save();
// console.log(resulte);
//     }catch(err){console.log(err)}
// }
// creatDocument();

// insert many
const creatDocument = async () =>{
 try{
    // const mongoPlayList = new PlayList({
    //     name: "Mongo db",
    //     type: "database",
    //     active: true
    // })
    // const mongoosePlayList = new PlayList({
    //     name: "Mongoose",
    //     type: "database",
    //     active: true
    // })
    const jsPlayList = new PlayList({
        name: "Asim",
        type: "male",
        email: "asim@gmail.com",
        active: true
    })
    // const resulte = await PlayList.insertMany([mongoPlayList, mongoosePlayList, jsPlayList])
    const resulte = await PlayList.insertMany([jsPlayList])
    console.log(resulte);

 }catch(err){console.log(err)};
}
creatDocument();

// read the data
const readDocument  = async () =>{
    const resulte = await PlayList
    // .find({type: {$in : ["Front End", "database"]}})
    .find({active: true})
    .select({name:1})
    .sort({name : -1})
    // .count()
    // .limit(1);
    console.log(resulte);
}
// readDocument();

// update the document
const updateDocument = async (_id) =>{
    try{
        const resulte = await PlayList.findByIdAndUpdate({_id},{
            $set: {
                name : "Javascript"
            }
        },{
            new : true
        });
        console.log(resulte)
    }catch(err){
        console.log(err);
    }

   
}
// updateDocument("62dd2395fbb8e5a5aa64e054");

// delete the document
const deleteDocument = async (_id) =>{
    try{
       const resulte = await PlayList.findByIdAndDelete({_id});
       console.log(resulte);
    }catch(err){
        console.log(err);
    }
}
deleteDocument("62d18b93d4854c72ae8424a2");