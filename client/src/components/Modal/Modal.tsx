import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import { UserContext } from "../../context";

interface ModalProps {
  text: string;
  variant: "primary" | "danger";
  isSignupFlow: boolean;
}

const ErrorMessage = styled.p`
  color: red;
`;

const ModalComponent = ({ text, variant, isSignupFlow }: ModalProps) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const [state, setState] = useContext(UserContext);

  const handleClick = async () => {
    let response;
    if (isSignupFlow) {
      const { data: signupData } = await axios.post(
        "https://subscription-app-eight.vercel.app/auth/signup",
        {
          email,
          password,
        }
      );
      response = signupData;
    } else {
      const { data: loginData } = await axios.post(
        "https://subscription-app-eight.vercel.app/auth/login",
        {
          email,
          password,
        }
      );
      response = loginData;
    }

    if (response.errors.length) {
      return setErrorMsg(response.errors[0].msg);
    }

    setState({
      data: {
        id: response.data.user.id,
        email: response.data.user.email,
        stripeCustomerId: response.data.user.stripeCustomerId,
      },
      loading: false,
      error: null,
    });

    localStorage.setItem("token", response.data.token);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`;
    navigate("/articles");
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleShow}
        variant={variant}
        size="lg"
        style={{ marginRight: "1rem", padding: "0.5rem 3rem" }}
      >
        {text}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomInputGroup>
            <InputGroup.Text>Email</InputGroup.Text>
            <FormControl
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </CustomInputGroup>
          <InputGroup>
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            {text}
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

const CustomInputGroup = styled(InputGroup)`
  margin-bottom: 3px;
`;

export default ModalComponent;
