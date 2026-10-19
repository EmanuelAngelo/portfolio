import { PerspectiveCamera, Vector3, Raycaster, Vector2, Plane } from 'three';

/** The exact same perspective camera drives WebGL, mouse raycasting and HTML labels. */
export function createCamera(width, height, player = { x: 5.5, y: 8 }) {
  return {
    width,
    height,
    compact: width <= 1100 || height <= 600,
    focusX: player.x,
    focusY: player.y,
  };
}
export function configureCamera(camera, config) {
  const { width, height, compact, focusX, focusY } = config;
  camera.aspect = width / Math.max(1, height);
  camera.fov = 44;
  const distance = compact ? (width > height ? 5.7 : 6.4) : 8.6;
  camera.position.set(focusX + distance * 0.68, distance * 0.83, focusY + distance * 0.68);
  camera.lookAt(focusX, 0.32, focusY);
  camera.setViewOffset(width, height, compact ? 0 : -width * 0.16, -height * 0.055, width, height);
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld(true);
  return camera;
}
const projectionCamera = new PerspectiveCamera(44, 1, 0.05, 100);
const raycaster = new Raycaster();
const plane = new Plane(new Vector3(0, 1, 0), 0);
export function projectPoint({ x, y, z = 0 }, config) {
  const point = new Vector3(x, z, y).project(configureCamera(projectionCamera, config));
  return { x: ((point.x + 1) * config.width) / 2, y: ((1 - point.y) * config.height) / 2 };
}
export function unprojectPoint({ x, y }, config) {
  configureCamera(projectionCamera, config);
  raycaster.setFromCamera(
    new Vector2((x / config.width) * 2 - 1, 1 - (y / config.height) * 2),
    projectionCamera,
  );
  const point = raycaster.ray.intersectPlane(plane, new Vector3());
  return point ? { x: point.x, y: point.z } : null;
}
export function miniMapPoint(player) {
  return {
    x: 85 + (player.x / 11 - player.y / 12) * 76,
    y: 6 + (player.x / 11 + player.y / 12) * 43,
  };
}
export function layoutPins(zones, camera) {
  return zones.map((zone) => ({
    ...zone,
    position: projectPoint({ x: zone.x + 0.5, y: zone.y + 1.5, z: 0.8 }, camera),
  }));
}
