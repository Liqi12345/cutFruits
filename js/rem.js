/*
 * @Author: your name
 * @Date: 2019-12-25 14:20:57
 * @LastEditTime : 2020-01-03 10:19:34
 * @LastEditors  : sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \三棵树\js\rem.js
 */
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 750
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = 100 * scale + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function() {
  setRem()
}
function MD5(val) {
  return md5(val).toUpperCase();
}
function Base64() {
  return BASE64;
}
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search ? window.location.search.split('?')[1].substr(0).match(reg) : null;
  if (r != null) {
    return r[2]
  } else {
    return false
  }
}