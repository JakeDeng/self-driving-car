class Graph {
  constructor(points = [], segments = []){
    this.points = points;
    this.segments = segments;
  }

  static load(graph){
    let points = graph.points.map(point => new Point(point.x, point.y));
    let segments = graph.segments.map(segment => new Segment(
      points.find(p => p.equals(segment.p1)),
      points.find(p => p.equals(segment.p2))
    ));;
    return new Graph(points, segments);
  }

  addPoint(point) {
    if(this.containsPoint(point)) return false;
    this.points.push(point);
    return true;
  }

  addSegment(segment) {
    if(this.containsSegment(segment) || segment.p1.equals(segment.p2)) return false;
    this.segments.push(segment);
    return true;
  }

  removeSegment(segment) {
    const segIndex = this.segments.indexOf(segment);
    if(segIndex < 0 || segIndex >= this.segments.length) return false;
    
    this.segments.splice(segIndex, 1);
    return true;
  }

  removePoint(point) {
    const pointIndex = this.points.indexOf(point);
    if(pointIndex < 0 || pointIndex >= this.points.length) return false;

    const segments = this.getSegmentsByPoint(point);
    segments.forEach((segment) => this.removeSegment(segment))
    this.points.splice(pointIndex, 1);
    return true;
  }

  removeAll() {
    this.segments = []
    this.points = []
  }

  getSegmentsByPoint(point) {
    const segmentsByPoint = [];
    for(const segment of this.segments) {
      if(segment.includesPoint(point)) segmentsByPoint.push(segment);
    }
    return segmentsByPoint;
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