import {Container, Nav, Navbar, NavDropdown, InputGroup, Form }from 'react-bootstrap';
import Breadcrumbs from '../UI/Breadcrumbs/Breadcrumbs';
function NavbarUser() {

 return (
   <Navbar expand="lg" className="bg-body-tertiary d-flex justify-content-between" fixed='top'>
     <Breadcrumbs />
     {/* <InputGroup className="mb-3">
       <Form.Control
         placeholder="Введите название королевства"
         aria-label="Username"
         value={searchKingdom}
         onChange={e => setSearchKingdom(e.target.value)}
       />
     </InputGroup> */}
     <Container style={{ width: 'min-content', marginRight: '5%' }}>
       <Navbar.Brand href="/kingdom">ARK</Navbar.Brand>
       {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
       <Navbar.Collapse id="basic-navbar-nav">
         <Nav className="me-auto">
           <Nav.Link href="" style={{ whiteSpace: 'nowrap' }}>Мои походы</Nav.Link>
           <Nav.Link href="" style={{ whiteSpace: 'nowrap' }}>Список походов</Nav.Link>
           <Nav.Link href="" style={{ whiteSpace: 'nowrap' }}>Управлять княжествами</Nav.Link>
           <Nav.Link href="" style={{ whiteSpace: 'nowrap' }}>Создать княжество</Nav.Link>
           <NavDropdown title="Username" id="basic-nav-dropdown">
             <NavDropdown.Item href="">Модератор</NavDropdown.Item>
             <NavDropdown.Item href="">Выйти</NavDropdown.Item>
           </NavDropdown>
         </Nav>
       </Navbar.Collapse> */}
     </Container>
   </Navbar>
 );
}

export default NavbarUser;
