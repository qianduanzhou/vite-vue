const DEVICEWIDTH = 1920;// 设计稿设备宽度
const ROOTVALUE = 100 // 对应postcss.config里面的rootValue
// 设置 rem 函数
function setRem () {
  // 当前设备宽度
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  // 得到html的Dom元素
  let htmlDom = document.getElementsByTagName('html')[0];
  // 设置根元素字体大小
  htmlDom.style.fontSize = htmlWidth / DEVICEWIDTH * ROOTVALUE + 'px';
  console.log(htmlDom.style.fontSize)
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}