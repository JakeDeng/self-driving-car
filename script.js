myCanvas.width = 600;
myCanvas.height = 600;

const ctx = myCanvas.getContext('2d');

const graphString = localStorage.getItem("graph");
const savedGraph = graphString ? JSON.parse(graphString) : null;
const graph = savedGraph ? Graph.load(savedGraph) : new Graph();
const viewport = new Viewport(myCanvas);
const graphEditor = new GraphEditor(viewport, graph);

animate();

//drawing loop
function animate() {
  viewport.reset();
  graphEditor.display();
  requestAnimationFrame(animate);
}

function removeAll() {
  graphEditor.removeAll()
}

function save() {
  localStorage.setItem("graph", JSON.stringify(graph));
}

