window.addEventListener('load', function () {
    var canvas = document.getElementById('canvas');
    var game = new Game(canvas);
    
})

class Game{
    constructor(canvas){
        this.fps = 10
        this.fruit = null
        this.scores = 0
        this.canvas = canvas;
        this.w = canvas.width;
        this.h = canvas.height;
        this.pixelSize = 20
        this.player = new Snake({x: this.w/2, y:this.h/2});
        this.ctx = canvas.getContext('2d');
        //1000ms / fps 
        setTimeout(this.update.bind(this), 1000/this.fps)
        this.onKeyDown = this.onKeyDown.bind(this)
        document.addEventListener('keydown', this.onKeyDown);
    }
    update(){
        //Redraw
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "#e0e0e0";
        for(let i =0; i<this.w; i+=this.pixelSize){
            this.ctx.beginPath();
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, this.h);
            this.ctx.stroke();
        }
        for(let i =0; i<this.h; i+=this.pixelSize){
            this.ctx.beginPath();
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(this.w, i);
            this.ctx.stroke();
        }
        //Draw Fruit
        if(this.fruit){
            this.fruit.draw(this.ctx,this.pixelSize)
        }
        try{
            this.player.update(this.w, this.h, this.pixelSize)
            this.player.draw(this.ctx,this.pixelSize)
            if(this.fruit && this.player.body[0].x === this.fruit.position.x && this.player.body[0].y==this.fruit.position.y){
                this.player.pendingBody+=1
                this.scores = this.fruit.score
                this.fruit = null
            }
            if(!this.fruit){
                let newPosition = {x:parseInt(Math.random()*(this.w/this.pixelSize))*this.pixelSize, y:parseInt(Math.random()*(this.h/this.pixelSize))*this.pixelSize}
                let fruit = new Fruit(newPosition,5)
                this.fruit = fruit
            }
            setTimeout(this.update.bind(this), 1000/this.fps)
        }catch(exception){
            alert("Game Over")
        }
        
    }
    onKeyDown(evt){
        if(evt.key ==="ArrowLeft"){
            this.player.changeDirection("left")
        }else if(evt.key ==="ArrowRight"){
            this.player.changeDirection("right")
        }else if(evt.key ==="ArrowUp"){
            this.player.changeDirection("up")
        }else if(evt.key ==="ArrowDown"){
            this.player.changeDirection("down")
        }
    }
}
class Snake{
    constructor(position){
        this.body = [position]
        this.pendingBody = 0
        this.movingDirection = 'down'
        this.lineWidth = "6"
        this.strokeStyle = "black"
    }
    changeDirection(newDirection){
        if(newDirection==this.movingDirection){
            return;
        }
        if(
            newDirection == "left" && this.body.length>1 && this.body[0].x > this.body[1].x
            || newDirection == "right" && this.body.length>1 && this.body[0].x < this.body[1].x
            || newDirection == "up" && this.body.length>1 && this.body[0].y > this.body[1].y
            || newDirection == "down" && this.body.length>1 && this.body[0].y < this.body[1].y
        ){
            return
        }
        this.movingDirection = newDirection
    }
    update(w,h,s){
        let lastPosition = null
        if(this.pendingBody>0){
            lastPosition =  {x:this.body[this.body.length-1].x, y:this.body[this.body.length-1].y}
            this.pendingBody -=1
        }
        this.body = this.body.map((e,i,a)=>{
            if(i==0){
                return e;
            }else{
                return {x: a[i-1].x, y:a[i-1].y}
            }
        })
        if(lastPosition!=null){
            this.body.push(lastPosition)
        }
        if(this.movingDirection == 'down'){
            this.body[0].y+=s
            this.body[0].y%=h
            this.body[0].y = Math.abs(this.body[0].y)
        }else if(this.movingDirection == 'up'){
            this.body[0].y-=s
            this.body[0].y+=h
            this.body[0].y%=h
            this.body[0].y = Math.abs(this.body[0].y)
        }else if(this.movingDirection == 'left'){
            this.body[0].x-=s
            this.body[0].x+=w
            this.body[0].x%=w
            this.body[0].x = Math.abs(this.body[0].x)
        }else if(this.movingDirection == 'right'){
            this.body[0].x+=s
            this.body[0].x%=w
            this.body[0].x = Math.abs(this.body[0].x)
        }
        if(this.body.filter(e=>e.x == this.body[0].x && e.y == this.body[0].y).length>1){
            throw "Game Over"
        }
    }
    draw(ctx, pixelSize){
        ctx.beginPath();
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeStyle;
        for(let i = 0 ;i<this.body.length;i++){
            if(i==0){
                ctx.fillStyle = '#F9DC5C';
                ctx.fillRect(this.body[i].x, this.body[i].y, pixelSize, pixelSize);
            
            }else{
                ctx.rect(this.body[i].x, this.body[i].y, pixelSize, pixelSize);
                ctx.stroke();
            }
           
        }
        
    }
}
class Fruit{
    constructor(position, score){
        this.position = position;
        this.score = score
    }
    draw(ctx, pixelSize){

        ctx.lineWidth = 3;
        ctx.strokeStyle = "#FF0000";
        ctx.beginPath();
        ctx.arc(this.position.x+pixelSize/2, this.position.y+pixelSize/2, pixelSize/2, 0, 2 * Math.PI);
        ctx.stroke();
    }
}


