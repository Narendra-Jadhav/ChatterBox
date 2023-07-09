import { MoreVert, Search } from "@mui/icons-material";
import { Box, Typography, styled } from "@mui/material";

const Header = styled(Box)`
    height: 44px;
    background: #ededed;
    padding: 8px 16px;
    display: flex;
    align-items: center;
`

const Image = styled('img')({
    height: 40,
    width: 40,
    objectFit: 'cover',
    borderRadius: '50%'
})

const Name = styled(Typography)`
    margin-left: 12px !important;
`

const OnlineStatus = styled(Typography)`
    margin-left: 12px !important;
    font-size: 12px;
    color: rgb(0, 0, 0, 0.6);
`

const RightContainer = styled(Box)`
    margin-left: auto;
    & > svg {
        padding: 8px;
        font-size: 24px;
    }
`

const ChatHeader = ({ person }) => {
    return (
        <Header>
            <Image src={person.picture} alt="dp" />
            <Box>
                <Name>{person.name}</Name>
                <OnlineStatus>Offline</OnlineStatus>
            </Box>
            <RightContainer>
                <Search />
                <MoreVert />
            </RightContainer>
        </Header>
    );
}

export default ChatHeader;