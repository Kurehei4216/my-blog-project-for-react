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
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';


const PostDetail = () => {
  const { postId } = useParams()
  const [post, setPost] = useState({})
  const [tags, setTags] = useState([])
  const history = useNavigate();

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

  const handleRedirectToPostEdit = () => {
    history(`/admin/post/${postId}/edit`);
  }

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
                <IconButton
                  size="large"
                  style={{ marginLeft: 800 }}
                  onClick={() => { handleRedirectToPostEdit(post.id) }}
                >
                  <EditIcon fontSize="inherit"/>
                </IconButton>
                <IconButton
                  size="large"
                >
                  <DeleteIcon fontSize="inherit"/>
                </IconButton>
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
