import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let blogPosts = [];
let lastID = 0;


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

// app.get("/blogs", (req, res) => {
//     res.render("blogs.ejs");
// });


app.post('/submit-data', (req, res) => {
    const { title, content, author } = req.body;
    lastID++;
    blogPosts.push({ id: lastID, title, content, author });
    res.redirect('/blogs');
});


app.get("/blogs", (req, res) => {
    // console.log(blogPosts); // Check what data is present
    res.render("blogs.ejs", { blogPosts: blogPosts });
});



// Route to display the edit form
app.get('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = blogPosts.find(post => post.id === id);
    res.render("edit.ejs", { post: post }); // Assuming you have an 'edit.ejs' view
});

// Route to update the post
app.post('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { title, content, author } = req.body;
    const postIndex = blogPosts.findIndex(post => post.id === id);

    if (postIndex === -1) {
        return res.status(404).send('Post not found');
    }

    blogPosts[postIndex] = { id, title, content, author };
    // console.log('Updated post:', blogPosts[postIndex]);
    res.redirect('/blogs');
});

// Route to delete the post
app.post('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    blogPosts = blogPosts.filter(post => post.id !== id);
    res.redirect('/blogs');
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });