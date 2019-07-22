export function getRouterParams(url, params) {
  let urlObj = new URLSearchParams(url)
  return urlObj.get(params)
}
export function getNowDate() {
  const now = new Date(),
    y = now.getFullYear(),
    m = now.getMonth() + 1,
    d = now.getDate();
  return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
}
export function getNowTime(time) {
  if(time) {
    return new Date(time).getTime()
  } else {
    return new Date().getTime()
  }
}
export function formatSeconds(value) {
  let secondTime = parseInt(value/1000);// 秒
  let minuteTime = 0;// 分
  let hourTime = 0;// 小时
  let result = ''
  if (secondTime > 60) {//如果秒数大于60，将秒数转换成整数
    //获取分钟，除以60取整数，得到整数分钟
    minuteTime = parseInt(secondTime / 60);
    //获取秒数，秒数取佘，得到整数秒数
    secondTime = parseInt(secondTime % 60);
    //如果分钟大于60，将分钟转换成小时
    if (minuteTime > 60) {
      //获取小时，获取分钟除以60，得到整数小时
      hourTime = parseInt(minuteTime / 60);
      //获取小时后取佘的分，获取分钟除以60取佘的分
      minuteTime = parseInt(minuteTime % 60);
    }
  }
  if (secondTime < 10) {
    result = "0" + parseInt(secondTime) + "";
  } else {
    result = "" + parseInt(secondTime) + "";
  }

  if (minuteTime > 0) {
    if (minuteTime < 10) {
      result = "0" + parseInt(minuteTime) + ":" + result;
    } else {
      result = "" + parseInt(minuteTime) + ":" + result;
    }
  } else {
     result = '00:' + result
  }
  if (hourTime > 0) {
    if (hourTime < 10) {
      result = "0" + parseInt(hourTime) + ":" + result;
    } else {
      result = "" + parseInt(hourTime) + ":" + result;
    }
  } else {
    result = '00:' + result
 }
  return result;
}