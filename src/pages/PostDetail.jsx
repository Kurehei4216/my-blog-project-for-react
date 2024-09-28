import { Grid, Breadcrumbs, Link, Card, CardContent } from "@mui/material";
import Category from "./../components/Category";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBreadcrumbs } from "../context/BreadcrumbContext";
import BreadcrumbNavigation from "..//components/BreadcrumbNavigation";
import { TableOfContents } from "../components/TableOfContents";
import { AuthorProfile } from "./AuthorProfile";
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
            <AuthorProfile />
            <TableOfContents isPostLoaded={isPostLoaded} />
            <Category categories={categories} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
