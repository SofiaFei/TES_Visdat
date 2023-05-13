d3.csv("data/Angka Partisipasi Sekolah 2011-2017.csv", d3.autotype).then((data) => {

var groupByProvinsiSd = d3.group(data, function(d) { return d.province; });

//mean sd
var meansd = Array.from(groupByProvinsiSd, ([key, values]) => ({
  key: key,
  value: d3.mean(values, function(d) { return d.sd; })
}));

var groupByProvinsiSmp = d3.group(data, function(d) { return d.province; });

//mean smp
var meansmp = Array.from(groupByProvinsiSmp, ([key, values]) => ({
  key: key,
  value: d3.mean(values, function(d) { return d.smp; })
}));

var groupByProvinsiSma = d3.group(data, function(d) { return d.province; });

//mean sma
var meansma = Array.from(groupByProvinsiSma, ([key, values]) => ({
  key: key,
  value: d3.mean(values, function(d) { return d.sma; })
}));

var groupByProvinsiPt = d3.group(data, function(d) { return d.province; });

//mean pt
var meanpt = Array.from(groupByProvinsiPt, ([key, values]) => ({
  key: key,
  value: d3.mean(values, function(d) { return d.pt; })
}));

    //cek button yg ditekan
	const getFilters = () => {
		const sex = $('.btn-group .active input.sex').attr('value');
		return { sex };
	  };

    //filter data sesuai button 
    const filterData = () => {
		const filters = getFilters();
		if(filters.sex === 'sd'){
			return meansd;
		} else if(filters.sex === 'smp'){
			return meansmp;
		} else if(filters.sex === 'sma'){
			return meansma;
		} else if(filters.sex === 'pt'){
			return meanpt;
		} 
	}

	meansd.sort((a, b) => d3.descending(a.value, b.value));
	meansmp.sort((a, b) => d3.descending(a.value, b.value));
	meansma.sort((a, b) => d3.descending(a.value, b.value));
	meanpt.sort((a, b) => d3.descending(a.value, b.value));

	let barchart = new Barchart({ parentElement: '#vis'}, filterData());
    	barchart.updateVis();

    $('input').change(() => {
		barchart.data = filterData();
		barchart.updateVis();
		
		const filteredData = filterData();
	}
	);

});