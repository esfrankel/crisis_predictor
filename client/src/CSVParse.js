// import * as d3 from "d3";
// import { parse } from "querystring";


//   export function parse(cb){
      
//     d3.csv("./src/stocks.csv", function(data) {
//         cb(data);
//     console.log(data[0]);
//   });
// }
import stocks1 from "./stocks.csv"
import stocks2 from "./stocks.csv"
import * as d3 from "d3-fetch";
import alpha2 from "./Alpha2.json"

const allStocks = {
    "stocks1": stocks1,
    "stocks2": stocks2
}

// export default function parse(fileName, cb){
      
//     d3.csv("./src/stocks.csv", function(data) {
//         cb(data);
//         console.log(data[0]);
//   });
// }

export default function parse(fileName) {
// d3.csv("./stocks.csv", function(d) {
//     return {
//       Country : d.Country,
//       Year : +d.Year, 
//       AvgDiffScore : +d.AvgDiffScore,
//       AvgDiffPe : +d.AvgDiffPe,
//       AvgDiffPb : +d.AvgDiffPb
//     };
//   }, function(data) {
//     console.log(data[0]);
//   });

return d3.csv(allStocks[fileName]).then(function(data) {

    var i = 1;

    data = data.filter(function(d) {
        return alpha2.find(function(country){ return country.name === d.Country })
    }).map(function(d) {
        var code = alpha2.find(function(country){ return country.name === d.Country })["alpha-2"];
        return {
            Country : d.Country,
            Alpha2 : code,
            Id : i++,
            Year : +d.Year, 
            AvgDiffScore : +d.AvgDiffScore,
            AvgDiffPe : +d.AvgDiffPe,
            AvgDiffPb : +d.AvgDiffPb,
            PNG : code.toLowerCase() + ".png"


          }
    });
    console.log(data); // [{"Hello": "world"}, …]
    return data;
  });
}