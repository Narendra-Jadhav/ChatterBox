import { useContext } from "react";

import { Box, Typography, styled } from "@mui/material";

import { AccountContext } from "../../../context/AccountProvider";
import { setConversation } from "../../../service/api";

const Component = styled(Box)`
    display: flex;
    height: 45px;
    padding: 13px 0;
    cursor: pointer;
`

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: "50%",
    padding: '0 14px',
    objectFit: 'cover'
})

const NameContainer = styled(Box)`
    padding: 10px 0 0 5px; 
`

const Conversation = ({ user }) => {

    const { setPerson, account } = useContext(AccountContext);

    const getUser = async () => {
        setPerson(user);
        await setConversation({ senderId: account.sub, receiverId: user.sub });
        // In the api, we will define this function which, when on a user will be clicked, its conversation will consist of 
        // receiver and sender; so that the message will be in their chat only
    }

    return (
        <Component onClick={() => getUser()}>
            <Box>
                <Image src={user.picture} alt="dp" />
            </Box>
            <NameContainer>
                <Typography>{user.name}</Typography>
            </NameContainer>
        </Component>
    );
}

export default Conversation;