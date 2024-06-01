import { Grid, CardContent, Typography, Card, Pagination } from "@mui/material";
import { useState } from "react";

const SearchPostResult = (props) => {
  const [searchedPosts, setSearchedPosts] = useState([]);
  const { posts, keyword } = props;

  return (
    <Grid item xs={8}>
      <h3>{`「${keyword}の検索結果」`}</h3>
      <Grid container spacing={3}>
        {posts.map((postElements) => (
          <>
            {postElements.map((post) => (
              <Grid item xs={6}>
                <Card>
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
        <Pagination count={10} variant="outlined" color="primary" />
      </Grid>
    </Grid>
  );
};

export default SearchPostResult;
