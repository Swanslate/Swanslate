import React, { useContext, useEffect, useRef, useState } from 'react';
import { useChannel } from '../lib/helpers/ablyHelpers';
import Styles from '../styles/AblyChatComponent.module.scss';
import { Types } from "ably/promises";
import { Button, Card, FormControl, Paper, TextareaAutosize } from '@material-ui/core';
import appContext from '../lib/helpers/appContext';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default function AblyChatComponent() {
    const [messageText, setMessageText] = useState("");
    const [receivedMessages, setMessages] = useState<Types.Message[]>([]);
    const inputBox = useRef<HTMLTextAreaElement>(null);
    const messageEnd = useRef<HTMLDivElement>(null);
    const messageTextIsEmpty = messageText.trim().length === 0;
    const { state, dispatch } = useContext(appContext);

    const [channel, ably] = useChannel("Swanslate-Chat", (message: Types.Message) => {
        setMessages([...receivedMessages.slice(-199), message]);
    });

    function sendChatMessage(messageText: string) {
        channel.publish({ name: state.userInfo.userAuth.userName || "Unknown", data: messageText });
        setMessageText("");
        inputBox.current?.focus();
    }

    function handleFormSubmission(event: any) {
        event.preventDefault();
        sendChatMessage(messageText);
    }

    function handleKeyPress(event: any) {
        if (event.charCode !== 13 || messageTextIsEmpty) {
            return;
        }
        sendChatMessage(messageText);
        event.preventDefault();
    }

    useEffect(() => {
        messageEnd.current?.scrollIntoView({ behavior: "smooth" });
    });

    function renderChatBox() {
        return (
            <div className={Styles.ChatSection}>
                {receivedMessages?.map((message, index) => {
                    return renderMessage(message, index);
                })}
            </div>
        );
    }

    function renderMessage(message: Types.Message, index: number) {
        const author = message.connectionId === ably.connection.id ? "me" : "other";
        return (
            <Card className={author == "other" ? Styles.MessageCard : Styles.OwnMessages}>
                <AccountCircleIcon className={Styles.MessageAvatar} fontSize="small" color="secondary" />
                <span key={index} className={Styles.Message}>From: {message.name}: </span>
                {message.data}
            </Card>

        );
    }

    return (
        <>
            <h1 className={Styles.PageTitle}>Swanslate Chat Demo</h1>
            <div className={Styles.ChatContainer}>
                <Paper className={Styles.ChatAppPaper}>

                    {renderChatBox()}

                    <FormControl fullWidth={true} margin="dense" color="primary" component="form" onSubmit={handleFormSubmission} className={Styles.Form}>
                        <TextareaAutosize
                            ref={inputBox}
                            value={messageText}
                            placeholder="Type a message..."
                            onChange={e => setMessageText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className={Styles.TextArea}
                            minRows="5"
                        />
                        <Button color="primary" variant="contained" type="submit" className={Styles.SendButton} disabled={messageTextIsEmpty}>Send</Button>
                    </FormControl>
                </Paper>
            </div>
            <footer className={Styles.Footer}>
                Powered by @SwanslateTeam
            </footer>
        </>
    );
}