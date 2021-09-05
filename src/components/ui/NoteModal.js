import { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../../Store";
import useStyles from "../../styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

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
      <Modal
        open={open}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.modal}>
            <div
              style={{
                backgroundColor: "rgba(255, 250, 250, 0.5)",
                borderRadius: "10px",
                padding: "3rem",
              }}
              className={classes.shadowWeak}
            >
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
          </div>
        </Fade>
      </Modal>
    </>
  );
}
