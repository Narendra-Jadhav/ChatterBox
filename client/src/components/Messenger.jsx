import { useContext } from "react";

import { AppBar, Toolbar, styled, Box } from "@mui/material";

import { AccountContext } from "../context/AccountProvider";

// components
import LoginDialog from "./account/LoginDialog";
import ChatDialog from "./chat/ChatDialog";

// mui provides styles component to include custom css, which will override the default mui style
// Box is similar to 'div' in MUI
const Component = styled(Box)`
  height: 100vh;
  background: #dcdcdc;
`;

const Header = styled(AppBar)`
  height: 125px;
`;

const LoginHeader = styled(AppBar)`
  height: 200px;
`;

const Messenger = () => {
  const { account } = useContext(AccountContext);

  // if account is there, i.e user has logged in, open ChatDialog else LoginDialog
  return (
    <Component>
      {account ? (
        <>
          <Header>
            <Toolbar></Toolbar>
          </Header>
          <ChatDialog />
        </>
      ) : (
        <>
          <LoginHeader>
            <Toolbar></Toolbar>
          </LoginHeader>
          <LoginDialog />
        </>
      )}
    </Component>
  );
};

export default Messenger;
