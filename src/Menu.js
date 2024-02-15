class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    init(data) {
        this.ScoreData = data.ScoreData || 0
    }

    preload() {

        this.load.image('BG_1','./assets/Background1.jpg')
        this.load.image('BG_2', './assets/Button2.png')
        this.load.image('Sign_1', './assets/Sign1.png')
        this.load.image('Sign_2', './assets/Sign2.png')
        this.load.image('Smile', './assets/Credit_smile.png')
        this.load.image('title', './assets/Title.png')
        this.load.image('CreditBoard', './assets/Credits.png')
        this.load.image('Back', './assets/Credits2.png')
        this.load.image('Tutorial', './assets/Tutorial.png')

        this.load.audio('BG_classroom', './assets/Classroom.mp3')
        this.load.audio('Sound1', './assets/Sound_1.wav')
    
    }

    create() {
       
        this.BG_music = this.sound.add('BG_classroom', {loop: true, volume: 0.2})
        this.ClickSound = this.sound.add('Sound1', {volume: 0.5})
        this.BG_music.play()

        this.time.delayedCall(5000, () => {
            this.BG_music.setVolume(0)
        })



        this.input.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                this.ClickSound.play()
            }
        })

        this.MainMenu()
    }

    update() {

    }

    MainMenu() {
 
        this.children.each(child => {
            child.destroy()
        }) 

        this.TextConfig = {
            fontFamily: 'ComicSans',
            fontSize: '28px',
            color: '#9A1F1F',
        };

        this.add.image(900,900, 'BG_1').setOrigin(1).setScale(1.1).setAlpha(1)
        
        this.add.image(900, 900, 'BG_2').setOrigin(1.6, 1.85).setScale(0.6)
        this.add.image(900, 900, 'BG_2').setOrigin(1.6, 1.45).setScale(0.6)
        this.add.image(900, 900, 'BG_2').setOrigin(1.6, 1.15).setScale(0.6)

        this.add.image(900,900, 'Sign_1').setOrigin(3.1,3.9).setScale(0.25)
        this.add.image(900,900, 'Sign_2').setOrigin(3.8,2.5).setScale(0.20)
        this.add.image(900,900, 'Smile').setOrigin(3.1,2.89).setScale(0.25)

        this.add.image(900,900, 'title').setOrigin(1.05,1.4).setScale(0.60).setRotation(-0.1)


        this.button_1 = this.add.rectangle(800,620, 200,100, 0xFF0000, 0.5).setOrigin(3).setAlpha(0.15)
        this.button_2 = this.add.rectangle(800,400, 200,100, 0xFF0000, 0.5).setOrigin(3).setAlpha(0.15)
        this.button_3 = this.add.rectangle(800,790, 200,100, 0xFF0000, 0.5).setOrigin(3).setAlpha(0.15)

        this.add.text(570,200, "Top Score", this.TextConfig).setScale(2)     
        this.add.text(700,275, this.ScoreData, this.TextConfig).setScale(2)


        this.button_1.setInteractive()
        this.button_1.on('pointerup', () => {
           this.CreditsMenu()
        })

        this.button_2.setInteractive()
        this.button_2.on('pointerup', () => {
            this.PlayGame()
        })

        this.button_3.setInteractive()
        this.button_3.on('pointerup', () => {
            this.TutorialMenu()
        })

    }

    CreditsMenu() {
        
        this.children.each(child => {
            child.destroy()
        })

       this.add.image(900,900, 'BG_1').setOrigin(1).setScale(1.1).setAlpha(1)
       this.add.image(900,900, 'CreditBoard').setOrigin(1.1).setScale(0.8).setAlpha(1)
       this.add.image(900,900, 'Back').setOrigin(1, 0.5).setScale(1).setAlpha(1)

       this.button_1 = this.add.rectangle(900,900, 200,100, 0xFF0000, 0.5).setOrigin(2.8,1.5).setAlpha(0.15)

       this.button_1.setInteractive()
       this.button_1.on('pointerup', () => {
        this.MainMenu()
       })

    }

    TutorialMenu() {
        this.children.each(child => {
            child.destroy()
        })

       this.add.image(900,900, 'BG_1').setOrigin(1).setScale(1.1).setAlpha(1)
       this.add.image(900,900, 'Tutorial').setOrigin(1.1).setScale(0.8).setAlpha(1)
       this.add.image(900,900, 'Back').setOrigin(1, 0.5).setScale(1).setAlpha(1)

       this.button_1 = this.add.rectangle(900,900, 200,100, 0xFF0000, 0.5).setOrigin(2.8,1.5).setAlpha(0.15)

       this.button_1.setInteractive()
       this.button_1.on('pointerup', () => {
        this.MainMenu()
       })

    }

    PlayGame() {
        this.scene.start('playScene', {BG_music: this.BG_music})
    }

}