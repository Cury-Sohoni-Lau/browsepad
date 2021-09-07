import { makeStyles } from "@material-ui/core/styles";

const DARK_BLUE = "#5680e9";
const SKY_BLUE = "#84ceeb";
const CYAN = "#5ab9ea";
const PERIWINKLE = "#c1c8e4";
const PURPLE = "#8860d0";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#f8f8ff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: "auto",
  },
  formInput: {
    width: "50vw",
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
    textDecoration: "none",
  },
  buttonPurple: {
    background: `linear-gradient(45deg, ${PURPLE}, ${CYAN})`,
    borderRadius: 100,
    color: "white",
  },
  buttonRed: {
    background: `linear-gradient(45deg, #de1738 , #ff8c00)`,
  },
  buttonLightBlue: {
    background: `linear-gradient(45deg, #23d5ab , ${DARK_BLUE})`,
  },
  purple: {
    background: `linear-gradient(45deg, ${PURPLE}, ${DARK_BLUE})`,
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
    background: `linear-gradient(45deg, ${PURPLE}, ${DARK_BLUE})`,
    "& a": {
      textDecoration: "none",
    },
  },
  sidebar: {
    // paddingTop: "2vw",
    padding: "1rem",
    width: "20vw",
    transition: "ease 0.25s",
    display: "flex",
    flexDirection: "column",
    marginLeft: "2vw",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
  },
  hiddenSidebar: {
    width: "0",
    "& *": {
      display: "none",
      "& *": {
        display: "none",
      },
    },
    transition: "ease 0.5s",
  },
  hashtagButtons: {
    marginTop: "1vw",
    marginRight: "0.5vw",
    padding: "0.5rem",
    background: `linear-gradient(45deg, ${PURPLE}, ${DARK_BLUE})`,
    textShadow: "0px 0px 5px #fff, 0px 0px 7px #000",
    color: "white",
  },
  hashtagButtonsActive: {
    background: "none",
    textShadow: "none",
    border: `0.2rem solid ${DARK_BLUE}`,
    color: "black",
  },
  homeBanner: {
    position: "relative",
    width: "100vw",
    padding: "2rem",
    backgroundColor: "	rgba(249,249,249, 0.5)",
    margin: "4vw 0",
    // marginBottom: theme.spacing(4),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  // overlay: {
  //   position: 'absolute',
  //   top: 0,
  //   bottom: 0,
  //   right: 0,
  //   left: 0,
  //   // backgroundColor: '	rgba(249,249,249, 0.9)',
  // },
  title: {
    textAlign: "center",
    fontFamily: "Rubik",
    margin: "auto",
    alignItems: "center",
    color: "white",
    textShadow: "0px 0px 10px #fff, 0px 0px 15px #000",
  },
  titleMargin: {
    marginTop: "20vh",
  },
  teamTitle: {
    // marginTop: "20vh",
    // marginBottom: "10vh",
    paddingTop: "10vh",
    paddingBottom: "5vh",
  },
  typewriter: {
    fontFamily: "Inter",
    textAlign: "center",
    alignItems: "center",
    color: "white",
    textShadow: "0px 0px 10px #fff, 0px 0px 15px #000",
  },
  gridContainer: {
    marginTop: "10vh",
    // paddingLeft: "10vw",
    // paddingBottom: "20vh",
    // marginBottom: "20vh",
  },
  root: {
    minWidth: 200,
  },
  pos: {
    marginBottom: 12,
  },
  card: {
    display: "flex",
    margin: "2vw",
    // minHeight: "60vh",
  },
  cardDetails: {
    flex: 0,
  },
  cardMedia: {
    flex: 1,
    width: 200,
    backgroundPosition: "right",
  },
  whiteTextButton: {
    color: "white",
    fontSize: "16px",
  },
  devContainer: {
    display: "flex",
    justifyContent: "space-between",
    // flexDirection: "row",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0),
  },
  parallax: {
    marginTop: "10vh",
    // marginBottom: "10vh",
    backgroundImage: `url("/banner.png")`,
    minHeight: "500px",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

export default useStyles;
