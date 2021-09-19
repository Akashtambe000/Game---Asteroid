class gamemanager
{
    
    spawnAsteroids(scene,num)
    {
        var rectouter = new Phaser.Geom.Rectangle(80, 40, 640, 540);
        var rectInner = new Phaser.Geom.Rectangle(90, 50, 620, 500);
        for(var i = 0; i < num; i++)
        {
            var p = Phaser.Geom.Rectangle.RandomOutside(rectouter, rectInner);
            var asteroidIndex = this.randomIntFromInterval(1,3);
            var direction = this.randomIntFromInterval(0,360);
            var color = this.randomIntFromInterval(0,1);
            new asteroid(
                scene,
                p.x,
                p.y,
                asteroidIndex,
                color,
                direction,
                Math.floor(Math.random() * 50 + 25*asteroidIndex) + 50);
        }        
    }

    spawnEnemy(scene,num)
    {
        for(var j =0; j < num; j++)
        {
            var colorlist = ['red','green','yellow'];
            var mycolor = colorlist[this.randomIntFromInterval(0,2)];
            var x = this.randomIntFromInterval(0,scene.gameWidth);
            var y = 0;
            var speed = this.randomIntFromInterval(100,300);
            new enemy(
                scene,
                x,
                y,
                mycolor,
                speed
            );
        }
        
    }
    
    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
}