import { useContext, useEffect, useRef, useState } from "react";

import { Box, styled } from "@mui/material";

import { AccountContext } from "../../../context/AccountProvider";
import { getMessages, newMessage } from "../../../service/api";

// components
import Footer from "./Footer";
import Message from "./Message";

const Wrapper = styled(Box)`
    background: #e7e7e7;
`

const Component = styled(Box)`
    height: 80vh;
    overflow-y: scroll;
`

const Container = styled(Box)`
    padding: 1px 80px;
`

const Messages = ({ person, conversation }) => {

    const [value, setValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [newMessageFlag, setNewMessageFlag] = useState(false);
    const [file, setFile] = useState();
    const [image, setImage] = useState('');

    const scrollRef = useRef();

    const { account } = useContext(AccountContext);

    useEffect(() => {
        const getMessageDetails = async () => {
            let data = await getMessages(conversation._id);
            setMessages(data);
        }
        conversation._id && getMessageDetails();
    }, [person._id, conversation._id, newMessageFlag]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ transition: 'smooth' });
    }, [messages]);

    const sendText = async (e) => {
        const code = e.keyCode || e.which;
        // 13 code is for Enter key
        if (code === 13) {
            let message = {};
            if (!file) {
                message = {
                    senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: conversation._id,
                    type: 'text',
                    text: value
                }
            } else {
                message = {
                    senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: conversation._id,
                    type: 'file',
                    text: image
                }
            }
            
            await newMessage(message);
            setValue('');
            setFile('');
            setImage('');
            setNewMessageFlag(prev => !prev);
        }
    }

    return (
        <Wrapper>
            <Component>
                {
                    messages && messages.map(message => (
                        <Container ref={scrollRef}>
                            <Message message={message} />
                        </Container>
                    ))
                }
            </Component>
            <Footer sendText={sendText} setValue={setValue} value={value} file={file} setFile={setFile} setImage={setImage} />
        </Wrapper>
    );
}

export default Messages;