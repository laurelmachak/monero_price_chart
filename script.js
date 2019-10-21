// https://api.coingecko.com/api/v3/coins/monero/market_chart/range?vs_currency=usd&from=1392577232&to=1422577232
// https://api.coingecko.com/api/v3/coins/monero/market_chart?vs_currency=usd&days=100

var ctx = document.getElementById('chart');


get_data();

async function get_data(){

    // data.prices : [[unixtimestamp in ms, price]]

    let proxy = 'https://cors-anywhere.herokuapp.com/';
    let api_link = `https://api.coingecko.com/api/v3/coins/monero/market_chart?vs_currency=usd&days=365`;
    let response = await fetch(proxy+api_link);
    let data = await response.json();
    console.log(data);
    create_chart(data);
}


function create_chart(market_chart_data){

    let time_stamps = [];
    let prices = [];

    let time_price_pairs = market_chart_data.prices;

    for (let i=0; i<time_price_pairs.length; i++){
        
        let readable_date = timeConverter(time_price_pairs[i][0]);
        time_stamps.push(readable_date);
        prices.push(time_price_pairs[i][1]);
    }

    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            labels: time_stamps,
            datasets: [{
                label: 'XMR Prices Over Time',
                // backgroundColor: 'rgb(255, 99, 132)',
                fill: false,
                borderColor: 'rgb(255, 153, 0)',
                // data: [0, 10, 5, 2, 20, 30, 45]
                data: prices
            }]
        },
    
        // Configuration options go here
        options: {}
    });
}


function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }
