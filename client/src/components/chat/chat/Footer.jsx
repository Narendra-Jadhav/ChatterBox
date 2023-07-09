import { AttachFile, EmojiEmotionsOutlined, Mic } from "@mui/icons-material";
import { Box, InputBase, styled } from "@mui/material";
import { useEffect } from "react";
import { uploadFile } from "../../../service/api";

const Container = styled(Box)`
  height: 55px;
  background: #ededed;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0 15px;
  & > * {
    margin: 7px;
    color: #919191;
  }
`;

const SearchBar = styled(Box)`
  background-color: #ffffff;
  border-radius: 15px;
  width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
  width: 100%;
  height: 20px;
  padding: 20px;
  padding-left: 25px;
  font-size: 14px;
`;

const ClipIcon = styled(AttachFile)`
  transform: rotate(40deg);
  cursor: pointer
`;

const Footer = ({ sendText, setValue, value, file, setFile, setImage }) => {

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        let response = await uploadFile(data);
        setImage(response.data);
      }
    }
    getImage();
  }, [file, setImage]);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setValue(e.target.files[0].name);
  }

  return (
    <Container>
      <EmojiEmotionsOutlined />
      <label htmlFor="fileInput">
        <ClipIcon />
      </label>
      <input 
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        onChange={(e) => onFileChange(e)}
      />
      <SearchBar>
        <InputField
          placeholder="Type a message"
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => sendText(e)}
          value={value}
        />
      </SearchBar>
      <Mic />
    </Container>
  );
};

export default Footer;
