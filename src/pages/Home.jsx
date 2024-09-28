import {
  Grid,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useEffect, useState } from "react";
import Tag from "./../components/Tag";
import Category from "./../components/Category";
import BreadcrumbNavigation from "./../components/BreadcrumbNavigation";
import { useBreadcrumbs } from "../context/BreadcrumbContext";
import SearchPostResult from "./SearchPostResult";

const Home = () => {
  const [posts, setPost] = useState([]);
  const [selectedArchive, setSelectedArchive] = useState("2023-12");
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [searchedPosts, setSearchedPosts] = useState([]);
  const { addBreadcrumb } = useBreadcrumbs();

  const tagStyle = {
    marginTop: "30px",
  };

  const archives = [
    { id: "2023-12", name: "2023年12月" },
    { id: "2024-01", name: "2024年1月" },
    // 他のアーカイブ
  ];

  const handleArchiveChange = (event) => {
    setSelectedArchive(event.target.value);
    // 選択されたアーカイブに対する処理を追加する
  };

  const fetchPosts = async () => {
    try {
      await axios.get(`http://localhost:3000/api/v1/posts`).then((data) => {
        setPost(data.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTags = async () => {
    try {
      await axios
        .get(`http://localhost:3000/api/v1/tags`)
        .then((data) => setTags(data.data));
    } catch (e) {
      console.log(e);
    }
  };

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

  const searchPosts = async () => {
    try {
      await axios
        .get(`http://localhost:3000/api/v1/posts/search`, {
          params: {
            keyword: searchKeyWord,
          },
        })
        .then((data) => {
          const resultPosts = data.data;
          const result = resultPosts.reduce((acc, post, i, arr) => {
            // 添え字が割り切れる場合 → 偶数の場合
            if (i % 2 === 0) {
              const pair = [post];

              if (arr[i + 1]) {
                pair.push(arr[i + 1]);
              }

              acc.push(pair);
            }
            return acc;
          }, []);
          setSearchedPosts(result);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        Promise.all([fetchPosts(), fetchTags(), fetchCategories()]);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item={12}>
          <BreadcrumbNavigation />
        </Grid>

        {/* <Grid item xs={8}>
          <Typography variant="h5" gutterBottom>
            おすすめ記事
          </Typography>
        </Grid>
        {posts.map((article, index) => (
          <Grid item xs={4}>
            <Card key={article.id}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {article.name}
                </Typography>
                <Typography>{article.content}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))} */}

        <Grid item container xs={12} spacing={3}>
          {/* 特定の記事 */}
          {searchedPosts.length > 0 ? (
            <SearchPostResult
              {...{ posts: searchedPosts, keyword: searchKeyWord }}
            />
          ) : (
            <Grid item container xs={8} spacing={3}></Grid>
          )}

          <Grid item xs={4}>
            <Card style={{ marginBottom: 8 }}>
              <CardContent>
                <Box display="flex" alignItems="stretch">
                  <TextField
                    label="検索"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": { height: 50 },
                      width: "70%",
                    }}
                    value={searchKeyWord}
                    onChange={(event) => {
                      setSearchKeyWord(event.target.value);
                    }}
                    fullWidth
                  />
                  <Box sx={{ width: "10%" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SearchIcon />}
                      style={{ height: 50 }}
                      sx={{
                        "& .MuiButtonBase-root": {
                          minWidth: "20px",
                        },
                      }}
                      onClick={searchPosts}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Card style={tagStyle}>
              <CardContent>
                {/* 著者の情報を追加 */}
                <h3 style={{ textAlign: 'center' }}>プロフィール</h3>
                <img alt />
                <a href="#">
                  <strong>クレヘイ</strong>
                </a>
                <br />
                <p>
                  【筆者の経歴】新卒でSESのエンジニアとして入社→アフィリエイト系のシステム会社→外食産業系のSassを提供している会社に転職
                </p>
                <p>
                  詳しいプロフィールは<a href="#">こちら</a>
                </p>
              </CardContent>
            </Card>

            <Tag tags={tags} />
            <Category categories={categories} />

            {/* アーカイブ */}
            <Box style={tagStyle}>
              <div>アーカイブ</div>
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
                  value={selectedArchive}
                  onChange={handleArchiveChange}
                >
                  {archives.map((archive) => (
                    <MenuItem key={archive.id} value={archive.id}>
                      {archive.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default Home;
