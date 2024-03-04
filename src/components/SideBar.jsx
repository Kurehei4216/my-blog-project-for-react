import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from 'react-router-dom';

const drawerWidth = 300;

const useStyles = styled((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

const SideBar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const history = useNavigate();

  const handleRedirectToPostList= (postId) => {
    history(`/admin/posts/`); // パスパラメータを含めてリダイレクト
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        className={classes.drawer}
        variant="temporary"
        open={open}
        onClose={handleDrawerClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          <ListItem button style={{ paddingRight: "100px" }}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button style={{ paddingRight: "100px" }}>
            <ListItemText primary="記事一覧" />
          </ListItem>
          {/* Add more menu items as needed */}
        </List>
      </Drawer>
    </>
  );
};

export default SideBar;
