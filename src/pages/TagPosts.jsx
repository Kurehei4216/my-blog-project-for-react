import React, { useState, useEffect } from "react";
import { Grid, Typography, Card, CardContent } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import Category from "../components/Category";
import { useNavigate } from "react-router-dom";
import { AuthorProfile } from "./AuthorProfile";
import Tag from "../components/Tag";
import AccessTimeFilledTwoToneIcon from "@mui/icons-material/AccessTimeFilledTwoTone";

export const TagPosts = () => {
  const [posts, setPosts] = useState([]);
  const [tag, setTag] = useState({});
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const { name } = useParams();
  const history = useNavigate();

  const containerStyle = {
    display: "flex",
    alignItems: "stretch",
  };

  const toPostDetail = (postId) => history(`/post/${postId}`);

  const convertTimeStampToDate = (timeStamp) => {
    const dateObject = new Date(timeStamp);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1);
    const day = String(dateObject.getDate());

    return `${year}年${month}月${day}日`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTags = await fetchTags();
        const tag = fetchedTags.find((tag) => tag.name == name);
        fetchTagPost(tag);
      } catch (e) {
        console.log(e);
      }
    };
    Promise.all([fetchData(), fetchCategories()]);
  }, [name]);

  const fetchTagPost = async (tag) => {
    try {
      await axios
        .get(`http://localhost:3000/api/v1/tags/${tag.id}/posts`)
        .then((data) => {
          setTag(data.data);

          const result = data.data.posts.reduce((acc, post, i, arr) => {
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
          setPosts(result);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCategories = async () => {
    try {
      return await axios
        .get(`http://localhost:3000/api/v1/categories`)
        .then((data) => {
          setCategories(data.data);
          return data.data;
        });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTags = async () => {
    try {
      return await axios
        .get(`http://localhost:3000/api/v1/tags`)
        .then((data) => {
          setTags(data.data);
          return data.data;
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item={10}>{/* <BreadcrumbNavigation /> */}</Grid>
        <Grid item container xs={12} spacing={3} style={containerStyle}>
          <Grid item xs={8}>
            <Card>
              <CardContent>
                {" "}
                <h5 style={{ textAlign: "center" }}>タグ</h5>
                <h2 style={{ textAlign: "center" }}>{`${tag.name}`}</h2>
              </CardContent>
            </Card>
            <Grid container spacing={3} style={{ marginTop: "16px" }}>
              {posts.map((postElements) => (
                <>
                  {postElements.map((post) => (
                    // eslint-disable-next-line react/jsx-key
                    <Grid item xs={6} style={{ cursor: "pointer" }}>
                      <Card
                        key={post.id}
                        onClick={() => {
                          toPostDetail(post.id);
                        }}
                      >
                        <CardContent style={{ padding: "0" }}>
                          <img
                            src="/umineko.png"
                            alt="Dummy Icon"
                            width={30}
                            height={20}
                            style={{
                              width: "100%",
                              height: "220px",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                          <p
                            style={{
                              display: "flex",
                              color: "#CACCCE",
                              paddingLeft: "15px",
                            }}
                          >
                            <AccessTimeFilledTwoToneIcon
                              style={{ fontSize: "1.4rem" }}
                            />
                            {convertTimeStampToDate(post.created_at)}
                          </p>
                          <Typography
                            variant="h5"
                            gutterBottom
                            style={{ paddingLeft: "15px", textAlign: "left" }}
                          >
                            {post.title}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <AuthorProfile />
            <Tag tags={tags} />
            <Category categories={categories} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
