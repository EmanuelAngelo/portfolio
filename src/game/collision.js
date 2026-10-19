/** Solid footprints include the player's clearance around walls and the fountain. */
export function createObstacles(zones) {
  return [
    ...zones.map((zone) => ({
      minX: zone.x - 0.75,
      maxX: zone.x + 2.25,
      minY: zone.y - 0.65,
      maxY: zone.y + 1.6,
    })),
    { minX: 4.5, maxX: 6.55, minY: 5.65, maxY: 7.6 },
  ];
}
export function isWalkable(point, obstacles = []) {
  return (
    point.x >= 0.2 &&
    point.x <= 10.8 &&
    point.y >= 0.2 &&
    point.y <= 11.8 &&
    !obstacles.some(
      (box) => point.x > box.minX && point.x < box.maxX && point.y > box.minY && point.y < box.maxY,
    )
  );
}
export function canWalkSegment(from, to, obstacles) {
  const steps = Math.max(1, Math.ceil(Math.hypot(to.x - from.x, to.y - from.y) / 0.05));
  for (let i = 1; i <= steps; i++) {
    if (
      !isWalkable(
        { x: from.x + ((to.x - from.x) * i) / steps, y: from.y + ((to.y - from.y) * i) / steps },
        obstacles,
      )
    )
      return false;
  }
  return true;
}
export function entranceOf(zone) {
  return { x: zone.x + 0.5, y: Math.min(11.8, zone.y + 2.05) };
}

/** Breadth-first navigation on a small grid; never cuts through building corners. */
export function findPath(start, destination, obstacles) {
  const step = 0.2;
  const points = [];
  for (let x = 1; x <= 54; x++)
    for (let y = 1; y <= 59; y++) {
      const point = { x: x * step, y: y * step, key: `${x},${y}`, gx: x, gy: y };
      if (isWalkable(point, obstacles)) points.push(point);
    }
  const byKey = new Map(points.map((point) => [point.key, point]));
  const nearest = (point, candidates) =>
    candidates.reduce(
      (best, value) =>
        !best ||
        Math.hypot(value.x - point.x, value.y - point.y) <
          Math.hypot(best.x - point.x, best.y - point.y)
          ? value
          : best,
      null,
    );
  const origin = nearest(
    start,
    points.filter(
      (point) =>
        Math.hypot(point.x - start.x, point.y - start.y) < 0.5 &&
        canWalkSegment(start, point, obstacles),
    ),
  );
  const goal = nearest(destination, points);
  if (!origin || !goal) return [];
  const queue = [origin],
    previous = new Map([[origin.key, null]]);
  for (let i = 0; i < queue.length; i++) {
    const current = queue[i];
    if (current.key === goal.key) break;
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 1],
      [-1, -1],
      [1, -1],
      [-1, 1],
    ]) {
      const next = byKey.get(`${current.gx + dx},${current.gy + dy}`);
      if (!next || previous.has(next.key) || !canWalkSegment(current, next, obstacles)) continue;
      previous.set(next.key, current.key);
      queue.push(next);
    }
  }
  if (!previous.has(goal.key)) return [];
  const route = [];
  for (let key = goal.key; key !== null; key = previous.get(key)) {
    const point = byKey.get(key);
    route.unshift({ x: point.x, y: point.y });
  }
  if (canWalkSegment(goal, destination, obstacles))
    route.push({ x: destination.x, y: destination.y });
  return route;
}
