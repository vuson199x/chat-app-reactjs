import { Button, Collapse, Typography } from "antd";
import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import useFirestore from "../../../hooks/useFirestore";
import { AuthContext } from "../../../Context/AuthProvider";
import { AppContext } from "../../../Context/AppProvider";

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: #fff;
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }
    .add-room {
      color: #fff;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: #fff;
`;

function RoomList(props) {
  const { rooms, setIsAddRoomVisible, setSelectedRoomId } =
    useContext(AppContext);

  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };

  return (
    <>
      <Collapse ghost defaultActiveKey={["1"]}>
        <PanelStyled header="Danh sách các phòng" key="1">
          {rooms.map((item, index) => {
            return (
              <LinkStyled
                key={index}
                onClick={() => setSelectedRoomId(item.id)}
              >
                {item.name}
              </LinkStyled>
            );
          })}
          <Button
            type="text"
            icon={<PlusOutlined />}
            className="add-room"
            onClick={handleAddRoom}
          >
            Thêm phòng
          </Button>
        </PanelStyled>
      </Collapse>
    </>
  );
}

export default RoomList;
