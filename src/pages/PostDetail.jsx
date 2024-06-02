import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const PostDetail = () => {
  const [post, setPost] = useState({});
  const { postId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchPost();
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

  return (
    <>
      <div>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
      ;
    </>
  );
};
