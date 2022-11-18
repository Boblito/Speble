async function getData(stable, t) {
  try {
    var response = await axios.get('https://api.coingecko.com/api/v3/coins/' + stable + '/market_chart?vs_currency=usd&days=' + t);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function getActualValue(stable) {
    try {
      var response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=' + stable + '&vs_currencies=usd');
      return response.data[stable].usd;
    } catch (error) {
      console.error(error);
    }
}

var dates = [];
var price = [];
var refValue = []; //ici
var posIntensities = [];
var negIntensities = [];

var notDrawn = true;

function geckoRequest() {
    var stable = document.getElementById("stableSelect").value;
    (async () => {
        if(stable != "null") {
            dates = [];
            price = [];
            refValue = [];
            posIntensities = [];
            negIntensities = [];

            var actualValue = await getActualValue(stable);
            console.log('price' + actualValue);

            var duration = document.getElementsByName("duration");
            var t;

            for(var i = 0; i < duration.length; i++) {
                if(duration[i].checked) {
                    t = duration[i].value;
                }
            }

            var data = await getData(stable, t);

            save(data.prices, t);
            driftCalculation(actualValue);
            advice(actualValue);
            intensitiesArray();
            
            if(notDrawn) {
                dessiner(stable);
                notDrawn = false;
            } else {
                updateChart();
            }
        }
    })();
}

function intensitiesArray() {
    for(let i in price) {
        posIntensities.push(posIntensity);
        negIntensities.push(negIntensity);
    }
        console.log(posIntensities);
        console.log(negIntensities);
}

function save(obj, t) {
    for(let i in obj) {
        dates.push(formatDate(obj[i][0], t));
        price.push(obj[i][1]);
        refValue.push(1);
    }
};

function formatDate(date, t) {

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    var d = new Date(date),     
        minute = d.getMinutes(),
        hour = d.getHours(),
        month = d.getMonth(),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if(day.length < 2) {
        day = '0' + day;
    }
    if(hour < 10) {
        hour = String(hour).padStart(2, '0');
    }
    if(minute < 10) {
        minute = String(minute).padStart(2, '0');
    }

    if(t <= 1) {
        return [hour, minute].join(':');
    } else if((t > 1) && (t <= 90))  { 
        return [monthNames[month], day, hour + 'h'].join('-');
    } else {
        return [year, monthNames[month], day].join('-');
    }
}

console.log(dates);
console.log(price);