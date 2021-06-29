const axios = require('axios');
axios.create({ headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });

let year = new Date().getFullYear();
let page = 0;
const serverUrl = "https://candy.jcdtech.cn/api";
const address = "" // 要查询已发红包、已抢红包的钱包地址

// 已抢红包
const getObtainCandyList = (address, year, pageNum) => {
  return new Promise(async (resolve, reject) => {
    let url = serverUrl + "/getHistoryByAddr?address=" + address + "&year=" + year + "&pageNum=" + pageNum;
    let res = await axios.get(url);
    console.log("getCandyList", res.data)
    return resolve();
  });
}
// 已发红包
const getSendCandyList = (address, year, pageNum) => {
  return new Promise(async (resolve, reject) => {
    let url = serverUrl + "/getPacketByAddr?address=" + address + "&year=" + year + "&pageNum=" + pageNum;
    let res = await axios.get(url);
    console.log("sendCandyList", res.data)
    return resolve();
  });
}

Promise.all([getObtainCandyList(address, year, page),getSendCandyList(address, year, page)])
.then( () => {
  console.log("List end")
});
