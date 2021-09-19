/** @type {import("../typing/phaser")} */

class projectile extends Phaser.Physics.Arcade.Sprite{

    constructor(scene){

        // position settings
        var x = scene.player.x;
        var y = scene.player.y;
        var offsetX = Math.cos(scene.player.rotation-Math.PI/2) * 25;
        var offsetY = Math.sin(scene.player.rotation-Math.PI/2) * 25;

        super(scene,x+offsetX,y+offsetY,'beam');

        scene.physics.world.enableBody(this);
        scene.add.existing(this);

        //physics settings
        this.setScale(2);
        this.setOrigin(0.25,0.2);
        this.setAngle(scene.player.angle);

        scene.projectiles.add(this);
        this.scene = scene;

        // projectile movement
        scene.physics.velocityFromAngle(scene.player.angle-90, 500 + scene.player.body.speed, this.body.velocity);

        // found this code online to destroy projectile after some time
        this.timer = scene.time.addEvent({
            delay: 1000,
            callback: () => {
              this.destroy();
            },
            scope: this
          });
    }

    // update score
    updatescore()
    {
       this.scene.score += 30;
       this.scene.scoreLabel.text = "SCORE : " + this.scene.score;
    }

}