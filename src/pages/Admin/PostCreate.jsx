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
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import RichEditor from "../../components/RichEditor";
import { useNavigate } from "react-router-dom";
import { PhotoCamera as PhotoCameraIcon } from "@mui/icons-material";

const PostCreate = () => {
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("0");
  const [isPublish, setIsPublish] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  // const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  // const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const history = useNavigate();

  const fetchCategories = async () => {
    try {
      await axios
        .get(`http://localhost:3000/api/v1/categories`)
        .then((data) => {
          const array = [{ id: "0", name: "カテゴリーを選んでね" }];
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
    setIsPublish(!isPublish);
  };

  const handleDisplayPreview = () => {
    setIsPreview(!isPreview);
  };

  const handleButtonClick = () => {
    document.getElementById("file-input").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // setFileName(file.name);
    // setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = "https://example.com";
        setFileUrl(url);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview("");
    }
  };

  // 保存ボタンがクリックされたときの処理
  const handleSave = () => {
    const text = JSON.stringify(
      draftToHtml(convertToRaw(editorState.getCurrentContent())),
    );
    const params = {
      post: {
        title: title,
        content: text,
        is_published: true,
        thumbnail_url: fileUrl,
      },
      tags: tags,
      category: selectedCategory,
    };
    axios
      .post(`http://localhost:3000/api/v1/posts`, params)
      .then((response) => {
        if (response.status == 200) {
          history("/admin/posts");
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

        <div style={{ marginLeft: "80px" }}>
          <Typography variant="h4" component="div" gutterBottom>
            ブログ記事投稿{" "}
            <Button
              variant="outlined"
              color="primary"
              onClick={handleSave}
              style={{ marginRight: "5px", padding: "7px" }}
            >
              保存
            </Button>
            <Button
              variant="outlined"
              color="success"
              onClick={handleDisplayPreview}
              style={{ marginRight: "5px", padding: "7px" }}
            >
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
              <Switch checked={isPublish} onClick={handleTurnPublish} />
              <span>公開する</span>
            </Grid>

            <Grid item xs={12}>
              <Grid item xs={2}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: 2,
                    maxWidth: 400,
                    margin: "auto",
                    mt: 1,
                    mb: 2,
                  }}
                >
                  <TextField
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <Button
                    variant="contained"
                    component="span"
                    onClick={handleButtonClick}
                    startIcon={<PhotoCameraIcon />}
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      "&:hover": {
                        bgcolor: "primary.dark",
                      },
                    }}
                  >
                    サムネイルを選択
                  </Button>
                  {preview && (
                    <>
                      <Box
                        sx={{
                          mt: 2,
                          borderRadius: 2,
                          boxShadow: 3,
                          overflow: "hidden",
                          width: "100%",
                          maxHeight: 300,
                          textAlign: "center",
                          position: "relative",
                        }}
                      >
                        <img
                          src={preview}
                          alt="Selected Image"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "300px",
                            display: "block",
                            margin: "auto",
                          }}
                        />
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={10}>
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

export default PostCreate;
