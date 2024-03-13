const path = require('path');
const { User, Comment, Post } = require('./modelDB');

const postController = {};

// create a new post and return it back to the client;
postController.createNewPost = (req, res, next) => {
  const name = 'TEXT'
  console.log("poster name", name,)
  const {
    postContent,
    birdName,
    location,
    weatherConditions,
    date,
    time,
  } = req.body;
  console.log('body', req.body);
  const dateStamp = new Date().toLocaleString();
  Post.create({
    username: 'text',
    postContent,
    birdName,
    dateStamp,
    location,
    weatherConditions,
    date,
    time,
  })
    .then((data) => {
      const {
        username,
        postContent,
        birdName,
        dateStamp,
        location,
        weatherConditions,
        date,
        time,
      } = data;
      res.locals = {
        username: username,
        postContent: postContent,
        birdName: birdName,
        dateStamp: dateStamp,
        location: location,
        weatherConditions: weatherConditions,
        date: date,
        time: time,
      };
      return next();
    })
    .catch((err) => {
      console.log(err.message);
      const error = {
        status: 400,
        message: 'Post not created',
        log: 'Error creating a post in DB',
      };
      return next(error);
    });
};

// edit existing post;
postController.editPost = (req, res, next) => {
  const { _id, newPostContent } = req.body;

  // if request from client missing post text error handling;
  if (newPostContent === undefined) {
    const error = {
      status: 406,
      log: 'Missing input from client',
      message: 'Missing post context',
    };
    return next(error);
  }

  Post.findOneAndUpdate(
    { _id: _id },
    { postContent: newPostContent },
    { new: true }
  )
    .then((data) => {
      res.locals.data = data;
      return next();
    })
    .catch((err) => {
      console.log(err.message);
      const error = {
        status: 406,
        message: 'Post not updates',
        log: 'Error updating a post in DB',
      };
      return next(error);
    });
};

// delete a post;
postController.deletePost = (req, res, next) => {
  const { _id } = req.body;
  console.log(1);
  Post.findOneAndDelete({ _id })
    .then((data) => {
      console.log('post deleted: ' + data);
      return next();
    })
    .catch((err) => {
      console.log(err.message);
      console.log(2);
      const error = {
        status: 406,
        log: 'Content not found/ not deleted',
        message: 'Post was not deleted',
      };
      return next(error);
    });
};

// add a comment to a post;
postController.addComment = (req, res, next) => {
  const { post_id, username_id, comment } = req.body;

  if (
    post_id === undefined ||
    username_id === undefined ||
    comment === undefined
  ) {
    const error = {
      status: 406,
      log: 'Missing input from client',
      message: 'Missing post context',
    };
    return next(error);
  }
  let comment_id;
  Comment.create({ username_id, comment })
    .then((data) => {
      comment_id = data._id;
      res.locals.comment = data.comment;
      console.log(res.locals);
    })
    .catch((err) => {
      console.log(err);
      const error = {
        status: 406,
        log: 'Missing input from client',
        message: 'Missing comment context',
      };
      return next(error);
    });

  Post.findOne({ _id: post_id })
    .populate('comments')
    .then((data) => {
      console.log(data);
      return next();
    })
    .catch((err) => {
      console.log(err);
      const error = {
        status: 406,
        log: 'Unknown error occured on updating the post comments',
        message: 'Unknown error occurred',
      };
      return next(error);
    });
};

// get all posts and return them back to the client;
postController.displayAllPosts = (req, res, next) => {
  Post.find({}, null, { limit: 30 })
    .sort({ createdAt: 1 })
    .then((data) => {
      res.locals.data = data;
      return next();
    })
    .catch((err) => {
      console.log(err.message);
      const error = {
        status: 400,
        message: 'Cannot get posts',
        log: 'Error fetching posts from DB',
      };
      return next(error);
    });
};

module.exports = postController;
