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
  Switch,
  Box
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import 'draft-js/dist/Draft.css';
import createEmojiPlugin from '@draft-js-plugins/emoji';

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

const PostCreate = () => {
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('0');
  const [isPublish, setIsPublish] = useState(false);
  const [isPreview, setIsPreview] =  useState(false);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

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

  const handleAddTag = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleTurnPublish = () => {
    setIsPublish(!isPublish)
  }

  const handleDisplayPreview = () => {
    setIsPreview(!isPreview)
  }

  // 保存ボタンがクリックされたときの処理
  const handleSave = () => {
    // ここに投稿を保存する処理を追加
    const params = {
      post: {
        title: title,
        content: content,
        is_published: true,
      },
      tags: tags,
      category: selectedCategory,
    };
    axios
      .post(`http://localhost:3000/api/v1/posts`, params)
      .then((response) => {
        if (response.status == 200) {
          console.log("Title:", title);

          console.log("記事の投稿成功");
        }
      });
  };

  const handleDraftSave = () => {
    // ここに投稿を保存する処理を追加
    const params = {
      post: {
        title: title,
        content: content,
        is_published: false,
      },
      tags: tags,
      category: selectedCategory,
    };
    axios
      .post(`http://localhost:3000/api/v1/posts`, params)
      .then((response) => {
        if (response.status == 200) {
          console.log("Title:", title);

          console.log("記事の投稿成功");
        }
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchCategories();
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Grid container direction="column" sx={{ backgroundColor: "#f0f0f0" }}>
        <CssBaseline />

        <div style={{ marginLeft: '80px' }}>
          <Typography variant="h4" component="div" gutterBottom>
            ブログ記事投稿{" "}
            <Button variant="outlined" color="primary" onClick={handleSave} style={{ marginRight: '5px', padding: '7px'}}>
              保存
            </Button>
            <Button variant="outlined" color="success" onClick={handleDisplayPreview} style={{ marginRight: '5px', padding: '7px'}}>
              プレビュー
            </Button>
          </Typography>

          <Grid container spacing={2}>
            {/* タイトル入力画面 */}
            <Grid item xs={10}>
              <TextField
                label="タイトル"
                fullWidth
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
              {tags.map((tag, index) => (
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
                checked={isPublish}
                onClick={handleTurnPublish}
              />
              <span>公開する</span>
            </Grid>

            {/* 本文入力画面 */}
            <Grid item xs={10}>
              {/* <TextField
                label="本文"
                multiline
                rows={15}
                fullWidth
                variant="outlined"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              /> */}
              <Box border={1} p={2} mt={2}>
                <div className="text-editor-container">
                  <EmojiSuggestions />
                  <EmojiSelect />
                  <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    placeholder="ここから入力を行ってください。"
                    plugins={[emojiPlugin]}
                  />
                </div>
              </Box>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </div>
      </Grid>
    </>
  );
};

export default PostCreate;
