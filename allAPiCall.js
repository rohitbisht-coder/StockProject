export async function stockListWithProfiteAndBookValue() {
  let stock = await fetch(
    "https://stocksapi-uhe1.onrender.com/api/stocks/getstockstatsdata"
  );
  return stock.json();
}

export async function graphData() {
  let data = await fetch(
    "https://stocksapi-uhe1.onrender.com/api/stocks/getstocksdata"
  );
  return data.json();
}

export async function getSummary() {
  let data = await fetch(
    "https://stocksapi-uhe1.onrender.com/api/stocks/getstocksprofiledata"
  );
  return data.json();
}

async function DefaultValueSet() {
  let data = await getSummary();
  let stockSummaryObj = data.stocksProfileData[0].AAPL;
  summaryText.textContent = stockSummaryObj.summary;
  let data2 = await stockListWithProfiteAndBookValue();
  let stockDataObj = data2.stocksStatsData[0].AAPL;
  Stockname.textContent = "AAPL";
  profit.textContent = `${stockDataObj.profit}%`;
  bookValue.textContent = `$${stockDataObj.bookValue}`;
}
DefaultValueSet();
