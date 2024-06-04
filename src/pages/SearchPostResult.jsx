import { Grid, CardContent, Typography, Card, Pagination } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchPostResult = (props) => {
  const history = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const perPageCount = 10;
  const { posts, keyword } = props;

  const toPostDetail = (postId) => {
    history(`/post/${postId}`);
  };

  const currentPagePosts = () => {
    const indexOfLastPost = currentPage * perPageCount;
    const indexOfFirstPost = indexOfLastPost - perPageCount;
    const currentPosts = posts.flat().slice(indexOfFirstPost, indexOfLastPost);
    return currentPosts.reduce((acc, post, i, arr) => {
      // 添え字が割り切れる場合 → 偶数の場合
      if (i % 2 === 0) {
        const pair = [post];
        if (arr[i + 1]) pair.push(arr[i + 1]);
        acc.push(pair);
      }
      return acc;
    }, []);
  };

  const currentPosts = currentPagePosts();

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Grid item xs={8}>
      <Card>
        <CardContent>
          {" "}
          <h3 style={{ textAlign: "center" }}>{`「${keyword}の検索結果」`}</h3>
        </CardContent>
      </Card>

      <Grid container spacing={3} style={{ marginTop: "16px" }}>
        {currentPosts.map((postElements) => (
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
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {post.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </>
        ))}
      </Grid>
      <Grid
        container
        style={{
          marginTop: "32px",
          alignContent: "center",
          textAlign: "center",
        }}
      >
        <Pagination
          count={Math.ceil(posts.length / perPageCount)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </Grid>
    </Grid>
  );
};

export default SearchPostResult;
