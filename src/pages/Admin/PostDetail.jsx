import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios'
import {
  Chip,
  Grid,
  Typography,
  CssBaseline,
  Card,
  CardContent
} from "@mui/material";
import parse from 'html-react-parser';

const PostDetail = () => {
  const { postId } = useParams()
  const [post, setPost] = useState({})
  const [tags, setTags] = useState([])

  const fetchPost = async () => {
    try {
      await axios
        .get(`http://localhost:3000/api/v1/posts/${postId}`)
        .then((data) => {
          const post = data.data.post
          const content = parse(post.content)
          post.content = content
          setPost(data.data.post);
          setTags(data.data.tags);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchPost();
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <>
    <Grid container direction="column">
      <CssBaseline />
      <div>
        <Grid container spacing={2}>
          {/* 本文入力画面 */}
          <Grid item xs={9} spacing={3}>

            <Card style={{ marginBottom: 8 }}>
              <CardContent>
                <Typography variant="h4" component="div" gutterBottom align="center">
                  {post.title}{" "}
                </Typography>

                {tags.map((tag, index) => (
                  <Chip
                    key={tag.id}
                    label={tag.name}
                    style={{ margin: "4px" }}
                  />
                ))}
                <h3>本文</h3>
                <p>{post.content}</p>

              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={2} spacing={3}></Grid>
      </div>
    </Grid>
  </>)
}

export default PostDetail
