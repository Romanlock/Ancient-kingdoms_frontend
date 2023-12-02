import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavbarUser() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/kingdom">ARK</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="">Мои походы</Nav.Link>
            <Nav.Link href="">Список походов</Nav.Link>
            <Nav.Link href="">Управлять княжествами</Nav.Link>
            <Nav.Link href="">Создать княжество</Nav.Link>
            <NavDropdown title="Username" id="basic-nav-dropdown">
              <NavDropdown.Item href="">Модератор</NavDropdown.Item>
              <NavDropdown.Item href="">Выйти</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarUser;
