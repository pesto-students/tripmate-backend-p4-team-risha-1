import express, { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
const router: Router = express.Router();

interface Blog {
    id: string;
    postContent: string;
    tags: string;
    author: any;
    catagory:String;
    /*img: string;*/
    date :string;
  }

  let blogs: any = [];

  router.get("/", (req: Request, res: Response) => {
    res.status(200).json(blogs);
  });

  router.post("/addPost",(req:Request, res:Response)=>{
    let newblog: Blog = {
        id: uuidv4().toString(),
        postContent: req.body.postContent,
        tags: req.body.tags,
        author: req.body.author,
        catagory: req.body.catagory,
        date:req.body.date
      };
      blogs.push(newblog);
      res.send("blog added");
  }
  );

  router.put("/deletePost",(req:Request, res:Response)=>{
    var blogId;

    for(let blog of blogs){
        var id = req.body.id;
        if(blog._id == id){
            blogId= blog.id;
            console.log(blogId);
        }
    }
    if (blogId !== -1) {
        blogs.splice(blogId, 1);
      }
    res.send(blogs);
  }
  );

  export default router;