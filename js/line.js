fetch('data/tes.json').then(response => response.json()).then(data => {
	// Membuat array untuk label dan data chart
	let labels = [];
	let sdData = [];
	let smpData = [];
	let smaData = [];
	let ptData = [];

	// Loop untuk mengisi array dari data JSON
	data.forEach(item => {
		labels.push(item.Tahun);
		sdData.push(item.SD);
		smpData.push(item.SMP);
		smaData.push(item.SMA);
		ptData.push(item.PT);
	});
    // console.log(data)

	// Membuat chart
	let ctx = document.getElementById('chart').getContext('2d');
	let chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: labels,
			datasets: [
				{
					label: 'SD',
					data: sdData,
					fill: false,
					borderColor: 'red',
					lineTension: 0.1
				},
				{
					label: 'SMP',
					data: smpData,
					fill: false,
					borderColor: 'blue',
					lineTension: 0.1
				},
				{
					label: 'SMA',
					data: smaData,
					fill: false,
					borderColor: 'green',
					lineTension: 0.1
				},
				{
					label: 'PT',
					data: ptData,
					fill: false,
					borderColor: 'orange',
					lineTension: 0.1
				}
			]
		},
		options: {
			title: {
				display: true,
				text: 'Line Chart Tahun'
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});
})
.catch(error => console.log(error));