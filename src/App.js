// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css';
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth"
import { getDatabase, ref, set, child, get, update } from "firebase/database";
import app from './components/config';
import TodoList from './components/TodoList.js';
import FullTimer from './components/fullTimer.js';
import DayTimer from './components/dayTimer.js';

import { Container, Row, Col, Button, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap'
import { useEffect, useState } from 'react';

const App = () => {

  const auth = getAuth(app);
  const [order, setOrder] = useState(1)
  const [orderList, setOrderList] = useState([])
  const [taskInputList, setTaskInputList] = useState({})
  // const [message, setMessage] = useState('');
  let inputList = document.getElementsByClassName('input')
  // let taskRemoveList = document.getElementsByClassName('task_remove')

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
  }

  const stealIP = (authApp) => {
    signInAnonymously(authApp)
    .then(() => {
      // Signed in..
      console.log("Logged in Anonymously")
    })
    .catch(() => {
      console.log("Error")
    });
  }
  
  const writeUserData = (userId) => {
    const db = getDatabase(app);
    const dbRef = ref(getDatabase(app));
    get(child(dbRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("Old User");
        // taskInputList
        localStorage.setItem("ID", snapshot.val().ID)
        let dataFetch = snapshot.val()
        if(dataFetch.task && order === 1){
          // console.log(dataFetch.task)
          // console.log(typeof dataFetch.task)
          // // reRender(dataFetch.task)
          setTaskInputList(Object.assign(taskInputList, dataFetch.task))
          setOrder(Number(getKeyByValue(taskInputList, Object.values(taskInputList).reduce((a, b) => taskInputList[a] > taskInputList[b] ? a : b)))+1)
          reRender(dataFetch.task)
          // updatePosts(taskInputList,userId)
          
        }
      } else {
        console.log("New User");
        set(ref(db, 'users/' + userId), {
          first_login: new Date().toLocaleString(),
          ID: userId,
          task: {}
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function updatePosts(data,uid) {
    const db = getDatabase(app);

    // A post entry.
    // const postData = data

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['/posts/' + uid + '/'] = data;
    updates['/users/' + uid + '/task/' ] = data;
    
    return update(ref(db), updates);
  }

  const reRender = (object) => {
    let arrayUpdate = []
    for(let i of Object.keys(object)){
      arrayUpdate = arrayUpdate.concat(<TodoList order={Number(i)} key={"Order number " + i} text_value={object[i]} removeFunction={orderDecrement} keyDown={handleKeyDown}/>)
      // console.log(arrayUpdate)
    }
    localStorage.setItem("List of Task", JSON.stringify(arrayUpdate))
    setOrderList(orderList.concat(arrayUpdate))
    // console.log(orderList,object)
  }

  const orderIncrement = () => {
    setOrder(order+1)
    setOrderList(orderList.concat(<TodoList order={order} isChecked={false} isDisabled={false} key={"Order number " + order} text_value={''} removeFunction={orderDecrement} keyDown={handleKeyDown}/>))
    // console.log(orderList)
  }

  const orderDecrement = (event) => {
    // orderList.splice(Number(event.target.id)-1,1)
    let me = orderList
    // me.splice(Number(event.target.id)-1,1)
    console.log(event.target, event.target.id, me)
    // delete taskInputList[event.target.id]
    // let uid = localStorage.getItem("ID")
    // updatePosts(taskInputList,uid)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      let uid = localStorage.getItem("ID")
      inputList[Number(event.target.id)-1].disabled = true
      console.log('Sucess ✅');
      taskInputList[event.target.id] = event.target.value
      // Object.assign(taskInputList)
      updatePosts(taskInputList,uid)
      event.target.parentElement.children[0].children[1].classList.remove("invisible")

      // if(checkOverflow(event.target)){
      //   event.target.rows = 2
      // }
    }
  }

  // const checkOverflow = (el) => {
  //   let curOverflow = el.style.overflow;

  //   if ( !curOverflow || curOverflow === "visible" )
  //       el.style.overflow = "hidden";

  //   let isOverflowing = el.clientWidth < el.scrollWidth 
  //       || el.clientHeight < el.scrollHeight;

  //   el.style.overflow = curOverflow;

  //   return isOverflowing;
  // }


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User state: signed in (old user)
        const uid = user.uid;
        // console.log(user)
        writeUserData(uid)
        // console.log(!taskInputList[1])
        if(taskInputList[1]){
          updatePosts(taskInputList,uid)
        }
      } else {
        stealIP(auth)
        // User state: not signed in/ new user
        // ...
      }
    });
  });
  // console.log(taskInputList)

  return (<>
    <Navbar expand="lg">
      <Container fluid onClick={()=>console.log(orderList)}>
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
              <NavDropdown.Item href="https://choose-wife-nhk.netlify.app/">choose-wife-nhk</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://youtu.be/dQw4w9WgXcQ">Liu's Day</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://speedmath-dungcon.netlify.app/">Rungs con</NavDropdown.Item>
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