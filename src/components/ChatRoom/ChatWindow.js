import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Tooltip, Form, Alert } from "antd";
import { useContext, useEffect, useMemo, useRef } from "react";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { addDocument } from "../../firebase/services";
import useFirestore from "../../hooks/useFirestore";
import Message from "./section/Message";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid #000;

  .header {
    &__info {
      display: flex;
      justify-content: center;
      flex-direction: column;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__description {
      font-size: 12px;
    }
  }
`;

const WrapperStyled = styled.div`
  height: 100vh;
`;

const ButtonGroupStyled = styled.div`
  align-items: center;
  display: flex;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  padding: 11px;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0px;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;

  .ant-form=item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

function ChatWindow() {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const messageListRef = useRef(null);
  const [form] = Form.useForm();
  const { selectedRoom, members, setIsInviteMemberVisible } =
    useContext(AppContext);
  const {
    users: { uid, photoURL, displayName },
  } = useContext(AuthContext);

  console.log({ selectedRoom });

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnSubmit = () => {
    addDocument("messages", {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    });
    form.resetFields(["message"]);

    // focus to input again after submit
    if (inputRef?.current) {
      setTimeout(() => {
        inputRef.current.focus();
      });
    }
  };

  const condition = useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );

  const messages = useFirestore("messages", condition);
  console.log({ messages });
  useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [messages]);

  return (
    <WrapperStyled>
      {selectedRoom.id ? (
        <>
          <HeaderStyled>
            <div className="header__info">
              <p className="header__title">{selectedRoom?.name}</p>
              <span className="header__description">
                {selectedRoom?.description}
              </span>
            </div>
            <ButtonGroupStyled>
              <Button
                type="text"
                icon={<UserAddOutlined />}
                onClick={() => setIsInviteMemberVisible(true)}
              >
                Mời
              </Button>
              <Avatar.Group maxCount={2} size="small">
                {members.map((member) => {
                  return (
                    <Tooltip title={member.displayName} key={member.id}>
                      <Avatar size="small" src={member.photoURL}>
                        {member.photoURL}
                      </Avatar>
                    </Tooltip>
                  );
                })}
              </Avatar.Group>
            </ButtonGroupStyled>
          </HeaderStyled>
          <ContentStyled>
            <MessageListStyled ref={messageListRef}>
              {messages.map((mes) => (
                <Message
                  key={mes.id}
                  text={mes.text}
                  photoURL={mes.photoURL}
                  displayName={mes.displayName}
                  createdAt={mes.createdAt}
                />
              ))}
            </MessageListStyled>
            <FormStyled form={form}>
              <Form.Item name="message">
                <Input
                  bordered={false}
                  autoComplete="off"
                  placeholder="Nhập tin nhắn..."
                  onChange={handleInputChange}
                  onPressEnter={handleOnSubmit}
                />
              </Form.Item>
              <Button type="primary" onClick={handleOnSubmit}>
                Gửi
              </Button>
            </FormStyled>
          </ContentStyled>
        </>
      ) : (
        <Alert
          message="Hãy chọn phòng"
          type="info"
          showIcon
          style={{ margin: "5px" }}
          closable
        />
      )}
    </WrapperStyled>
  );
}
export default ChatWindow;
