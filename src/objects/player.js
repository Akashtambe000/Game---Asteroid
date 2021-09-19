/** @type {import("../typing/phaser")} */


// creating player class
class player extends Phaser.Physics.Arcade.Sprite{

    constructor(scene,x,y,img){

        // this will create a Arcade Sprite
        super(scene,x,y,img);

        scene.physics.world.enableBody(this);
        scene.add.existing(this); 
        
        // player default settings
        this.lives = 3;
        this.timeBetweenShots = 1000;
        this.reset = false;
        this.ready = true;

        // player physics settings
        this.setDamping(false);
        this.setDrag(0.999);
        this.setMaxVelocity(100);
        this.setScale(0.5);
        this.setOrigin(0.5);
        scene.players.add(this);

        // assign game scene to local object
        this.scene = scene;
    }

    // function to check player movement
    playermovement()
    {
        if (this.scene.cursors.up.isDown)
        {
            this.scene.physics.velocityFromAngle(this.angle-90, 200, this.body.acceleration);
        }
        else if(this.scene.cursors.down.isDown)
        {
            this.scene.physics.velocityFromAngle(this.angle-90, -200, this.body.acceleration);
        }
        else
        {
            this.setAcceleration(0);
        }
      

        if (this.scene.cursors.right.isDown)
        {
            this.rotation += 0.075;
        } 
        else if (this.scene.cursors.left.isDown)
        {
            this.rotation -= 0.075;
        }               
    }

    //function to check player shooting
    shooting(){
        if (this.scene.input.keyboard.checkDown(this.scene.cursors.space, this.timeBetweenShots))
        {
            new projectile(this.scene);
        }       
    }

    //update score
    updatescore()
    {
        this.scene.score += 30;
        this.scene.scoreLabel.text = "SCORE : "+ this.scene.score;
    }

    updatelives()
    {
        if(this.lives>=0)
        {
            this.scene.livesArray[this.lives].setVisible(false);
        }
        
    }

}
