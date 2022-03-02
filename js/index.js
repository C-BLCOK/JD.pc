window.addEventListener("load", function () {
  /* ***********************************************轮播图模块begin****************************************************** */
  var allow_left = document.querySelector(".allow-left");
  var allow_right = document.querySelector(".allow-right");
  var banner = document.querySelector(".banner");
  /* *********************************************左右箭头 显示与隐藏*************************************************** */
  banner.addEventListener("mouseenter", function () {
    allow_left.style.display = "block";
    allow_right.style.display = "block";
    clearInterval(timer); //鼠标经过时 关闭自动播放
    timer = null; //删除定时器，可不写
  });
  banner.addEventListener("mouseleave", function () {
    allow_left.style.display = "none";
    allow_right.style.display = "none";
    //鼠标离开时 开启自动播放
    timer = setInterval(function () {
      allow_right.click();
    }, 2000);
  });
  /* **********************************************左右箭头 显示与隐藏结束********************************************** */

  /* ********************************************图片索引点轮播功能begin********************************************* */
  //动态生成banner模块图片索引点
  //1、先获取图片个数
  //2、给ol追加li
  //3、创建li的设置自定义属性
  var ol = banner.querySelector("ol");
  var ul = banner.querySelector("ul");
  var bannerWidth = banner.offsetWidth;
  for (var i = 0; i < ul.children.length; i++) {
    var li = document.createElement("li");
    li.setAttribute("index", i); //给每个li添加自定义属性index
    ol.appendChild(li);
    //创建li的 同时 注册事件
    li.addEventListener("click", function () {
      //排他思想给当前点击的 图片索引点 设置背景颜色，以及 点击图片索引点 切换对应图片
      for (var j = 0; j < ol.children.length; j++) {
        ol.children[j].className = "";
      }
      this.className = "current";
      var index = this.getAttribute("index");
      num = index;
      circle = index;
      //动画步长即ul移动距离=图片索引点*图片宽度，取负值，因为是向左移动。这里的图片宽度就是banner的宽度
      animate(ul, -index * bannerWidth);
    });
  }
  ol.children[0].className = "current"; //第一个图片索引点背景
  /* ***************************************************图片索引点轮播功能end************************************************ */

  /* ********************************************侧边按钮轮播功能begin****************************************************** */
  //1、定义一个新变量
  //2、每点击一次侧边按钮，变量就自加一次
  //3、调用动画函数
  //4、图片移动距离=变量*图片宽度，取负值，图片宽度还是banner宽度
  //5、无缝滚动需要克隆第一张图，放到末尾，且该图left值为0，这样当轮播到最后一张时再轮播下一张能迅速回到第一张，由于速度太快，用户看不见。由于拷贝粘贴写到了 创建li外边 所以不会改变图片索引点数量

  var allow_right = this.document.querySelector(".allow-right");
  var allow_left = this.document.querySelector(".allow-left");
  var copyImg = ul.children[0].cloneNode(true);
  ul.appendChild(copyImg);
  var num = 0;
  var circle = 0;
  var flag = true; //声明 节流阀
  //封装图片索引点背景函数
  function cr_fn() {
    for (var i = 0; i < ol.children.length; i++) {
      ol.children[i].className = "";
    }
    ol.children[circle].className = "current";
  }
  allow_right.addEventListener("click", function () {
    //节流阀
    if (flag) {
      flag = false; //执行第一次后 关闭节流阀
      if (num == ul.children.length - 1) {
        ul.style.left = 0;
        num = 0;
      }
      num++;
      animate(ul, -num * bannerWidth, function () {
        flag = true; //动画结束后 打开节流阀
      });
      //点击侧边按钮时 图片索引点背景跟着变化
      circle++;
      if (circle == ol.children.length) {
        circle = 0; //当点击到最后一张图时 让其回到起点 从头开始
      }
      cr_fn(); //调用图片索引点背景函数
    }
  });
  /* ************************************************************************************************************************** */
  allow_left.addEventListener("click", function () {
    if (flag) {
      flag = false; //关闭节流阀
      if (num == 0) {
        num = ul.children.length - 1;
        ul.style.left = -num * bannerWidth + "px";
      }
      num--;
      animate(ul, -num * bannerWidth, function () {
        flag = true; // 打开节流阀
      });
      //点击侧边按钮时 图片索引点背景跟着变化
      circle--;
      if (circle < 0) {
        circle = ol.children.length - 1; //当点击到最后一张图时 让其回到起点 从头开始
      }
      cr_fn(); //调用图片索引点背景函数
    }
  });

  /* **********************************************侧边按钮轮播功能end******************************************************* */

  /* *********************************************轮播图自动播放功能begin***************************************************** */
  var timer = setInterval(function () {
    //手动调用点击事件，让右边按钮自动调用点击事件
    allow_right.click();
  }, 2000);
  /* **********************************************轮播图自动播放功能end****************************************************** */
  /* **************************************************轮播图模块end********************************************************* */
});
