/**
 * Created by 晓倩 on 2017/4/3.
 */
class Circle {
    //创建对象
    //以一个圆为对象
    //设置随机的 x，y坐标，r半径，_mx，_my移动的距离
    //this.r是创建圆的半径，参数越大半径越大
    //this._mx,this._my是移动的距离，参数越大移动
    constructor(x, y) {
		this.pos = Math.round(Math.round(Math.random()*100)*(arry.length-1)/100);
        this.x = x;
        this.y = y;
        this.r = 1;
        this._mx = Math.random()*8-4;
        this._my = Math.random()*8-4;
		this.rgb = Math.random() *0xffffff;
    }

    //canvas 画圆和画直线
    //画圆就是正常的用canvas画一个圆
    //画直线是两个圆连线，为了避免直线过多，给圆圈距离设置了一个值，距离很远的圆圈，就不做连线处理
    drawCircle(ctx) {
		var numberrgb = new Number(Math.round(this.rgb));
			var color = new String(numberrgb.toString(16));
        //ctx.beginPath();
        //arc() 方法使用一个中心点和半径，为一个画布的当前子路径添加一条弧。
        //ctx.arc(this.x, this.y, this.r, 0, 360)
        //ctx.closePath();
        ctx.fillStyle = '#'+color+'aa';
		ctx.strokeText(arry[this.pos],this.x, this.y);
		ctx.textAlign="center";
		ctx.font="normal normal 500 20px arial";
       // ctx.fill();
    }

    drawLine(ctx, _circle) {
        let dx = this.x - _circle.x;
        let dy = this.y - _circle.y;
         let d = Math.sqrt(dx * dx + dy * dy)
         // if (d < 500) {
			var numberrgb = new Number(Math.round(this.rgb));
			var color = new String(numberrgb.toString(16));
            ctx.beginPath();
            //开始一条路径，移动到位置 this.x,this.y。创建到达位置 _circle.x,_circle.y 的一条线：
            ctx.moveTo(this.x, this.y);   //起始点
            ctx.quadraticCurveTo(this.x,_circle.y,_circle.x, _circle.y,);// lineTo(_circle.x, _circle.y);   //终点
            //ctx.closePath();
            ctx.strokeStyle = '#'+color+'aa';
            ctx.stroke();
			ctx.lineWidth = 2;
         // }
    }

    // 圆圈移动
    // 圆圈移动的距离必须在屏幕范围内
    move(w, h) {
		if(this.x >= w || this.x <= 0){
			this._mx = -this._mx;
			this.rgb = Math.random() *0xffffff;
			if(++this.pos >= arry.length)
				this.pos = 0;
			//this.r = Math.random() *5;
		}
		if(this.y >= h/4*3 )
		{
			this.rgb = Math.random() *0xffffff;
			this._my = -(Math.random()*10);
			if(++this.pos >= arry.length)
				this.pos = 0;
		}
		else if (this.y <= 0)
		{
			this._my = -this._my;
			this.rgb = Math.random() *0xffffff;
			//this.r = Math.random() *5;
			if(++this.pos >= arry.length)
				this.pos = 0;
		}
        this.x += this._mx / 2;
        this.y += this._my / 2;
    }
}


//更新页面用requestAnimationFrame替代setTimeout
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

let mycanvas = document.getElementById('canvas');
let ctx = mycanvas.getContext('2d');//屏幕
let w = mycanvas.width = mycanvas.offsetWidth;
let h = mycanvas.height = mycanvas.offsetHeight;
let circles = [];
let centercircl;
var arry = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正" ,"法治", "爱国", "敬业", "诚信", "友善");
		
//绘函数
let draw = function () {
    ctx.clearRect(0, 0, w, h);//清空屏幕
	//centercircl.move(w, h);//移对应位置
    for (let i = 0; i < circles.length; i++) {//检索圆对象数组长度
		// if(i%2 == 0)
		circles[i].move(w, h);//移对应位置
        circles[i].drawCircle(ctx);//画出圆
		circles[i].drawLine(ctx, centercircl);//画出线
        // for (j = i + 1; j < circles.length; j++) {
            // circles[i].drawLine(ctx, circles[j]);
        // }
    }
    requestAnimationFrame(draw);
}

let init = function (num) {
	centercircl = new Circle(w/2, h);//中心元
    for (var i = 1; i < num; i++) {
        circles.push(new Circle( Math.random()*w/2+w/4, Math.random()*h/2+h/4));
    }
    draw();//绘出来
}
window.addEventListener('load', init(10));
window.onmousemove = function (e) {
    e = e || window.event;
    current_circle.x = e.clientX;
    current_circle.y = e.clientY;
}
window.onmouseout = function () {
    current_circle.x = null;
    current_circle.y = null;

};