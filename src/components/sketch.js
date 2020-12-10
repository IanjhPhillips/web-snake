export default function sketch (p5) {

    const height = 400;
    const width = 400;

    const gridSize = 20;
    const tileSize = Math.floor((width)/gridSize);

    let spawnX = Math.floor(width/2) - tileSize
    let spawnY = Math.floor(height/2) - tileSize

    let px = spawnX.valueOf()
    let py = spawnY.valueOf()

    let ax = Math.floor(Math.random() * gridSize)*tileSize
    let ay = Math.floor(Math.random() * gridSize)*tileSize

    let xdir = 1;
    let ydir = 0;

    let nextX = 0;
    let nextY = 0;

    let tailMax = 200
    let tailSize = 5
    let tail = [];

    let drawSpeed = 10;

    let stopped = true;


    p5.setup = () => {
      p5.createCanvas(height+1, width+1);
      p5.frameRate(drawSpeed);
      p5.background("#000000");
      p5.fill("#1aff00");

    };

    p5.draw = () => {

      if (tail.length == 0) {
        p5.sendScore(0)

      }

      p5.clear();

      p5.background("#000000");

      let nextX = px + xdir*tileSize
      let nextY = py + ydir*tileSize

      let yInbound = (0 <= nextY && nextY <= height - tileSize)
      let xInbound = (0 <= nextX && nextX <= height - tileSize)

      if (yInbound && xInbound && !stopped) {
        p5.fill("#1aff00");
        p5.rect(nextX, nextY, tileSize - 1, tileSize - 1)
        px = nextX
        py = nextY

        for (let i = tail.length - 1; i >= 0; i--) {
          p5.rect(tail[i].x, tail[i].y, tileSize - 1, tileSize - 1)
          if (px == tail[i].x && py == tail[i].y) {
            px = spawnX.valueOf()
            py = spawnY.valueOf()
            tail = []
            tailSize = 5
            break
          }
        }

        if ((ax == px && ay == py) && tailSize <= tailMax) {
          ax = Math.floor(Math.random() * gridSize)*tileSize
          ay = Math.floor(Math.random() * gridSize)*tileSize
          tailSize++
          p5.sendScore(tailSize-5)
        }

        while (tail.length > tailSize) {
          tail.shift()
        }

        tail.push({x: px, y: py})


        /*if (tail > tailMax)
          tailx.pop()
          taily.pop()*/
      }
      else if (!stopped) {
        px = spawnX.valueOf()
        py = spawnY.valueOf()
        tail = []
        tailSize = 5
      }
      p5.fill("#ff0000");
      p5.rect(ax, ay, tileSize - 1, tileSize - 1)
    };

    p5.keyPressed = () => {
      switch (p5.keyCode) {
        case p5.UP_ARROW:
          xdir = 0
          ydir = -1
          break
        case p5.DOWN_ARROW:
          xdir = 0
          ydir = 1
          break
        case p5.LEFT_ARROW:
          xdir = -1
          ydir = 0
          break
        case p5.RIGHT_ARROW:
          xdir = 1
          ydir = 0
          break
        case p5.CONTROL:
          stopped = !stopped
          if (stopped) {
            px = spawnX.valueOf()
            py = spawnY.valueOf()
            tail = []
            tailSize = 5
          }
          break
      };
    };

  p5.myCustomRedrawAccordingToNewPropsHandler = function(newProps){
    if(newProps.getCoords){
      p5.sendScore = newProps.getCoords(tailSize-5);
    }
  }


};
