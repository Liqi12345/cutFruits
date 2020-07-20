vm = this.vue
console.log(this)
t = null
var MyGame = function() {

};

function getWaterNum(fn) {

	this.basaha = { //设置每个水果最大数量
		num: 0,
		max: 2,
		score: 5
	}
	this.peach = {
		num: 0,
		max: 5,
		score: 3
	}
	this.water = {
		num: 0,
		max: 15,
		score: 1
	}
	this.bomb = {
		num: 0,
		max: 2,
		score: 1
	}
	fn()

}
MyGame.prototype = {
	setScale: function(val) {
		val = val * gameScale * 2;
		return val;
	},
	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//开启物理引擎
		this.physics.startSystem(Phaser.Physics.ARCADE);
		//适应屏幕
		this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		this.scale.setGameSize(gameWidth * 2, gameHeight * 2);

		//失去焦点是否继续游戏
		this.stage.disableVisibilityChange = false;
		//this.stage.smoothed=false
		this.reduce = (gameWidth - 375)
		this.fruitGroup = {}
		this.speedRange = {
			min: 2500,
			max: 3500
		}
		this.step = 10 //速度递增步进值
		this.createFruitTime = 1800

		this.minutes = 30
		this.optionObj = {}
		this.num = 0

		console.log(this.minutes, '*******')
		this.iniGame();

	},
	iniGame: function() {
		this.bg = game.add.image(0, 0, 'bg')

		this.bg.width = gameWidth * 2
		this.bg.height = gameHeight * 2
		this.fruitGroup = game.add.group()
		this.title = game.add.image(0, 0, 'title')
		this.title.width = gameWidth * 2
		this.title.height += this.reduce
		this.getMinutes = game.add.text(350 + this.reduce, 122 + this.reduce, this.minutes + 's', {
			font: 32 + "px myFont",
			fill: '#fff',
			boundsAlignH: "center"
		})

		this.getNum = game.add.text(600 + this.reduce * 2, 150 + this.reduce, this.num, {
			font: 32 + "px myFont",
			fill: '#fff',
			boundsAlignH: "center"
		})

		getWaterNum.call(this, () => {
			console.log(8888)
			this.loop()
			t = setInterval(() => {
				this.minutes--
					if(this.minutes == 0) {
						clearInterval(t)
						t = null
						game.paused = true
						alert('总分为' + this.num)
					}

				this.getMinutes.text = this.minutes + 's'
				this.loop()
			}, 1000)
		})

		this.blade = new Blade({
			game: game
		});
		this.blade.allowBlade();
	},
	update: function() {
		if(game.input.activePointer.isDown) {

			this.blade.update();
			let events = game.input,
				arr = this.fruitGroup.children,
				x = game.input.x,
				y = game.input.y

			if(!this.AlreadyDown) {
				time = new Date().getTime()

				this.AlreadyDown = true
			}
			

			if(this.optionObj.x) {
				if(this.optionObj.x != x || this.optionObj.y != y) { //移动手指才可触发切西瓜
					for(let i in arr) {
						let spriteX = arr[i].position.x,
							spriteY = arr[i].position.y,
							spriteW = arr[i].width,
							spriteH = arr[i].height,
							range = spriteW * 0.05
						if(((x > spriteX + range) && (x < (spriteX + spriteW - range))) && (y > spriteY + range) && (y < (spriteY + spriteH - range))) { //检测碰撞

							this.num += arr[i].score

							if(arr[i].key == 'bomb') {
								arr[i].frame = 1
								this.num = 0

							} else { //切开动画
								var degs = this.blade.collideDeg();
								let halfOne = game.add.sprite(x - 10, y - 10, arr[i].key + '-1');
								let halfTwo = game.add.sprite(x + 10, y + 10, arr[i].key + '-2');
								halfOne.scale.setTo(1.2)
								halfTwo.scale.setTo(1.2)
								halfOne.rotation = degs + 45;
								halfTwo.rotation = degs + 45;
								let end = game.add.tween(halfOne).to({
									x: x - 40,
									y: y + 70
								}, 70, Phaser.Easing.Default, true)
								end.onComplete.add(() => {
									game.add.tween(halfOne).to({
										x: (x - 100),
										y: y + 1500
									}, 700, Phaser.Easing.Default, true).onComplete.add(() => {
										halfOne.destroy()
									})
								})
								let end1 = game.add.tween(halfTwo).to({
									x: (x + 50),
									y: (y + 70)
								}, 70, Phaser.Easing.Default, true)
								end1.onComplete.add(() => {
									game.add.tween(halfTwo).to({
										x: (x + 80),
										y: y + 1500
									}, 700, Phaser.Easing.Default, true).onComplete.add(() => {
										halfTwo.destroy()
									})
								})

								arr[i].destroy()
							}
							this.getNum.text = this.num

						}

					}
				}
			}

			this.optionObj.x = x, this.optionObj.y = y

		} else {

			this.AlreadyDown = false
			this.optionObj = {}
			this.blade.endDG()
		}
	},
	loop() {

		if(this.fruitGroup.children.length > 30) {
			return
		}
		for(let i = 0; i < 4; i++) { //每次随机创建四个
			let type = l(0, 3),
				fruit = null

			if(type == 0) {
				if(this.peach.num < this.peach.max) {
					this.peach.num++
						fruit = game.add.sprite(l(0, 315 * 2), l(-100, -1000), 'peach')
					fruit.score = this.peach.score
				} else {
					type = l(1, 3)
				}
			}

			if(type == 1) {
				if(this.basaha.num < this.basaha.max) {
					this.basaha.num++
						fruit = game.add.sprite(l(0, 315 * 2), l(-100, -1000), 'basaha')
					fruit.score = this.basaha.score
				} else {
					type = l(2, 3)
				}
			}

			if(type == 2) {
				if(this.bomb.num < this.bomb.max) {
					this.bomb.num++
						fruit = game.add.sprite(l(0, 315 * 2), l(-100, -1000), 'bomb')
					fruit.score = this.bomb.score
				} else {
					type = 3
				}

			}

			if(type == 3) {
				this.water.num++
					fruit = game.add.sprite(l(0, 315 * 2), l(-100, -1000), 'water')
				fruit.score = this.water.score

			}
			fruit.scale.setTo(1.2)
			this.fruitGroup.add(fruit)
			fruit.moveDown()
			let end = game.add.tween(fruit).to({
				y: 1700
			}, l((this.speedRange.min -= this.step), (this.speedRange.max -= this.step)), Phaser.Easing.Default, true)
			this.createFruitTime -= 10
			end.onComplete.add(() => {
				switch(end.target.key) {
					case 'basaha':
						this.basaha.num--
							break;
					case 'water':
						this.water.num--
							break;
					case 'peach':
						this.peach.num--
							break;
					case 'bomb':
						this.bomb.num--
							break;
					default:
						''
				}
				fruit.destroy()

			})

			//fruit.inputEnabled = true;

		}
	}

}