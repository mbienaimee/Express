const express = require('express')
const app = express()
app.use(express.json())
const port = 2020
var product =[{id:1,name:'eggs',quantity:13}]
app.get('/',(req,res)=>{
    res.status(200).send('this is my market app')
})
app.get('/api/products',(req,res)=>{
    res.status(200).send(product)
})

app.get('/api/products/:id',(req,res)=>{
    const parsedId = parseInt(req.params.id)
    if(isNaN(parsedId)){
        return res.sendStatus(400)
    }
    const filteredName = product.filter((item)=>item.id === parsedId)
    res.status(200).send(filteredName)
    if(!filteredName){
        return res.sendStatus(404)
    }
    
})
app.post('/api/products',(req,res)=>{
    const {body} = req;
    const newProduct = {id:product[product.length-1].id+1,...body}
    product.push(newProduct)
    res.status(200).send(newProduct)
})
app.put('/api/products/:id',(req,res)=>{
    const {body , params:{id}}=req;
    const parseId = parseInt(id)
    if(isNaN(parseId)){
        return res.sendStatus(400);
    }
    productIndex = product.findIndex((item)=>item,id ===parseId)
    if(productIndex !== -1){
        product[productIndex] = {id:parseId,...body}
        return res.sendStatus(200)
    }
    else{
        return res.sendStatus(404)
    }
})
app.patch('/api/products/:id',(req,res)=>{
    const {body , params:{id}}=req;
    const parseId = parseInt(id)
    if(isNaN(parseId)){
        return res.sendStatus(400);
    }
    productIndex = product.findIndex((item)=>item,id ===parseId)
    if(productIndex !== -1){
        product[productIndex] = {...product[productIndex],...body}
        return res.sendStatus(200)
    }
    else{
        return res.sendStatus(404)
    }
})
app.delete('/api/products/:id',(req,res)=>{
    const {body , params:{id}}=req;
    const parseId = parseInt(id)
    if(isNaN(parseId)){
        return res.sendStatus(400);
    }
    productIndex = product.findIndex((item)=>item,id ===parseId)
    if(productIndex !== -1){
      product.splice(productIndex,1)
        return res.sendStatus(200)
    }
    else{
        return res.sendStatus(404)
    }
})
app.listen(port,()=>{
    console.log(`server is running on port ${port} ....`)
})