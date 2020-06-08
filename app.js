const express  = require("express")
const app = express()
const request = require('request');
const crypto = require('crypto');
const md5 = crypto.createHash('md5');

app.listen(3002,()=>{
    console.log("服务开启成功: http://localhost:3002")
})

app.get('/',function(req,res){
    res.send("欢迎使用淘客api接口")
})

// 大淘客api验证
const makeSign = ($data, $appSecret) =>{

    let $str = '';
    let $index = 0;
    let $sortPor = [];

    for (let key in $data) {
        $sortPor.push(`${key}=${$data[key]}`);
    }
    // 排序
    $sortPor.sort();

    // 转url
    for (let key in $sortPor) {
        $str =`${$str}${$index === 0 ? '' : '&'}${$sortPor[key]}`;
        $index++;
    }

    // md5加密
    const $ret = md5.update(`${$str}&key=${$appSecret}`).digest('hex');

    return $ret;
}
// 热搜记录
const getCategoryTop100 = () => {

    const appSecret = ''; //应用的Secret 
  
    const data = {
      version:'v1.0.0',// API接口版本号
      appKey:'',// 应用分配的appKey
    };
  
    var options = { 
      url: `https://openapi.dataoke.com/api/category/get-top100?appKey=${data.appKey}&version=${data.version}&sign=${makeSign(data,appSecret)}`,  //请求地址
      method: 'GET',
    };
  
    return request(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        //输出返回的内容
        console.log('接口调用成功',body);
      }else{
        //输出返回的内容
        console.log('接口调用失败',body);
      }
    })
    
  }