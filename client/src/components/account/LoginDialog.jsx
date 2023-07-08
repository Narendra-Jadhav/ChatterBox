import { useContext } from "react";

import { Dialog, Box, Typography, List, ListItem, styled } from "@mui/material";
// Typography is the alternative of 'p'

import { AccountContext } from "../../context/AccountProvider";

import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const Container = styled(Box)`
  padding: 56px 0 56px 56px;
`;

const Title = styled(Typography)`
  font-size: 26px;
  color: #525252;
  font-weight: 300;
  font-family: inherit;
  margin-bottom: 25px;
`;

const dialogStyle = {
  height: "96%",
  marginTop: "12%",
  width: "60%",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  overflow: "hidden",
};

const LoginDialog = () => {

    const { setAccount } = useContext(AccountContext);

  const onLoginSuccess = (res) => {
    const decoded = jwt_decode(res.credential);
    console.log(decoded);
    setAccount(decoded);
  };

  const onLoginError = (res) => {
    console.log("Login Failed ", res);
  };

  return (
    <Dialog open={true} PaperProps={{ sx: dialogStyle }} hideBackdrop={true}>
      <Container>
        <Box>
          <Title>To use ChatterBox on your computer:</Title>
          <List>
            <ListItem>1. Login</ListItem>
            <ListItem>2. Signup</ListItem>
          </List>
        </Box>
        <Box>
          <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />
        </Box>
      </Container>
    </Dialog>
  );
};

export default LoginDialog;
