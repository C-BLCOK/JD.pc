function animate(obj, target, backfunction) {
  clearInterval(obj.timer); //若用点击事件触发动画 则每次调用定时器之前必须清除定时器一次，解决多次点击动画加速问题。因为每点击一次就会调用一次定时器，造成在同一时刻会调用多次定时器，而调用会延迟因而造成加速现象。
  obj.timer = setInterval(function () {
    var step = (target - obj.offsetLeft) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step); //消除误差
    if (obj.offsetLeft == target) {
      clearInterval(obj.timer);
      //如果又回调函数就执行回调函数
      // if (backfunction) {
      //   backfunction();
      // }
      backfunction && backfunction(); //if高级写法 当边都为true才执行，即两个都存在才执行改语句。短路运算符，又一个条件不满足则跳过该语句
    } else {
      obj.style.left = obj.offsetLeft + step + "px";
    }
  }, 15);
}
