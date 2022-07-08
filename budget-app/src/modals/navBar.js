import { Navbar, Nav, Container } from 'react-bootstrap';
import React from 'react'; 
// import ProfilePage from '../Pages/ProfilePage';
// import HomePage from '../Pages/homePage'
// import AnalyticsPage from '../Pages/AnalyticsPage';
import {BiLogOut} from 'react-icons/bi';
import jwt_decode from 'jwt-decode'



const NavBar = () => {

  let token = localStorage.getItem("auth");
  let name
  if(token){
    let decode = jwt_decode(token);
    name = decode.name;
  }
  

  function checkRoute(text){
    if(text == window.location.pathname)
      return true;
    
    return false;
  }

  function logout() {
    localStorage.setItem("auth","");
    window.location.replace("/");
  }

  return (
    <Navbar sticky='top' className="nav" variant="dark">
      <Container className="container">
        <Navbar.Brand>MyExpenseManager</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link className={ checkRoute("/home") ?  'nav-link selected-link'  :  'nav-link'} href="/home">Home</Nav.Link>
          <Nav.Link className={ checkRoute("/analytics") ?  'nav-link selected-link'  :  'nav-link'} href="/analytics">Analytics</Nav.Link>
          <Nav.Link className={ checkRoute("/profile") ?  'nav-link selected-link'  :  'nav-link'} href="/profile">Profile</Nav.Link>
        </Nav>
        <span className="navbar-text d-flex flex-row">
          <div className="mx-2 align-self-center font-weight-bold" style={{color:"white"}}>{"Welcome " +name.toUpperCase()}</div>
          <BiLogOut size="30" className="mx-2 logout align-self-center logout-icons" onClick={logout}/>
        </span>
      </Container>
      </Navbar>
    
      
    )
}

export default NavBar

