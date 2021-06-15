async function getData(stable, t) {
  try {
    var response = await axios.get('https://api.coingecko.com/api/v3/coins/' + stable +'/market_chart?vs_currency=usd&days=' + t);
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
var prix = [];
var vRef = [];
var IsPos = [];
var IsNeg = [];

var c = true;

function requeteGecko() {
    var stable = document.getElementById("stableSelect").value;
    (async () => {
        if(stable != "Nulle") {
            dates = [];
            prix = [];
            vRef = [];
            IsPos = [];
            IsNeg = [];

            var vActuelle = await getActualValue(stable);
            console.log('prix' + vActuelle);

            var durée = document.getElementsByName("durée");
            var t;

            for(var i = 0; i < durée.length; i++){
                if(durée[i].checked){
                    t = durée[i].value;
                }
            }

            var data = await getData(stable, t);

            save(data.prices, t);
            traitement(vActuelle);
            conseil(vActuelle);
            intensiteArray();
            
            if(c) {
                dessiner(stable);
                c = false;
            } else {
                updateChart();
            }
        }
    })();
}

function intensiteArray() {
    for(let i in prix) {
        IsPos.push(IPos);
        IsNeg.push(INeg);
    }
        console.log(IsPos);
        console.log(IsNeg);
}

function save(obj, t) {
    for(let i in obj) {
        dates.push(formatDate(obj[i][0], t));
        prix.push(obj[i][1]);
        vRef.push(1);
    }
};

function formatDate(date, t) {

    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

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
    } else if ((t > 1) && (t <= 90))  { 
        return [monthNames[month], day, hour + 'h'].join('-');
    } else {
        return [year, monthNames[month], day].join('-');
    }
}

console.log(dates);
console.log(prix);