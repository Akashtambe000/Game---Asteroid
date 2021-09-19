/** @type {import("../typing/phaser")} */

var config = {
    type : Phaser.AUTO,
    width : 800,
    height : 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "arcade",
        arcade: {
          debug: false
        }
    },
    scene : [menuscene,gamescene,overscene]

}

var game = new Phaser.Game(config);