// import logo from './logo.svg';
import { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css';
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth"
import { getDatabase, ref, set, child, get } from "firebase/database";
import app from './components/config';
import TodoList from './components/TodoList.js';
import FullTimer from './components/fullTimer.js';
import DayTimer from './components/dayTimer.js';

import { Container, Row, Col, Button, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap'
import { useState } from 'react';

let stealIP = (auth) => {
  signInAnonymously(auth)
  .then(() => {
    // Signed in..
    console.log("Logged in Anonymously")
  })
  .catch(() => {
    console.log("Error")
  });
}

let writeUserData = (userId) => {
  const db = getDatabase(app);
  const dbRef = ref(getDatabase(app));
  get(child(dbRef, `users/${userId}`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      console.log("Old User");
    } else {
      console.log("New User");
      set(ref(db, 'users/' + userId), {
        first_login: new Date().toLocaleString(),
        ID: userId
      });
    }
  })
  .catch((error) => {
    console.log(error);
  });
}


const App = () => {
  
  const auth = getAuth(app);

  useEffect(() => {
    stealIP(auth)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        writeUserData(uid)
      } else {
        // User is signed out
        // ...
      }
    });
  });

  const [order, setOrder] = useState(1)
  const [orderList, setOrderList] = useState([])
  const [message, setMessage] = useState('');

  let inputList = document.getElementsByClassName('input')
  

  const orderIncrement = () => {
    setOrderList(orderList.concat(<TodoList order={order} function={(event) => setMessage(event.target.value)} keyDown={handleKeyDown}/>))
    setOrder(order+1)
    console.log(order, message)
  }

  const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        inputList[order-1].disabled = true
        console.log('Enter key pressed ✅');
      }
  }

  return (<>
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
          <Image 
            src='https://react-bootstrap.netlify.app/img/logo.svg'
            id='logo'
            height={30}
          />
        </Navbar.Brand>
        <Nav.Link href='#' id='logo-title'>My Reaction To That Information</Nav.Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="https://youtu.be/dQw4w9WgXcQ">About</Nav.Link>
            <NavDropdown title="Other Project" id="navbarScrollingDropdown">
              <NavDropdown.Item href="https://youtu.be/dQw4w9WgXcQ">choose-wife-Longlon</NavDropdown.Item>
              <NavDropdown.Item href="https://youtu.be/dQw4w9WgXcQ">choose-wife-nhk</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://youtu.be/dQw4w9WgXcQ">Liu's Day</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Rungs con</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="https://youtu.be/dQw4w9WgXcQ" disabled>Ngan Nhi Ha Phuong</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container>
      <Row>
        <Col lg={3} md={2} sm={2} className='blank'></Col>
        <Col lg={6} md={8} sm={8} className='mainApp'>
          <div className='date_render'>
            <FullTimer></FullTimer>
            <DayTimer></DayTimer>
          </div>
          <div className='task_render'>
            {orderList}
            <div className='btn-background'>
              <Button className='btn-circle' onClick={orderIncrement}>
                <i className='fa-2x fal fa-plus'></i>
              </Button>
            </div>
          </div>
        </Col>
        <Col lg={3} md={2} sm={2} className='blank'></Col>
      </Row>
    </Container></>
  );
}

export default App;