function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  background(0);
  blocks.push(new Block(width*0.05,height*random(0.1,0.8),255,200,200));
  blocks.push(new Block(width*0.35,height*random(0.1,0.8),200,200,255));
  blocks.push(new Block(width*0.65,height*random(0.1,0.8),200,255,200));
}

let particles = [];
let blocks = [];
let blow = false;

function draw() {
  clear();
  background(0);
  noStroke();
  fill(255,255,255,50);
  ellipse(mouseX,mouseY,20,20);
  fill(255,255,255,70);
  ellipse(mouseX,mouseY,10+1.5*sin(frameCount/2),10+1.5*sin(frameCount/2));
  fill(100);
  rect(0,height*0.85,width,height*0.15);
  fill(255,140);
  textSize(16);
  text("tap any key to create wind",width*0.45,height-20);
  for(let i=0; i<blocks.length; i++){
    blocks[i].display();
  }

  if(mouseIsPressed && mouseY<height*0.85){
    particles.push(new Particle(mouseX,mouseY,random(130,255),random(130,255),random(130,255)));
  }

  for (let i=particles.length-1;i>=0;i--){
    let p = particles[i];

    //gravity
    let g = createVector(0,0.5);
    g.mult(p.mass);
    p.applyForce(g);

    //drag
    let d;
    if(p.pos.y<height*0.85){
      d = 0.05;
    }else{
      d = 2;
    }
    let v = p.vel.mag();
    let dragForce = d*v**2;
    let drag = p5.Vector.mult(p.vel,-1);
    drag.normalize();
    drag.mult(dragForce);
    drag.limit(p.vel.mag());
    p.applyForce(drag);

    //wind
    let wind;
    let mag;
    if(keyIsPressed){
      mag = map(mouseX,0,width,-4.5,4.5);
      wind = createVector(mag,0);
      p.applyForce(wind);
      blow = true;
    }else{
      blow = false;
    }

    //friction
    if(p.pos.y>=height*0.85){
      let u = 0.4;
      let f;
      if(blow){
        if(wind.mag() > g.mult(u).mag()){
          f = p5.Vector.mult(wind,-1);
          f.normalize();
          f.mult(g.mult(u).mag());
        }
        else{
          f = p5.Vector.mult(wind,-1);
        }
        p.applyForce(f);
      }
    }

    //elasticity
    if(p.pos.y>=height*0.85){
      p.e = 0.95;
    }else if(p.pos.y>blocks[0].pos.y-p.size2/2 && p.pos.y<blocks[0].pos.y+20+p.size2/2
      && p.pos.x>=blocks[0].pos.x && p.pos.x<=blocks[0].pos.x+blocks[0].len){
      p.e = 0.5;
    }else if(p.pos.y>blocks[1].pos.y-p.size2/2 && p.pos.y<blocks[1].pos.y+20+p.size2/2
      && p.pos.x>=blocks[1].pos.x && p.pos.x<=blocks[1].pos.x+blocks[1].len){
      p.e = 1;
    }else if(p.pos.y>blocks[2].pos.y-p.size2/2 && p.pos.y<blocks[2].pos.y+20+p.size2/2
      && p.pos.x>=blocks[2].pos.x && p.pos.x<=blocks[2].pos.x+blocks[2].len){
      p.e = 0.75;
    }

    if (p.pos.y >= height * 0.85) {
      p.disappear();
    }
    p.bounce();
    p.update();
    p.display();
  }
    for (let i=particles.length-1;i>=0;i--){
      p = particles[i];
      if(p.t1<=0.01){
        particles.splice(i,1);
      }
    }
}
