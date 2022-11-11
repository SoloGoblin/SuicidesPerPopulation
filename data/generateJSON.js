const fs = require('fs');

let characters = {};

let peeps_csv = fs.readFileSync('Characters.csv', 'utf8');

let peeps = peeps_csv.split("\n");

peeps.forEach(function(peep) {
  let character_info = peep.split(';');

  let character_name = character_info[1];

  if(character_name!="Name"){
    let characterStats = {};
    characterStats['gender'] = character_info[2];
    characterStats['house'] = character_info[4];
    characterStats['species'] = character_info[7];
    if (character_info[12])
      characterStats['skills'] = character_info[12].split('|');
    else {
      characterStats['skills'] = [];
    }

    characters[character_name]=characterStats;
  }
});

fs.writeFileSync('potter.json', JSON.stringify(characters), 'utf8');
