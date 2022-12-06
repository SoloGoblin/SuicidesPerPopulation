const fs = require('fs');

let countries = {};

let suicides_csv = fs.readFileSync('suicideCSV.csv', 'utf8');

let suicides = suicides_csv.split("\n");

let countryName;

let macroAvg="622";

let qualitativeCompLess="The total suicides in this counrty is lesser than the average among all countries included from 1960 until 2020.";
let qualitativeCompMore="The total suicides in this counrty is greater than the average among all countries included from 1960 until 2020.";
let qualitativeCompEq="The total suicides in this counrty is the same as the average among all countries included from 1960 until 2020.";

suicides.forEach(function(suicideLine) {

  let suicideData = suicideLine.split(',');

  countryName = suicideData[0];
  if((suicideData[0]!="LOCATION")&&(suicideData[2]=="TOT")) {
    let macroCountry=0;
    let suicideStats = {};
    for(let i=0; i< suicides.length; i++) {
      let suicideData2 = suicides[i].split(',');
      if(suicideData2[0]==countryName) {
        suicideStats[suicideData2[6]] = suicideData2[7];
        macroCountry=parseInt(macroCountry,10)+parseInt(suicideData2[7],10);
        suicideStats[suicideData2[1]] = macroCountry.toString();
        suicideStats[suicideData2[4]] = macroAvg;
        if(macroCountry>parseInt(macroAvg)) {
          suicideStats[suicideData2[5]] = qualitativeCompMore;
        }
        else if(macroCountry<parseInt(macroAvg)) {
          suicideStats[suicideData2[5]] = qualitativeCompLess;
        }
        else if(macroCountry==parseInt(macroAvg)) {
          suicideStats[suicideData2[5]] = qualitativeCompEq;
        }
        if(suicideData2[8]!=0) {
          suicideStats[suicideData2[2]] = suicideData2[8];
        }
    }
    countries[countryName] = suicideStats;
  }
}
});
fs.writeFileSync('suicides.json', JSON.stringify(countries), 'utf8');
