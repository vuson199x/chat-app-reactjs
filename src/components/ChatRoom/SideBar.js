import { Col, Row } from "antd";
import styled from "styled-components";
import RoomList from "./section/RoomList";
import UserInfo from "./section/UserInfo";

const SideBarStyled = styled.div`
  height: 100vh;
  color: white;
  background: #3f0e40;
`;

function SideBar() {
  return (
    <SideBarStyled>
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
      </Row>
    </SideBarStyled>
  );
}
export default SideBar;
