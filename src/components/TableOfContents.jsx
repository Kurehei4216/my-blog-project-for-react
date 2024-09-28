import { Box, List, ListItem, ListItemText, Badge, Card } from "@mui/material";
import { useEffect } from "react";
import tocbot from "tocbot";

export const TableOfContents = (isPostLoaded) => {
  const categoryStyle = {
    marginTop: "30px",
  };

  useEffect(() => {
    if (isPostLoaded) {
      tocbot.init({
        tocSelector: ".js-toc",
        contentSelector: ".js-toc-content",
        headingSelector: "h1, h2, h3, h4",
        listItemClass: "toc-list-item",
        orderedList: false,
      });
    }

    return () => tocbot.destroy();
  }, [isPostLoaded]);
  return (
    <>
      <Box style={categoryStyle}>
        <div>目次</div>
        <Card style={{ marginTop: "8px" }}>
          <nav className="js-toc" />
        </Card>
      </Box>
    </>
  );
};
