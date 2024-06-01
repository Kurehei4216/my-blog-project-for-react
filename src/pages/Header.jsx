import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';
import { Typography } from '@mui/material';

const Header = () => {
  const [value, setValue] = useState(0);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: 'center' }}
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
