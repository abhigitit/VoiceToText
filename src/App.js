import React from "react";
import { firebase } from "./Firebase/firebase-config";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { Typography } from "@material-ui/core";
import {
  makeStyles,
  ThemeProvider,
  createMuitheme,
} from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import "./index.css";

// const theme = createImageBitmap({
//     palette : {
//         main:orange[500]
//     }
// })

export default function App() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        console.log(res);
        window.location.href = "/record";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h2" component="div">
          Welcome to V2T
        </Typography>
        <Typography variant="subtitle1">
          Every person deserves a fair shot at communication.
        </Typography>
        <Button
          size="large"
          variant="contained"
          color="secondary"
          onClick={signInWithGoogle}
        >
          Google
        </Button>
      </header>
    </div>
  );
}
