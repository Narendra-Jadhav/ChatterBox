import { Box, Typography, styled } from "@mui/material";

const Component = styled(Box)`
  background: #f8f9fa;
  padding: 300px 0;
  text-align: center;
  height: 100vh;
`;

const Title = styled(Typography)`
  font-size: 50px;
  font-family: inherit;
  font-weight: 300;
  color: #41525d;
`;

const SubTitle = styled(Typography)`
  font-size: 16px;
  color: #667781;
  font-weight: 400;
  font-family: inherit;
`;

const EmptyChat = () => {
  return (
    <Component>
      <Title>ChatterBox</Title>
      <SubTitle>Send and Receive messages</SubTitle>
    </Component>
  );
};

export default EmptyChat;
