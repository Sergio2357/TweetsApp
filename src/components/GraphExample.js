import React from 'react';
import Plot from 'react-plotly.js';

export default class RegularPlot extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
        }
      };

    render() {
        const {aggdata, farmName} = this.props;
        let Filtaggdata = null
        let cityName = 'All Cities'
        if (farmName === null) {
            Filtaggdata = aggdata
        } else {
            Filtaggdata = aggdata.filter(item => item.city === farmName);
            cityName = farmName
        }
        const barnNames = Filtaggdata.map(item => {return `${item.month_name}`})
        const aggdataFear = Filtaggdata.map(item => {return item.fear})
        const aggdataJoy = Filtaggdata.map(item => {return item.joy})
        const aggdataAnger = Filtaggdata.map(item => {return item.anger})
        const aggdataTrust = Filtaggdata.map(item => {return item.trust})
        const aggdataGnrl = Filtaggdata.map(item => {return item.general})
        
        return (
        <Plot
            data={[
            {
                x: barnNames,
                y: aggdataTrust,
                type: 'scatter',
                marker: {
                    color: '#4DB220'
                },
                fill: 'tozeroy',
                name: 'Trust',
                mode:'lines'
            },
            {
                x: barnNames,
                y: aggdataJoy,
                marker: {
                    color: '#AFEC94'
                },
                fill: 'tonexty',
                type: 'scatter',
                name: 'Joy',
                mode:'lines'
            },
            {
                x: barnNames,
                y: aggdataFear,
                marker: {
                    color: '#BA202F'
                },
                fill: 'tozeroy',
                type: 'scatter',
                name: 'Fear',
                mode:'lines'
            },
            {
                x: barnNames,
                y: aggdataAnger,
                marker: {
                    color: '#FAE2E4'
                },
                fill: 'tonexty',
                type: 'scatter',
                name: 'Anger',
                mode:'lines'
            },
            {
                x: barnNames,
                y: aggdataGnrl,
                type: 'lines',
                line: {
                    color: 'rgb(0,0,0)',
                    width: 5
                  },
                name: 'Average'
            }
            ]}
            layout={ 
                {
                    width: 1100, 
                    height: 500, 
                    title: {
                        text:'<b>Vaccine emotion percentage:</b> ' + `${cityName}`,
                        font: {
                          size: 24
                        }
                    }
                }}
        />
        );
    }
}