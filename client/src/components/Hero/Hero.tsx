import styled from "styled-components";
import { Container } from "react-bootstrap";
import ModalComponent from "../Modal/Modal";

const Hero = () => {
  return (
    <HeroComponent>
      <Container>
        <HeaderContainer>
          <Heading>Feed your mind with the best</Heading>
          <SubHeading>
            Become more successful by reading some of the top articles by
            professionals
          </SubHeading>
          <ModalComponent text="Signup" variant="primary" isSignupFlow={true} />
          <ModalComponent text="Login" variant="danger" isSignupFlow={false} />
        </HeaderContainer>
      </Container>
    </HeroComponent>
  );
};

const HeroComponent = styled.header`
  background-image: url("https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80");
  height: 60vh;
  padding: 10% 0;
  background-size: cover;
  background-position: top;
`;

const HeaderContainer = styled.div`
  background-color: rgb(5, 148, 112);
  padding: 3rem;
  color: white;
  width: 32.5rem;
`;

const Heading = styled.h1`
  font-size: 5rem;
`;

const SubHeading = styled.h3`
  margin: 1rem 0;
  font-weight: 400;
`;

export default Hero;
