class Options {
  defaultOptions = (url) => {
    return {
      method: "get",
      url: url,
      headers: {
        Authorization: "Bearer 844d046e-da6b-4484-851a-2c6dd6ed637e",
      },
    };
  };
  ohlcOptions = (interval, baseId, quoteId) => {
    return {
      method: "get",
      url: `https://api.coincap.io/v2/candles?exchange=poloniex&interval=${interval}&baseId=${baseId}&quoteId=${quoteId}`,
      headers: {
        // Authorization: "Bearer c01e24fe-4a5e-4f7c-b2e1-aaf157181e11",
        Authorization: "Bearer 844d046e-da6b-4484-851a-2c6dd6ed637e",
      },
    };
  };
}

module.exports = new Options();
