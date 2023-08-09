class Scene2 extends Phaser.Scene {
    constructor() {
        super('playGame')
    }

    create () {
        // this.background = this.add.image(0, 0, 'background')
        // paint the background
        this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background')
        this.background.setOrigin(0, 0)

        // paint each ship
        this.ship1 = this.add.sprite(config.width/2 - 50, config.height/2, 'ship1')
        this.ship2 = this.add.sprite(config.width/2, config.height/2, 'ship2')
        this.ship3 = this.add.sprite(config.width/2 + 50, config.height/2, 'ship3')

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

        // create power up group
        this.powerUps = this.physics.add.group()
        let maxObjs = 4
        for (let i = 0; i < maxObjs; i++) {
            let powerUp = this.physics.add.sprite(16, 16, 'powerup')
            this.powerUps.add(powerUp)
            powerUp.setRandomPosition(0, 0, game.config.width, game.config.height)

            if (Math.random() > 0.5) {
                powerUp.play('red')
            } else {
                powerUp.play('gray')
            }

            powerUp.setVelocity(100, 100)
            powerUp.setCollideWorldBounds(true)
            powerUp.setBounce(1)
        }
        // make power ups collide with each other
        this.physics.add.collider(this.powerUps, this.powerUps)

        // start ship animations
        this.ship1.play('ship1_anim')
        this.ship2.play('ship2_anim')
        this.ship3.play('ship3_anim')

        // make ships interactive
        this.ship1.setInteractive()
        this.ship2.setInteractive()
        this.ship3.setInteractive()

        // add click event listener on game objects
        this.input.on('gameobjectdown', this.destroyShip, this)

        this.add.text(20, 20, "Playing Game!", {
            font: '25px Arial',
            fill: 'yellow'
        })
    }

    update() {
        this.moveShip(this.ship1, 0.5)
        this.moveShip(this.ship2, 0.75)
        this.moveShip(this.ship3, 1)

        this.background.tilePositionY -= 0.5
    }
    
    moveShip(ship, speed) {
        // move ship downward
        ship.y += speed
        // once below screen, reset position to the top
        if (ship.y > config.height + 25) {
            this.resetShipPosition(ship)
        }
    }

    resetShipPosition(ship) {
        ship.y = 0
        ship.x = Phaser.Math.Between(0, config.width)
    }

    destroyShip(pointer, gameObject) {
        gameObject.setTexture('explosion')
        gameObject.play('explode_anim')
    }
}
