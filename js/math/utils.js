function getNearestPoint(point, points, threshold = 18) {
  let nearestPoint = null;
  let minDistance = Infinity;

  points.forEach(p => {
      let distance = calcDistance(point, p);
      if (distance < minDistance && distance < threshold) {
          minDistance = distance;
          nearestPoint = p;
      }
  });

  return nearestPoint;
}

function calcDistance(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}