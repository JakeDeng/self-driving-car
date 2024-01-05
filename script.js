
myCanvas.width = 600;
myCanvas.height = 600;

const ctx = myCanvas.getContext('2d');

const p1 = new Point(100, 100);
const p2 = new Point(200, 200);
const seg1 = new Segment(p1, p2);

const graph = new Graph([p1, p2], [seg1]);
graph.draw(ctx);

function addRandomPoint() {
  const x = Math.random() * myCanvas.width;
  const y = Math.random() * myCanvas.height;
  graph.addPoint(new Point(x, y));
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  graph.draw(ctx);
}

function addRandomSegment() {
  const index1 = Math.floor(Math.random() * graph.points.length);
  const index2 = Math.floor(Math.random() * graph.points.length);
  
  if(index1 != index2) {
    const seg = new Segment(graph.points[index1], graph.points[index2]);
    graph.addSegment(seg);
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    graph.draw(ctx);
  }
}
