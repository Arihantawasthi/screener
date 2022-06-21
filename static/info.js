const obj = JSON.parse(document.querySelector(".final-data").innerHTML);
console.log(obj);

const labels = obj.months;

const data = {
    labels: labels,
    datasets: [{
        label: "Net Profit",
        backgroundColor: "rgb(157, 36, 219)",
        borderColor: "rgb(157, 36, 219)",
        data: obj.net_profits,
        tension: 0.1,
        pointRadius: 4,
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {
        scales: {
            x: {
                grid: {
                    borderColor: "rgb(189, 193, 198)",
                }
            },
            y: {
                grid: {
                    borderColor: "rgb(189, 193, 198)"
                }
            }
        },
        maintainAspectRatio: false,
    }
};

const profitChart = new Chart(document.getElementById('profit'), config);

epsStaticZone = [
    {strokeStyle: "#ed1858", min: 0, max: 1500},
    {strokeStyle: "#16db6f", min: 1500, max: 3000}
];

payoutStaticZone = [
    {strokeStyle: "#ed1858", min: 0, max: 1500},
    {strokeStyle: "#16db6f", min: 1500, max: 3000}
];

p2eStaticZone = [
    {strokeStyle: "#ed1858", min: 0, max: 1500},
    {strokeStyle: "#16db6f", min: 1500, max: 3000}
];

roeStaticZone = [
    {strokeStyle: "#ed1858", min: 0, max: 600},
    {strokeStyle: "#f08e8e", min: 600, max: 1200},
    {strokeStyle: "#e0f525", min: 1200, max: 1800},
    {strokeStyle: "#91f229", min: 1800, max: 2400},
    {strokeStyle: "#16db6f", min: 2400, max: 3000}
];

roceStaticZone = [
    {strokeStyle: "#ed1858", min: 0, max: 1500},
    {strokeStyle: "#16db6f", min: 1500, max: 3000}
];

//Gauge
function getOpts(staticZone) {
    
    return {
        colorStart: "#6fadcf",
        colorStop: void 0,
        gradientType: 0,
        strokeColor: "#000",
        pointer: {
            length: 0.6,
            strokeWidth: 0.035,
            iconScale: 1.0,
            color: "#ccc"
        },
        staticLabels: {
            font: "14px sans-serif",
            labels: [],
            fractionDigits: 0,
            color: "#fff"
        },
        staticZones: staticZone,
        angle: 0,
        lineWidth: 0.5,
        radiusScale: 1.0,
        fontSize: 40,
        limitMax: false,
        limitMin: false,
        highDpiSupport: true
    }
    
}

const target = document.querySelector("#gauge1");
const epsGauge = new Gauge(target).setOptions(getOpts(epsStaticZone));
const divPayoutGauge= new Gauge(document.querySelector("#gauge2")).setOptions(getOpts(payoutStaticZone));
const p2eGauge = new Gauge(document.querySelector("#gauge3")).setOptions(getOpts(p2eStaticZone));
const roeGauge = new Gauge(document.querySelector('#gauge4')).setOptions(getOpts(roeStaticZone));
const roceGauge = new Gauge(document.querySelector("#gauge5")).setOptions(getOpts(roceStaticZone));


/* Setting up values of gauges */
epsGauge.maxValue = 3000;
epsGauge.setMinValue(0);
if (obj.eps === "HEALTHY!") {
    epsGauge.set(2200);
} else {
    epsGauge.set(750);
}
epsGauge.animationSpeed = 10;

divPayoutGauge.maxValue = 3000;
divPayoutGauge.setMinValue(0);

if (obj.div_payouts === "HEALTHY!") {
    divPayoutGauge.set(2200);
} else {
    divPayoutGauge.set(750);
}

divPayoutGauge.animationSpeed = 10;

p2eGauge.maxValue = 3000;
p2eGauge.setMinValue(0);

if (obj.p2e === "CHEAP!") {
    p2eGauge.set(2200);
} else {
    p2eGauge.set(750);
}

p2eGauge.animationSpeed = 10;

roeGauge.maxValue = 3000;
roeGauge.setMinValue(0);

if (obj.roe === "EXTREMELY GOOD!") {
    roeGauge.set(2750);
} else if (obj.roe === "GREAT!") {
    roeGauge.set(2200);
} else if (obj.roe === "GOOD!") {
    roeGauge.set(1500);
} else if (obj.roe === "ACCEPTABLE!") {
    roeGauge.set(750);
} else {
    roeGauge.set(300);
}

roeGauge.animationSpeed = 10;

roceGauge.maxValue = 3000;
roceGauge.setMinValue(0);

if (obj.roce === "GOOD!") {
    roceGauge.set(2200);
} else {
    roceGauge.set(750);
}

roceGauge.animationSpeed = 10;


/* Managing Stars */
const svgs = document.querySelectorAll(".star");
const paths = [];

svgs.forEach((index) => paths.push(index.querySelector("path")));

for (i= 0; i < obj.star; i++) {
    paths[i].style.fill = "#ffd700";
}

document.querySelector(".eps-result").innerHTML = `(${obj.eps})`;
document.querySelector(".payout-result").innerHTML = `(${obj.div_payouts})`;
document.querySelector(".p2e-result").innerHTML = `(${obj.p2e})`;
document.querySelector(".roe-result").innerHTML = `(${obj.roe})`;
document.querySelector(".roce-result").innerHTML = `(${obj.roce})`;