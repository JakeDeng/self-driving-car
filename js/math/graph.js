class Graph {
  constructor(points = [], segments = []){
    this.points = points;
    this.segments = segments;
  }

  addPoint(point) {
    if(this.containsPoint(point)) return false;
    this.points.push(point);
    return true;
  }

  addSegment(segment) {
    if(this.containsSegment(segment)) return false;
    this.segments.push(segment);
    return true;
  }

  containsPoint(point) {
    return this.points.find(p => p.equals(point)) != null;
  }

  containsSegment(segment) {
    return this.segments.find(s => s.equals(segment)) != null;
  }

  draw(ctx){
    for(const segment of this.segments){
      segment.draw(ctx);
    }

    for(const point of this.points){
      point.draw(ctx);
    }
  }
}