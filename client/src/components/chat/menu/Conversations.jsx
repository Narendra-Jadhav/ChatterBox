import { useEffect, useState, useContext } from "react";

import { Box, Divider, styled } from "@mui/material";

import { getUsers } from "../../../service/api";
import { AccountContext } from "../../../context/AccountProvider";

// components
import Conversation from "./Conversation";

const Component = styled(Box)`
    height: 81vh;
    overflow: overlay;
`

const StyledDivider = styled(Divider)`
    margin: 0 0 0 70px;
    background-color: #e9edef;
    opacity: 0.6;
`

const Conversations = ({ text }) => {
  const [users, setUsers] = useState([]);
  // for storing the response from the useEffect, we created this state

  const { account, socket, setActiveUsers } = useContext(AccountContext);

  // Component did mount after that we have to call the api, here its replacement is useEffect hook
  useEffect(() => {
    const fetchData = async () => {
      let response = await getUsers();
      const filteredData = response.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
      setUsers(filteredData);
    };
    fetchData();
  }, [text]);
  // second argument is Dependency Array, i.e when we have to call the useEffect. We have to call only when component mounts,
  // therefore empty array []

  useEffect(() => {
    socket.current.emit('addUsers', account);
    socket.current.on('getUsers', users => {
      setActiveUsers(users);
    });
  }, [account, setActiveUsers, socket]);

  return (
    <Component>
      {users.map(
        (user) => user.sub !== account.sub && 
        <>
            <Conversation user={user} />
            <StyledDivider />
        </>
      )}
    </Component>
  );
};

export default Conversations;
