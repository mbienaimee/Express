const express = require('express')
const app = express();
const uuid = require('uuid')

app.use(express.json())

const port = 3001
var usernameList=[{id:1,name:'reine',email:'rmarie@gmail.com'},
{id:2,name:'marie',email:'marie@gmail.com'},
{id:3,name:'bienaimee',email:'bmarie@gmail.com'}]

app.get('/',(req,res)=>{
    res.status(201).send({
        msg:'hello'
        
    })
})

app.get('/api/users',(req,res)=>{
    res.status(201).send(usernameList)
})
app.post('/api/users',(req,res)=>{
    // const newUser = usernameList.push(req.body)
    // res.send(201)
    const {body}= req;
    const newUser ={id:usernameList[usernameList.length-1].id+1,...body}
    usernameList.push(newUser)
    return res.status(200).send(newUser)
})
app.get('/api/products',(req,res)=>{
    res.status(201).send([{id:'234',pname:'cassava'}])
})

// this is for getting id 
 app.get('/api/users/:id',(req,res)=>{
 

     const passId = parseInt(req.params.id)
     if(isNaN(passId)){
         return res.sendStatus(400)
     }
    
     const userId = usernameList.filter((item)=>item.id ===passId)
     res.status(201).send(userId)

      if(!userId){
         return res.sendStatus(404)
      }
    

 })
 app.get('/api/users/:name',(req,res)=>{
     const {name} = req.params
     filteredName = usernameList.filter((item)=>item.name === name)
     res.status(201).send(filteredName)
 })


app.put('/api/users/:id',(req,res)=>{
    const{body,params:{id}}=req;
   passedId = parseInt(id)
   if(isNaN(passedId)){
    return res.status(400).send('Bad request')
   }
   userIndex = usernameList.findIndex((items)=>items.id ===passedId)
   if(userIndex !== -1){
    usernameList[userIndex]={id:passedId,...body}
    return res.sendStatus(200)
   }
   else{
    return res.sendStatus(404)
   }

})
app.patch('/api/users/:id',(req,res)=>{
    const{body,params:{id}}=req;
   passedId = parseInt(id)
   if(isNaN(passedId)){
    return res.status(400).send('Bad request')
   }
   userIndex = usernameList.findIndex((items)=>items.id ===passedId)
   if(userIndex !== -1){
    usernameList[userIndex]={...usernameList[userIndex],...body}
    return res.sendStatus(200)
   }
   else{
    return res.sendStatus(404)
   }

})
app.delete('/api/users/:id',(req,res)=>{
    const{body,params:{id}}=req;
   passedId = parseInt(id)
   if(isNaN(passedId)){
    return res.status(400).send('Bad request')
   }
   userIndex = usernameList.findIndex((items)=>items.id ===passedId)
   if(userIndex !== -1){
   usernameList.splice(userIndex,1)
    return res.sendStatus(200)
   }
   else{
    return res.sendStatus(404)
   }

})
app.listen(port,()=>{
    console.log(`server is running on port ${port}....`);
})