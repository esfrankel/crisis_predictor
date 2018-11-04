import CVSParse from "../CSVParse.js"
import React from 'react';
import {Bar} from 'react-chartjs-2';

class BarChart extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      dataSet: null,
    };
  }

  componentDidMount() {
    const entry = this.props.state.countryToggled;
    fetch('http://127.0.0.1:5000/loc?country='+entry)
    .then(response => response.json())
    .then(data => this.setState({ dataSet: data }));
    console.log(this.dataSet);
  }

render() {

 var data = {
      labels: ["Overall Score", "Structural", "Economic", "Current Events", "Sentiment Analysis"],
      datasets: [{
          label: 'Value (scaled to 1)',
          data: this.state.dataSet,
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
    }
  var options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }

    return(
      <Bar
    data={data}
    width={10}
    height={5}
    options={{
        maintainAspectRatio: true, offsetWidth:0
    }}
/>
    )
  }
}
export default BarChart;
