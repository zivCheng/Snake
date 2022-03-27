window.addEventListener('load', function () {
    var canvas = document.getElementById('canvas');
    var game = new Game(canvas);

})
  
class Game{
    constructor(canvas){
        this.fps = 30
        this.player = new Snake();
        this.fruits = []
        this.counter = 0
        this.canvas = canvas;
        
        this.ctx = canvas.getContext('2d');
        
        //1000ms / fps 
        setInterval(this.update.bind(this), 1000/this.fps)

        document.addEventListener('keydown', this.onKeyDown);
    }
    update(){
        //Redraw
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        //Fill Text
        this.ctx.font = "30px Arial";
        this.ctx.fillText(this.counter, 10, 50);
        this.counter +=1;
        if(this.counter>100){
            this.counter = 0
        }

        /*
            Update variables
            1. update snake position
                1.1 Update direction of cell if key down has pressed
                1.2 Update position of the entire snake body cell
            2. Random generate apple and confirmed that there does not have more than 3 friuits on map
            3. Check if snake has ate the apple
                3.1. Update score
                3.2. update snake body length
        */

        /*
           Redraw
           1. Redraw snake
           2. Redraw apple  
        */

    }
    onKeyDown(evt){
        console.log(evt)
        /* check if key is valid, if yes, update snake direction */
    }
}
class Snake{
    constructor(position){
        this.body = [position]
        this.movingDirection = 'down'
    }
    changeDirection(newDirection){
        this.movingDirection = this.movingDirection
    }
    update(){
        if(this.movingDirection == 'down'){
            
        }else if(this.movingDirection == 'up'){
            
        }else if(this.movingDirection == 'left'){
            
        }else if(this.movingDirection == 'right'){
            
        }
    }
}
class Fruit{
    constructor(position, socre){
        this.position = position;
        this.socre = socre
    }
}


