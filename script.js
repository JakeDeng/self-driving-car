myCanvas.width = 600;
myCanvas.height = 600;

const ctx = myCanvas.getContext('2d');

const p1 = new Point(100, 100);
const p2 = new Point(200, 200);
const seg1 = new Segment(p1, p2);

const graph = new Graph([p1, p2], [seg1]);
graph.draw(ctx);