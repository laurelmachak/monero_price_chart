
var data;

// get_data();
create_chart();


async function create_chart(){
    await get_data();
    Highcharts.stockChart('container', {

        rangeSelector: {
            buttons: [
            //     {
            //     type: 'month',
            //     count: 1,
            //     text: '1m',
            //     events: {
            //         click: function() {
            //             alert(‘Clicked button’);
            //         }
            //     }
            // },
            {
                type: 'day',
                count: 1,
                text: '1d'
            },
            {
                type: 'week',
                count: 1,
                text: '1w'
            },
            {
                type: 'month',
                count: 1,
                text: '1m'
            },
             {
                type: 'month',
                count: 3,
                text: '3m'
            },
             {
                type: 'month',
                count: 6,
                text: '6m'
            },
             {
                type: 'ytd',
                text: 'YTD'
            },
             {
                type: 'year',
                count: 1,
                text: '1y'
            },
             {
                type: 'all',
                text: 'All'
            }
        ]
        },

        chart: {
            styledMode: true
        },

        plotOptions: {
            series: {
                showInNavigator: true
            },
            line: {
                className: "monero_line"
            }
        },

        series: [{
            name: 'Monero Price in USD',
            type: 'line',
            data: data.prices
            }]

        });
}


// async function get_data(){

//     // data.prices : [[unixtimestamp in ms, price]]
//     let proxy = 'https://cors-anywhere.herokuapp.com/';
//     let api_link = `https://api.coingecko.com/api/v3/coins/monero/market_chart?vs_currency=usd&days=90`;
//     let response = await fetch(proxy+api_link);
//     // let data = await response.json();
//     data = await response.json();
//     console.log(data);
    
// }




// document.addEventListener('DOMContentLoaded', function () {
//     var chart1 = new Highcharts.Chart(options);
// });


