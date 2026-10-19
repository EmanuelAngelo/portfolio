import { projectPoint } from './geometry.js';

/** Canvas-only renderer. State and camera are supplied by the caller. */
export function createWorldRenderer(ctx, zones) {
  let viewportWidth = 0,
    viewportHeight = 0,
    scale = 1,
    originX = 0,
    originY = 0;
  let player = { x: 5.4, y: 6 },
    target = null,
    moving = false,
    clock = 0;
  function project(x, y, z = 0) {
    return projectPoint({ x, y, z }, { scale, originX, originY: originY });
  }
  function drawPolygon(p, fill, stroke) {
    ctx.beginPath();
    p.forEach((v, i) => (i ? ctx.lineTo(v.x, v.y) : ctx.moveTo(v.x, v.y)));
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 0.6;
      ctx.stroke();
    }
  }
  function drawTile(x, y, w, d, z, c) {
    drawPolygon(
      [project(x, y, z), project(x + w, y, z), project(x + w, y + d, z), project(x, y + d, z)],
      c,
    );
  }
  function drawBox(x, y, w, d, h, c, base = 0) {
    drawPolygon(
      [
        project(x, y + d, base),
        project(x + w, y + d, base),
        project(x + w, y + d, base + h),
        project(x, y + d, base + h),
      ],
      c[1],
    );
    drawPolygon(
      [
        project(x + w, y, base),
        project(x + w, y + d, base),
        project(x + w, y + d, base + h),
        project(x + w, y, base + h),
      ],
      c[2],
    );
    drawTile(x, y, w, d, base + h, c[0]);
  }
  function drawLine(points, c, width = 1) {
    ctx.beginPath();
    points.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    ctx.strokeStyle = c;
    ctx.lineWidth = width;
    ctx.stroke();
  }
  function drawTree(x, y, k = 1) {
    drawBox(x, y, 0.12, 0.12, 0.42 * k, ['#8c6e4c', '#6a5340', '#574431']);
    let p = project(x + 0.06, y + 0.06, 1.3 * k);
    let a = project(x - 0.28 * k, y + 0.3 * k, 0.35 * k),
      b = project(x + 0.4 * k, y + 0.3 * k, 0.35 * k),
      c = project(x + 0.4 * k, y - 0.3 * k, 0.35 * k);
    drawPolygon([p, a, b], '#578179');
    drawPolygon([p, b, c], '#345f5c');
  }
  function drawWindow(x, y, z, w = 0.22, h = 0.22, c = '#a7ccbe') {
    drawPolygon(
      [project(x, y, z), project(x + w, y, z), project(x + w, y, z + h), project(x, y, z + h)],
      c,
    );
  }
  function drawBuilding(z) {
    const { x, y, id } = z;
    drawTile(x - 0.65, y - 0.7, 2.5, 2.7, 0.015, '#426361');
    drawBox(x - 0.5, y - 0.5, 2.1, 1.9, 0.12, ['#82928a', '#566c65', '#405750']);
    if (id === 'energy') {
      drawBox(x - 0.3, y - 0.25, 1.6, 1.35, 1.5, ['#ead1a0', '#be9c72', '#917955']);
      drawBox(x - 0.4, y - 0.35, 1.8, 1.55, 0.18, ['#f5dcab', '#c3a474', '#a08b63'], 1.5);
      for (let i = 0; i < 4; i++)
        drawWindow(x - 0.12 + i * 0.35, y + 1.105, 0.6, 0.2, 0.55, '#435e60');
      drawBox(x + 0.9, y - 0.5, 0.35, 0.35, 2.2, ['#d0d9c1', '#788e80', '#607b70']);
      let p = project(x + 0.1, y + 0.6, 2.1);
      ctx.fillStyle = '#f5c06a';
      ctx.font = `bold ${scale * 0.5}px sans-serif`;
      ctx.fillText('ϟ', p.x, p.y);
      for (let j = 0; j < 2; j++) {
        drawBox(x + 1.6, y + j * 0.7, 0.55, 0.4, 0.45, ['#bfd3c6', '#718b81', '#47655f']);
      }
    } else if (id === 'erp') {
      drawBox(x - 0.3, y - 0.2, 1.5, 1.3, 2.1, ['#afc9b9', '#5f8e86', '#3f6e68']);
      drawBox(x - 0.4, y - 0.3, 1.7, 1.5, 0.14, ['#bcd8c5', '#71998a', '#4b7468'], 2.1);
      for (let row = 0; row < 4; row++)
        for (let col = 0; col < 3; col++)
          drawWindow(
            x - 0.13 + col * 0.43,
            y + 1.105,
            0.3 + row * 0.43,
            0.27,
            0.23,
            row === 2 ? '#e5c68d' : '#b4d5c1',
          );
      drawBox(x + 1.3, y + 0.15, 0.55, 0.8, 0.8, ['#9aafa1', '#587c72', '#42655e']);
    } else if (id === 'education') {
      drawBox(x - 0.4, y - 0.3, 2, 1.35, 1.12, ['#b7ced5', '#8aa4b0', '#607e8c']);
      drawBox(x - 0.55, y - 0.45, 2.3, 1.65, 0.18, ['#d0d8d5', '#a0b8bf', '#7693a1'], 1.12);
      for (let j = 0; j < 5; j++)
        drawBox(x - 0.3 + j * 0.39, y + 1.1, 0.16, 0.18, 0.95, ['#d5dad1', '#b7c3bc', '#8faaa8']);
      drawBox(x + 0.2, y + 0.1, 0.65, 0.5, 0.15, ['#b6c7cd', '#78929c', '#65818b'], 1.3);
      drawWindow(x + 0.34, y + 1.06, 0.15, 0.4, 0.65, '#3c606a');
    } else if (id === 'health') {
      drawBox(x - 0.3, y - 0.3, 1.8, 1.5, 1.5, ['#d5ddd0', '#b0c6b5', '#7f9e91']);
      drawBox(x - 0.45, y - 0.45, 2.1, 1.8, 0.15, ['#e0e2ce', '#b1c7b0', '#8ca98e'], 1.5);
      for (let i = 0; i < 4; i++)
        drawWindow(x - 0.1 + i * 0.4, y + 1.205, 0.5, 0.23, 0.36, '#618d8c');
      drawBox(x + 0.3, y - 0.05, 0.7, 0.12, 0.11, ['#d98a74', '#b97461', '#a86656'], 1.65);
      drawBox(x + 0.57, y - 0.32, 0.15, 0.65, 0.11, ['#e59b7d', '#b97461', '#a86656'], 1.65);
      drawBox(x + 1.55, y + 0.1, 0.5, 1, 0.65, ['#c2d2be', '#9eb8a3', '#718f7d']);
    } else if (id === 'projects') {
      drawBox(x - 0.4, y - 0.4, 2, 1.45, 1.2, ['#c6b8ca', '#9c8ca4', '#706680']);
      drawBox(x - 0.55, y - 0.5, 2.3, 1.7, 0.15, ['#ded2d3', '#a99db1', '#918198'], 1.2);
      for (let i = 0; i < 4; i++)
        drawWindow(x - 0.2 + i * 0.42, y + 1.055, 0.3, 0.29, 0.65, '#476579');
      drawBox(x + 0.5, y - 0.1, 0.7, 0.6, 0.45, ['#908da1', '#726881', '#60596b'], 1.35);
      let p = project(x + 0.65, y + 0.55, 1.8);
      ctx.fillStyle = '#e2c7d6';
      ctx.font = `${scale * 0.33}px monospace`;
      ctx.fillText('</>', p.x, p.y);
    } else {
      drawBox(x - 0.3, y - 0.25, 1.7, 1.4, 0.85, ['#aaa789', '#777d62', '#5b6856']);
      drawPolygon(
        [
          project(x - 0.45, y - 0.4, 0.85),
          project(x + 1.55, y - 0.4, 0.85),
          project(x + 1.55, y + 0.45, 1.5),
          project(x - 0.45, y + 0.45, 1.5),
        ],
        '#bdba91',
      );
      drawPolygon(
        [
          project(x - 0.45, y + 0.45, 1.5),
          project(x + 1.55, y + 0.45, 1.5),
          project(x + 1.55, y + 1.3, 0.85),
          project(x - 0.45, y + 1.3, 0.85),
        ],
        '#8d9475',
      );
      drawWindow(x + 0.25, y + 1.16, 0.05, 0.4, 0.65, '#3e594d');
      drawLine([project(x + 1.6, y, 0), project(x + 1.6, y, 2)], '#c2cbb2', 2);
      drawPolygon(
        [
          project(x + 1.6, y, 2),
          project(x + 2.15, y, 1.9),
          project(x + 2.15, y, 1.5),
          project(x + 1.6, y, 1.6),
        ],
        '#b7bd91',
      );
    }
    // entrance path and light posts
    for (let i = 0; i < 3; i++) drawTile(x + 0.1, y + 1.5 + i * 0.2, 0.5, 0.12, 0.02, '#a0afa0');
  }
  function drawAvatar() {
    let p = project(player.x, player.y, 0.01);
    ctx.fillStyle = '#07171966';
    ctx.beginPath();
    ctx.ellipse(p.x, p.y + 2, scale * 0.25, scale * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();
    let bounce = moving ? Math.sin(clock * 13) * 0.035 : 0;
    drawBox(player.x - 0.1, player.y - 0.07, 0.08, 0.12, 0.22 + bounce, [
      '#303b43',
      '#1c3037',
      '#192931',
    ]);
    drawBox(player.x + 0.035, player.y - 0.07, 0.08, 0.12, 0.22 - bounce, [
      '#303b43',
      '#1c3037',
      '#192931',
    ]);
    drawBox(
      player.x - 0.13,
      player.y - 0.1,
      0.27,
      0.2,
      0.3,
      ['#efc18e', '#dba26f', '#b48259'],
      0.22,
    );
    drawBox(
      player.x - 0.1,
      player.y - 0.08,
      0.22,
      0.18,
      0.21,
      ['#e7c3a3', '#ce9e7c', '#b68b70'],
      0.52,
    );
    drawBox(
      player.x - 0.12,
      player.y - 0.09,
      0.25,
      0.2,
      0.08,
      ['#33403e', '#253532', '#1c2e2c'],
      0.72,
    );
    let q = project(player.x, player.y, 1.1);
    ctx.fillStyle = '#dbf2dd';
    ctx.font = '600 8px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('VOCÊ', q.x, q.y);
    ctx.textAlign = 'left';
  }
  const vegetation = [
    [0.5, 0.7],
    [0.5, 2],
    [0.6, 4],
    [0.7, 8],
    [0.5, 10.7],
    [1.1, 11.9],
    [4.5, 11.5],
    [5.5, 11.8],
    [9.9, 10],
    [10.3, 11.6],
    [10.5, 8.2],
    [10.5, 6.7],
    [10.4, 3.4],
    [10.5, 1.3],
    [6.2, 0.5],
    [4.5, 0.5],
    [1.5, 0.3],
    [6.3, 8.2],
    [5.8, 2.6],
  ];
  function renderScene() {
    ctx.clearRect(0, 0, viewportWidth, viewportHeight);
    let g = ctx.createRadialGradient(
      viewportWidth * 0.63,
      viewportHeight * 0.52,
      0,
      viewportWidth * 0.63,
      viewportHeight * 0.52,
      viewportWidth * 0.58,
    );
    g.addColorStop(0, '#24404a');
    g.addColorStop(0.65, '#14272f');
    g.addColorStop(1, '#101b22');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, viewportWidth, viewportHeight);
    // distant dotted chart
    ctx.fillStyle = '#9ccbc00d';
    for (let x = 15; x < viewportWidth; x += 32)
      for (let y = 115; y < viewportHeight - 85; y += 32) ctx.fillRect(x, y, 1, 1);
    let center = project(5.5, 6, -0.5);
    ctx.save();
    ctx.translate(center.x, center.y + scale);
    ctx.scale(1, 0.4);
    ctx.fillStyle = '#06121855';
    ctx.shadowColor = '#020d14';
    ctx.shadowBlur = 50;
    ctx.beginPath();
    ctx.ellipse(0, 0, scale * 8, scale * 6, 0, 0, 7);
    ctx.fill();
    ctx.restore();
    drawBox(0, 0, 11, 12, 0.7, ['#52746c', '#2a4b49', '#1d3b3e'], -0.7);
    drawBox(0.1, 0.1, 10.8, 11.8, 0.09, ['#638176', '#41635b', '#345951'], -0.02);
    for (let x = 0; x < 11; x++)
      for (let y = 0; y < 12; y++) {
        if ((x + y) % 3 === 0) drawTile(x + 0.08, y + 0.08, 0.85, 0.85, 0.08, '#6d8b792a');
      }
    drawTile(4.85, 0, 1.3, 12, 0.085, '#a8b09a');
    drawTile(0, 4.1, 11, 1.15, 0.086, '#a8b09a');
    drawTile(0, 8.3, 11, 1.1, 0.086, '#a8b09a');
    drawTile(5.04, 0, 0.9, 12, 0.09, '#788b7d');
    drawTile(0, 4.28, 11, 0.78, 0.09, '#788b7d');
    drawTile(0, 8.47, 11, 0.76, 0.09, '#788b7d');
    for (let i = 0; i < 12; i++) {
      drawTile(5.46, i + 0.25, 0.04, 0.3, 0.1, '#b8c2a66b');
    }
    for (let x = 1; x < 11; x++) {
      drawTile(x, 4.65, 0.3, 0.035, 0.1, '#c9c9af77');
      drawTile(x, 8.83, 0.3, 0.035, 0.1, '#c9c9af77');
    }
    // plaza fountain
    drawBox(4.65, 5.8, 1.75, 1.65, 0.13, ['#b7c3ac', '#8a9e8e', '#6c897d']);
    drawTile(4.85, 6, 1.35, 1.25, 0.14, '#648f93');
    drawBox(5.35, 6.4, 0.3, 0.3, 0.65, ['#b1d5c0', '#83b1a3', '#658d8a']);
    let fp = project(5.5, 6.55, 0.85);
    ctx.fillStyle = '#b4e4cb';
    ctx.beginPath();
    ctx.arc(fp.x, fp.y, scale * 0.12, 0, 7);
    ctx.fill();
    const items = zones.map((z) => ({ sort: z.x + z.y + 1, draw: () => drawBuilding(z) }));
    vegetation.forEach(([x, y], i) =>
      items.push({ sort: x + y, draw: () => drawTree(x, y, 0.7 + (i % 3) * 0.2) }),
    );
    items.push({ sort: player.x + player.y, draw: drawAvatar });
    items.sort((a, b) => a.sort - b.sort).forEach((a) => a.draw());
    // perimeter dots and water ambience
    for (let i = 0; i < 8; i++) {
      let p = project(-1.3 + i * 0.05, i * 1.5, -0.6);
      ctx.fillStyle = '#90c9c322';
      ctx.fillRect(p.x, p.y, 3, 1);
    }
    if (target) {
      let p = project(target.x, target.y, 0.13);
      ctx.strokeStyle = '#efc394';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, scale * (0.18 + Math.sin(clock * 4) * 0.03), scale * 0.1, 0, 7);
      ctx.stroke();
    }
  }

  return {
    draw(state, camera, time = 0) {
      ({ width: viewportWidth, height: viewportHeight, scale, originX, originY } = camera);
      ({ player, target, moving } = state);
      clock = time;
      renderScene();
    },
  };
}
