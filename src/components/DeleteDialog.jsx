import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";

const DeleteDialog = ({isOpen, handleDelete, url, setIsDialogOpen}) => {

  return (
    <>
      <Dialog
        open={isOpen}
        title="モーダルテスト"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(!isOpen)}>削除しない</Button>
          <Button onClick={() => handleDelete(url)} autoFocus>
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )

}

export default DeleteDialog;
