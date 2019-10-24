// get_data().then(data, console.log(data));
let this_week = [];
var prices = [];

for (let i=0; i<7; i++){
    this_week.push(moment().subtract(i,'days').format('X'));
}

let start_date = this_week[this_week.length -1];
let end_date = this_week[0];

// var data;

// get_data();

async function get_data(){

    // data.prices : [[unixtimestamp in ms, price]]
    let proxy = 'https://cors-anywhere.herokuapp.com/';
    let api_link = `https://api.coingecko.com/api/v3/coins/monero/market_chart?vs_currency=usd&days=365`;
    // let api_link = `https://api.coingecko.com/api/v3/coins/monero/market_chart/range?vs_currency=usd&from=${start_date}&to=${end_date}`
    let response = await fetch(proxy+api_link);
    data = await response.json();
    console.log(data);    
}

