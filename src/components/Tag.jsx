import { Box, CardContent, Card, Chip } from "@mui/material";
import StyleTwoToneIcon from "@mui/icons-material/StyleTwoTone";
import { useNavigate } from "react-router-dom";

const Tag = (props) => {
  const { tags } = props;
  const history = useNavigate();
  const tagStyle = {
    marginTop: "30px",
  };

  const toTagsPost = (tagName) => {
    history(`/tag/${tagName}`);
  };

  return (
    <>
      <Box style={tagStyle}>
        <div style={{ display: "flex" }}>
          <StyleTwoToneIcon />
          <span>タグ</span>
        </div>
        <Card style={{ marginTop: "8px" }}>
          <CardContent>
            {tags.map((tag) => {
              const postCount = tag.post_id?.length ?? 0;
              const tagName =
                postCount > 0 ? `${tag.name}(${postCount})` : tag.name;
              return (
                <Chip
                  key={tag.id}
                  label={tagName}
                  color="primary"
                  style={{ cursor: "pointer" }}
                  onClick={()=> toTagsPost(tag.name)}
                />
              );
            })}
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Tag;
