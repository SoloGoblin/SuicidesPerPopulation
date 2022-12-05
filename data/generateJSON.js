const fs = require('fs');

let countries = {};

let suicides_csv = fs.readFileSync('suicideCSV.csv', 'utf8');

let suicides = suicides_csv.split("\n");

let countryName;

suicides.forEach(function(suicideLine) {

  let suicideData = suicideLine.split(',');

  countryName = suicideData[0];
  if((suicideData[0]!="LOCATION")&&(suicideData[2]=="TOT")) {
    let suicideStats = {};
    for(let i=0; i< suicides.length; i++) {
      let suicideData2 = suicides[i].split(',');
      if(suicideData2[0]==countryName) {
        suicideStats[suicideData2[5]] = suicideData2[6];
      }
    }
    countries[countryName] = suicideStats;
  }

});
fs.writeFileSync('suicides.json', JSON.stringify(countries), 'utf8');
