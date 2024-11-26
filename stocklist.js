let stock_list = document.querySelector("#stock-list");
import { stockListWithProfiteAndBookValue } from "./allAPiCall.js";

async function getstockData() {
  let data = await stockListWithProfiteAndBookValue();
  let y = data.stocksStatsData[0];
  for (const [key, value] of Object.entries(y)) {
    if (value.bookValue != undefined) {
      showData(key, value);
    }
  }
}
function showData(data, value) {
  let html = `<div class="list_i" >
    <button class="list" value=${data}>${data}</button><span>$${
    value.bookValue
  }</span
    ><span style= ${value.profit <= 0 ? "color:red" : "color:#90ee90"}>${
    value.profit
  }%</span>
  </div>`;
  stock_list.insertAdjacentHTML("beforeend", html);
}

getstockData();
