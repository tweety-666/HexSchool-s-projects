var context = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(context, {
    type: "line",
    data: {
        labels: [
            "6 June",
            "7 June",
            "8 June",
            "9 June",
            "10 June",
            "11 June",
            "12 June",
            "13 June"
        ],
        datasets: [
            {
                label: "Total Revenue",
                data: [7500, 7000, 5200, 7000, 5800, 6100, 7800, 7700],
                backgroundColor: [
                    "rgba(255, 255, 255, 0)",
                    "rgba(255, 255, 255, 0)",
                    "rgba(255, 255, 255, 0)",
                    "rgba(255, 255, 255, 0)",
                    "rgba(255, 255, 255, 0)",
                    "rgba(255, 255, 255, 0)",
                    "rgba(255, 255, 255, 0)",
                    "rgba(255, 255, 255, 0)"
                ],
                borderColor: [
                    "rgba(126,211,33,1)"
                ],
                borderWidth: 2
            },
            {
                label: "Total Cost",
                data: [800, 800, 2600, 2900, 2400, 750, 900, 2000],
                backgroundColor: [
                    "rgba(255, 255, 255, 0)",
                    "rgba(255, 255, 255, 0)",
                    "rgba(255, 255, 255, 0)",
                    "rgba(255, 255, 255, 0)",
                    "rgba(255, 255, 255, 0)",
                    "rgba(255, 255, 255, 0)",
                    "rgba(255, 255, 255, 0)",
                    "rgba(255, 255, 255, 0)"
                ],
                borderColor: [
                    "rgba(208,2,27,1)"
                ],
                borderWidth: 2
            },
            {
                label: "Net Income",
                data: [6000, 5000, 2000, 4000, 3800, 5000, 6200, 5000],
                backgroundColor: [
                    "rgba(255, 255, 255, 0)",
                    "rgba(255, 255, 255, 0)",
                    "rgba(255, 255, 255, 0)",
                    "rgba(255, 255, 255, 0)",
                    "rgba(255, 255, 255, 0)",
                    "rgba(255, 255, 255, 0)",
                    "rgba(255, 255, 255, 0)",
                    "rgba(255, 255, 255, 0)"
                ],
                borderColor: [
                    "rgba(74,144,226,1)"
                ],
                borderWidth: 2
            }
        ]
    },
    options: {
        elements: {
            point: {
                radius: 0
            },
            line: {
                tension: 0 // disables bezier curves
            }
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        stepSize: 2000
                    }
                }
            ]
        },
        responsive: true,
        maintainAspectRatio: false
    }
});