import { useContext, useEffect, useState } from "react";

import { Box, Typography, styled } from "@mui/material";

import { AccountContext } from "../../../context/AccountProvider";
import { getConversation, setConversation } from "../../../service/api";
import { formatDate } from "../../../utils/common-utils";

const Component = styled(Box)`
  display: flex;
  height: 45px;
  padding: 13px 0;
  cursor: pointer;
`;

const Image = styled("img")({
  width: 50,
  height: 50,
  borderRadius: "50%",
  padding: "0 14px",
  objectFit: "cover",
});

const NameContainer = styled(Box)`
  display: flex;
`;

const TimeStamp = styled(Typography)`
    font-size: 12px;
    margin-left: auto;
    margin-right: 20px;
    color: #00000099;
`

const LastMessage = styled(Typography)`
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
`

const Conversation = ({ user }) => {
  const { setPerson, account, newMessageFlag } = useContext(AccountContext);

  const [message, setMessage] = useState({});

  useEffect(() => {
    const getConversationDetails = async () => {
      const data = await getConversation({
        senderId: account.sub,
        receiverId: user.sub,
      });
      setMessage({ text: data?.message, timestamp: data?.updatedAt });
    };
    getConversationDetails();
  }, [account.sub, newMessageFlag, user.sub]);

  const getUser = async () => {
    setPerson(user);
    await setConversation({ senderId: account.sub, receiverId: user.sub });
    // In the api, we will define this function which, when on a user will be clicked, its conversation will consist of
    // receiver and sender; so that the message will be in their chat only
  };

  return (
    <Component onClick={() => getUser()}>
      <Box>
        <Image src={user.picture} alt="dp" />
      </Box>
      <Box style={{ width: "100%" }}>
        <NameContainer>
          <Typography>{user.name}</Typography>
          {
            message?.text && (
                <TimeStamp>{formatDate(message?.timestamp)}</TimeStamp>
            )
          }
        </NameContainer>
        <Box>
          <LastMessage>
            {message?.text?.includes("localhost") ? "media" : message.text}
          </LastMessage>
        </Box>
      </Box>
    </Component>
  );
};

export default Conversation;
