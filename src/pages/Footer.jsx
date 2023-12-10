import { Box, Container, Grid, Typography } from "@mui/material"
const Footer = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}>
        <Container maxWidth="lg">
          <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
              <Typography color="black" variant="h5">
                Home
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="textSecondary" variant="subtitle1">
              © 2023 クレヘイブログ All rights reserved.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Footer
