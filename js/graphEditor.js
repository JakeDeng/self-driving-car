class GraphEditor {
  constructor(viewport, graph) {
    this.viewport = viewport;
    this.canvas = viewport.canvas;
    this.graph = graph;
    this.ctx = this.canvas.getContext('2d');

    this.mouse = null;
    this.selectedPoint = null;
    this.hoveredPoint = null;
    this.dragging = false;

    this.#addEventListeners();
  }

  #addEventListeners() {
    //canvas 
    this.canvas.addEventListener('mousedown', (event) => this.#onMouseDown(event));
    this.canvas.addEventListener('mousemove', (event) => this.#onMouseMove(event));
    this.canvas.addEventListener('mouseup', (event) => this.#onMouseUp(event));
    this.canvas.addEventListener('contextmenu', (event) => this.#onContextMenu(event));

    //document
    document.addEventListener('keydown', (event) => this.#onKeyDown(event));
  }

  #onContextMenu(event) {
    event.preventDefault();
  }

  #onKeyDown(event) {
    if(event.key == 'Escape') {
      this.selectedPoint = null;
    }
  }

  #onMouseDown(event) {
    if(event.button == 2 && !this.viewport.isDragOffsetEnabled()) {//right click and space is not pressed
      if(this.selectedPoint) {
        this.selectedPoint = null;
      } else if(this.hoveredPoint){
        this.#removePoint(this.hoveredPoint);
      }
    }

    if(event.button == 0 && !this.viewport.isDragOffsetEnabled()) {//left click and space is not pressed
      if(this.hoveredPoint) {
        this.#selectPoint(this.hoveredPoint);
        this.dragging = true;
        return;
      }
      this.graph.addPoint(this.mouse);
      this.#selectPoint(this.mouse);
      this.hoveredPoint = this.mouse;
    }
  }

  #onMouseMove(event) {
    this.mouse = this.viewport.getMouserPosition(event, true);
    this.hoveredPoint = getNearestPoint(this.mouse, this.graph.points, 10*this.viewport.zoom);
    if(this.dragging) {
      this.selectedPoint.x = this.mouse.x;
      this.selectedPoint.y = this.mouse.y;      
    }
  }

  #onMouseUp(event) {
    this.dragging = false;
  }

  #selectPoint(point) {
    if(this.selectedPoint) {
      const segment = new Segment(this.selectedPoint, point);
      this.graph.addSegment(segment);
    }
    this.selectedPoint = point;
  }

  #removePoint(point) {
    this.graph.removePoint(point);
    this.hoveredPoint = null;
    if(this.selectedPoint == point) {
      this.selectedPoint = null;
    }
  }

  removeAll() {
    this.graph.removeAll();
    this.selectedPoint = null;
    this.hoveredPoint = null;
  }

  display() {
    this.graph.draw(this.ctx);

    if(this.hoveredPoint) {
      this.hoveredPoint.draw(this.ctx, { fill: true });
    }
    
    if(this.selectedPoint) {
      const intentPoint = this.hoveredPoint ? this.hoveredPoint : this.mouse;
      new Segment(this.selectedPoint, intentPoint).draw(this.ctx, {dash: [3,3]});
      this.selectedPoint.draw(this.ctx, {outline: true});
    }
  }
}
