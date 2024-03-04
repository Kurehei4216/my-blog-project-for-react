import {
  Dialog,
  DialogTitle,
  DialogContent,
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
          {"記事の削除を行いますか？"}
        </DialogTitle>
        <DialogContent>

        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setIsDialogOpen(!isOpen)}>削除しない</Button>
          <Button variant="outlined" color="error" onClick={() => handleDelete(url)} autoFocus>
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )

}

export default DeleteDialog;
