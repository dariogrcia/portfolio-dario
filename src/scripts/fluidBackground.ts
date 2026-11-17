/*
 * Liquid gradient behind the page, drawn with WebGL. The colour field warps
 * away from the pointer and glows under it, shifts phase as the page scrolls,
 * and calms down below the hero so body text stays readable. Without WebGL the
 * CSS mesh in global.css shows instead; with reduced motion it renders a
 * single still frame.
 */

type Rgb = [number, number, number];

interface Palette {
  colors: [Rgb, Rgb, Rgb, Rgb];
  base: Rgb;
  dark: boolean;
}

const hex = (value: string): Rgb => {
  const n = Number.parseInt(value.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

// Light hues stay above ~0.45 relative luminance and dark hues below ~0.05,
// so muted text keeps AA contrast wherever it lands.
export const palettes: Record<'light' | 'dark', Palette> = {
  light: {
    colors: [hex('#ecc8ae'), hex('#f3dccb'), hex('#e6bea3'), hex('#f0e2d4')],
    base: hex('#f7f3ee'),
    dark: false,
  },
  dark: {
    colors: [hex('#2a160d'), hex('#4a2414'), hex('#5c2e1a'), hex('#1c120d')],
    base: hex('#140d09'),
    dark: true,
  },
};

/** Brightest colour the pointer glow may reach in dark mode (sRGB, 0–1). */
export const darkGlowCap: Rgb = [0.4, 0.21, 0.12];

/** How far the field fades towards the plain background, from scroll depth. */
export const calmFor = (scrollY: number, viewportHeight: number): number =>
  Math.min(Math.max(scrollY / (viewportHeight * 1.2), 0), 1) * 0.55;

/** Eases a value towards its target; used to make the pointer feel liquid. */
export const approach = (current: number, target: number, rate: number) =>
  current + (target - current) * rate;

const vertexSource = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const fragmentSource = /* glsl */ `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;
uniform float uCalm;
uniform float uDark;
uniform vec3 uC0;
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;
uniform vec3 uBase;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.02 + vec2(1.3, 7.1);
    a *= 0.5;
  }
  return v;
}

void main() {
  float aspect = uRes.x / uRes.y;
  vec2 p = gl_FragCoord.xy / uRes;
  p.x *= aspect;
  vec2 m = uMouse;
  m.x *= aspect;

  // Push the field away from the pointer, like a finger in paint.
  vec2 away = p - m;
  float d = length(away);
  p += away * 0.35 * exp(-d * d * 5.0);

  float t = uTime * 0.06 + uScroll * 0.8;
  vec2 q = vec2(fbm(p * 1.3 + t), fbm(p * 1.3 - t + 5.2));
  vec2 r = vec2(
    fbm(p * 1.5 + 2.2 * q + vec2(1.7, 9.2) + t * 0.7),
    fbm(p * 1.5 + 2.2 * q + vec2(8.3, 2.8) - t * 0.6)
  );
  float f = fbm(p * 1.2 + 2.6 * r);

  vec3 col = mix(uC0, uC1, smoothstep(0.25, 0.75, f));
  col = mix(col, uC2, smoothstep(0.35, 0.85, length(q) - 0.2));
  col = mix(col, uC3, smoothstep(0.45, 0.9, r.x));

  // Soft light under the pointer.
  float glow = exp(-d * d * 9.0) * 0.6;
  vec3 lit = uDark > 0.5 ? min(col * 1.7, vec3(${darkGlowCap.join(', ')})) : mix(col, vec3(1.0), 0.5);
  col = mix(col, lit, glow);

  col = mix(col, uBase, uCalm);
  gl_FragColor = vec4(col, 1.0);
}
`;

const compile = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
};

export const startFluidBackground = (canvas: HTMLCanvasElement) => {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
  if (!gl) return;
  const vs = compile(gl, gl.VERTEX_SHADER, vertexSource);
  const fs = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!vs || !fs || !program) return;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  );
  const aPos = gl.getAttribLocation(program, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const u = (name: string) => gl.getUniformLocation(program, name);
  const uniforms = {
    res: u('uRes'),
    time: u('uTime'),
    mouse: u('uMouse'),
    scroll: u('uScroll'),
    calm: u('uCalm'),
    dark: u('uDark'),
    colors: [u('uC0'), u('uC1'), u('uC2'), u('uC3')],
    base: u('uBase'),
  };

  const darkQuery = matchMedia('(prefers-color-scheme: dark)');
  const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');

  const applyPalette = () => {
    const palette = palettes[darkQuery.matches ? 'dark' : 'light'];
    palette.colors.forEach((c, i) => gl.uniform3fv(uniforms.colors[i] ?? null, c));
    gl.uniform3fv(uniforms.base, palette.base);
    gl.uniform1f(uniforms.dark, palette.dark ? 1 : 0);
  };

  // The field is smooth, so it renders at reduced resolution and is scaled up.
  const resize = () => {
    const scale = 0.5;
    canvas.width = Math.max(1, Math.round(innerWidth * scale));
    canvas.height = Math.max(1, Math.round(innerHeight * scale));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uniforms.res, canvas.width, canvas.height);
  };

  const target = { x: 0.3, y: 0.7 };
  const pointer = { x: 0.3, y: 0.7 };
  let lastMove = -Infinity;
  addEventListener(
    'pointermove',
    (event) => {
      target.x = event.clientX / innerWidth;
      target.y = 1 - event.clientY / innerHeight;
      lastMove = performance.now();
    },
    { passive: true },
  );

  const draw = (now: number) => {
    // Without a pointer (touch, idle) the light wanders on its own.
    if (now - lastMove > 3000) {
      target.x = 0.5 + 0.35 * Math.sin(now / 5200);
      target.y = 0.55 + 0.3 * Math.cos(now / 6900);
    }
    pointer.x = approach(pointer.x, target.x, 0.05);
    pointer.y = approach(pointer.y, target.y, 0.05);
    gl.uniform1f(uniforms.time, now / 1000);
    gl.uniform2f(uniforms.mouse, pointer.x, pointer.y);
    gl.uniform1f(uniforms.scroll, scrollY / innerHeight);
    gl.uniform1f(uniforms.calm, calmFor(scrollY, innerHeight));
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  let frame = 0;
  const loop = (now: number) => {
    draw(now);
    frame = requestAnimationFrame(loop);
  };

  const run = () => {
    cancelAnimationFrame(frame);
    if (motionQuery.matches) {
      draw(0);
    } else {
      frame = requestAnimationFrame(loop);
    }
  };

  resize();
  applyPalette();
  run();
  canvas.dataset['ready'] = '';

  addEventListener('resize', () => {
    resize();
    if (motionQuery.matches) draw(0);
  });
  addEventListener(
    'scroll',
    () => {
      if (motionQuery.matches) draw(0);
    },
    { passive: true },
  );
  darkQuery.addEventListener('change', () => {
    applyPalette();
    if (motionQuery.matches) draw(0);
  });
  motionQuery.addEventListener('change', run);
};
