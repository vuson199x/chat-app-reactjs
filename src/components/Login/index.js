import { Button, Col, Row, Typography } from "antd";
import { useHistory } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import "firebase/app";
import firebase from "firebase/app";
import { addDocument, generateKeywords } from "../../firebase/services";
const { Title } = Typography;
const fbProvider = new firebase.auth.FacebookAuthProvider();
const ggProvider = new firebase.auth.GoogleAuthProvider();
function Login() {
  const handleFbLogin = async () => {
    const data = await auth.signInWithPopup(fbProvider);
    console.log({ data });
  };

  const handleGGLogin = async () => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(ggProvider);

    if (additionalUserInfo?.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
        keyword: generateKeywords(user.displayName?.toLowerCase()),
      });
    }
  };

  return (
    <>
      <Row justify="center" style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }} level={3}>
            Chat Room Funny
          </Title>
          <Button
            type="primary"
            style={{ width: "100%", marginBottom: "25px" }}
            onClick={() =>
              // auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
              handleGGLogin()
            }
          >
            Đăng nhập bằng Google
          </Button>
          <Button
            type="primary"
            style={{ width: "100%", marginBottom: "25px" }}
            onClick={() =>
              // auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
              handleFbLogin()
            }
          >
            Đăng nhập bằng Facebook
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default Login;
