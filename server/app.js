const express = require('express');
const  {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const app = express();
// const bcrypt = require('bcryptjs');
const cors=require("cors");
const corsOptions ={
   origin:'*',
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.json())

// users
app.post('/user/register', async function (req, res) {
    const { email, password, pfp } = req.body
    const user = await prisma.user.create({
        data: {
          email, password: password, pfp
        },
    })

    res.json(user)
})

app.patch('/user', async function (req, res) {
    const {id,email} = req.body
    const updateUser = await prisma.user.update({
        where: {
          id
        },
        data: {
          email
        },
      })
    res.json(updateUser)
})


app.delete('/user', async function (req, res) {
    const {id} = req.body
    const deleteUser = await prisma.user.delete({
        where: {
            id
        },
      })
    res.json(deleteUser)
})

app.get('/user', async function (req, res) {
  const users = await prisma.user.findMany()
  res.json(users)
})


// posts
app.post('/post', async function (req, res) {
    const {title, description, color, image,userId} = req.body
    const post = await prisma.postIt.create({
        data: {
          title, description, color, image,userId
        },
    })
    res.json(post)
})

app.patch('/post', async function (req, res) {
    const {id,title, description, color, image,userId} = req.body
    const updatePost = await prisma.postIt.update({
        where: {
          id
        },
        data: {
          title, description, color, image,userId
        },
    })
    res.json(updatePost)
})

app.delete('/post', async function (req, res) {
    const {id} = req.body
    const deletePost = await prisma.postIt.delete({
        where: {
            id
        },
      })
    res.json(deletePost)
})

app.get('/post', async function (req, res) {
    const posts = await prisma.postIt.findMany()
    res.json(posts)
})

var port = 5000
const host = '0.0.0.0';
const PORT = process.env.PORT || 5000;

app.listen( PORT, () => {
   console.log(`Listening at http://localhost:${port} `)
})
