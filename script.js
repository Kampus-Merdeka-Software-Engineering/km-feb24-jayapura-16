document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    alert(`Terimakasih ${username}, Kami akan mencoba untuk membalas pesanmu melalui email ${email}.`);
});

document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    hamburger.addEventListener("click", function() {
        navLinks.classList.toggle("active");
    });

    fetch('pf.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load file');
            }
            return response.json();
        })
        .then(data => {
            const ctx = document.getElementById('chart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map((element) => element.Tahun),
                    datasets: [
                        {
                            label: 'Total Profit',
                            data: data.map((element) => element.Total_Profit),
                            borderWidth: 1,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            yAxisID: 'y'
                        },
                        {
                            label: 'Persentase Total Profit',
                            data: data.map((element) => element.Persentase_Total_Profit * 100),
                            borderWidth: 1,
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            type: 'line',
                            yAxisID: 'y1'
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Total Profit'
                            }
                        },
                        y1: {
                            beginAtZero: true,
                            position: 'right',
                            grid: {
                                drawOnChartArea: false
                            },
                            title: {
                                display: true,
                                text: 'Persentase Total Profit (%)'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error loading the data:', error);
        });

    fetch('AOVF.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load file');
            }
            return response.json();
        })
        .then(data => {
            const aovCtx = document.getElementById('aovfChart').getContext('2d');
            new Chart(aovCtx, {
                type: 'line',
                data: {
                    labels: data.map((element) => element.Tahun),
                    datasets: [
                        {
                            label: 'Average Order Value (AOV)',
                            data: data.map((element) => element.AOV),
                            borderWidth: 1,
                            backgroundColor: 'rgba(255, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)'
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'AOV'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error loading the data:', error);
        });
});

document.addEventListener('DOMContentLoaded', function() {
    fetch('sy.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load file');
            }
            return response.json();
        })
        .then(data => {
            const ctx = document.getElementById('syChart').getContext('2d');

            const segments = ['Consumer', 'Corporate', 'Home Office'];
            const datasets = segments.map(segment => {
                const segmentData = data.filter(item => item.Segment === segment);
                return {
                    label: `${segment} - Total Profit`,
                    data: segmentData.map(item => item.Total_Profit),
                    borderWidth: 1,
                    fill: false,
                    borderColor: getRandomColor()
                };
            });

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.filter(item => item.Segment === 'Consumer').map(item => item.Year),
                    datasets: datasets
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Total Profit'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error loading the data:', error);
        });
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('sy.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load file');
            }
            return response.json();
        })
        .then(data => {
            const ctx = document.getElementById('aovsChart').getContext('2d');

            // Filter data by segments
            const segments = ['Consumer', 'Corporate', 'Home Office'];
            const datasets = segments.map(segment => {
                const segmentData = data.filter(item => item.Segment === segment);
                return {
                    label: `${segment} - Average Order Value`,
                    data: segmentData.map(item => item.Average_Order_Value),
                    borderWidth: 1,
                    fill: false,
                    borderColor: getRandomColor()
                };
            });

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.filter(item => item.Segment === 'Consumer').map(item => item.Year),
                    datasets: datasets
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Average Order Value'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error loading the data:', error);
        });
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
