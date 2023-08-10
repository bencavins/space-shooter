class Scene1 extends Phaser.Scene {
    constructor() {
        super('bootGame')
    }

    preload() {
        // load images and sprites
        this.load.image('background', 'assets/images/background.png')
        this.load.spritesheet('ship1', 'assets/spritesheets/ship.png', {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet('ship2', 'assets/spritesheets/ship2.png', {
            frameWidth: 32,
            frameHeight: 16
        })
        this.load.spritesheet('ship3', 'assets/spritesheets/ship3.png', {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet('explosion', 'assets/spritesheets/explosion.png', {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet('powerup', 'assets/spritesheets/power-up.png', {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet('player', 'assets/spritesheets/player.png', {
            frameWidth: 16,
            frameHeight: 24
        })
    }

    create() {
        this.add.text(20, 20, "Loading...")
        this.scene.start("playGame")

        // create the animations
        this.anims.create({
            key: 'ship1_anim',
            frames: this.anims.generateFrameNumbers('ship1'),
            frameRate: 20,
            repeat: -1  // infinite loop
        })
        this.anims.create({
            key: 'ship2_anim',
            frames: this.anims.generateFrameNumbers('ship2'),
            frameRate: 20,
            repeat: -1  // infinite loop
        })
        this.anims.create({
            key: 'ship3_anim',
            frames: this.anims.generateFrameNumbers('ship3'),
            frameRate: 20,
            repeat: -1  // infinite loop
        })
        this.anims.create({
            key: 'explode_anim',
            frames: this.anims.generateFrameNumbers('explosion'),
            frameRate: 20,
            repeat: 0,  // no repeat
            hideOnComplete: true
        })
        this.anims.create({
            key: 'red',
            frames: this.anims.generateFrameNumbers('powerup', {
                start: 0,
                end: 1
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'gray',
            frames: this.anims.generateFrameNumbers('powerup', {
                start: 2,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'thrust',
            frames: this.anims.generateFrameNumbers('player'),
            frameRate: 15,
            repeat: -1
        })
    }
}