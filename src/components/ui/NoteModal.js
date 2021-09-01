import { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../../Store";

const useStyles = makeStyles((theme) => ({
  modal: {
    width: "80vw",
    height: "80vh",
    marginTop: "10vh",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: "auto",
  },
}));

export default function NoteModal({
  openModalButtonText,
  submitFormButtonText,
  handleSubmit,
  children,
}) {
  const [, dispatch] = useContext(Context);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleModalSubmit = async () => {
    await handleSubmit();
    handleClose();
    dispatch({ type: "REFRESH" });
  };

  return (
    <>
      <Button onClick={handleOpen}>{openModalButtonText}</Button>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.modal}>
          {children}
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleModalSubmit}>{submitFormButtonText}</Button>
        </div>
      </Modal>
    </>
  );
}
