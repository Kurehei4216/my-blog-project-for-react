import { Grid, Breadcrumbs, Link, Card, CardContent } from "@mui/material";
import Category from "./../components/Category";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const PostDetail = () => {
  const [post, setPost] = useState({});
  const [categories, setCategories] = useState([]);
  const { postId } = useParams();

  const containerStyle = {
    display: "flex",
    alignItems: "stretch",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        Promise.all([fetchPost(), fetchCategories()]);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const fetchPost = async () => {
    try {
      await axios
        .get(`http://localhost:3000/api/v1/posts/${postId}`)
        .then((data) => {
          setPost(data.data.post);
        });
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

  return (
    <>
      <Grid container spacing={3}>
        <Grid item={12}>
          <Breadcrumbs>
            <Link color="inherit" href="/">
              Home
            </Link>
          </Breadcrumbs>
        </Grid>
        <Grid item container xs={12} spacing={3} style={containerStyle}>
          <Grid item xs={1}></Grid>
          <Grid item xs={7}>
            <Card>
              <CardContent>
                <h1>aqaaaaaaaaaaaaa</h1>
                <p>{post.content}</p>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardContent>
                {/* 著者の情報を追加 */}
                <h3>プロフィール</h3>
                <img alt />
                <a href="#">
                  <strong>クレヘイ</strong>
                </a>
                <p>
                  ペルソナ
                  <br />
                  20代男性
                  <br />
                  エンジニア
                  <br />
                </p>
                <br />
                <p>現在スタートアップでエンジニアとして働いています</p>
                <p>
                  【筆者の経歴】新卒でSESのエンジニアとして入社→アフィリエイト系のシステム会社→外食産業系のSassを提供している会社に転職
                </p>
                <p>
                  詳しいプロフィールは<a href="#">こちら</a>
                </p>
              </CardContent>
            </Card>
            <Category categories={categories} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};