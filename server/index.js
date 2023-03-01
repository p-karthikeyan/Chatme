const PORT=8000
const express=require('express')
const {v4:uuidv4}=require('uuid')
const cors=require('cors')
const bcrypt=require('bcrypt')
const {MongoClient}=require('mongodb')
const jwt=require('jsonwebtoken')
const uri='mongodb+srv://karthik:EEHQ2XUf1bH41Je6@cluster1.9r0akgr.mongodb.net/?retryWrites=true&w=majority'

const app=express()
app.use(express.json());
app.use(cors())

app.get('/',(req,res)=>{
    res.json('helooo backend')
})

app.post('/signup',async(req,res)=>{
    const client=new MongoClient(uri)
    const {email,password}=req.body
    const generateuniqid=uuidv4()
    const hashedpassword=await bcrypt.hash(password,10)
    
    try{
        await client.connect()
        const database=client.db('app-data')
        const users=database.collection('users')

        const existinguser=await users.findOne({email})
        if (existinguser){
            return res.status(409).send('user already exist. Please login')
        }
        const sanitizedemail=email.toLowerCase()

        const data={
            user_id:generateuniqid,
            email:sanitizedemail,
            hashed_password:hashedpassword
        }
        const inserteduser=await users.insertOne(data)

        const token=jwt.sign(inserteduser,sanitizedemail,{
            expiresIn:60*24,
        })
        res.status(201).json({token,userId:generateuniqid})
    }catch(err){
        console.log(err)
    }finally{
        await client.close()
    }
})

app.post('/login',async(req,res)=>{
    const client=new MongoClient(uri)
    const {email,password}=req.body

    try{
        await client.connect()
        const database=client.db('app-data')
        const users=database.collection('users')
        const user=await users.findOne({email})
        if(user &&(await bcrypt.compare(password,user.hashed_password))){
            const token=jwt.sign(user,email,{
                expiresIn:60*24
            })
            res.status(201).json({token,userId:user.user_id})
        }
        res.status(409).send('Invalid Credentials..')
    }
    catch(err){
        console.log(err)
    }
})

app.get('/users',async(req,res)=>{
    const client = new MongoClient(uri)
    try{
        await client.connect()
        const database=client.db('app-data')
        const users=database.collection('users')
        const returnedusers=await users.find().toArray()
        res.send(returnedusers)
    }
    finally{
        await client.close()
    }
})


app.put('/user',async(req,res)=>{
    const client=new MongoClient(uri)
    const formdata=req.body.formdata
    try{
        await client.connect()
        const database=client.db('app-data')
        const users=database.collection('users')
        const query={user_id:formdata.user_id}
        const updatedocument={
            $set:{
                first_name:formdata.first_name,
                dob_day:formdata.dob_day,
                dob_month:formdata.dob_month,
                dob_year:formdata.dob_year,
                show_gender:formdata.show_gender,
                gender_identity:formdata.gender_identity,
                gender_interest:formdata.gender_interest,
                url:formdata.url,
                about:formdata.about,
                matches:formdata.matches
            }
        }
        const updateduser=await users.updateOne(query,updatedocument)
        res.send(updateduser)
    }finally{
        await client.close()
    }
})

app.listen(PORT,()=>console.log('Server is Running...'))