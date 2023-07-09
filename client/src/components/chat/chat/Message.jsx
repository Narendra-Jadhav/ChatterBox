import { useContext } from "react";

import { Box, Typography, styled } from "@mui/material";

import { AccountContext } from "../../../context/AccountProvider";
import { downloadMedia, formatDate } from "../../../utils/common-utils";
import { GetApp } from "@mui/icons-material";

const Own = styled(Box)`
  background: #c1e1ec;
  max-width: 60%;
  margin-left: auto;
  padding: 5px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
`;

const Wrapper = styled(Box)`
  background: #F5F5F5;
  max-width: 60%;
  padding: 5px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
`;

const Text = styled(Typography)`
  font-size: 14px;
  padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
  font-size: 10px;
  color: #919191;
  word-break: keep-all;
  margin-top: auto;
`;

const Message = ({ message }) => {
  const { account } = useContext(AccountContext);

  return (
    <>
      {
        account.sub === message.senderId ? (
            <Own>
                {
                  message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
                }
            </Own>
        ) : (
            <Wrapper>
                {
                  message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
                }
            </Wrapper>
        )
      }
    </>
  );
};

const ImageMessage = ({ message }) => {
  return (
    <Box style={{ position: 'relative' }}>
      {
        message?.text?.includes('.pdf') ?
          <Box style={{ display: 'flex' }}>
            <img src={process.env.PUBLIC_URL + '/pdf.png'} alt="pdf" style={{ width: 80 }} />
            <Typography style={{ fontSize: 14 }}>{message.text.split('/').pop()}</Typography>
          </Box>
        :
        <img style={{ width: 250, height: '100%', objectFit: 'cover' }} src={message.text} alt={message.text} />
      }
      <Time style={{ position: 'absolute', bottom: 0, right: 0 }}>
        <GetApp 
          style={{ marginRight: 10, border: '1px solid grey', borderRadius: '50%', fontSize: '18px', cursor: 'pointer' }}
          onClick={(e) => downloadMedia(e, message.text)}
        />
        {formatDate(message.createdAt)}
      </Time>
    </Box>
  )
}

const TextMessage = ({ message }) => {
  return (
    <>
      <Text>{message.text}</Text>
      <Time>{formatDate(message.createdAt)}</Time>
    </>
  );
}

export default Message;
