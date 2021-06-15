var myChart;

function updateChart() {
    myChart.data.datasets[0].data = prix;
    myChart.data.datasets[1].data = vRef;
    myChart.data.datasets[2].data = IsPos;
    myChart.data.datasets[3].data = IsNeg;
    myChart.data.labels = dates;
    myChart.data.datasets[0].label = 'Valeur du ' + document.getElementById("stableSelect").value;
    myChart.update();
}

function dessiner(stable){
    var ctx = document.getElementById('graphique').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Valeur du ' + stable,
                data: prix,
                backgroundColor: [
                    'rgba(44, 130, 201, 0)',
                ],
                borderColor: [
                    'rgba(44, 130, 201, 1)',
                ],
                borderWidth: 1,
                pointRadius: 0
            }, {
                label: 'Valeur de référence',
                data: vRef,
                backgroundColor: [
                    'rgba(0, 0, 0, 0)',
                ],
                borderColor: [
                    'rgba(0, 0, 0, 1)',
                ],
                borderWidth: 0.5,
                pointRadius: 0
            }, {
                label: 'Intensité positive',
                data: IsPos,
                backgroundColor: [
                    'rgba(207, 0, 15, 0)',
                ],
                borderColor: [
                    'rgba(207, 0, 15, 1)',
                ],
                borderWidth: 0.5,
                pointRadius: 0
            }, {
                label: 'Intensité négative',
                data: IsNeg,
                backgroundColor: [
                    'rgba(38, 166, 91, 0)',
                ],
                borderColor: [
                    'rgba(38, 166, 91, 1)',
                ],
                borderWidth: 0.5,
                pointRadius: 0
            }]
        },
        options:{
            scales: {
                yAxes: [{
                    ticks : {
                        beginAtZero: true,
                        type: 'time',
                        suggestedMax : 2
                    }
                }]
            }
        }
    });
}
