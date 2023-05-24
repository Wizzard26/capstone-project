import { useRouter} from "next/router";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Pusher from 'pusher-js';
import { mutate } from "swr";
import styled, { css } from "styled-components";
import SendMessage from "@/components/Chat/SendMessage";

export default function Chat() {
  const router = useRouter();
  const { sender, receiver } = router.query;
  const messageLastRef = useRef(null)
  const [chats, setChats] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");
  const { data: session } = useSession();
  const userName = session?.user.name;

  const output = sender?.toLocaleLowerCase();
  const input = receiver?.toLocaleLowerCase();

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher( process.env.NEXT_PUBLIC_PUSHER_KEY , {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('chat');

    channel.bind("chatMessages", function (data) {

      console.log('this is sender', data.sender);
      console.log('this is receiver', data.receiver);

      if (data.sender === output && data.receiver === input || data.sender === input && data.receiver === output) {
        setChats((prevState) => [
          ...prevState,
          { sender: data.sender, message: data.message, receiver: data.receiver },
        ]);
      }
    });

    return () => {
      pusher.unsubscribe("chat");
    };

  }, [receiver]);

  useEffect(() => {
    messageLastRef.current?.scrollIntoView({ behavior: "smooth" });
  },[chats])

  if (!userName) return <h2>Loading ...</h2>

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageToSend, sender: output, receiver: input }),
      });

      await mutate;

    } catch (error) {
      console.error("Fehler beim Senden der Nachricht:", error);
    }

    setMessageToSend('')
  }

  return (
    <StyledChat>
      <ChatContent>
        <ChatMessages>
          {chats.map((chat, id) => (
            <Message key={ id } variant={chat.sender === output ? 'current' : 'other' }>
              <Sender>{ chat.sender }</Sender>
              <Bubble>{ chat.message }</Bubble>
            </Message>
          ))}

          <div ref={messageLastRef}></div>
        </ChatMessages>
        <SendMessage
          message={messageToSend}
          handleMessageChange={(event) => setMessageToSend(event.target.value)}
          handleSubmit={(event) => {
            handleSubmit(event)
          }}/>
      </ChatContent>
    </StyledChat>
  );
}

const StyledChat = styled.div`
  display: flex;
  align-items: stretch;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ChatContent = styled.div`
  flex: 0 0 100%;
  width: 100%;
  background: #5b6465;
  padding: 55px 0 60px;
  display: flex;
  align-items: stretch;
  flex-direction: column;
`;

const ChatMessages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0 15px 80px 10px;
  height: 100%;
  overflow: scroll;
`;

const Sender = styled.div`
  font-size: .75rem;
  margin-bottom: 10px;
`;

const Bubble = styled.div`
  background: #6194BD;
  border-radius: 8px;
  padding: 8px 12px;
  position: relative;
  
  :before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 12px solid #6194BD;
    top: -10px;
    left: 12px;
  }
`;

const Message = styled.div`
  width: fit-content;
  padding: 5px 10px;
  margin: 10px 0;
  
  ${({ variant }) =>
  variant === "current" &&
  css`
      align-self: flex-start;
    `
}

  ${({ variant }) =>
  variant === "other" &&
  css`
      align-self: flex-end;
      div:nth-child(1) {
        text-align: right;
      }
      
      div:nth-child(2) {
        background: #8fa8c7;

        :before {
          left: auto;
          right: 10px;
          border-bottom-color: #8fa8c7;
        }
      }
    `
}
`;
