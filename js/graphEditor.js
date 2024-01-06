class GraphEditor {
  constructor(graph, canvas) {
    this.graph = graph;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.selectedPoint = null;
    this.hoveredPoint = null;
    this.dragging = false;

    this.#addEventListeners();
  }

  //register all event listeners
  #addEventListeners() {
    this.canvas.addEventListener('mousedown', (event) => this.#onMouseDown(event));
    this.canvas.addEventListener('mousemove', (event) => this.#onMouseMove(event));
    this.canvas.addEventListener('mouseup', (event) => this.#onMouseUp(event));
    this.canvas.addEventListener('contextmenu', (event) => this.#onContextMenu(event));
  }

  #onContextMenu(event) {
    event.preventDefault();
  }

  #onMouseDown(event) {
    const mousePoint = new Point(event.offsetX, event.offsetY);
    if(event.button == 2) {//right click
      if(this.hoveredPoint) {
        this.#removePoint(this.hoveredPoint);
      }
    }

    if(event.button == 0) {//left click
      if(this.hoveredPoint) {
        this.selectedPoint = this.hoveredPoint;
        this.dragging = true;
        return;
      }
      this.graph.addPoint(mousePoint);
      //add segment
      if(this.selectedPoint) {
        const segment = new Segment(this.selectedPoint, mousePoint);
        this.graph.addSegment(segment);
      }
      this.selectedPoint = mousePoint;
      this.hoveredPoint = mousePoint;
    }
  }

  #onMouseMove(event) {
    const mousePoint = new Point(event.offsetX, event.offsetY);
    this.hoveredPoint = getNearestPoint(mousePoint, this.graph.points);
    if(this.dragging) {
      this.selectedPoint.x = mousePoint.x;
      this.selectedPoint.y = mousePoint.y;      
    }
  }

  #onMouseUp(event) {
    this.dragging = false;
  }

  #removePoint(point) {
    this.graph.removePoint(point);
    this.hoveredPoint = null;
    if(this.selectedPoint == point) {
      this.selectedPoint = null;
    }
  }

  display() {
    this.graph.draw(this.ctx);

    if(this.hoveredPoint) {
      this.hoveredPoint.draw(this.ctx, { fill: true });
    }
    
    if(this.selectedPoint) {
      this.selectedPoint.draw(this.ctx, {outline: true});
    }
  }
}
