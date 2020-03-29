var app = new Vue({
	el: '#app',
	data: {
		dataIndo: [],
		dataProvinsi: [],
		lastUpdate: null,
		isLoading: true
	},
	mounted() {
		const url = 'https://indonesia-covid-19.mathdro.id/api/';
		const urlGlobal = 'https://covid19.mathdro.id/api/countries/indonesia';

		fetch(url).then((res) => res.json()).then((res) => {
			this.dataIndo = res;
			loadingFalse();
		});
		fetch(url + 'provinsi/').then((res) => res.json()).then((data) => {
			this.dataProvinsi = data.data;
			loadingFalse();
		});
		fetch(urlGlobal).then((res) => res.json()).then((res) => {
			loadingFalse();
			var months = [
				'Januari',
				'Februari',
				'Maret',
				'April',
				'Mei',
				'Juni',
				'Juli',
				'Agustus',
				'September',
				'Oktober',
				'November',
				'Desember'
			];

			date = new Date(res.lastUpdate);
			year = date.getFullYear();
			month = date.getMonth();
			dt = date.getDate();
			hr = date.getHours();
			mnt = date.getMinutes();
			scnd = date.getSeconds();
			var month = months[month];
			this.lastUpdate = dt + ' ' + month + ' ' + year + ' ' + hr + ':' + mnt + ':' + scnd;
		});
		loadingFalse = () => {
			setTimeout(() => {
				this.isLoading = false;
			}, 2000);
		};
	}
});
