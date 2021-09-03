import { makeStyles } from "@material-ui/core/styles";

const DARK_BLUE = "#5680e9";
const SKY_BLUE = "#84ceeb";
const CYAN = "#5ab9ea";
const PERIWINKLE = "#c1c8e4";
const PURPLE = "#8860d0";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    width: "80vw",
    height: "80vh",
    marginTop: "10vh",
    backgroundColor: theme.palette.background.paper,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: "auto",
  },
  formInput: {
    width: "50vw"
  },
  authForm: {
    backgroundColor: "rgba(255,250,250, 0.20)",
  },
  frosty: {
    backgroundColor: "rgba(255,250,250, 0.50)",
  },
  authFormField: {
    width: "100%",
    marginTop: "10px",
  },
  flexColumnContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    fontWeight: "500",
    textTransform: "none",
    fontFamily: "Rubik",
    padding: "5px 25px",
  },
  buttonPurple: {
    background: `linear-gradient(45deg, ${PURPLE}, ${CYAN})`,
    borderRadius: 100,
    color: "white",
  },
  shadowStrong: {
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  shadowWeak: {
    boxShadow:
      "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)",
  },
  navbar: {
    backgroundColor: `${CYAN}`,
  },
  sidebar: {
    paddingTop: "2vw",
    paddingLeft: "2vw",
  },
  hashtagButtons: {
    marginTop: "1vw",
    marginRight: "0.5vw",
  },
}));

export default useStyles;
