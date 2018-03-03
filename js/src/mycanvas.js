/**
 * Created by 晓倩 on 2017/4/3.
 * Modify by  BeGild BeGild.top
 */
class Words {
    //以一串文字为对象
    //设置随机的 x，y坐标，_mx，_mym每次移动的距离
	//this.pos 当前对象的文字位于数组里的位置
    //this._mx,this._my是移动的距离，参数越大移动
	//this.rgb 文字和线条的颜色;
    constructor(i) {
		this.pos = i;
        this.x = Math.random()*w/2+w/4;
        this.y = Math.random()*h/2+h/4;
        this._mx = Math.random()*3-1.5;
        this._my = Math.random()*3-1.5;
		this.rgb = Math.random() *0xffffff;
    }

	//在指定坐标写字符
    drawWords(ctx) {
		var numberrgb = new Number(Math.round(this.rgb));
		var color = new String(numberrgb.toString(16));
        ctx.fillStyle = '#'+color+'50';//aa为透明度
		ctx.strokeText(arry[this.pos],this.x, this.y);
		ctx.textAlign="center";
		ctx.font="normal normal 500 20px arial";
    }
	//将字和底部的固定点连线
    drawLine(ctx) {
		var numberrgb = new Number(Math.round(this.rgb));
		var color = new String(numberrgb.toString(16));
        ctx.beginPath();
        //开始一条路径，移动到位置 this.x,this.y。创建到达位置 _circle.x,_circle.y 的一条线：
        ctx.moveTo(this.x, this.y);   //起始点
		//创建2维贝塞尔曲线
        ctx.quadraticCurveTo(this.x,FixedPoint_y,FixedPoint_x, FixedPoint_y);
        ctx.strokeStyle = '#'+color+'50';
        ctx.stroke();
		ctx.lineWidth = 2;
    }

    // 文字的移动
    move(w, h) {
		//横向移动的范围
		if(this.x >= w || this.x <= 0){
			this._mx = -this._mx;
			this.rgb = Math.random() *0xffffff;
		}
		//垂直移动的范围0--3/4
		if(this.y >= h*3/4)
		{
			this.rgb = Math.random() *0xffffff;
			this._my = -(Math.random()*3-1.5);
		}
		else if (this.y <= 0)
		{
			this._my = -this._my;
			this.rgb = Math.random() *0xffffff;
		}
        this.x += this._mx ;
        this.y += this._my ;
    }
}


//更新页面用requestAnimationFrame替代setTimeout
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

let mycanvas = document.getElementById('canvas');
let ctx = mycanvas.getContext('2d');//屏幕
let w = mycanvas.width = mycanvas.offsetWidth;
let h = mycanvas.height = mycanvas.offsetHeight;
let circles = [];

//固定点的坐标(底部中间)
var FixedPoint_x = new Number(w/2);
var FixedPoint_y = new Number(h);
var arry = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正" ,"法治", "爱国", "敬业", "诚信", "友善");

//绘函数
let draw = function () {
    ctx.clearRect(0, 0, w, h);//清空屏幕
    for (let i = 0; i < circles.length; i++) {//检索对象数组长度
		circles[i].move(w, h);//移对应位置
        circles[i].drawWords(ctx);//画出圆
		circles[i].drawLine(ctx);//画出线
    }
    requestAnimationFrame(draw);//执行draw
}
//初始化对象num为数量
let init = function () {
    for (var i = 0; i < arry.length; i++) {
        circles.push(new Words(i));
    }
    draw();//绘出来
}
//创建10个文字串对象
window.addEventListener('load', init());




