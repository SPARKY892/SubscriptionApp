import ReactDOM from "react-dom";
import { X } from "react-feather";
import styled from "styled-components";

type HelpModalProps = {
  onClick: () => void;
  modalIsOpen: boolean;
};

const HelpModal = ({ onClick, modalIsOpen }: HelpModalProps) => {
  if (modalIsOpen) {
    return ReactDOM.createPortal(
      <Modal onClick={onClick}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalTitle>Help</ModalTitle>
          <ModalClose onClick={onClick} size={48}></ModalClose>
          <ModalText>
            Thanks for visiting my project. The purpose of this site is to
            demonstrate user authentication and Stripe integration in a React
            application with an Express and MongoDB backend.
            <br />
            <br />
            Users can sign up and then "purchase" a membership to the site.
            Stripe is configured in test mode so the card number 4242 4242 4242
            4242 and then any combination of valid expiry date and security
            number is accepted.
            <br />
            <br />
            Once a plan is purchased the "articles" visible to the user will
            depend on the level of subscription they have.
          </ModalText>
        </ModalContent>
      </Modal>,
      document.body
    );
  }

  return <></>;
};

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  width: 50%;
  height: 50%;
  min-width: 300px;
  max-width: 700px;
  background-color: #eee;
  display: grid;
  grid-template-areas:
    ". a b"
    "c c c";
  grid-template-rows: 50px auto;
  grid-template-columns: 33.3% 33.4% 33.3%;
  justify-items: center;
`;

const ModalTitle = styled.div`
  grid-area: a;
  height: auto;
  width: auto;
  text-decoration: underline;
  font-size: xx-large;
  padding-top: 5px;
  justify-content: center;
`;

const ModalClose = styled(X)`
  grid-area: b;
  justify-self: flex-end;
  &:hover {
    cursor: pointer;
  }
`;

const ModalText = styled.p`
  grid-area: c;
  font-size: large;
  padding: 10px;
`;

export default HelpModal;
