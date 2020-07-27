import React from 'react';
import Tour from 'reactour';
import EpidemMap from '../components/EpidemMap';
import RegularPlot from '../components/GraphExample';
import SummaryTable from '../components/Summary';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import '../App.css';
import { Container, Row, Col } from 'react-bootstrap';
import BARNS from '../data/barns.json';
import AGGdata from '../data/aggdata.json';
import AGGdataCity from '../data/aggdata_city.json'
import CITIES from '../data/farms.json';
import summaryData from '../data/summary.json'
import { BsInfoCircle } from  'react-icons/bs'


const marks = [
    {
      value: 0,
      label: 'Jan',
    },
    {
      value: 10,
      label: 'Febr',
    },
    {
        value: 20,
        label: 'March',
    },
    {
        value: 30,
        label: 'April',
    },
    {
        value: 40,
        label: 'May',
    },
    {
        value: 50,
        label: 'June',
    },
    {
        value: 60,
        label: 'July',
    },
    {
        value: 70,
        label: 'August',
    },
  ];
const monthName = {
    0: "January",
    10:"February",
    20:"March",
    30:"April",
    40:"May",
    50:"June",
    60:"July",
    70:"August"
}

export class Epidemia extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            farmName: null,
            month: 'July',
            tourOpen: false
        }
    };
    
    openTour = () => {
        this.setState({ tourOpen: true })
      }
    
    closeTour = () => {
        this.setState({ tourOpen: false })
      }

    _onClickMarker = city => {
        this.setState({farmName: city.farm});
    };
    
    handleChange = (event, newValue) => {
        const value = monthName[newValue.toString()]
        this.setState({month: value});
        console.log(this.state)
      };

    resetCities = (event) => {
        this.setState({farmName: null});
      };

    render() {
        const farm = this.state.farmName
        const month = this.state.month
        const tourOpen = this.state.tourOpen
        
        let dataAgg = null
        if (farm === null) {
            dataAgg = AGGdata
        } else {
            dataAgg = AGGdataCity
        }

        return (
            <div className='epidemia_view'>
                <Tour
                    steps={[
                        {
                            selector: '.epidemmaptour',
                            content: "Scroll the Map for more detail",
                            position: 'bottom'
                        },
                        {
                            selector: '.slidertour',
                            content: "Select a date to see that month's tweets on the map",
                            position: 'bottom'
                        },
                        {
                            selector: '.summarytour',
                            content: "You can see the summary of the feelings here",
                            position: 'bottom'
                        },
                        {
                            selector: '.plottour',
                            content: "You can see the monthly summaries of the feelings of the messages in this graph",
                            position: 'bottom'
                        },
                        {
                            selector: '.pin',
                            content: "Double click on the cities to filter the data",
                            position: 'bottom'
                        },
                        {
                            selector: '.buttontour',
                            content: "Click the button to return to all cities",
                            position: 'bottom'
                        }
                    ]}
                    isOpen={tourOpen}
                    rounded={30}
                    onRequestClose={this.closeTour}
                />
                <span className="title help" onClick={() => this.openTour()}> <BsInfoCircle/> Tour </span>
                <Container className='container-epmap'>
                    <Row>
                        <Col>
                            <div className="epidemmaptour" >
                                <EpidemMap BARNS={BARNS} FARMS={CITIES} onClickMarker={this._onClickMarker} Month={month}/>
                                <div style={{marginTop:'12px'}}>
                                    <Row>
                                        <Slider
                                            className="slidertour"
                                            defaultValue={60}
                                            aria-labelledby="discrete-slider-restrict"
                                            step={10}
                                            marks={marks}
                                            valueLabelDisplay="off"
                                            onChangeCommitted={this.handleChange}
                                            style={{marginTop:'12px', marginLeft:'12px'}}
                                        />
                                        <button className="button4 buttontour" onClick={this.resetCities}>Reset Cities</button>
                                    </Row>
                                    
                                </div>
                            </div>
                        </Col>
                        <Col className="summarytour" style={{marginTop:'5em', marginLeft:'12em'}}>
                            <SummaryTable data={summaryData} cityName={farm} />
                        </Col>
                    </Row>
                    <Row className="plottour">
                        <RegularPlot aggdata={dataAgg} farmName={farm} />
                    </Row>
                </Container>
            </div>
        )
    }
}

