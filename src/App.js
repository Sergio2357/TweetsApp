import React from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import twiiter from './images/twiiter.png';
import twente from './images/twente.jpeg'

import { Container, Row, Col } from 'react-bootstrap';

import { Epidemia } from './views/Epidemiological';

function App() {
  return (
    <div className="App">
        <header className="App-header">
            <Container>
                <Row>yarn
                    <Col xs={7}>
                        <div>
                            <h1 style={{marginTop: "20px"}}>
                            Covid-19 vaccine echos in social media
                            </h1>
                            <div className="credits"><a>data powered by <img style={{width:"1.5em"}}alt="twiiterimg" src={twiiter}/></a></div>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <img alt='twente' src={twente}></img>
                        </div>
                    </Col>
                </Row>
            </Container>
        </header>
        <Epidemia />
    </div>
  );
}

export default App;
