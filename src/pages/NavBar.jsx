import { Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";

const NavBar = () => {
  const [value, setValue] = useState(0);
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="バックエンド" />
        <Tab label="コミュニケーション" />
        <Tab label="フロントエンド" />
      </Tabs>
    </Box>
  );
};

export default NavBar;
