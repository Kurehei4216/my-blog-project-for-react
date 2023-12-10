import {
  Container,
  TextField,
  Chip,
  Button,
  Grid,
  Typography,
  CssBaseline,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import Header from "./Header";
import { useState, useEffect } from "react";
import axios from "axios";

const PostCreate = () => {
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchCategories = async () => {
    try {
      await axios
        .get(`http://localhost:3000/api/v1/categories`)
        .then((data) => {
          setCategories(data.data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  // タグを追加するハンドラ
  const handleAddTag = (tag) => {
    setTags([...tags, tag]);
  };

  // タグを削除するハンドラ
  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleCategoryChange = (event) => {
    console.log(event.target.value);
    setSelectedCategory(event.target.value);
  };

  // 保存ボタンがクリックされたときの処理
  const handleSave = () => {
    // ここに投稿を保存する処理を追加
    const params = {
      post: {
        title: title,
        content: content,
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
        <Header />

        <div>
          <Typography variant="h4" component="div" gutterBottom>
            ブログ記事投稿{" "}
            <Button variant="contained" color="primary" onClick={handleSave}>
              保存
            </Button>
          </Typography>

          <Grid container spacing={2}>
            {/* タイトル入力画面 */}
            <Grid item xs={12}>
              <TextField
                label="タイトル"
                fullWidth
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>

            {/* タグ入力画面 */}
            <Grid item xs={12}>
              <p>タグ</p>
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
            <Grid item xs={4}>
              <p>カテゴリー</p>
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

            {/* 本文入力画面 */}
            <Grid item xs={12}>
              <TextField
                label="本文"
                multiline
                rows={6}
                fullWidth
                variant="outlined"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </>
  );
};

export default PostCreate;
