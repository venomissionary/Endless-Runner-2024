class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
        this.HighScore = 0
        this.GameSpeed = 1
        this.SpawnSpeed = 2000

    }

    preload() {
        this.load.image('GameBG_1','./assets/GameBG1.png')
        this.load.image('GameBG_2','./assets/GameBG2.png')
        this.load.image('Rocket', './assets/Rocket.png')
        this.load.image('BG_1','./assets/Background1.jpg')

        this.load.image('Spikes', './assets/Spikes.png')

        this.load.image('Menu', './assets/Menu1.png')
        this.load.image('Menu2', './assets/Menu2.png')

        this.load.image('Coin1', './assets/Coin.png')
        this.load.image('Coin2', './assets/Coin2.png')

        this.load.audio('Sound2', './assets/Sound_2.wav')
        this.load.audio('Sound3', './assets/Sound_3.wav')

    }

    create() {
        this.StartGame = false
        this.Counter = 0

        this.CoinSound = this.sound.add('Sound2', {volume: 0.5})
        this.GameOverSound = this.sound.add('Sound3', {volume: 0.5})
       
        this.BG_0 = this.add.tileSprite(900,900, 0, 0, 'BG_1').setScale(1).setOrigin(1,1)
      
        this.BG_1 = this.add.tileSprite(900,900,0,0 ,'GameBG_2').setOrigin(1, 1).setScale(1).setAlpha(0.5)
        this.floor = this.add.image(900,900, 'GameBG_1').setOrigin(1).setScale(1.1).setAlpha(1)

        this.TextConfig = {
            fontFamily: 'ComicSans',
            fontSize: '28px',
            color: '#9A1F1F',
        };

        this.Prompt = this.add.text(180,200, "Press Space To start!", this.TextConfig).setScale(2)
       
        this.Rocket = this.add.sprite(900,900, 'Rocket').setOrigin(1.2,1).setScale(0.4).setAlpha(1)
        this.Input = this.input.keyboard.createCursorKeys()

       
        this.physics.world.enable(this.Rocket)
        this.Rocket.body.setSize(200,350).setOffset(340,210)
        
        this.Obstacle = this.physics.add.group()
        this.physics.add.collider(this.Rocket, this.Obstacle, this.GameOver, null, this)

        this.coin = this.physics.add.group()
        this.physics.add.overlap(this.Rocket, this.coin, this.GrabCoin, null, this)
        this.SpikeCord = []

        this.TrackCoin = this.add.text(20,20, 'Coins: 0', this.TextConfig)

    }
    

    update() {
       let Spawner = this.SpawnSpeed / this.GameSpeed

       if (!this.StartGame) {
            if (this.Input.space.isDown) {
                this.StartGame = true
                this.tweens.add({
                    targets: this.Prompt,
                    alpha: 0,
                    duration: 500,
                    onComplete: () => {
                        this.Prompt.setVisible(false)
                    }
                })
                this.time.addEvent({
                    delay: Spawner,
                    callback: this.SpawnSpikes, 
                    callbackScope: this,
                    loop: true
                })
                this.time.addEvent({
                    delay: Spawner,
                    callback: this.CoinPickUp,
                    callbackScope: this,
                    loop: true
                })
                this.time.addEvent ({
                    delay: 20000,
                    callback: () => {
                        this.GameSpeed += 0.5
                    },
                    loop: true
                })
            } else {
                return
            }
        }

        if (this.Input.left.isDown && this.Rocket.x > 350) {
            this.Rocket.x -= 5;
        }

        if (this.Input.right.isDown && this.Rocket.x < 1100) {
            this.Rocket.x += 5
        } 
       
        this.SpikeCord = this.SpikeCord.filter(spikeObj => {
            if (spikeObj.spike.y > this.sys.game.config.height) {
                spikeObj.spike.destroy();
                return false;
            }
            return true;
        });

        this.scrolling()
    }

    SpawnSpikes() {
        const x = Phaser.Math.Between(150, 800)
        const Spike = this.Obstacle.create(x, 0, 'Spikes').setVelocityY(100 * this.GameSpeed).setImmovable(true).setScale(0.2).setSize(500,300)
        this.SpikeCord.push({ x: x, spike: Spike });

    }

    GameOver() {
       this.Rocket.body.enable = false
       this.Rocket.setVisible(false)

       this.GameOverSound.play()
       if (this.Counter > this.HighScore) {
        this.HighScore = this.Counter
       }

       this.add.image(900,900, 'Menu').setOrigin(1.11,1.1).setScale(0.8).setAlpha(1).setDepth(2)
       this.add.image(900,900, 'Menu2').setOrigin(1.02,1).setScale(0.65).setAlpha(1).setDepth(2)
       this.add.image(900,900, 'Menu2').setOrigin(1.45,1).setScale(0.65).setAlpha(1).setDepth(2)

       this.button3 = this.add.rectangle(965,620, 200,100, 0xFF0000, 0.5).setOrigin(3.63, 0.7).setAlpha(0.4).setDepth(2)
       this.button2 = this.add.rectangle(965,620, 200,100, 0xFF0000, 0.5).setOrigin(2.4, 0.7).setAlpha(0.4).setDepth(2)

       this.Prompt2 = this.add.text(350,300, "Game Over", this.TextConfig).setScale(1.5).setDepth(2)

       this.Prompt3 = this.add.text(230,585, "Main Menu", this.TextConfig).setScale(1.5).setDepth(2)
       this.Prompt4 = this.add.text(490,586, "Play Again", this.TextConfig).setScale(1.5).setDepth(2)

       this.add.text(900, 900, "Current Score: " + this.HighScore, this.TextConfig).setOrigin(2.5, 14).setDepth(2)

       this.button2.setInteractive()
       this.button3.setInteractive()

        this.button2.on('pointerdown', () => {
        this.scene.start('playScene')
       })

       this.button3.on('pointerdown', () => {
       this.scene.start("menuScene", {ScoreData: this.HighScore})
       })
       
    }

   CoinPickUp(Rocket, coin)  {
        const x = Phaser.Math.Between(85,900)
        const y = -50
        while (this.SpikeCord.some(spikeObj => Math.abs(this.SpikeCord.x - x) < 100)) { 
            x = Phaser.Math.Between(85, 900);
        }
       
        const CollectCoin = this.coin.create(x,y, 'Coin1').setScale(0.08).setVelocityY(100 * this.GameSpeed)
        this.anims.create({
            key: 'FlipCoin',
            frames: [
                { key: 'Coin1'},
                { key: 'Coin2'}
            ],
            frameRate: 5,
            repeat: -1
        })
        
        CollectCoin.anims.play('FlipCoin')

    }

    GrabCoin(Rocket, coin) {
        coin.destroy()
        this.Counter++
        this.TrackCoin.setText('Coins: ' + this.Counter)
        this.CoinSound.play()
    }

    scrolling() {
        this.BG_0.tilePositionY += 1
        this.BG_1.tilePositionY -= 2* this.GameSpeed
        this.floor.y += 1 * this.GameSpeed

        if (this.BG_1.y > 1800) {
             this.BG_1.y = 0
         }
 
    }

    

}