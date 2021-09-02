import { makeStyles } from "@material-ui/core/styles";

const DARK_BLUE = "#5680e9";
const SKY_BLUE = "#84ceeb";
const CYAN = "#5ab9ea";
const PERIWINKLE = "#c1c8e4";
const PURPLE = "#8860d0";

const useStyles = makeStyles((theme) => ({
    authForm: {
        backgroundColor: "rgba(255,250,250, 0.20)",
        borderRadius: "10px",
    },
    authFormField: {
        width: "100%",
        marginTop: "10px",
    },
    flexColumnContainer: {
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',  
    },
    button: {
        textTransform: "capitalize",
        fontFamily: "Rubik",
        fontWeight: "900",
        background: `linear-gradient(45deg, ${PURPLE}, ${CYAN})`,
        marginBottom: 15,
        borderRadius: 100,
        color: "white",
        padding: '5px 30px',
        textShadow: "0.5px 0.5px 0.5px #282828", 
    },
    shadowStrong: {
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    },
    shadowWeak: {
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)"
    }
}))

export default useStyles;