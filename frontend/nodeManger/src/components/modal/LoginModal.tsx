import React, { useState } from "react";
import "./modal.css";
import { useNoteContext } from "../../utilis/context/Context";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { MdLockPerson } from "react-icons/md";
import loginImg from "../../assets/login.jpg";
import { FiLogIn } from "react-icons/fi";
import { BsPersonBoundingBox } from "react-icons/bs";
import { MdOutlineAddReaction } from "react-icons/md";
import { loginUser, registerUser } from "../../utilis/axios";

type Props = {};

const LoginModal = (props: Props) => {
  const {
    closeLoginModal,
    login,
    loginType,
    setLoginType,
    userData,
    setUserData,
  } = useNoteContext();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    name_error: false,
    email_error: false,
    password_error: false,
  });

  const handleBackdropClick = () => {
    closeLoginModal();
  };

  const handleChange = (key: string, value: string) => {
    setUser({ ...user, [key]: value });
  };
  const handleSubmit = () => {
    if (user.email.length < 1 || user.password.length < 1) {
      setUser({
        ...user,
        email_error: user.email.length < 1,
        password_error: user.password.length < 1,
        name_error: loginType === "register" && user.password.length < 1,
      });
    } else {
      setUser({
        ...user,
        email_error: false,
        password_error: false,
        name_error: loginType === "register" && user.password.length < 1,
      });

      if (loginType === "register") {
        registerUser({
          email: user?.email,
          password: user?.password,
          name: user?.name,
        })
          .then((res) => {
            const { message } = res?.data;

            closeLoginModal();
          })
          .catch((err) => {
            console.log({ err });
          });
      } else {
        loginUser({ email: user?.email, password: user?.password })
          .then((res) => {
            const { message, token } = res?.data;
            setUserData({ ...userData, ...res?.data });
            closeLoginModal();
            console.log({ res });
          })
          .catch((err) => {
            console.log({ err });
          });
      }
    }
    // console.log({ user });
  };
  return (
    <>
      <div className="modal-backdrop" onClick={handleBackdropClick}></div>
      <div
        className={`modal-wrapper ${login ? "active" : ""}`}
        style={{
          height: "85vh",
          width: "70vw",
          maxWidth: "100%",
          padding: "4rem",
          borderTop: "4px solid #8bcd21",
          borderBottom: "4px solid #8bcd21",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "35%",
              height: "100%",
            }}
          >
            <div
              style={{
                fontSize: "30px",
                fontWeight: "900",
                margin: "0.5rem 0",
              }}
            >
              {loginType === "register" ? "Sign Up" : "Sign In"}
            </div>
            <p style={{ color: "grey", fontSize: 12, marginBottom: "1rem" }}>
              Capture what’s on your mind to Note Manager !
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "1rem 0rem",
                marginBottom: "4rem",
              }}
            >
              {loginType === "register" && (
                <div
                  style={{
                    margin: "1rem 0",
                    borderBottom: user?.name_error
                      ? "1px solid red"
                      : "1px solid grey",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <BsPersonBoundingBox color="#ffd28f" size={24} />
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    style={{
                      border: "none",
                      outline: "none",
                      fontSize: "16px",
                      margin: "0.5rem",
                      width: "100%",
                    }}
                    onChange={(text) => handleChange("name", text.target.value)}
                  />
                </div>
              )}
              <div
                style={{
                  margin: "1rem 0",
                  borderBottom: user?.email_error
                    ? "1px solid red"
                    : "1px solid grey",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <MdOutlineMarkEmailRead color="#83a2ff" size={24} />
                <input
                  type="text"
                  placeholder="Your Email"
                  style={{
                    border: "none",
                    outline: "none",
                    fontSize: "16px",
                    margin: "0.5rem",
                    width: "100%",
                  }}
                  onChange={(text) => handleChange("email", text.target.value)}
                />
              </div>
              <div
                style={{
                  margin: "1rem 0",
                  borderBottom: user?.password_error
                    ? "1px solid red"
                    : "1px solid grey",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <MdLockPerson color="coral" size={24} />
                <input
                  type="password"
                  placeholder="Your Password"
                  style={{
                    border: "none",
                    outline: "none",
                    fontSize: "16px",
                    margin: "0.5rem",
                    width: "100%",
                  }}
                  onChange={(text) =>
                    handleChange("password", text.target.value)
                  }
                />
              </div>
            </div>

            <button
              className="modal-save pointer"
              style={{ fontSize: "14px", width: "105px" }}
              onClick={handleSubmit}
            >
              {loginType === "login" ? (
                <>
                  Login <FiLogIn size={20} style={{ marginLeft: "4px" }} />
                </>
              ) : (
                <>
                  Register{" "}
                  <MdOutlineAddReaction
                    size={20}
                    style={{ marginLeft: "4px" }}
                  />
                </>
              )}
            </button>
            <div
              style={{
                fontSize: "12px",
                color: "grey",
                display: "flex",
                marginTop: "10px",
              }}
            >
              Already have an account ?{"  "}
              <p
                style={{
                  display: "flex",
                  marginBlockStart: 0,
                  marginBlockEnd: 0,
                  marginLeft: "4px",
                  fontWeight: "900",
                  color: "#83a2ff",
                }}
                onClick={() =>
                  loginType === "login"
                    ? setLoginType("register")
                    : setLoginType("login")
                }
              >
                {" "}
                Sign {loginType === "login" ? "Up" : "In"}
              </p>
            </div>
          </div>
          <img
            src={loginImg}
            alt="login background"
            className="landing-bg"
            style={{
              height: "100%",
              width: "50%",
              borderTop: "6px solid #8bcd21",
              borderBottom: "6px solid #8bcd21",
              borderRadius: "10px",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default LoginModal;
