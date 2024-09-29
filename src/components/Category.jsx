import { Box, List, ListItem, ListItemText, Card } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CategoryIcon from "@mui/icons-material/Category";

const Category = (props) => {
  const { categories } = props;
  const categoryStyle = {
    marginTop: "30px",
  };

  return (
    <>
      <Box style={categoryStyle}>
        <div style={{ display: "flex" }}>
          <CategoryIcon />
          <span>カテゴリー</span>
        </div>
        <Card style={{ marginTop: "8px" }}>
          <List>
            {categories.map((category) => (
              <ListItem
                key={category.id}
                component={RouterLink}
                to={`/category/${`${category.name}`}`}
              >
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
          </List>
        </Card>
      </Box>
    </>
  );
};

export default Category;
