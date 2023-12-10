import { Box, CardContent, Card, Chip } from "@mui/material";
const Tag = (props) => {
  const { tags } = props;
  const tagStyle = {
    marginTop: "30px",
  };

  return (
    <>
      <Box style={tagStyle}>
        <div>タグ</div>
        <Card style={{ marginTop: "8px" }}>
          <CardContent>
            {tags.map((tag) => (
              <Chip key={tag.id} label={tag.name} color="primary" />
            ))}
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Tag;
