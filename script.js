document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form dari submit default
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
                        borderWidth: 3,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        yAxisID: 'y'
                    },
                    {
                        label: 'Persentase Total Profit',
                        data: data.map((element) => element.Persentase_Total_Profit * 100),
                        borderWidth: 3,
                        fill: false,
                        borderColor: 'rgba(75, 192, 192, 1)',
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
            const colors = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(75, 192, 192)'];
            const datasets = segments.map((segment, index) => {
                const segmentData = data.filter(item => item.Segment === segment);
                return {
                    label: `${segment} - Total Profit`,
                    data: segmentData.map(item => item.Total_Profit),
                    borderWidth: 3,
                    fill: false,
                    borderColor: colors[index % colors.length]
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
            const segments = ['Consumer', 'Corporate', 'Home Office'];
            const colors = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(75, 192, 192)']; 
            const datasets = segments.map((segment, index) => {
                const segmentData = data.filter(item => item.Segment === segment);
                return {
                    label: `${segment} - Average Order Value`,
                    data: segmentData.map(item => item.Average_Order_Value),
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 1)', 
                    backgroundColor: colors[index % colors.length], 
                    fill: true, 
                    borderWidth: 2 
                };
            });

            new Chart(ctx, {
                type: 'bar',
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

document.addEventListener('DOMContentLoaded', function() {
    fetch('scy.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load file');
            }
            return response.json();
        })
        .then(data => {
            const subCategories = [...new Set(data.map(item => item.Sub_Category))];
            const years = [...new Set(data.map(item => item.Year))];
            const sctpCtx = document.getElementById('sctpChart').getContext('2d');
            const sctpDatasets = [];
            const sctpColors = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(75, 192, 192)', 'rgb(255, 205, 86)'];
            subCategories.forEach((subCategory, index) => {
                const sctpData = data.filter(item => item.Sub_Category === subCategory);
                const sctpDataset = {
                    label: `Total Profit (${subCategory})`,
                    data: sctpData.map(item => item.Total_Profit),
                    borderWidth: 3,
                    borderColor: sctpColors[index % sctpColors.length],
                    backgroundColor: sctpColors[index % sctpColors.length]
                };
                sctpDatasets.push(sctpDataset);
            });
            new Chart(sctpCtx, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: sctpDatasets
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

            const scadCtx = document.getElementById('scadChart').getContext('2d');
            const scadDatasets = [];
            subCategories.forEach((subCategory, index) => {
                const scadData = data.filter(item => item.Sub_Category === subCategory);
                const scadDataset = {
                    label: `Average Discount (%) (${subCategory})`,
                    data: scadData.map(item => item.Average_Discount * 100),
                    backgroundColor: sctpColors[index % sctpColors.length],
                    borderColor: sctpColors[index % sctpColors.length],
                    borderWidth: 1
                };
                scadDatasets.push(scadDataset);
            });
            new Chart(scadCtx, {
                type: 'bar',
                data: {
                    labels: years,
                    datasets: scadDatasets
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Average Discount (%)'
                            }
                        }
                    }
                }
            });

            const scaovCtx = document.getElementById('scaovChart').getContext('2d');
            const scaovDatasets = [];
            subCategories.forEach((subCategory, index) => {
                const scaovData = data.filter(item => item.Sub_Category === subCategory);
                const scaovDataset = {
                    label: `Average Order Value (${subCategory})`,
                    data: scaovData.map(item => item.Average_Order_Value),
                    borderWidth: 3,
                    borderColor: sctpColors[index % sctpColors.length],
                    backgroundColor: sctpColors[index % sctpColors.length]
                };
                scaovDatasets.push(scaovDataset);
            });
            new Chart(scaovCtx, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: scaovDatasets
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

document.addEventListener('DOMContentLoaded', function() {
    fetch('ry.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load file');
            }
            return response.json();
        })
        .then(data => {
            const regions = [...new Set(data.map(item => item.Region))];
            const years = [...new Set(data.map(item => item.Year))];
            const colors = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(75, 192, 192)', 'rgb(255, 205, 86)'];
            const rptdCtx = document.getElementById('rptdChart').getContext('2d');
            const rptdDatasets = regions.map((region, index) => {
                const regionData = data.filter(item => item.Region === region);
                return {
                    label: `Persen Transaksi Diskon (${region})`,
                    data: regionData.map(item => item.Persen_Transaksi_Diskon * 100),
                    backgroundColor: colors[index % colors.length],
                    borderColor: colors[index % colors.length],
                    borderWidth: 1
                };
            });
            new Chart(rptdCtx, {
                type: 'bar',
                data: {
                    labels: years,
                    datasets: rptdDatasets
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Persen Transaksi Diskon (%)'
                            }
                        }
                    }
                }
            });

            const rtpCtx = document.getElementById('rtpChart').getContext('2d');
            const rtpDatasets = regions.map((region, index) => {
                const regionData = data.filter(item => item.Region === region);
                return {
                    label: `Total Profit (${region})`,
                    data: regionData.map(item => item.Total_Profit),
                    borderWidth: 3,
                    borderColor: colors[index % colors.length],
                    backgroundColor: colors[index % colors.length]
                };
            });
            new Chart(rtpCtx, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: rtpDatasets
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

            const raovCtx = document.getElementById('raovChart').getContext('2d');
            const raovDatasets = regions.map((region, index) => {
                const regionData = data.filter(item => item.Region === region);
                return {
                    label: `Average Order Value (${region})`,
                    data: regionData.map(item => item.Average_Order_Value),
                    borderWidth: 3,
                    borderColor: colors[index % colors.length],
                    backgroundColor: colors[index % colors.length]
                };
            });
            new Chart(raovCtx, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: raovDatasets
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

document.addEventListener('DOMContentLoaded', function() {
    fetch('smy.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load file');
            }
            return response.json();
        })
        .then(data => {
            const shipModes = [...new Set(data.map(item => item.Ship_mode))];
            const years = [...new Set(data.map(item => item.Year))];
            const colors = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(75, 192, 192)', 'rgb(255, 205, 86)'];
            const smtqCtx = document.getElementById('smtqChart').getContext('2d');
            const smtqDatasets = shipModes.map((shipMode, index) => {
                const shipModeData = data.filter(item => item.Ship_mode === shipMode);
                return {
                    label: `Total Quantity (${shipMode})`,
                    data: shipModeData.map(item => item.Total_Quantity),
                    backgroundColor: colors[index % colors.length],
                    borderColor: colors[index % colors.length],
                    borderWidth: 1
                };
            });
            new Chart(smtqCtx, {
                type: 'bar',
                data: {
                    labels: years,
                    datasets: smtqDatasets
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Total Quantity'
                            }
                        }
                    }
                }
            });

            const smtpCtx = document.getElementById('smtpChart').getContext('2d');
            const smtpDatasets = shipModes.map((shipMode, index) => {
                const shipModeData = data.filter(item => item.Ship_mode === shipMode);
                return {
                    label: `Total Profit (${shipMode})`,
                    data: shipModeData.map(item => item.Total_Profit),
                    borderWidth: 3,
                    borderColor: colors[index % colors.length],
                    backgroundColor: colors[index % colors.length]
                };
            });
            new Chart(smtpCtx, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: smtpDatasets
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

            const smabsCtx = document.getElementById('smabsChart').getContext('2d');
            const smabsDatasets = shipModes.map((shipMode, index) => {
                const shipModeData = data.filter(item => item.Ship_mode === shipMode);
                return {
                    label: `ABS (${shipMode})`,
                    data: shipModeData.map(item => item.ABS),
                    backgroundColor: colors[index % colors.length],
                    borderColor: colors[index % colors.length],
                    borderWidth: 1
                };
            });
            new Chart(smabsCtx, {
                type: 'bar',
                data: {
                    labels: years,
                    datasets: smabsDatasets
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'ABS'
                            }
                        }
                    }
                }
            });

            const smaovCtx = document.getElementById('smaovChart').getContext('2d');
            const smaovDatasets = shipModes.map((shipMode, index) => {
                const shipModeData = data.filter(item => item.Ship_mode === shipMode);
                return {
                    label: `Average Order Value (${shipMode})`,
                    data: shipModeData.map(item => item.Average_Order_Value),
                    borderWidth: 3,
                    borderColor: colors[index % colors.length],
                    backgroundColor: colors[index % colors.length]
                };
            });
            new Chart(smaovCtx, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: smaovDatasets
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

document.addEventListener('DOMContentLoaded', function() {
    fetch('pfq2017.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load file');
            }
            return response.json();
        })
        .then(data => {
            const quarters = data.map(item => item.Quarter);
            const totalSales = data.map(item => item.Total_Sales);
            const totalProfit = data.map(item => item.Total_Profit);
            const totalTransaction = data.map(item => item.Total_Transaction);
            const totalCustomers = data.map(item => item.Total_Customers);
            const pfqtptsCtx = document.getElementById('pfqtptsChart').getContext('2d');
            new Chart(pfqtptsCtx, {
                type: 'line',
                data: {
                    labels: quarters,
                    datasets: [
                        {
                            label: 'Total Profit',
                            data: totalProfit,
                            yAxisID: 'profit',
                            borderWidth: 3,
                            fill: false,
                            borderColor: 'rgb(255, 99, 132)'
                        },
                        {
                            label: 'Total Sales',
                            data: totalSales,
                            yAxisID: 'sales',
                            borderWidth: 3,
                            fill: false,
                            borderColor: 'rgb(54, 162, 235)'
                        }
                    ]
                },
                options: {
                    scales: {
                        profit: {
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Total Profit'
                            }
                        },
                        sales: {
                            position: 'right',
                            title: {
                                display: true,
                                text: 'Total Sales'
                            }
                        }
                    }
                }
            });

            const pfqtttcCtx = document.getElementById('pfqtttcChart').getContext('2d');
            new Chart(pfqtttcCtx, {
                type: 'line',
                data: {
                    labels: quarters,
                    datasets: [
                        {
                            label: 'Total Transaction',
                            data: totalTransaction,
                            yAxisID: 'transaction',
                            borderWidth: 3,
                            fill: false,
                            borderColor: 'rgb(255, 99, 132)' 
                        },
                        {
                            label: 'Total Customer',
                            data: totalCustomers,
                            yAxisID: 'customer',
                            borderWidth: 3,
                            fill: false,
                            borderColor: 'rgb(54, 162, 235)' 
                        }
                    ]
                },
                options: {
                    scales: {
                        transaction: {
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Total Transaction'
                            }
                        },
                        customer: {
                            position: 'right',
                            title: {
                                display: true,
                                text: 'Total Customer'
                            },
                            grid: {
                                drawOnChartArea: false
                            }
                        }
                    }
                }
            });

            fetch('scq2017.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to load file');
                    }
                    return response.json();
                })
                .then(scqData => {
                    const subCategories = [...new Set(scqData.map(item => item.Sub_Category))];
                    const averageDiscounts = subCategories.map(subCategory => {
                        const subCategoryData = scqData.filter(item => item.Sub_Category === subCategory);
                        const totalAverageDiscount = subCategoryData.reduce((acc, curr) => acc + curr.Average_Discount, 0) * 100;
                        return totalAverageDiscount;
                    });

                    const scqCtx = document.getElementById('scq2017Chart').getContext('2d');
                    new Chart(scqCtx, {
                        type: 'bar',
                        data: {
                            labels: subCategories,
                            datasets: [
                                {
                                    label: 'Total Average Discount',
                                    data: averageDiscounts,
                                    backgroundColor: 'rgb(54, 162, 235)' 
                                }
                            ]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: 'Total Average Discount (%)'
                                    }
                                }
                            }
                        }
                    });
                })
                .catch(error => {
                    console.error('Error loading the data:', error);
                });
        })
        .catch(error => {
            console.error('Error loading the data:', error);
        });

    fetch('sq2017.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load file');
            }
            return response.json();
        })
        .then(sqData => {
            const segments = [...new Set(sqData.map(item => item.Segment))];
            const totalAverageOrders = segments.map(segment => {
                const segmentData = sqData.filter(item => item.Segment === segment);
                const totalAverageOrderValue = segmentData.reduce((acc, curr) => acc + curr.Average_Order_Value, 0);
                return totalAverageOrderValue;
            });

            const sqCtx = document.getElementById('sq2017Chart').getContext('2d');
            new Chart(sqCtx, {
                type: 'pie',
                data: {
                    labels: segments,
                    datasets: [{
                        label: 'Total Average Order Value',
                        data: totalAverageOrders,
                        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'], 
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Total Average Order Value'
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

fetch('Performance2017.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        $('#performanceTable').DataTable({
            data: data,
            columns: [
                { data: 'Order ID' },
                { data: 'Order Date' },
                { data: 'Ship Date' },
                { data: 'Ship Mode' },
                { data: 'Customer ID' },
                { data: 'Segment' },
                { data: 'Region' },
                { data: 'Sub-Category' },
                { data: 'Sales' },
                { data: 'Quantity' },
                { data: 'Discount' },
                { data: 'Profit' }
            ]
        });
    })
    .catch(error => console.error('Error loading the data:', error));

