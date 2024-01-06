
myCanvas.width = 600;
myCanvas.height = 600;

const ctx = myCanvas.getContext('2d');

const graph = new Graph([], []);
graph.draw(ctx);

function addRandomPoint() {
  const x = Math.floor(Math.random() * myCanvas.width);
  const y = Math.floor(Math.random() * myCanvas.height);
  graph.addPoint(new Point(x, y));
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  graph.draw(ctx);
}

function addRandomSegment() {
  const index1 = Math.floor(Math.random() * graph.points.length);
  const index2 = Math.floor(Math.random() * graph.points.length);
  const seg = new Segment(graph.points[index1], graph.points[index2]);
  if(graph.addSegment(seg)){
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    graph.draw(ctx);
  }
}

function removeSegment() {
  const removeSegIndex = Math.floor(Math.random() * graph.segments.length);
  if(graph.removeSegment(graph.segments[removeSegIndex])) {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    graph.draw(ctx);
  }
}

function removePoint() {
  const removePointIndex = Math.floor(Math.random() * graph.points.length);
  if(graph.removePoint(graph.points[removePointIndex])) {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    graph.draw(ctx);
  }
}
