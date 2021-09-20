import { Avatar, Button, Typography } from "antd";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { AppContext } from "../../../Context/AppProvider";
import { AuthContext } from "../../../Context/AuthProvider";
import { auth, db } from "../../../firebase/config";

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82 38, 83);

  .username {
    color: white;
    margin-left: 5px;
  }
`;

function UserInfo(props) {
  const {
    user: { displayName, photoURL },
  } = React.useContext(AuthContext);
  const { clearState } = React.useContext(AppContext);

  return (
    <WrapperStyled>
      <div>
        <Avatar src={photoURL}>{photoURL}</Avatar>{" "}
        <Typography.Text className="username">{displayName}</Typography.Text>
      </div>
      <Button
        type="primary"
        onClick={() => {
          // clear state in App Provider when logout
          clearState();
          auth.signOut();
        }}
      >
        Đăng xuất
      </Button>
    </WrapperStyled>
  );
}

export default UserInfo;
