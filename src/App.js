// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css';
import TodoList from './components/TodoList';

import { Container, Row, Col, Button } from 'react-bootstrap'

function App() {
  return (
    <Container>
      <Row>
        <Col lg={3} md={2} sm={2} className='blank'></Col>
        <Col lg={6} md={8} sm={8} className='mainApp'>
          <div className='task_render'>
            <TodoList order={1}/>
            <TodoList order={2}/>
            <TodoList order={3}/>
            <TodoList order={4}/>
            <Button className='btn-circle'>
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
