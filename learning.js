import { graphData } from "./allAPiCall.js";
import { getSummary } from "./allAPiCall.js";
import { stockListWithProfiteAndBookValue } from "./allAPiCall.js";
import { showStockGraph } from "./chart.js";
import { myChartt } from "./chart.js";

async function main() {
  let data1 = await graphData();
  let stockData = data1.stocksData[0].AAPL["5y"].value;
  let timeStamp = data1.stocksData[0].AAPL["5y"].timeStamp;
  showStockGraph("AAPL", stockData, timeStamp);
}
main();

setTimeout(() => {
  let stockBtn = document.querySelectorAll(".list");
  stockBtn.forEach((el) => {
    el.addEventListener("click", showData);
  });
}, 500);

async function stockNameWithProfit(value) {
  let data = await stockListWithProfiteAndBookValue();
  let stockDataObj = data.stocksStatsData[0];
  for (const [key, stockData] of Object.entries(stockDataObj)) {
    if (key == value) {
      Stockname.textContent = key;
      if (stockData.profit <= 0) {
        profit.style.color = "red";
        profit.textContent = `${stockData.profit}%`;
      } else {
        profit.style.color = "green";
        profit.textContent = `${stockData.profit}%`;
      }
      bookValue.textContent = `$${stockData.bookValue}`;
    }
  }
}

async function setStockSummary(value) {
  let data = await getSummary();
  let stockSummaryObj = data.stocksProfileData[0];
  for (const [key, stockSummary] of Object.entries(stockSummaryObj)) {
    if (key == value) {
      summaryText.textContent = stockSummary.summary;
    }
  }
}

async function showData(event) {
  let data = await graphData();
  let getStock = data.stocksData[0];
  for (const [key, value] of Object.entries(getStock)) {
    if (event.target.value === key) {
      let timeStamp = value["5y"].timeStamp;
      let data = value["5y"].value;
      if (myChartt) {
        myChartt.destroy();
      }
      showStockGraph(key, data, timeStamp);
      stockNameWithProfit(event.target.value);
      setStockSummary(event.target.value);
    }
  }
}

let timeBtn = document.querySelectorAll(".timeBtn");
timeBtn.forEach((e) => {
  e.addEventListener("click", async function (event) {
    let data = await graphData();
    let getStock = data.stocksData[0];
    for (const [key, value] of Object.entries(getStock)) {
      if (key === Stockname.textContent) {
        let timeStamp = value[event.target.value].timeStamp;
        let data = value[event.target.value].value;
        if (myChartt) {
          myChartt.destroy();
          showStockGraph(key, data, timeStamp);
        }
      }
    }
  });
});
