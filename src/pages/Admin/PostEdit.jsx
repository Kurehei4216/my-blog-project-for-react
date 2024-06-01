import {
  TextField,
  Chip,
  Button,
  Grid,
  Typography,
  CssBaseline,
  Select,
  MenuItem,
  FormControl,
  Switch
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState } from "draft-js";
import RichEditor from '../../components/RichEditor'

const PostEdit = () => {
  const { postId } = useParams()
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('0');
  const [post, setPost] = useState({})
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const fetchCategories = async () => {
    try {
      await axios
        .get(`http://localhost:3000/api/v1/categories`)
        .then((data) => {
          const array = [{ id: '0', name: 'カテゴリーを選んでね' }]
          setCategories(data.data.concat(array));
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddTag = (tagName) => {
    const tag = {
      id: 1,
      name: tagName,
      created_at: "2023-12-08T18:34:57.643Z",
      updated_at: "2023-12-08T18:34:57.643Z",
      is_deleted: false
    }
    setTags([...tags, tag]);
  };

  const handleDeleteTag = (name) => {
    setTags(tags.filter((tag) => tag.name != name));
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleTurnPublish = (event) => {
    setPost({...post, is_publish: !post.is_publish })
  }

  // 保存ボタンがクリックされたときの処理
  const handleSave = () => {
    const params = {
      post: {
        id: post.id,
        title: post.title,
        content: post.content,
        is_publish: post.is_publish,
      },
      tags: tags,
      category: selectedCategory,
    };
    axios
      .put(`http://localhost:3000/api/v1/posts/${postId}`, params)
      .then((response) => {
        if (response.status == 200) {
          console.log("記事の投稿成功");
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const convertToHtml = (content) => {
    const blockArray = htmlToDraft(JSON.parse(content));
    const contentState = ContentState.createFromBlockArray(blockArray.contentBlocks, blockArray.entityMap);
    return EditorState.createWithContent(contentState);
  }

  const fetchPost = async () => {
    try {
      await axios
        .get(`http://localhost:3000/api/v1/posts/${postId}`)
        .then((data) => {
          const content = data.data.post.content;
          setEditorState(convertToHtml(content));
          Promise.all([setPost(data.data.post), setTags(data.data.tags)]);
        });
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchCategories();
        fetchPost()
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
        <div style={{ marginLeft: '80px' }}>

          <Typography variant="h5" component="div" gutterBottom>
            ブログ記事編集{" "}
            <Button variant="outlined" color="primary" onClick={handleSave} style={{ marginLeft: '20px', padding: '7px'}}>
              保存
            </Button>
          </Typography>

          <Grid container spacing={2}>
            {/* タイトル入力画面 */}
            <Grid item xs={10}>
              <label>タイトル</label>
              <TextField
                label=""
                fullWidth
                variant="outlined"
                value={post.title}
                onChange={(e) => setPost({...post, title: e.target.value})}
              />
            </Grid>
            <Grid item xs={2}></Grid>
            {/* タグ入力画面 */}
            <Grid item xs={10}>
              <TextField
                label="タグ"
                fullWidth
                variant="outlined"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim() !== "") {
                    handleAddTag(e.target.value.trim());
                    e.target.value = "";
                  }
                }}
              />
              {tags.map(val => val.name).map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => handleDeleteTag(tag)}
                  style={{ margin: "4px" }}
                />
              ))}
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
              <FormControl
                style={{
                  minWidth: "100%",
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                <Select
                  labelId="archive-select-label"
                  id="archive-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Switch
                checked={post.is_publish}
                onClick={handleTurnPublish}
              />
              <span>公開する</span>
            </Grid>

            <Grid item xs={10}>
              <label>本文</label>
              <RichEditor
                editorState={editorState}
                setEditorState={setEditorState}
              />
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </div>
      </Grid>
    </>
  );
};

export default PostEdit;
