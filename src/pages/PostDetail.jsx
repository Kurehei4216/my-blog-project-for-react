import { Grid, Breadcrumbs, Link, Card, CardContent } from "@mui/material";
import Category from "./../components/Category";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBreadcrumbs } from "../context/BreadcrumbContext";
import BreadcrumbNavigation from "..//components/BreadcrumbNavigation";
import { TableOfContents } from "../components/TableOfContents";
import { isInvalidFormatCapital } from "./../util/removeCapital";
import AccessTimeFilledTwoToneIcon from "@mui/icons-material/AccessTimeFilledTwoTone";
import CachedTwoToneIcon from "@mui/icons-material/CachedTwoTone";
import axios from "axios";
import parse from "html-react-parser";

export const PostDetail = () => {
  const [post, setPost] = useState({});
  const [categories, setCategories] = useState([]);
  const [isPostLoaded, setIsPostLoaded] = useState(false);
  const { postId } = useParams();
  const { addBreadcrumb } = useBreadcrumbs();

  const containerStyle = {
    display: "flex",
    alignItems: "stretch",
  };

  const cardStyle = {
    marginTop: "15px",
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

  useEffect(() => {
    if (post?.title) {
      addBreadcrumb({ label: `${post.title}`, url: `post/${postId}` });
    }
  }, [post, postId]);

  const fetchPost = async () => {
    try {
      await axios
        .get(`http://localhost:3000/api/v1/posts/${postId}`)
        .then((data) => {
          const post = data.data.post;
          const content = parse(data.data.post.content);
          post.updated_at = convertTimeStampToDate(data.data.post.updated_at);
          post.created_at = convertTimeStampToDate(data.data.post.created_at);
          post.content = content
            .map((item) => convertFormatString(item))
            .filter((v) => !isInvalidFormatCapital(v));
          setPost(data.data.post);
          setIsPostLoaded(true);

          console.log("fetchPost");
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

  const convertFormatString = (data) => {
    if (typeof data !== "string") {
      console.log("data", data);
      return data;
    }
    if (data === '"') {
      return data.replace(/"/g, "");
    }
    const formattedData = data.replace(/\\n/g, "");
    return formattedData;
  };

  const convertTimeStampToDate = (timeStamp) => {
    const dateObject = new Date(timeStamp);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1);
    const day = String(dateObject.getDate());

    return `${year}年${month}月${day}日`;
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item container xs={12} spacing={3} style={containerStyle}>
          <Grid item xs={1}></Grid>
          <Grid item xs={7}>
            <Card style={cardStyle}>
              <CardContent>
                <BreadcrumbNavigation />
                <h1>{post.title}</h1>
                <p style={{ display: "flex", color: "#CACCCE" }}>
                  <AccessTimeFilledTwoToneIcon style={{ fontSize: "1.4rem" }} />
                  {post.updated_at}
                  <CachedTwoToneIcon style={{ fontSize: "1.4rem" }} />
                  {post.created_at}
                </p>
                <p className="js-toc-content">{post.content}</p>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card style={cardStyle}>
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h3>プロフィール</h3>
                <a style={{ marginBottom: "8px" }} href="#">
                  <strong>クレヘイ</strong>
                </a>
                <img
                  src="/umineko.png"
                  alt="Dummy Icon"
                  width={100}
                  height={100}
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <p>
                  【筆者の経歴】新卒でSESのエンジニアとして入社→アフィリエイト系のシステム会社→外食産業系のSassを提供している会社に転職
                  <br></br>
                  詳しいプロフィールは<a href="#">こちら</a>
                </p>
              </CardContent>
            </Card>
            <TableOfContents isPostLoaded={isPostLoaded} />
            <Category categories={categories} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
