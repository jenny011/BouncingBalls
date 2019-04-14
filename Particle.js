"use strict";

class Particle{
  constructor(x,y,r,g,b){
    this.pos = createVector(x,y);
    this.vel = createVector(random(-5,5),random(-10,0));
    this.acc = createVector();
    this.mass = random(1,15);
    this.size = this.mass*4;
    this.size2 = this.size*1.5;
    this.t1 = 255;
    this.t2 = 80;
    this.r = r;
    this.g = g;
    this.b= b;
    this.e = 0;
    this.decay = 1.002;
  }
  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  disappear(){
    this.t1 /= this.decay;
    this.t2 /= this.decay;
  }
  applyForce(f){
    let force = f.copy();
    force.div(this.mass);
    this.acc.add(force);
  }
  display(){
    push();
    translate(this.pos.x,this.pos.y);
    rotate(radians(frameCount*2));
    noStroke();
    fill(color(this.r,this.g,this.b,this.t1));
    ellipse(0,0,this.size*1.1,this.size);
    fill(color(this.r,this.g,this.b,this.t2));
    ellipse(0,0,this.size2,this.size2);
    pop();
  }
  bounce(){
    // NOTE-->set the position to the boundary
    // once the ball reaches/exceeds the boundary
    if(this.pos.x<0+this.size2/2){
      this.pos.x = 0+this.size2/2;
      this.vel.x *= -1;
      this.vel.mult(0.95);
    }else if(this.pos.x>width-this.size2/2){
      this.pos.x = width-this.size2/2;
      this.vel.x *= -1;
      this.vel.mult(0.95);
    }
    if(this.pos.y<0+this.size2/2){
      this.pos.y = 0+this.size2/2;
      this.vel.y *= -1;
      this.vel.mult(this.e);
    }else if(this.pos.y>height-this.size2/2){
      this.pos.y = height-this.size2/2;
      this.vel.y *= -1;
      this.vel.mult(this.e);
    }
    if(this.pos.y>blocks[0].pos.y-this.size2/2 && this.pos.y<=blocks[0].pos.y
      && this.pos.x>=blocks[0].pos.x && this.pos.x<=blocks[0].pos.x+blocks[0].len){
        this.pos.y = blocks[0].pos.y-this.size2/2;
        this.vel.y *= -1;
        this.vel.mult(this.e);
    }else if(this.pos.y<blocks[0].pos.y+20+this.size/2 && this.pos.y>=blocks[0].pos.y+20
      && this.pos.x>=blocks[0].pos.x && this.pos.x<=blocks[0].pos.x+blocks[0].len){
        this.pos.y = blocks[0].pos.y+20+this.size2/2;
        this.vel.y *= -1;
        this.vel.mult(this.e);
    }else if(this.pos.y>blocks[1].pos.y-this.size2/2 && this.pos.y<=blocks[1].pos.y
      && this.pos.x>=blocks[1].pos.x && this.pos.x<=blocks[1].pos.x+blocks[1].len){
        this.pos.y = blocks[1].pos.y-this.size2/2;
        this.vel.y *= -1;
        this.vel.mult(this.e);
    }else if(this.pos.y<blocks[1].pos.y+20+this.size/2 && this.pos.y>=blocks[1].pos.y+20
      && this.pos.x>=blocks[1].pos.x && this.pos.x<=blocks[1].pos.x+blocks[1].len){
        this.pos.y = blocks[1].pos.y+20+this.size2/2;
        this.vel.y *= -1;
        this.vel.mult(this.e);
    }else if(this.pos.y>blocks[2].pos.y-this.size2/2 && this.pos.y<=blocks[2].pos.y
      && this.pos.x>=blocks[2].pos.x && this.pos.x<=blocks[2].pos.x+blocks[2].len){
        this.pos.y = blocks[2].pos.y-this.size2/2;
        this.vel.y *= -1;
        this.vel.mult(this.e);
    }else if(this.pos.y<blocks[2].pos.y+20+this.size/2 && this.pos.y>=blocks[2].pos.y+20
      && this.pos.x>=blocks[2].pos.x && this.pos.x<=blocks[2].pos.x+blocks[2].len){
        this.pos.y = blocks[2].pos.y+20+this.size2/2;
        this.vel.y *= -1;
        this.vel.mult(this.e);
    }

    // if(this.pos.x>=blocks[0].pos.x && this.pos.x<=blocks[0].pos.x+300){
    //   if(this.pos.y>blocks[0].pos.y-this.size2/2 && this.pos.y<=blocks[0].pos.y){
    //     this.pos.y = blocks[0].pos.y-this.size2/2;
    //     this.vel.y *= -1;
    //     this.vel.mult(this.e);
    //   }else if(this.pos.y<blocks[0].pos.y+20+this.size/2 && this.pos.y>=blocks[0].pos.y){
    //     this.pos.y = blocks[0].pos.y+20+this.size2/2;
    //     this.vel.y *= -1;
    //     this.vel.mult(this.e);
    //   }
    // }else if(this.pos.x>=blocks[1].pos.x && this.pos.x<=blocks[1].pos.x+300){
    //   if(this.pos.y>blocks[1].pos.y-this.size2/2 && this.pos.y<=blocks[1].pos.y){
    //     this.pos.y = blocks[1].pos.y-this.size2/2;
    //     this.vel.y *= -1;
    //     this.vel.mult(this.e);
    //   }else if(this.pos.y<blocks[1].pos.y+20+this.size/2 && this.pos.y>=blocks[1].pos.y){
    //     this.pos.y = blocks[1].pos.y+20+this.size2/2;
    //     this.vel.y *= -1;
    //     this.vel.mult(this.e);
    //   }
    // }else if(this.pos.x>=blocks[2].pos.x && this.pos.x<=blocks[2].pos.x+300){
    //   if(this.pos.y>blocks[2].pos.y-this.size2/2 && this.pos.y<=blocks[2].pos.y){
    //     this.pos.y = blocks[2].pos.y-this.size2/2;
    //     this.vel.y *= -1;
    //     this.vel.mult(this.e);
    //   }else if(this.pos.y<blocks[2].pos.y+20+this.size/2 && this.pos.y>=blocks[2].pos.y){
    //     this.pos.y = blocks[2].pos.y+20+this.size2/2;
    //     this.vel.y *= -1;
    //     this.vel.mult(this.e);
    //   }
    // }
  }
}
