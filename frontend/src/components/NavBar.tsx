import { User } from "@/models/user";
import { Container, Navbar } from "react-bootstrap";

interface NavBarProps {
  loggedInUser: User | null;
  onLogInClicked: () => void;
  onSignUpClicked: () => void;
  onLogoutSuccessful: () => void;
}
const NavBar = ({
  loggedInUser,
  onLogInClicked,
  onSignUpClicked,
  onLogoutSuccessful,
}: NavBarProps) => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand>Cool Notes App</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBar;
