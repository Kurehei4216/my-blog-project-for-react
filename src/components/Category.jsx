import { Box, List, ListItem, ListItemText, Badge, Card } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Category = (props) => {
  const { categories } = props;
  const categoryStyle = {
    marginTop: "30px",
  };

  return (
    <>
      <Box style={categoryStyle}>
        <div>カテゴリー</div>
        <Card style={{ marginTop: "8px" }}>
          <List>
            {categories.map((category, index) => (
              <ListItem key={category.id} component={RouterLink} to={"#"}>
                <ListItemText primary={category.name} />
                <Badge badgeContent={10} color="primary" />
              </ListItem>
            ))}
          </List>
        </Card>
      </Box>
    </>
  );
};

export default Category;
