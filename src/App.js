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
  const db = getDatabase(app);
  const dbRef = ref(getDatabase(app));

  const [currentUserID, setCurrentUserID] = useState('')
  const [order, setOrder] = useState(1)
  const [orderDOMList, setOrderDOMList] = useState([])
  const [orderData, setOrderData] = useState([])
  const [authCheck, setAuthCheck] = useState(()=> {
    return false
  })

  // let inputList = document.getElementsByClassName('input')
  // const getKeyByValue = (object, value) => {
  //   return Object.keys(object).find(key => object[key] === value);
  // }

  const automaticallySignIn = (authApp) => {
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
    setCurrentUserID(userId);
    get(child(dbRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("Data Available");
        
        let dataFetch = snapshot.val() // Collect data from firebase
        if(dataFetch.task && order === 1){ // Have data but not up-to-date

          let parseData = JSON.parse(dataFetch.task)
          console.log("have data but no checkpoint", parseData)
          setOrderData(prev => prev.concat(parseData))
          setOrder(dataFetch.currentState)
          reRender(parseData)

        }
      } else {
        console.log("Newbie");
        set(ref(db, 'users/' + userId), {
          first_login: new Date().toLocaleString(),
          ID: userId,
          currentState: 1,
          task: []
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const reRender = (arrayObj) => {
    let forceUpdateArray=[]
    for(let obj of arrayObj){
      // console.log(obj,forceUpdateArray)
      forceUpdateArray.push(<TodoList order={obj.id} isChecked={obj.checked} isDisabled={true} key={"Order number " + obj.id} text_value={obj.text} removeFunction={orderDecrement} keyDown={handleKeyDown}/>)
    }
    setOrderDOMList(forceUpdateArray)
  }

  function updateTasks(data) {

    const updates = {};
    let stringData = JSON.stringify(data)
    console.log("data phase",data)
    updates['/posts-cache/' + currentUserID + '/'] = stringData;
    updates['/users/' + currentUserID + '/task/' ] = stringData;
    updates['/users/' + currentUserID + '/currentState/' ] = order+1;
    
    return update(ref(db), updates);
  }


  const orderIncrement = () => {
    setOrderDOMList([...orderDOMList, <TodoList order={order} isChecked={false} isDisabled={false} key={"Order number " + order} text_value={''} removeFunction={orderDecrement} keyDown={handleKeyDown}/>])
    setOrder(order+1)
  }

  const orderDecrement = (event) => {
    // orderList.splice(Number(event.target.id)-1,1)
    let currentTask = JSON.parse(localStorage.getItem("List of Task"))
    // currentTask.splice(Number(event.target.id)-1, 1)
    // me.splice(Number(event.target.id)-1,1)
    // const found = currentTask.find((task)=>task)
    console.log(event.target, event.target.id, currentTask)
    // delete taskInputList[event.target.id]
    // let uid = localStorage.getItem("ID")
    // updatePosts(taskInputList,uid)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log('Sucess ✅');
      let newData = {
        id: event.target.id,
        text: event.target.value,
        checked: false,
        textDisabled: true,
        timeCreated: new Date().toLocaleString(),
      }
      let concatData = [...orderData, newData]
      setOrderData(concatData)
      updateTasks(concatData)
      // console.log(orderData)

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

  const authState = () => {
    onAuthStateChanged(auth, (user) => {
      setAuthCheck(true)
      if (user) {
        // User state: signed in (old user)
        const uid = user.uid;
        writeUserData(uid)
        console.log(orderDOMList)
        console.log(orderData)
      } else {
        automaticallySignIn(auth)
        // User state: not signed in/ new user
        // ...
      }
    });
  }

  useEffect(() => {
    if(!authCheck){
      authState()
    } else {
      writeUserData(currentUserID)
    }
  },[]);
  // console.log(taskInputList)

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
            {orderDOMList}
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