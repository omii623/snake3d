let size = 1000;

function setup() {
  createCanvas(size,size,WEBGL);
  smooth();
  noStroke();
  stroke(125,50,100);
  ellipseMode(CENTER);
}

function draw() {
  background(0);

  for(let i = 0;i<1000;i+=10){
    for(let j = 0;j<1000;j+=10){
      let r = 430;
        if(i*i+j*j<r*r){
    let x = i;
    let y = j;
    let z = sqrt(r*r-x*x-y*y);

for(let i = -1;i!=3;i+=2){
  for(let j = -1;j!=1;j+=2){
    for(let k = -1;k!=1;k+=2){
      push();
      translate(i*x,j*y,k*z);
      sphere(1);
      pop();
    }
  }
}


      }
    }
  }

}
