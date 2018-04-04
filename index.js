let request = require("request");

startTimer();

function startTimer() {
  setInterval(function() {
    outputPrices();
  }, 5000);
}

function outputPrices() {
  let globalJsonObject = null;
  console.log("\n");
  request("https://api.coinmarketcap.com/v1/global/", (error, response, body) => {
    console.log("\u001b[31m------------------------------------------------------\n\u001b[34mGlobal Market Cap: \u001b[32m$" + JSON.parse(body).total_market_cap_usd + "\n\u001b[31m------------------------------------------------------\u001b[0m\n\n");
  });
  request("https://api.coinmarketcap.com/v1/ticker/", (error, response, body) => {
    let cryptosJsonObject = JSON.parse(body);
    let mostExpenciveCrypto = ["", "0"];
    let cheapestCrypto = ["", "999999"];
    for (let i in cryptosJsonObject) {
      if (i <= 9) {
        console.log("\u001b[34m" + cryptosJsonObject[i].id + ": \u001b[32m$" + cryptosJsonObject[i].price_usd + "\u001b[0m");
      }
      if (parseInt(mostExpenciveCrypto[1]) < cryptosJsonObject[i].price_usd) {
        mostExpenciveCrypto[0] = cryptosJsonObject[i].id;
        mostExpenciveCrypto[1] = cryptosJsonObject[i].price_usd;
      }
      if (parseInt(cheapestCrypto[1]) > cryptosJsonObject[i].price_usd) {
        cheapestCrypto[0] = cryptosJsonObject[i].id;
        cheapestCrypto[1] = cryptosJsonObject[i].price_usd;
      }
    }
    console.log("\n\u001b[34mMost Expencive Crypto: \u001b[32m" + mostExpenciveCrypto[0] + " - $" + mostExpenciveCrypto[1] + "\u001b[0m");
    console.log("\u001b[34mCheapest Crypto: \u001b[32m" + cheapestCrypto[0] + " - $" + cheapestCrypto[1] + "\u001b[0m");
    console.log("\n\u001b[31m------------------------------------------------------\u001b[0m");
  });
}
