import {Container, Nav, Navbar, NavDropdown, InputGroup, Form }from 'react-bootstrap';

import Breadcrumbs from '../UI/Breadcrumbs/Breadcrumbs';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NavbarUser() {
  const { user, isAuthorized, isModerator, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    
  }, [user])

 return (
  <div>
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
        <Navbar.Brand onClick={() => navigate('/kingdom')}>ARK</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        { isAuthorized ? (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link style={{ whiteSpace: 'nowrap' }}>Мои походы</Nav.Link>
              <Nav.Link style={{ whiteSpace: 'nowrap' }}>Список походов</Nav.Link>
              { isModerator ? (
                <div>
                  <Nav.Link style={{ whiteSpace: 'nowrap' }}>Управлять княжествами</Nav.Link>
                  <Nav.Link style={{ whiteSpace: 'nowrap' }}>Создать княжество</Nav.Link>
                </div>

              ) :(
                <div></div>
              )}
              
              <NavDropdown title={user.Name} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={logout}>Выйти</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        ) : (
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/login')} style={{ whiteSpace: 'nowrap' }}>Войти</Nav.Link>
          </Nav>
        )}

      </Container>
    </Navbar>
    <div className='content' style={{marginTop: 56}} />
  </div>
 );
}

export default NavbarUser;
