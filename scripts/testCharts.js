function dessiner(){
    var ctx = document.getElementById('graphique').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Valeur',
                data: prix,
                backgroundColor: [
                    'rgba(255, 99, 132, 0)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
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
                    'rgba(0,0,0,1)',
                ],
                borderWidth: 1,
                pointRadius: 0
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        type: 'time',
                    }
                }]
            }
        }
    });
}