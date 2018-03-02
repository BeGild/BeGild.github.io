<!-- 鼠标点击特效Start -->
<!-- var a_idx = 0; -->
  jQuery(document).ready(function($) {
      $("body").click(function(e) {
  <!--var a = new Array("+1"); -->
  var $i = $("<span/>").text("+1");
  <!-- a_idx = (a_idx + 1) % a.length; -->
  var x = e.pageX, y = e.pageY;
  $i.css({
  "z-index": 0,"top": y - 20,"left": x,"position": "absolute","font-weight": "bolder", 
  "color": "rgb("+~~(255*Math.random())+","+~~(255*Math.random())+","+~~(255*Math.random())+")"
  });
  $("body").append($i);
  $i.animate({
  "top": y - 200,
  "opacity": 0
    },2000,
  function() {
              $i.remove();
          });
      });
  });
  <!-- 鼠标点击特效End -->
