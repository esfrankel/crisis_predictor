import React from 'react';
import {Line} from 'react-chartjs-2';

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSetPb: [],
      dataSetPe: [],
      dataSetScore: [],
      years: [],
    }
  }

  componentDidMount() {
    const entry = this.props.state.countryToggled;
    let pb = [], pe = [], score = [], year = [], numStart=0;
    for (var num = 0; num < this.props.state.countries.length; num++) {
      if(this.props.state.countries[num].Country==(entry)){
        numStart = num;
        break;
      }
    }
    console.log(numStart);
    for(var i = 0; i<35; i++){
        if(this.props.state.countries[numStart+i].Country==(entry)){
          pb.unshift(this.props.state.countries[numStart+i].AvgDiffPb);
          pe.unshift(this.props.state.countries[numStart+i].AvgDiffPe);
          score.unshift(this.props.state.countries[numStart+i].AvgDiffScore);
          year.unshift(this.props.state.countries[numStart+i].Year);
          }
        }

    this.setState({ dataSetPb: pb });
    this.setState({ dataSetPe: pe });
    this.setState({ dataSetScore: score});
    this.setState({ years: year });
}

  render() {
    var data = {
      labels: this.state.years,
      datasets: [{
        label: 'P/E Change Over Time',
        fillColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: "#3e95cd",
        data: this.state.dataSetPe,
      },
      {
        label: 'P/B Change Over Time',
        fillColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: "#3cba9f",
        data: this.state.dataSetPb,
      },
      {
        label: 'BlackRock Score Change Over Time',
        fillColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: "#000000",
        data: this.state.dataSetScore,
      },
    ]
    }
    return(
      <Line data = {data} width = {20} height = {10} options = {{
        maintainAspectRatio: true, offsetWidth: 0
      }} />
    )
  }
}

export default LineChart;
