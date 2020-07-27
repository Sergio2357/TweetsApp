import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import
 { 
   RiEmotionHappyLine, 
   RiEmotionSadLine,
   RiEmotionNormalLine
} from 'react-icons/ri'
import { FaHandshake } from 'react-icons/fa'
import { AiFillLike } from 'react-icons/ai';
import Divider from '@material-ui/core/Divider';

const POSITIVEStyle = {
    color: '#4DB220',
  };

const NEGATIVEStyle = {
    color: '#BA202F',
  };

export default class SummaryTable extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
        }
      };

    render() {
        const { data, cityName } = this.props;
        let Filtdata = null
        let cityNameshow = 'All Cities'
        if (cityName === null) {
            Filtdata = data.filter(item => item.city === "Total");
        } else {
            Filtdata = data.filter(item => item.city === cityName);
            cityNameshow = cityName
        }
        const aggdataFear = Filtdata.map(item => {return item.fear})
        const aggdataJoy = Filtdata.map(item => {return item.joy})
        const aggdataAnger = Filtdata.map(item => {return item.anger})
        const aggdataTrust = Filtdata.map(item => {return item.trust})
        const aggdataGnrl = Filtdata.map(item => {return item.suma})

        const trust = `${aggdataTrust | 0}` + '%'
        const fear = `${aggdataFear | 0}` + '%'
        const anger = `${aggdataAnger | 0}` + '%'
        const joy = `${aggdataJoy | 0}` + '%'

        const trustjoy = `${(aggdataTrust[0] + aggdataJoy[0])/2 | 0}` + '%'
        const angerfear = `${(aggdataAnger[0] + aggdataFear[0])/2 | 0}` + '%'

        return (
            <Container style={{margin:'auto', width:'80%'}}>
                <h4 style={{marginBottom:'20px'}}><strong>General Summary: </strong>{cityNameshow}</h4>
                <Row>
                    <Col>
                        <a><RiEmotionHappyLine size={50}/></a>
                        <div>
                            <h5>Joy</h5>
                        </div>
                    </Col>
                    <Col>
                        <a><FaHandshake size={50}/></a>
                        <div>
                            <h5>Trust</h5>
                        </div>
                    </Col>
                    <Col>
                        <a><RiEmotionSadLine size={50}/></a>
                        <div>
                            <h5>Fear</h5>
                        </div>
                    </Col>
                    <Col>
                        <a><RiEmotionNormalLine size={50}/></a>
                        <div>
                            <h5>Anger</h5>
                        </div>
                    </Col>
                </Row>
                <p style={{height:'10px'}}></p>
                <Row>
                    <Col>
                        <h3 style={POSITIVEStyle}>{joy}</h3>
                    </Col>
                    <Col>
                        <h3 style={POSITIVEStyle}>{trust}</h3>
                    </Col>
                    <Col>
                        <h3 style={NEGATIVEStyle}>{fear}</h3>
                    </Col>
                    <Col>
                        <h3 style={NEGATIVEStyle}>{anger}</h3>
                    </Col>
                </Row>
                {/* <Divider/> */}
                <Row>
                    <Col>
                        <h2 style={POSITIVEStyle}>{trustjoy}</h2>
                        <div>
                            <h5>Positive</h5>
                        </div>
                    </Col>
                    <Col>
                        <h2 style={NEGATIVEStyle}>{angerfear}</h2>
                        <div>
                            <h5>Negative</h5>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}