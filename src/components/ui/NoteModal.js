import { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../../Store";
import useStyles from "../../styles";

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
        className={classes.button + " " + (className || "")}
        variant={variant}
        color={color}
        onClick={handleModalOpen}
      >
        {openModalButtonText}
      </Button>
      <Modal open={open} onClose={handleModalClose}>
        <div className={classes.modal}>
          {children}
          <div style={{ marginTop: "2rem" }}>
            <Button
              className={`${classes.button} ${classes.buttonPurple} ${classes.shadowWeak}`}
              style={{ marginRight: "1rem" }}
              onClick={handleModalClose}
            >
              Close
            </Button>
            {submitFormButtonText && (
              <Button
                className={`${classes.button} ${classes.buttonPurple} ${classes.shadowWeak}`}
                onClick={handleModalSubmit}
              >
                {submitFormButtonText}
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
