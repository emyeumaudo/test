const express = require('express'); // lấy module bên thứ 3
const postCRUD = require('./postCRUD');

const app = express();

// config express đọc được input người dùng dạng json
// ko có dòng này req.body = undefined
app.use(express.json());

// lấy tất cả bài posts
app.get('/get-all-posts', async (req, res) => {
  const allPosts = await postCRUD.getAllPosts();
  res.send({
    data: allPosts
  })
});

app.get('/posts', async (req, res) => {
  const allPosts = await postCRUD.getAllPosts();
  res.send({
    data: allPosts
  })
});


app.get('/get-detail-post', async (req, res) => {
  const foundPost = await postCRUD.getPost(1);
  res.send({
    data: foundPost
  })
});

app.get('/posts/:id', async (req, res) => {
  // path param
  const { id } = req.params;
  console.log(id);
  const foundPost = await postCRUD.getPost(String(id));
  res.send({
    data: foundPost
  })
});


app.get('/create-post', async (req, res) => {
  const dataPost = {
    imageUrl: 'example.jpg',
    title: 'example',
    description: 'example',
    createdBy: 'example@gmail.com'
  }
  const newPost = await postCRUD.createPost(dataPost);
  res.send({
    data: newPost
  })
});

app.post('/posts', async (req, res) => {
  // để req.body có dữ liệu => express cần hiểu là người dùng dạng dữ liệu gì
  // tương đương với việc là google dịch hiểu người dùng dạng tiếng việt hay tiếng anh
  const dataPost = req.body;

  const newPost = await postCRUD.createPost(dataPost);
  res.send({
    data: newPost
  })
});

app.get('/update-post', async (req, res) => {
  const dataUpdate = {
    imageUrl: 'example.jpg',
    title: 'example 2',
  }
  const updatePost = await 
    postCRUD
    .updatePost(
      '6d25bf80-3b22-11ec-ab45-c9665b6edad7', dataUpdate);
  res.send({
    data: updatePost
  })
});

app.put('/posts/:postId', async (req, res) => {
  // input
  const { postId } = req.params;
  const dataUpdate = req.body;
  // process
  const updatePost = await postCRUD.updatePost(postId, dataUpdate);
  // output
  res.send({
    data: updatePost
  })
});

app.delete('/posts/:deletePostId', async (req, res) => {
  const { deletePostId } = req.params;
  const deleteStatus = await postCRUD.deletePost(id);
  res.send({
    data: deleteStatus
  })
});

// /Comments

// Create a Comment
app.post("/posts/:postId/comment", async (req, res) => {
    //Find a POst
    const post = await Post.findOne({ _id: req.params.postId });
  
    //Create a Comment
    const comment = new Comment();
    comment.content = req.body.data;
    comment.post = post._id;
    await comment.save();
  
    // Associate Post with comment
    post.comments.push(comment._id);
    await post.save();
  
    res.send(comment);
  });
  
  //Read a Comment
  
app.get("/posts/:postId/comment", async (req, res) => {
    const post = await Post.findOne({ _id: req.params.postId }).populate(
      "comments"
    );
    res.send(post);
  });




// rest api chỉ là conversation đặt tên

app.listen(8080, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server started');
})