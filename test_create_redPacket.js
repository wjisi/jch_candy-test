// 发红包测试
const axios = require("axios");
const service = axios.create({
  timeout: 30000
});
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    return Promise.reject(err)
  }
);
const sign = require("jcc_exchange").sign;
const serverUrl = "https://candy.jcdtech.cn/api";
const candyType = 0; // 红包类型 0均分红包  1随机红包
const candyNumber = 1; // 红包个数
const amount = 8; // 红包金额swtc
const testSwtcAddress = ""; // 发红包、抢红包的地址
const testSwtcSecret = ""; // 密钥

const sendRawTransactionAndCreate = async (candyType, candyNumber, sign) => {
  let data = {
      type: parseInt(candyType),
      num: parseInt(candyNumber),
      sign: sign
  }
  let url = serverUrl + "/sendTransactionAndCreate";
  let res = await service.post(url, data);
  return res;
}
async function getNonce(address) {
  let url = serverUrl + "/getNonce?address="+address;
  let res = "";
  try {
    res = await service.get(url);
  } catch (error) {
    console.log(error.message)
  }
  return res;
};

const createCandy = async () => {
  try {
    let seq = await getNonce(testSwtcAddress);
    let signTx = await sign({
      Account: testSwtcAddress,
      Amount: amount,
      Destination: "jZ3Upe4Be53xVVoRqyiXqCkrXBMfegDP9", // 红包服务钱包地址
      Fee: 0.001,
      Flags: 0,
      Sequence: seq,
      Memos: [
        {
          Memo: {
            MemoData: "",
            MemoType: "string"
          }
        }
      ],
      TransactionType: "Payment"
    }, testSwtcSecret);
    console.log("signTx", signTx)
    let hash = await sendRawTransactionAndCreate(candyType, candyNumber, signTx);
    console.log("Send successed", hash)
  } catch (error) {
    console.log("error!", error.message)
  }
}
createCandy();