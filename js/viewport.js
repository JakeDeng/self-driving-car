class Viewport {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.zoom = 1;
    this.center = new Point(canvas.width / 2, canvas.height / 2);
    this.offset = scale(this.center, -1);
    
    this.drag = {
      start: new Point(0,0),
      end: new Point(0,0),
      offset: new Point(0,0),
      enabled: false,
      active: false
    };
    
    this.#addEventListeners();
  }

  reset() {
    this.ctx.restore();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    this.ctx.translate(this.center.x, this.center.y);
    this.ctx.scale(1/this.zoom, 1/this.zoom);
    const offset = this.getOffset();
    this.ctx.translate(offset.x, offset.y);
  }

  isDragOffsetEnabled() {
    return this.drag.enabled;
  }
  
  getOffset() {
    return add(this.offset, this.drag.offset);
  }

  getMouserPosition(event, subtractDragOffset = false) {
    const p = new Point(
      (event.offsetX - this.center.x) * this.zoom - this.offset.x,
      (event.offsetY - this.center.y) * this.zoom - this.offset.y
    );

    return subtractDragOffset ? subtract(p, this.drag.offset) : p;
  }

  #addEventListeners(){
    this.canvas.addEventListener('mousewheel', this.#onMouseWheel.bind(this));
    this.canvas.addEventListener('mousedown', this.#onMouseDown.bind(this));
    this.canvas.addEventListener('mouseup', this.#onMouseUp.bind(this));
    this.canvas.addEventListener('mousemove', this.#onMouseMove.bind(this));

    document.addEventListener('keydown', this.#onKeyDown.bind(this));
    document.addEventListener('keyup', this.#onKeyUp.bind(this));
  }

  #onKeyDown(event) {
    if(event.keyCode === 32) {//space bar
      document.body.style.cursor = 'pointer';
      this.drag.enabled = true;
    }
  }

  #onKeyUp(event) {
    if(event.keyCode === 32) {
      this.drag.enabled = false;
      if(this.drag.active == false) {
        document.body.style.cursor = 'default';
      }
    }
  }

  #onMouseDown(event) {
    if(event.button === 0 && this.drag.enabled) {//left click and space bar is pressed
      this.drag.active = true
      this.drag.start = this.getMouserPosition(event);
    }
  }

  #onMouseMove(event) {
    if(this.drag.active) {
      this.drag.end = this.getMouserPosition(event);
      this.drag.offset = subtract(this.drag.end, this.drag.start);
    }
  }

  #onMouseUp(event) {
    if(this.drag.active) {
      this.offset = add(this.offset, this.drag.offset);
      if(this.drag.enabled == false) {
          document.body.style.cursor = 'default';
      }
      this.drag = {
        start: new Point(0,0),
        end: new Point(0,0),
        offset: new Point(0,0),
        enabled: false,
        active: false
      }
    }
  }

  #onMouseWheel = (event) => {
    const direction = Math.sign(event.deltaY);
    const step = 0.1;
    this.zoom += direction * step;
    this.zoom = Math.max(1, Math.min(this.zoom, 10));
  }
}