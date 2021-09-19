/** @type {import("../typing/phaser")} */

class overscene extends Phaser.Scene{
    constructor(){
        super({key:'overscene'})
    }

    init(score){
        console.log(score)
        this.finalScore = score;
    }
    
    create()
    {
         // set background moving
         this.movingstars = this.add.tileSprite(0,0,config.width*2,config.height*2,'stars');

         // welcome text
         this.Label = this.add.bitmapText(config.width/2,config.height/4-10,'bitfont','~ Game Over ~',100).setOrigin(0.5);
         this.ScoreLabel = this.add.bitmapText(config.width/2,config.height/3,'bitfont','',50).setOrigin(0.5);
         this.ScoreLabel.text = "Your Score : "+this.finalScore;
         if(localStorage.getItem('HeighscoreAsteroid') < this.finalScore)
         {
             localStorage.setItem('HeighscoreAsteroid',this.finalScore);
             this.add.bitmapText(10,20,'bitfont','New HighScore!!!',30);
             this.add.bitmapText(210,20,'bitfont','New HighScore!!!',30);
             this.add.bitmapText(410,20,'bitfont','New HighScore!!!',30);
             this.add.bitmapText(610,20,'bitfont','New HighScore!!!',30);
         }

         this.image = this.add.sprite(400,450,'rock1').setScale(2).setOrigin(0.5);

         this.play = this.add.bitmapText(config.width/2,config.height/2-20,'bitfont','Press "Enter" to Play Again...',30).setOrigin(0.5);
         this.play = this.add.bitmapText(config.width/2,config.height/2+20,'bitfont','Press "Back" to Go to Menu...',30).setOrigin(0.5);


         this.KeyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
         this.KeyBack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);

         // for testing
         // localStorage.removeItem('HeighscoreAsteroid');

    }

    update(){

        // set background moving
        this.movingstars.tilePositionY -= 0.5;

        // rotate asteroid
        this.image.angle += 0.5;

        if(this.KeyEnter.isDown)
        {
            this.scene.start("gamescene");
        }
        else if(this.KeyBack.isDown)
        {
            this.scene.start("menuscene");
        }

    }

}