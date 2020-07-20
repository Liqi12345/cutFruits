var isStart = false,
	music = [],
	initScreen=function(callback){//初始化html  font-size
    	document.getElementById("html").style.setProperty("font-size",gameWidth/375*312.5+"%");
    };
  
function setSize(){
	console.log(window.innerWidth)
	gameWidth = window.innerWidth > 750 ? 750 : window.innerWidth;
	gameHeight = window.innerHeight;
	gameScale = gameWidth / window.innerWidth;
};

function loadJS(fun){
	var a = document.createElement('script');
		a.src = "./js/phaser.min.js";
		document.head.appendChild(a);
	a.onload=function(){
		var b = document.createElement('script');
			b.src = "./js/mathTool.js";
			document.head.appendChild(b);
		b.onload=function(){
			var c = document.createElement('script');
				c.src =  "./js/bladeObj.js";
				document.head.appendChild(c);
				c.onload=function(){
					var d = document.createElement('script');
					d.src =  "./js/load.js";
					document.head.appendChild(d);
					d.onload=function(){
						var e = document.createElement('script');
							e.src = "./js/game.js?t=3";
							document.head.appendChild(e);
						e.onload=function(){
							fun()
						};
						
					}
					
				}
		};
	};
};

loadJS(function(){
	game.state.add('Load', Load);
	game.state.add('Game', MyGame);
	game.state.start('Load');
	document.getElementById("forhorview").style.setProperty("display", "none");
});
//随机数
function l(a, b) {
    a = Math.round(a);
    b = Math.round(b);
    return Math.round((b - a) * Math.random()) + a
}
function ranArr(a, b) {
	return Math.random()>.5 ? -1 : 1;
};
setSize();
initScreen();
window.onresize = function(){
	console.log('***')
	setSize();
	initScreen();
};