let config = {
    width: 256,
    height: 272,
    backgroundColor: 0x000000,
    pixelArt: true,
    scene: [Scene1, Scene2],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
}

let game = new Phaser.Game(config)