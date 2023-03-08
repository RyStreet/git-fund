import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {logoUrl} from '../assets/logo';
import logo from '../assets/Logo.png';
import Homepage from '../pages/Homepage';
import Auth from '../utils/auth';
import { Icon, Image, Menu } from 'semantic-ui-react';

function NavBar() {
  const navigate=useNavigate()
  const handleLogout = (event) => {
    event.preventDefault();
    Auth.logout();
    
  }
  const [isMobile, setIsMobile] = useState(false);

  const handleSidebarToggle = () => {
    setIsMobile(!isMobile);
  };
  return (
    // <Menu stackable
    // // borderless
    // // className={` bg-light `}
    // className='nav'
    // >

  //   <Menu.Item>
  //     <Link to={'/'}>
  //       <Image src={logo} className="logo"  size='small' />
  //     </Link>
  //   </Menu.Item>

  //   <Menu.Menu position='right'>
  //     {Auth.loggedIn() ? (
  //       <>
  //       <Link to={'/'}>      
  //         <Menu.Item color='text-dark' className='text-large'  name='home' />
  //       </Link>
  //       <Link to={'/profile'}>
  //         <Menu.Item  color='text-dark' name='profile' />
  //       </Link>
  //        <Link onClick={handleLogout}>
  //         <Menu.Item  color='text-dark' name='logout' />
  //        </Link>
  //       </>
  //     ) : (
  //       <>
     
  //     <Link to={'/'}>
        
  //       <Menu.Item color='text-dark' className='text-large'  name='Home' />
  //     </Link>
  //       <Link to={'/signup'}>
        
  //         <Menu.Item  color='text-dark' name='Signup' />
  //       </Link>
  //       <Link to={'/login'}> 
  //         <Menu.Item  color='text-dark' name='Login' />
  //       </Link>
  //       </>
  //     )}
  //   </Menu.Menu>
  // </Menu>
  // )


    <Navbar className='nav' collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/"><img src={logo} className="logo" size='small' alt='gitfund logo'/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="flex-end" style={{fontSize:'20px', color:'black'}}>
            {Auth.loggedIn() ? (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Nav.Link as={Link} onClick={handleLogout}>Logout</Nav.Link>
              </> 
            ) : (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="signup">Sign Up</Nav.Link>
              </>
            )}            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;