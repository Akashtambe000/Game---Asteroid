/** @type {import("../typing/phaser")} */

class menuscene extends Phaser.Scene{
    constructor(){
        super({key:'menuscene'})
    }

    // loading assets
    preload(){

        this.load.image('stars','assets/space.png');
        this.load.image('player','assets/ship.png');
        this.load.image('beam','assets/bullet.png');
        this.load.image('rock4','assets/rock4.png');
        this.load.image('rock3','assets/rock3.png');
        this.load.image('rock2','assets/rock2.png');
        this.load.image('rock1','assets/rock1.png');
        this.load.image('white4','assets/white4.png');
        this.load.image('white3','assets/white3.png');
        this.load.image('white2','assets/white2.png');
        this.load.image('white1','assets/white1.png');
        this.load.image('live','assets/live.png');


        this.load.spritesheet('explosion','assets/explosion.png',{frameWidth:16 , frameHeight:16});
        this.load.spritesheet('greenEnemy','assets/green_enemy.png',{frameWidth:52 , frameHeight:48});
        this.load.spritesheet('redEnemy','assets/red_enemy.png',{frameWidth:52 , frameHeight:48});
        this.load.spritesheet('yellowEnemy','assets/yellow_enemy.png',{frameWidth:52 , frameHeight:48});


        this.load.bitmapFont('bitfont','assets/font.png','assets/font.xml');
    }
    
    create()
    {
         // set background moving
         this.movingstars = this.add.tileSprite(0,0,config.width*2,config.height*2,'stars');

         // welcome text
         this.Label = this.add.bitmapText(config.width/2,config.height/4,'bitfont','|| ASTEROID ||',100).setOrigin(0.5);
         this.welcomeLabel = this.add.bitmapText(config.width/2,config.height/3,'bitfont','!! WELCOME !!',50).setOrigin(0.5);
         if(localStorage.getItem('HeighscoreAsteroid') === null)
         {
             localStorage.setItem('HeighscoreAsteroid',0);
         }
         this.HighScore =  this.add.bitmapText(config.width-10,20,'bitfont','',30).setOrigin(1,0);
         this.HighScore.text = "HighScore : "+localStorage.getItem('HeighscoreAsteroid');

         this.image = this.add.image(400,400,'player').setScale(2).setOrigin(0.5);
         this.play = this.add.bitmapText(config.width/2,config.height/2,'bitfont','Press Enter to Play...',40).setOrigin(0.5);

         this.play = this.add.bitmapText(10,config.height-40,'bitfont','Use arrow keys to move.',25);
         this.play = this.add.bitmapText(10,config.height-20,'bitfont','Press space to shoot.',25);

         this.KeyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(){

        // set background moving
        this.movingstars.tilePositionY -= 0.5;

        if(this.KeyEnter.isDown)
        {
            this.scene.start("gamescene");
        }

    }

}
