var game = new Phaser.Game(750, 1220 , Phaser.CANVAS,"game");

var Load = function() {};
Load.prototype = {
	setScale: function(val){
		val = val * gameScale * 2;
		return val;
	},
	startLoad: function() {
		this.load.image('title','image/title.png')
		this.load.image('bg', 'image/index_bg.jpg');
		
		this.load.spritesheet('water','image/water.png')
		this.load.image('water-1','image/water-1.png')
		this.load.image('water-2','image/water-2.png')
		
		this.load.spritesheet('basaha','image/basaha.png')
		this.load.image('basaha-1','image/basaha-1.png')
		this.load.image('basaha-2','image/basaha-2.png')
		
		this.load.spritesheet('peach','image/peach.png')
		this.load.image('peach-1','image/peach-1.png')
		this.load.image('peach-2','image/peach-2.png')
		
		this.load.spritesheet('bomb','image/bomb.png',100,93)
		this.load.start();
	},
	loadStart: function() {
		this.text.setText("加载中 ...");
	},
	fileComplete: function(progress) {
		this.text.setText( + progress + "%");
	},
	loadComplete: function() {
		this.text.setText("启动中 ...");
	
		
		game.state.start('Game');
	},
	create: function() {
		this.stage.backgroundColor = '#fff';
		//适应屏幕
		this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		this.scale.setGameSize(gameWidth * 2, gameHeight * 2);
		this.scale.setMinMax(320,480,1080,1920);
		//失去焦点是否继续游戏
		this.stage.disableVisibilityChange = true;
		//load提示
		this.text = this.add.text(this.world.centerX, this.world.centerY, '', {font: this.setScale(20)+"px myFont", fill: '#6c6f3a' ,});
		this.text.anchor.set(0.5);
		//this.text.setShadow(3, 3, 'rgba(0,0,0,0.2)', 2);
		this.load.onLoadStart.add(this.loadStart, this);//开始
		this.load.onFileComplete.add(this.fileComplete, this);//加载中
		this.load.onLoadComplete.add(this.loadComplete, this);//加载结束
		this.startLoad();
	}
};