import { useState } from "react";
import { NavLink } from "react-bootstrap";
import { HelpCircle } from "react-feather";
import HelpModal from "../Modal/HelpModal";
import Modal from "react-modal";
import styled from "styled-components";

Modal.setAppElement("#root");

const Portfolio = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <NavContainer>
      <SelfLink href="https://www.marksmellie.co.uk/" className="nav-link">
        marksmellie.co.uk
      </SelfLink>

      <HelpLink onClick={toggleModal}>
        Help
        <HelpCircleStyled size={20} />
      </HelpLink>
      <HelpModal onClick={toggleModal} modalIsOpen={modalIsOpen} />
    </NavContainer>
  );
};

const NavContainer = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-column-gap: 5px;
  align-items: center;
  background-color: #222;
  color: #eee;
`;

const SelfLink = styled.a`
  grid-column: 2;
  justify-self: center;
  padding: 5px;
`;

const HelpLink = styled(NavLink)`
  grid-column: 3;
  justify-self: flex-end;
  padding: 5px;
`;

const HelpCircleStyled = styled(HelpCircle)`
  padding-left: 2px;
`;

export default Portfolio;
