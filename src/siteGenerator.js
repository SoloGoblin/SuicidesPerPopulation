const fs = require('fs');
const ejs = require('ejs');

let country_info = JSON.parse(fs.readFileSync('../data/suicides.json', 'utf8'));
let index_template = fs.readFileSync('views/index.ejs', 'utf8');
let country_template = fs.readFileSync('views/countries.ejs', 'utf8');
let about_template = fs.readFileSync('views/about.ejs', 'utf8');

/*
  1) Generate a web page for each character
  2) Keep track of the link for index.html
*/
for (country in country_info){
  let country_html = ejs.render(country_template, {
    filename: __dirname + '/views/countries.ejs',
    stats: country_info[country],
    name: country
  });
  country_info[country].link = country;
  fs.writeFileSync('../public/'+country_info[country].link+'.html', country_html, 'utf8');

}

/*
  1) Generate an index page of all characters
*/
let index_html = ejs.render(index_template, {
  filename: __dirname + '/views/index.ejs',
  data: country_info
});

fs.writeFileSync('../public/index.html', index_html, 'utf8');

/*
  1) Generate an about page
*/
let about_html = ejs.render(about_template, {
  filename: __dirname + '/views/about.ejs',
  data: country_info
});

fs.writeFileSync('../public/about.html', about_html, 'utf8');
