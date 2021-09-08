import React, { useEffect, useRef, useState } from 'react';
import { useChannel } from '../lib/helpers/ablyHelpers';
import Styles from '../styles/AblyChatComponent.module.scss';
import { Types } from "ably/promises";
import { Card } from '@material-ui/core';

export default function AblyChatComponent() {
    const [messageText, setMessageText] = useState("");
    const [receivedMessages, setMessages] = useState<Types.Message[]>([]);
    const inputBox = useRef<HTMLTextAreaElement>(null);
    const messageEnd = useRef<HTMLDivElement>(null);
    const messageTextIsEmpty = messageText.trim().length === 0;

    const [channel, ably] = useChannel("chat-demo", (message: Types.Message) => {
        const history = receivedMessages.slice(-199);
        setMessages([...history, message]);
    });

    const sendChatMessage = (messageText: string) => {
        channel.publish({ name: "chat-message", data: messageText });
        setMessageText("");
        inputBox.current?.focus();
    };

    const handleFormSubmission = (event: any) => {
        event.preventDefault();
        sendChatMessage(messageText);
    };

    const handleKeyPress = (event: any) => {
        if (event.charCode !== 13 || messageTextIsEmpty) {
            return;
        }
        sendChatMessage(messageText);
        event.preventDefault();
    };

    const messages = receivedMessages.map((message, index) => {
        const author = message.connectionId === ably.connection.id ? "me" : "other";
        return <span key={index} className={Styles.message} data-author={author}>{message.data}</span>;
    });

    useEffect(() => {
        messageEnd.current?.scrollIntoView({ behavior: "smooth" });
    });


    return (
        <div className={Styles.chatHolder}>

            <div className={Styles.chatText}>
                {messages}
                <div ref={messageEnd}></div>
                {/* empty element to control scroll to bottom */}
            </div>
            <form onSubmit={handleFormSubmission} className={Styles.form}>
                <textarea
                    ref={inputBox}
                    value={messageText}
                    placeholder="Type a message..."
                    onChange={e => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={Styles.textarea}
                ></textarea>
                <button type="submit" className={Styles.button} disabled={messageTextIsEmpty}>Send</button>
            </form>
        </div>
    );
}

