export default {
  getToken (name) {
    var arr;
    var reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
      return arr[2];
    } else {
      return null;
    }
  }
}
