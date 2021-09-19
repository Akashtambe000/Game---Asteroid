/** @type {import("../typing/phaser")} */

class gamescene extends Phaser.Scene{
    constructor(){
        super({key:'gamescene'})
    }

    init()
    {
        // canvas height and width
        this.gameWidth = config.width;
        this.gameHeight = config.height;
        this.score = 0;
        this.level = 1;
    }    
    
    create()
    {
        // set physics bounds
        this.physics.world.setBounds(0,0,config.width,config.height);

        // set background moving
        this.movingstars = this.add.tileSprite(0,0,config.width*2,config.height*2,'stars');

        // score text
        this.scoreLabel = this.add.bitmapText(10,10,'bitfont','SCORE : 0',30);

        // lives
        this.live3 = this.add.sprite(config.width-10,10,'live').setOrigin(1,0);
        this.live2 = this.add.sprite(config.width-45,10,'live').setOrigin(1,0);
        this.live1 = this.add.sprite(config.width-80,10,'live').setOrigin(1,0);

        this.livesArray = [this.live3,this.live2,this.live1];


        // physics groups to store returned objects
        this.players = this.physics.add.group();
        this.projectiles = this.physics.add.group();
        this.asteroids = this.physics.add.group();
        this.enemies = this.physics.add.group();

        // setting input
        this.cursors = this.input.keyboard.createCursorKeys();

        // creating animations
        this.anims.create({
            key : 'explode',
            frames : this.anims.generateFrameNames('explosion'),
            frameRate : 20,
            repeat : 0,
            hideOnComplete : true
        });

        this.anims.create({
            key : 'greenE',
            frames : this.anims.generateFrameNames('greenEnemy'),
            frameRate : 20,
            repeat : -1
        });

        this.anims.create({
            key : 'redE',
            frames : this.anims.generateFrameNames('redEnemy'),
            frameRate : 20,
            repeat : -1
        });

        this.anims.create({
            key : 'yellowE',
            frames : this.anims.generateFrameNames('yellowEnemy'),
            frameRate : 20,
            repeat : -1        
        });

        // player instance
        this.player = new player(this,config.width/2,config.height/2,'player');
        this.player.setDamping(true);
        this.player.setDrag(0.99);
        
        // adding colliders and overlap
        this.physics.add.collider(this.projectiles,this.asteroids,function(projectile,asteroid){
            projectile.updatescore();
            projectile.destroy();
            asteroid.destroyAsteroid();
        });

        this.physics.add.collider(this.player,this.asteroids,function(player,asteroid){
            player.lives -= 1; 
            asteroid.destroyAsteroid();
            player.setVisible(false);
            player.reset = true;
            player.updatescore();
            player.updatelives();
        });

        this.physics.add.overlap(this.projectiles,this.enemies,function(projectile,enemy){
            projectile.destroy();
            enemy.enemyDamage(1);
        },null,this);

        this.physics.add.collider(this.players,this.enemies,function(player,enemy){
            player.lives -= 1; 
            enemy.enemyDamage(3);
            player.setActive(false);
            player.setVisible(false);
            player.reset = true;
            player.updatescore();
            player.updatelives();
        });

        // gamemanager handles spawning of asteroids
        this.gm = new gamemanager();
        this.gm.spawnAsteroids(this,this.level);
        this.gm.spawnEnemy(this,this.level);

                         
    }        

    update(){

        // set background moving
        this.movingstars.tilePositionY -= 0.5;
        
        // wrap world with these objects
        this.physics.world.wrap(this.player);
        this.physics.world.wrap(this.projectiles);
        this.physics.world.wrap(this.asteroids);
        this.physics.world.wrap(this.enemies);


        
        // code to check when player taks damage
        if(this.player.reset === true && this.player.ready === true)
        {
            this.player.reset = false;
            this.player.ready = false;
;
            const newx = this.player.x;
            const newy = this.player.y;
            this.explode = this.add.sprite(newx,newy,'explosion').setScale(5).play('explode');
            this.player.setVelocity(0);
            this.player.setAngle(0);
            this.player.setPosition(this.gameWidth/2,this.gameHeight/2);
            this.time.addEvent({
                delay: 2000,
                callback: () => {
                  this.explode.destroy();
                },
                scope: this
              })


            if(this.player.lives === 0)
            {              
                this.time.addEvent({
                    delay: 3000,
                    callback: () => {
                        this.scene.start("overscene",this.score);
                    },
                    scope: this
                });   
            }
            else
            {
                this.player.setVisible(true);
                this.player.setActive(true);
                this.player.ready = true;
            }            
        }

        

        //check if previous level complete
        if(this.asteroids.getLength() === 0)
        {
            this.level += 1;
            this.gm.spawnAsteroids(this,this.level);
            this.gm.spawnEnemy(this,this.level);
           
        }

        // player methods to check input
        if(this.player.ready)
        {
            this.player.playermovement();
            this.player.shooting();
        }
        
    }

    

}
