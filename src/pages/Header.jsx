import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Typography, Tabs, Tab } from "@mui/material";

const Header = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              クレヘイブログ
            </Typography>
          </Toolbar>
          <Box></Box>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
