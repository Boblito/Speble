var myChart;

function updateChart() {
    myChart.data.datasets[0].data = price;
    myChart.data.datasets[1].data = refValue;
    myChart.data.datasets[2].data = posIntensities;
    myChart.data.datasets[3].data = negIntensities;
    myChart.data.labels = dates;
    myChart.data.datasets[0].label = 'Value of ' + document.getElementById("stableSelect").value;
    myChart.update();
}

function dessiner(stable){
    var ctx = document.getElementById('graph').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Value of ' + stable,
                data: price,
                backgroundColor: [
                    'rgba(44, 130, 201, 0.2)',
                ],
                borderColor: [
                    'rgba(44, 130, 201, 1)',
                ],
                fill: '+1',
                borderWidth: 1,
                pointRadius: 0
            }, {
                label: 'Reference value',
                data: refValue,
                backgroundColor: [
                    'rgba(0, 0, 0, 0)',
                ],
                borderColor: [
                    'rgba(0, 0, 0, 1)',
                ],
                borderWidth: 0.5,
                pointRadius: 0
            }, {
                label: 'Positive intensity',
                data: posIntensities,
                backgroundColor: [
                    'rgba(207, 0, 15, 0)',
                ],
                borderColor: [
                    'rgba(207, 0, 15, 1)',
                ],
                borderWidth: 0.5,
                pointRadius: 0
            }, {
                label: 'Negative intensity',
                data: negIntensities,
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
