const fs = require('fs');

let countries = {};

let suicides_csv = fs.readFileSync('suicideCSV.csv', 'utf8');

let suicides = suicides_csv.split("\n");

suicides.forEach(function(suicide) {
  let suicideInfo = suicide.split(',');

  let suicideCountry = suicideInfo[0];

  if(suicideCountry!="LOCATION"){
    let suicideStats = {};
    suicideStats['year'] = suicideInfo[5];
    suicideStats['value'] = suicideInfo[6];

    countries[suicideCountry]=suicideStats;
  }
});

fs.writeFileSync('suicides.json', JSON.stringify(countries), 'utf8');
