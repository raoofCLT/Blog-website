import express from "express"
import bodyParser from "body-parser"


const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))

const blogStorage=[
    { id:1, head: "KERALA", body:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis accusantium ut sint voluptatem inventore accusamus ducimus nemo, voluptas autem impedit ratione? Porro quaerat aspernatur sequi commodi magni! Alias, modi nesciunt!"},
    { id:2, head:"INDIA", body:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis accusantium ut sint voluptatem inventore accusamus ducimus nemo, voluptas autem impedit ratione? Porro quaerat aspernatur sequi commodi magni! Alias, modi nesciunt!"}
]


app.get("/", (req,res) => {
    res.render("index.ejs", { blogs: blogStorage, count: blogStorage.length })
})


app.post("/create", (req,res) => {
    const length = blogStorage.length
    const newblog ={
        id:length+1,
        head:req.body["heading"],
        body:req.body["details"]
    }
    if(newblog.head.length<1){
        res.redirect("/")
    }else{
        blogStorage.push(newblog)
        console.log(newblog.head)
        res.redirect("/")
    }
})

app.get("/edit/:id",(req,res) =>{
    const blog = blogStorage.find((blog) => blog.id === parseInt(req.params.id));
    res.render("edit.ejs",{blog: blog})
    console.log(blog)
})

app.post("/upload/:id", (req,res) =>{
    const blog = blogStorage.find((blog) => blog.id === parseInt(req.params.id))

    if (blog){
        blog.head=req.body["title"]
        blog.body=req.body["discription"]
    }
    res.redirect("/")
    console.log(req.body)
})

app.post("/delete/:id",(req,res) =>{
    const blog = blogStorage.findIndex(blog => blog.id === parseInt(req.params.id))
    blogStorage.splice(blog,1)
    res.redirect("/")
})


app.listen(port,() =>{
    console.log(`Your server is running on ${port}`)
})