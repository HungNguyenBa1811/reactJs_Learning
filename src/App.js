// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css';
import TodoList from './components/TodoList.js';
import FullTimer from './components/fullTimer.js';
import DayTimer from './components/dayTimer.js';

import { Container, Row, Col, Button } from 'react-bootstrap'
import { useState } from 'react';

const App = () => {
  const [order, setOrder] = useState(1)
  const [orderList, setOrderList] = useState([])
  const [message, setMessage] = useState('');

  let inputList = document.getElementsByClassName('input')

  const orderIncrement = () => {
    setOrderList(orderList.concat(<TodoList order={order} function={(event) => setMessage(event.target.value)} keyDown={handleKeyDown}/>))
    setOrder(order+1)
    console.log(order)
  }

  const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        inputList[order-1].disabled = true
        console.log('Enter key pressed ✅');
      }
  }

  return (
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
            <Button className='btn-circle' onClick={orderIncrement}>
              <i className='fa-2x fal fa-plus'></i>
            </Button>
          </div>
        </Col>
        <Col lg={3} md={2} sm={2} className='blank'></Col>
      </Row>
    </Container>
  );
}

export default App;