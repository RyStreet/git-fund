import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {logoUrl} from '../assets/logo';
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
    <Menu stackable
    // borderless
    className={` bg-dark`}
    >

    <Menu.Item>
      <Image src={logoUrl}  size='small' />
    </Menu.Item>

    <Menu.Menu position='right'>
      {Auth.loggedIn() ? (
        <>
        <Link to={'/'}>
        
          <Menu.Item color='text-light' className='text-large'  name='home' />
        </Link>
        <Link to={'/profile'}>
          <Menu.Item  color='text-light' name='profile' />
        </Link>
         <Link onClick={handleLogout}>
          <Menu.Item  color='text-light' name='logout' />
         </Link>
        </>
      ) : (
        <>
     
      <Link to={'/'}>
        
        <Menu.Item color='text-light' className='text-large'  name='home' />
      </Link>
        <Link to={'/signup'}>
        
          <Menu.Item  color='text-light' name='signup' />
        </Link>
        <Link to={'/login'}> 
          <Menu.Item  color='text-light' name='signin' />
        </Link>
        </>
      )}
    </Menu.Menu>
  </Menu>
  )

  // return (
  //   <Navbar collapseOnSelect expand="lg" style={{margin:'20px'}} bg="dark" variant="dark">
  //     <Container>
  //       <Navbar.Brand as={Link} to="/"><img className='logo' alt='GitFund' src={logoUrl}/>
  //       </Navbar.Brand>
  //       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  //       <Navbar.Collapse id="responsive-navbar-nav">
  //         <Nav className="flex-end">
  //           {Auth.loggedIn() ? (
  //             <>
  //               <Nav.Link as={Link} to="/">Home</Nav.Link>
  //               <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
  //               <Nav.Link as={Link} onClick={logout}>Logout</Nav.Link>
  //             </> 
  //           ) : (
  //             <>
  //               <Nav.Link as={Link} to="/">Home</Nav.Link>
  //               <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
  //               <Nav.Link as={Link} to="/login">Login</Nav.Link>
  //               <Nav.Link as={Link} to="signup">Sign Up</Nav.Link>
  //             </>
  //           )}            
  //         </Nav>
  //       </Navbar.Collapse>
  //     </Container>
  //   </Navbar>
  // );
}

export default NavBar;