/** @type {import("../typing/phaser")} */


// creating enemy class
class enemy extends Phaser.Physics.Arcade.Sprite{

    constructor(scene,x,y,color,speed){

        super(scene,x,y,color+"Enemy");
        
        scene.physics.world.enableBody(this);
        scene.add.existing(this); 
        
        scene.enemies.add(this);
        
        // assign game scene to local object
        this.scene = scene;
        this.color = color;
        this.health = 3;
        this.setOrigin(0.5,0);

        // default downward movement
        scene.physics.velocityFromAngle(this.angle+90, speed, this.body.velocity);

        // playing default animation
        this.play(color+'E');
    }

    enemyDamage(val)
    {
        this.health -= val;
        if(this.health <= 0)
        {
            this.scene.score += 100;
            this.scene.scoreLabel.text = "SCORE : " + this.scene.score;
            
            this.setActive(false);
            this.setVisible(false);
            this.temp =  this.scene.add.sprite(this.x,this.y,'explosion').setScale(5).play('explode');
            this.destroy();
        }
    }
}

