export let myChartt;
export function showStockGraph(key, stockData, timeStamp) {
  let labels = [];
  for (let index = 0; index < timeStamp.length; index++) {
    let time = new Date(timeStamp[index] * 1000).toLocaleDateString();
    labels.push(time);
  }
  const data = {
    labels: labels,
    datasets: [
      {
        borderColor: "green",
        pointBackgroundColor: "black",
        pointStyle: "circle",
        hoverBorderWidth: 5,
        data: stockData,
        label: key,
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  };
  myChartt = new Chart(document.getElementById("myChart"), config);
}
