function jumpToFenShi(stockCode: string, marketId: string) {
  window.location.href = `client://client.html?action=ymtz^webid=2205^stockcode=${stockCode}^marketid=${marketId}`;
}

export { jumpToFenShi };
