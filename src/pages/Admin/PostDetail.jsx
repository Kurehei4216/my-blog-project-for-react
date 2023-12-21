import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios'
import {
  Chip,
  Grid,
  Typography,
  CssBaseline,
  FormControl,
  Card,
  CardContent
} from "@mui/material";

const PostDetail = () => {
  const { postId } = useParams()
  const [post, setPost] = useState({})
  const [tags, setTags] = useState([])

  const fetchPost = async () => {
    try {
      await axios
        .get(`http://localhost:3000/api/v1/posts/${postId}`)
        .then((data) => {
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
          <Typography variant="h4" component="div" gutterBottom align="center">
            {post.title}{" "}
          </Typography>

          <Grid item xs={12}>
              {tags.map((tag, index) => (
                <Chip
                  key={tag.id}
                  label={tag.name}
                  style={{ margin: "4px" }}
                />
              ))}
            </Grid>

          <Grid container spacing={2}>

            <Grid item xs={4}>
              <FormControl
                style={{
                  minWidth: "100%",
                  backgroundColor: "white",
                  color: "black",
                }}
              >
              </FormControl>
            </Grid>

            {/* 本文入力画面 */}
            <Grid item xs={12}>
            <Card style={{ marginBottom: 8 }}>
              <CardContent>
                <p>{post.content}</p>

              </CardContent>
            </Card>
            </Grid>
          </Grid>
        </div>
      </Grid>
      </>
  )
}

export default PostDetail
