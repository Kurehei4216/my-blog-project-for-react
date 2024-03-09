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
import { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import editorStyle from './editorStyles.module.css'
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';

const PostCreate = () => {
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('0');
  const [isPublish, setIsPublish] = useState(false);
  const [isPreview, setIsPreview] =  useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const text =
  'In this editor a toolbar shows up once you select part of the text …';

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
    const text = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    // ここに投稿を保存する処理を追加
    const params = {
      post: {
        title: title,
        content: text,
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
              <div className={editorStyle.editor}>
                <Editor
                  onEditorStateChange={setEditorState}
                  editorState={editorState}
                  toolbar={{
                    options: ["inline", "blockType", "list", "textAlign", "link"],
                    inline: {
                      options: ["bold", "strikethrough"],
                    },
                    blockType: {
                      inDropdown: false,
                      options: ["H2"],
                    },
                    list: {
                      options: ["unordered"],
                    },
                    textAlign: {
                      options: ["center"],
                    },
                    link: {
                      options: ["link"],
                    },
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </div>
      </Grid>
    </>
  );
};

export default PostCreate;
