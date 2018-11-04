import CVSParse from "../CSVParse.js"
import React from 'react';
import {Bar} from 'react-chartjs-2';

class BarChart extends React.Component{
  constructor(props) {
    super(props);
  }
render() {
  const countryItems = {};
  for (var i = 0; i < this.props.state.countries.length; i++ ) {
    var country = this.props.state.countries[i];
    if (countryItems[country.Country]) {
      if (country.Year > countryItems[country.Country].Year) {
        countryItems[country.Country] = country;
      }
    }
    else {
      countryItems[country.Country] = country;
    }
  }
 var data = {
      labels: ["AvgDiffScore", "AvgDiffPe", "AvgDiffPb"],
      datasets: [{
          label: 'Value (scaled to 1)',
          data: [country.AvgDiffScore, country.AvgDiffPe, country.AvgDiffPb],
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
    width={100}
    height={50}
    options={{
        maintainAspectRatio: false, offsetWidth:0
    }}
/>
    )
  }
}
export default BarChart;
