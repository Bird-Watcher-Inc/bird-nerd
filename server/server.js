const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const path = require('path');
var cors = require('cors');
const { User, Comment, Post } = require('./modelDB');

// const userController = require('./controllers/userController');
const postController = require('./postController');
const sessionController = require('./controllers/sessionController');



const app = express();
const PORT = 3000;


const authRouter = require('./routes/auth');

app.set('trust proxy', 1); 
app.use(cookieParser()); 

app.use(express.json());
app.use(express.urlencoded());

app.use(cors({ 
origin: ['http://localhost:3000', 'http://localhost:8080' ], 
allowedHeaders: ['Content-Type', 'Authorization'], 
credentials: true, 
methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
exposedHeaders: ["set-cookie"]}));

//{credentials: true, origin: 'http://localhost:8080'}


// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
// serve index.html on the route '/'

app.use('/auth', authRouter);
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

// post req to create username and password; SIGN UP
// get req to find username and password in db and match it; SIGN IN
// get req to find username and send it to client;

// display all posts;
app.get('/display_all_posts', postController.displayAllPosts, (req, res) => {
  res.status(200).json(res.locals.data);
});

// display posts by user
app.get('/postsByUser', postController.displayPostsByUser, (req, res) => {
  res.status(200).json(res.locals.posts);
});

// post request to /post to create a new post;
app.post('/newpost', postController.createNewPost, (req, res) => {
  return res.status(201).json(res.locals);
});

// edit the post;
app.patch('/edit_post', postController.editPost, (req, res) => {
  return res.status(201).json(res.locals.data);
});

// delete post;
app.delete('/delete_post', postController.deletePost, (req, res) => {
  return res.status(201).json(res.locals.data);
});

// add a comment to an existing post
app.post('/comment', postController.addComment, (req, res) => {
  return res.status(201).json(res.locals.comment);
});

// global error handler;
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
