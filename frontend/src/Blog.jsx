import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppAppBar from "./components/AppAppBar";
import MainContent from "./components/MainContent";
import { SignInDialog, SignUpDialog } from "./components/Dialogs";
import Footer from "./components/Footer";

export default function Blog() {
  const [signInOpen, setSignInOpen] = React.useState(false);
  const [signUpOpen, setSignUpOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("token")) setLoggedIn(true);
  }, []);

  return (
    <>
      <CssBaseline enableColorScheme />
      <AppAppBar
        setSignIn={() => setSignInOpen(true)}
        setSignUp={() => setSignUpOpen(true)}
        loggedIn={loggedIn}
        setLoggedOut={() => {
          setLoggedIn(false);
          localStorage.removeItem("token");
          localStorage.removeItem("email");
        }}
      />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <MainContent loggedIn={loggedIn} />
      </Container>
      <Footer />
      <SignInDialog
        open={signInOpen}
        onClose={() => setSignInOpen(false)}
        setSignedIn={() => setLoggedIn(true)}
      />
      <SignUpDialog
        open={signUpOpen}
        onClose={() => setSignUpOpen(false)}
        setSignedUp={() => setLoggedIn(true)}
      />
    </>
  );
}
