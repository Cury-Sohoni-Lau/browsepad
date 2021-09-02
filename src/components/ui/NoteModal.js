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
  handleOpen,
  handleSubmit,
  open,
  setOpen,
  variant,
  color,
  className,
  children,
}) {
  const [, dispatch] = useContext(Context);
  const classes = useStyles();
  const handleModalOpen = () => {
    if (handleOpen) {
      handleOpen();
    }
    setOpen(true);
  };
  const handleModalClose = () => setOpen(false);

  const handleModalSubmit = async () => {
    await handleSubmit();
    handleModalClose();
    dispatch({ type: "REFRESH" });
  };

  return (
    <>
      <Button
        className={className || ""}
        variant={variant}
        color={color}
        onClick={handleModalOpen}
      >
        {openModalButtonText}
      </Button>
      <Modal open={open} onClose={handleModalClose}>
        <div className={classes.modal}>
          {children}
          <Button onClick={handleModalClose}>Close</Button>
          {submitFormButtonText && (
            <Button onClick={handleModalSubmit}>{submitFormButtonText}</Button>
          )}
        </div>
      </Modal>
    </>
  );
}
