import { Col, Row } from "antd";
import ChatWindow from "./ChatWindow";
import SideBar from "./SideBar";

function ChatRoom() {
  return (
    <Row>
      <Col span={5}>
        <SideBar />
      </Col>
      <Col span={19}>
        <ChatWindow />
      </Col>
    </Row>
  );
}

export default ChatRoom;
