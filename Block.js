"use strict";

class Block{
  constructor(x,y,r,g,b){
    this.pos = createVector(x,y);
    this.vel = createVector();
    this.len = 300;
    this.c = color(r,g,b);
  }
  display(){
    push();
    translate(this.pos.x,this.pos.y);
    noStroke();
    fill(this.c);
    rect(0,0,this.len,20);
    pop();
  }
}
