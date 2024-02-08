const express=require('express');
const app = express();
const port=3000;
const path=require('path');
const methodOverride=require('method-override');
const {v4: uuid}=require('uuid');

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views',path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


let comments=[
    {
        id:uuid(),
        username:'Deepanshu',
        comment:'lol its so funny'
    },
    {
        id:uuid(),
        username:'Heepanshu',
        comment:' its fantastic (:'
    },
    {
        id:uuid(),
        username:'Ayush',
        comment:'going to be darqk soon'
    },
    {
        id:uuid(),
        username:'Aaadarsh',
        comment:'Jai Sherr Ram'
    },
    {
        id:uuid(),
        username:'Jugal',
        comment:'let hustle'
    }

]

//performing crud operation below on comments section
//read
app.get('/comments',(req,res)=>{
    res.render('comments/index',{comments})
})

//create(creating get request for  a comment)
app.get('/comments/new',(req,res)=>{
    res.render( 'comments/new',{comments})
})
//create(creating a post request to post the comment)
app.post('/comments',(req,res)=>{
    const {username,comment}=req.body;
    comments.push({username,comment, id:uuid()})
    res.redirect('/comments')
})
//Show(for finding unique id for the comment)
app.get('/comments/:id',(req,res)=>{
     const {id}=req.params;
    const comment=comments.find(c=>c.id=== id);
    res.render('comments/show',{comment})
})

app.get('/comments/:id/edit',(req,res)=>{
    const {id}=req.params;
    const comment=comments.find(c=>c.id=== id);
    res.render('comments/edit',{comment})
})

//updating the comment
app.patch('/comments/:id', (req,res)=>{
    const {id}=req.params;
    const newCommentText=req.body.comment;
    const foundComment=comments.find(c=>c.id===id);
    foundComment.comment=newCommentText;
    res.redirect('/comments')
})

//for deleting a comment
app.delete('/comments/:id',(req,res)=>{
    const {id}=req.params;
    // const foundComment=comments.find(c=>c.id===id);
   comments=comments.filter(c=>c.id !==id);
   res.redirect('/comments')
})



app.get('/tacos',(req,res)=>{
    res.send("Get Tacos request")
})

app.post('/tacos',(req,res)=>{
    const {veg,qty}=(req.body)
    res.send(`here are your ${qty} ${veg} tacos`)
})

app.listen(port,()=>{
    console.log(`port is running on ${port}`)
})

//  this is our crud restful paater which we are going to follow

// GET /comments - list all comments 
// POST /comments- Create new comments
// GET/comments/:id- Get one specific comment by id
// PATCH/comments/:id-update one comments
// DELETE /Comments/:id- Delete one specific comment
