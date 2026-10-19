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

export function createCamera(width, height) {
  if (width > 1100 && height > 600) {
    return {
      width,
      height,
      scale: Math.min(width * 0.035, height * 0.057),
      originX: width * 0.61,
      originY: height * 0.22,
    };
  }
  const landscape = width > height;
  const top = landscape ? 100 : Math.min(310, height * 0.37);
  const bottom = height - (landscape ? 95 : 150);
  const scale = Math.max(5, Math.min((width - 36) / 23, (bottom - top) / 11.27));
  return {
    width,
    height,
    scale,
    originX: width / 2 + scale / 2,
    originY: top + Math.max(0, (bottom - top - scale * 11.27) / 2),
  };
}

export function miniMapPoint(player) {
  return {
    x: 85 + (player.x / 11 - player.y / 12) * 76,
    y: 6 + (player.x / 11 + player.y / 12) * 43,
  };
}

/** Avoid overlapping destination labels on compact screens. */
export function layoutPins(zones, camera) {
  const pins = zones.map((zone) => ({
    ...zone,
    position: projectPoint(
      { x: zone.x + 0.5, y: zone.y + 0.4, z: zone.id === 'erp' ? 2.65 : 2.2 },
      camera,
    ),
  }));
  if (camera.width > 650) return pins;
  const placed = [];
  for (const pin of [...pins].sort((a, b) => a.position.y - b.position.y)) {
    pin.position.x = Math.max(63, Math.min(camera.width - 63, pin.position.x));
    for (const previous of placed) {
      if (
        Math.abs(pin.position.x - previous.position.x) < 119 &&
        Math.abs(pin.position.y - previous.position.y) < 44
      ) {
        pin.position.y = previous.position.y + 44;
      }
    }
    placed.push(pin);
  }
  return pins;
}
