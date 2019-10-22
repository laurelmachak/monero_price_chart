// https://api.coingecko.com/api/v3/coins/monero/market_chart/range?vs_currency=usd&from=1392577232&to=1422577232
// https://api.coingecko.com/api/v3/coins/monero/market_chart?vs_currency=usd&days=100

/* 
moment("12-25-1995", "MM-DD-YYYY");
I think i need to reformat data to be:
(instead of seperate labels and data);
[
    {
        x: newDateString(),
        y: price
    },

    {
        x: newDateString(),
        y: price
    }
]
*/


var ctx = document.getElementById('chart');
let timeFormat = "MM/DD/YY";
let chart;


function newDate(days) {
    return moment()
      .add(days, "d")
      .toDate();
  }

  function newDateString(unixtimestamp) {
    // return moment()
    //   .add(day, "MM-DD-YYYY")
    return moment(unixtimestamp, "x")
      .format(timeFormat);
  }

  function newTimestamp(days) {
    return moment()
      .add(days, "d")
      .unix();
  }









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
    let x_y_data = [];

    let time_price_pairs = market_chart_data.prices;

    for (let i=0; i<time_price_pairs.length; i++){
        
        x_y_data.push({});
        x_y_data[i]['x'] = newDateString(time_price_pairs[i][0]);
        x_y_data[i]['y'] = time_price_pairs[i][1];
        time_stamps.push(time_price_pairs[i][0])

        // let readable_date = timeConverter(time_price_pairs[i][0]);
        
        // time_stamps.push(readable_date);
        // prices.push(time_price_pairs[i][1]);
    }

    console.log(x_y_data);

    chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            labels: time_stamps,
            datasets: [{
                label: 'XMR Prices Over Time',
                // data: prices,
                data: x_y_data,
                // backgroundColor: 'rgb(255, 99, 132)',
                fill: false,
                borderColor: 'rgb(255, 153, 0)',
                borderWidth: 1,
                pointRadius: 2,
                pointBackgroundColor: 'rgb(255, 242, 230)',
                // data: [0, 10, 5, 2, 20, 30, 45]
                
                lineTension: 0
            }]
        },
    
        // Configuration options go here
        options: {
            responsive: true,
            maintainAspectRatio: false,

            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'day',
                        format: timeFormat,
                        tooltipFormat: 'll HH:mm'
                        // tooltipFormat: timeFormat

                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    },
                    ticks: {
                        // maxRotation: 0
                    }
                }
            ],
                yAxes: [
                    {
                      scaleLabel: {
                        display: true,
                        labelString: "USD Price"
                      }
                    }
                  ]
            },

            pan: {
                enabled: true,
                mode: "xy",
                speed: 10,
                threshold: 10
              },
              zoom: {
                enabled: true,
                drag: false,
                mode: "xy",
                limits: {
                  max: 10,
                  min: 0.5
                }
              }

        }
    });
}


function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    // var month = months[a.getMonth()];
    var month = a.getMonth() + 1;
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    // var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    var time = month + '-' + date + '-' + year;
    return time;
  }
