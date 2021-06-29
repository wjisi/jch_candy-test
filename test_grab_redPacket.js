// 抢红包测试
const axios = require('axios');
axios.create({ headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });
const serverUrl = "https://candy.jcdtech.cn/api";
const candyPassword = ""  // 红包口令复制于此
const getCandyAddress = "" // 填写获取红包的钱包地址

const distributionCandy = async (address, id, title) => {
  let url = serverUrl + "/grab";
  let data = {
      address: address,
      id: id,
      title: title,
  };
  let res = await axios.post(url, data);
  return res.data;
}
// 解密口令
const decodeTitlePwd = (password) => {
  password = password.replace("【", "").replace("】", "");
  let prefixIndex = password.indexOf(prefix);
  let suffixIndex = password.indexOf(suffix);
  let result = {};
  result.title = password.slice(0, prefixIndex);
  password = password.slice(prefixIndex, suffixIndex)
  result.password = password.replace(suffix, '').replace(prefix, '').replace(new RegExp(hongbao, 'g'), '-').trim()
  return result;
}

const getCandy = async () => {
  try {
    const decoded = decodeTitlePwd(candyPassword);
    const res = await distributionCandy(getCandyAddress, decoded.password, decoded.title)
  } catch (error) {
    console.log(error.message)
  }
}
getCandy();