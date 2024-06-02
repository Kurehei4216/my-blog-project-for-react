import { Container, CssBaseline, Grid } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <Grid container direction="column" sx={{ backgroundColor: "#f0f0f0" }}>
      <CssBaseline />
      <Header />
      <NavBar />

      <Container maxWidth="xl" sx={{ flexGrow: 1 }}>
        {children}
      </Container>

      <Footer />
    </Grid>
  );
};

export default Layout;
