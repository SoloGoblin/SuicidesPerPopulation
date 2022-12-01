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
      //console.log(suicideData2);
      if(suicideData2[0]==countryName) {
        suicideStats[suicideData2[5]] = suicideData2[6];
      }
    }
    countries[countryName] = suicideStats;
  }

});
/*
for(let i=count; i<suicides.length; i++) {
  if(countryName!=suicideData[0]) {
    break;
  }
  if(countryName!="LOCATION") {
    suicideStats[suicideData[5]] = suicideData[6];
  }
}
*/
/*
let prevCountry;
let countryName = suicideInfo[0];
while(countryName == oldCountry) {
  suicides.forEach(function(suicide) {

    let suicideInfo = suicide.split(',');

    let countryName = suicideInfo[0];

    let suicideStats = {};

    if(countryName!="LOCATION") {
        suicideStats[suicideInfo[5]] = suicideInfo[6];
    }
      //console.log("year = " + suicideInfo[5] + ", amount = " + suicideInfo[6]);
      // Object.assign(countries[countryName], {suicideInfo[5]: suicideInfo[6]});
    }
    prevCountry = countryName;
  });
}
*/
/*
suicides.forEach(function(suicide) {

  let suicideInfo = suicide.split(',');

  let countryName = suicideInfo[0];

  let suicideStats = {};

  if(countryName!="LOCATION"){
    if(countryName = oldCountry) {
      suicideStats[suicideInfo[5]] = suicideInfo[6];

    } else {
      countries[countryName] = {};
    }
    //console.log("year = " + suicideInfo[5] + ", amount = " + suicideInfo[6]);
    // Object.assign(countries[countryName], {suicideInfo[5]: suicideInfo[6]});
  }
  oldCountry = suicideCounty;
});
*/

fs.writeFileSync('suicides.json', JSON.stringify(countries), 'utf8');
/*
console.log(countries)
Object.assign(countries, {"suicide stuff" : 12});
console.log(countries);
*/
