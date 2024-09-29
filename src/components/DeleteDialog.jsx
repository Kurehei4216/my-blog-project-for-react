import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";
const DeleteDialog = ({ isOpen, handleDelete, url, setIsDialogOpen }) => {
  return (
    <>
      <Dialog open={isOpen} title="モーダルテスト">
        <DialogTitle id="alert-dialog-title">
          {"記事の削除を行いますか？"}
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions
          sx={{
            display: "flex",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-around",
            }}
          >
            <Grid item xs={6}>
              <Button
                variant="outlined"
                onClick={() => setIsDialogOpen(!isOpen)}
                style={{ width: "100%" }}
              >
                削除しない
              </Button>
            </Grid>
            <Grid item xs={6}>
              {" "}
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(url)}
                autoFocus
                style={{ width: "100%" }}
              >
                削除する
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
