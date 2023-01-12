const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config({path : './config/.env'})
let Users = require('./models/Users')
let getRoute = process.env.GET_ROUTE
let uri = process.env.URI
let port = process.env.PORT
let db = process.env.DB
let postRoute = process.env.POST_ROUTE
let putRoute = process.env.PUT_ROUTE
let delRoute = process.env.DEL_ROUTE
const app = express()
app.listen(port,()=> console.log('serveur en cours d\'execution...'))
mongoose.connect(`mongodb://${uri}/${db}`)
.then(()=> console.log('Base de donnees en cours d\'execution'))
.catch((err)=> console.error(err))
let arrayOfUsers = [{nom : 'Ababacar DIOKHANE',age : 25},{nom : 'Maty DIOKHANE', age : 52},{nom : 'Macoumba DIOKHANE',age : 62},{nom : 'Massamba DIOKHANE',age : '28'}]
Users.create(arrayOfUsers)
.then((data)=> console.log(`tous les users de la base de donnees:${data}`))
.catch((err) => console.error(err))
// recupération de tous les users de la base de donnée
app.get(getRoute,async(req,res)=> {
    try {
        let dbUser = await Users.find()
        res.send(dbUser)
        console.log(dbUser)
    } catch (error) {
        console.error(error)
    }
})
// modification de la base de donnée(ajout d'un user)
app.post(postRoute,async(req,res)=> {
    try {
        let newUser = new Users({
            nom : 'Cheikh NGOM',
            age : 33
        })
        await newUser.save()
        res.status(201).send(newUser)
        console.log(newUser)
    } catch (error) {
        res.status(400).send(error)
    }
})
//modification de la base de donnée(mettre a jour les infos d'un user)
app.put(putRoute,async(req,res)=>{
    try {
        let id = mongoose.Types.ObjectId("63bf4ca2567c8def1a535163")
        let userEdit = await Users.findByIdAndUpdate(id,{$set :{ age : 32}} )
        await userEdit.save()
        res.status(201).send(userEdit)
        console.log(userEdit)
    } catch (error) {
        res.status(400).send(error)
    }
})
//suppression d'un user
app.delete(delRoute,async(req,res)=>{
    try {
        let id = mongoose.Types.ObjectId("63bf5ab648bd11dd4b8fb8b9")
        let userDel = await Users.findByIdAndRemove(id)
        res.status(201).send('user supprimé')
        console.log('user supprimé')
    } catch (error) {
        res.status(400).send(error)
    }
})