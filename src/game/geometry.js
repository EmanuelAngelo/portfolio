/** Shared projection keeps canvas, labels, mouse destinations and minimap aligned. */
export function projectPoint({ x, y, z = 0 }, camera) {
  return {
    x: camera.originX + (x - y) * camera.scale,
    y: camera.originY + (x + y) * camera.scale * 0.49 - z * camera.scale,
  };
}

export function unprojectPoint({ x, y }, camera) {
  const horizontal = (x - camera.originX) / camera.scale;
  const vertical = (y - camera.originY) / (camera.scale * 0.49);
  return { x: (horizontal + vertical) / 2, y: (vertical - horizontal) / 2 };
}

export function createCamera(width, height, player = { x: 5.5, y: 8 }) {
  const compact = width <= 1100 || height <= 600;
  if (!compact)
    return {
      width,
      height,
      compact,
      scale: Math.min(width * 0.035, height * 0.057),
      originX: width * 0.61,
      originY: height * 0.22,
    };
  const landscape = width > height;
  const scale = Math.max(58, Math.min(84, width * 0.17));
  const focusY = landscape ? height * 0.53 : Math.max(280, height * 0.53);
  return {
    width,
    height,
    compact,
    scale,
    originX: width / 2 - (player.x - player.y) * scale,
    originY: focusY - (player.x + player.y) * scale * 0.49,
  };
}

export function miniMapPoint(player) {
  return {
    x: 85 + (player.x / 11 - player.y / 12) * 76,
    y: 6 + (player.x / 11 + player.y / 12) * 43,
  };
}

/** Only the nearby entrance receives a label; the directory lists all destinations. */
export function layoutPins(zones, camera) {
  return zones.map((zone) => ({
    ...zone,
    position: projectPoint(
      { x: zone.x + 0.5, y: zone.y + 0.4, z: zone.id === 'erp' ? 2.65 : 2.2 },
      camera,
    ),
  }));
}
