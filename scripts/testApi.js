async function getData() {
  try {
    var response = await axios.get('https://api.coingecko.com/api/v3/coins/ampleforth/market_chart?vs_currency=usd&days=700&interval=daily');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

var dates = [];
var prix = [];

(async () => {
    const data = await getData();
    save(data.prices);
})();

function save(obj) {
    for(var i in obj) {
        dates.push(formatDate(obj[i][0]));
        prix.push(obj[i][1]);
    }
};

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

console.log(dates);
console.log(prix);