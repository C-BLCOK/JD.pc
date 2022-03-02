window.onload = function () {
  //表单验证手机号.........未成功
  var sj = document.querySelector("#sj");
  var regsj = /^[1|3|4|5|7|8]\d{9}$/;
  sj.onblur = function () {
    if (regsj.test(this.value)) {
      alert("正确");
      this.nextElementSibling.className = "right";
      this.nextElementSibling.innerHTML = "<span class='right'>输入正确</span>";
    } else {
      alert("输入有误");
      this.nextElementSibling.className = "wrong";
      this.nextElementSibling.innerHTML =
        "<span class='wrong'>手机号码格式不正确，请重新输入</span>";
    }
  };
};
