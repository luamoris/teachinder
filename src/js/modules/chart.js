// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const _ = require('lodash');
const DomHelper = require('../helpers/dom.helper');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function createColors(count) {
	const colors = [];
	for (let i = 0; i < count; i++) {
		const hash = `${Math.random().toString(16)}000000`.substring(2, 8);
		colors.push(`#${hash}`);
	}
	return colors;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Teacher CHART

class TeacherChart {
	constructor(teachers) {
		this.teachers = teachers;
		this.chart = null;
		this.ctx = DomHelper.getElement({ type: 'id', selector: 'chart' });
		this.ctx.getContext('2d');
		this.initChart();
	}

	add(teacher) {
		this.teachers.push(teacher);
		this.initChart();
	}

	addMore(teachers) {
		teachers.forEach((teacher) => {
			this.teachers.push(teacher);
		});
		this.initChart();
	}

	initChart() {
		if (this.chart) {
			this.chart.destroy();
		}
		const options = this.createChartConfig();
		this.chart = new Chart(this.ctx, options);
	}

	createChartConfig(type = 'pie') {
		const data = this.createData();
		console.log(data);
		return {
			type,
			data,
			options: {
				title: {
					display: true,
					text: 'Recommended Daily Diet',
					position: 'top',
					fontSize: 16,
					fontColor: '#111',
					padding: 20,
				},
				legend: {
					display: true,
					position: 'bottom',
					labels: {
						boxWidth: 20,
						fontColor: '#111',
						padding: 15,
					},
				},
				tooltips: {
					enabled: false,
				},
				plugins: {
					datalabels: {
						color: '#111',
						textAlign: 'center',
						font: {
							lineHeight: 1.6,
						},
						formatter: (value, ctx) => `${ctx.chart.data.labels[ctx.dataIndex]}\n${value}%`,
					},
				},
				responsive: true,
				maintainAspectRatio: false,
			},
		};
	}

	createData() {
		const countries = {};
		this.teachers.forEach((item) => {
			const { country } = item;
			if (!countries[country]) {
				countries[country] = 0;
			}
			countries[country]++;
		});
		const count = this.teachers.length;
		const labels = Object.keys(countries);
		const data = Object.values(countries).map((value) => value * (100 / count));
		const colors = createColors(Object.keys(countries).length);

		return {
			labels,
			datasets: [{
				data,
				backgroundColor: colors,
				borderWidth: 1,
				borderColor: 'transparent',
			}],
		};
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = TeacherChart;
