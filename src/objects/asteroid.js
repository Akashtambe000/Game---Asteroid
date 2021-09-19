/** @type {import("../typing/phaser")} */


// creating asteroid class
class asteroid extends Phaser.Physics.Arcade.Sprite{

    constructor(scene,x,y,index,color,rotation,speed){

        // this will create a Arcade Sprite
        if(color === 0)
        {
            // white asteroid sprite
            super(scene,x,y,"white"+index);
        }
        else
        {
            // brown asteroid sprite
            super(scene,x,y,"rock"+index);
        }
        

        scene.physics.world.enableBody(this);
        scene.add.existing(this); 
        
        // asteroid default settings
        this.setScale(1.5);
    
        // asteroid physics settings
        this.setAngle(rotation);
        
        //this.setAngularVelocity = angularspeed;
        this.setBounce(1);
        scene.asteroids.add(this);
        
        // assign game scene to local object
        this.scene = scene;

        this.index = index;
        this.x = x;
        this.y = y;
        this.color = color;

        scene.physics.velocityFromAngle(this.angle, speed, this.body.velocity);
    }

    // if astroids are smallest simply destroy else divide into smaller astroids
    destroyAsteroid() 
    {
        if(this.index < 4)
        {
            var as1 = new asteroid(
                this.scene,
                this.x,
                this.y,
                this.index+1,
                this.color,
                Phaser.Math.Between(0, 360),
                Phaser.Math.Between(0+this.index*10, 50+this.index*10)+50);

            var as1 = new asteroid(
                this.scene,
                this.x,
                this.y,
                this.index+1,
                this.color,
                Phaser.Math.Between(0, 360),
                Phaser.Math.Between(0+this.index*10, 50+this.index*10)+50);    

        }
        this.destroy();
      }
    
    
}
