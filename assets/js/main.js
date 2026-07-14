/* ============================================================
   GLACIAL — interactions
   ============================================================ */
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Fallback: if a CDN failed, make everything visible and bail */
if (!window.gsap || !window.Lenis) {
  document.documentElement.classList.add("no-anim");
}

document.getElementById("year").textContent = new Date().getFullYear();

/* ============ WebGL glacial-ice shader ============ */
(function iceShader() {
  const canvas = document.querySelector(".ice-canvas");
  if (!canvas) return;
  const gl = canvas.getContext("webgl", { antialias: false });
  if (!gl) { canvas.style.background = "radial-gradient(800px 400px at 70% 20%, #14303d, #0A1218)"; return; }

  const vert = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`;
  const frag = `
    precision highp float;
    uniform vec2 uRes; uniform float uT; uniform vec2 uM;

    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float noise(vec2 p){
      vec2 i = floor(p), f = fract(p);
      vec2 u = f * f * (3. - 2. * f);
      return mix(mix(hash(i), hash(i + vec2(1., 0.)), u.x),
                 mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), u.x), u.y);
    }
    float fbm(vec2 p){
      float v = 0., a = 0.55;
      for(int i = 0; i < 5; i++){ v += a * noise(p); p = p * 2.03 + 17.7; a *= 0.5; }
      return v;
    }

    void main(){
      vec2 uv = gl_FragCoord.xy / uRes;
      vec2 p  = uv; p.x *= uRes.x / uRes.y;

      vec2 drift = vec2(uT * 0.015, -uT * 0.008) + uM * 0.12;
      float n = fbm(p * 1.7 + drift + fbm(p * 3.1 - drift) * 0.45);

      vec3 deep = vec3(0.039, 0.071, 0.094);
      vec3 mid  = vec3(0.058, 0.115, 0.152);
      vec3 teal = vec3(0.180, 0.431, 0.518);
      vec3 ice  = vec3(0.486, 0.769, 0.847);

      vec3 col = mix(deep, mid, smoothstep(0.2, 0.8, n));
      col = mix(col, teal, smoothstep(0.62, 0.95, n) * 0.55);

      /* contour bands, like elevation lines on an ice surface */
      float c = abs(fract(n * 9.0) - 0.5);
      float line = smoothstep(0.06, 0.0, c) * 0.10;
      col += ice * line * smoothstep(0.35, 0.8, n);

      /* darken toward bottom so text stays readable */
      col *= mix(1.0, 0.55, smoothstep(0.55, 0.0, uv.y));
      /* soft vignette */
      col *= 1.0 - 0.35 * length(uv - 0.5);

      gl_FragColor = vec4(col, 1.0);
    }`;

  const sh = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    return s;
  };
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, vert));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(prog); gl.useProgram(prog);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, "uRes");
  const uT   = gl.getUniformLocation(prog, "uT");
  const uM   = gl.getUniformLocation(prog, "uM");

  let mx = 0, my = 0, tmx = 0, tmy = 0;
  window.addEventListener("mousemove", (e) => {
    tmx = (e.clientX / innerWidth - 0.5);
    tmy = (e.clientY / innerHeight - 0.5);
  });

  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 1.6);
    canvas.width  = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  resize();
  window.addEventListener("resize", resize);

  let t = 0;
  const frame = () => {
    mx += (tmx - mx) * 0.04; my += (tmy - my) * 0.04;
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uT, t);
    gl.uniform2f(uM, mx, my);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    t += 0.016;
    if (!prefersReduced) requestAnimationFrame(frame);
  };
  frame(); /* reduced motion → renders a single static frame */
})();

/* Everything below needs GSAP + Lenis */
if (window.gsap && window.Lenis && !document.documentElement.classList.contains("no-anim")) {
  gsap.registerPlugin(ScrollTrigger);

  /* ============ Smooth scrolling ============ */
  let lenis = null;
  if (!prefersReduced) {
    lenis = new Lenis({ lerp: 0.09 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* ============ Split text into masked words ============ */
  const splitWords = (el) => {
    const walk = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((piece) => {
            if (!piece.trim()) { frag.appendChild(document.createTextNode(piece)); return; }
            const mask = document.createElement("span");
            mask.className = "w";
            const inner = document.createElement("span");
            inner.textContent = piece;
            mask.appendChild(inner);
            frag.appendChild(mask);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1) walk(child);
      });
    };
    walk(el);
    return el.querySelectorAll(".w > span");
  };

  const heroWords = [];
  document.querySelectorAll(".split-lines").forEach((el) => {
    heroWords.push(...(prefersReduced ? [] : splitWords(el)));
  });

  /* ============ Preloader → hero intro ============ */
  const loader = document.getElementById("loader");
  const intro = gsap.timeline();

  if (prefersReduced) {
    loader.remove();
    gsap.set([".reveal-up", ".gs-reveal"], { opacity: 1, y: 0 });
  } else {
    intro
      .to(".loader-word", { opacity: 1, duration: 0.5, ease: "power2.out" })
      .to(".loader-word", { opacity: 0, duration: 0.35, delay: 0.3 })
      .to(loader, { yPercent: -100, duration: 0.7, ease: "power4.inOut",
                    onComplete: () => loader.remove() })
      .to(heroWords, { y: 0, duration: 0.9, ease: "power4.out", stagger: 0.045 }, "-=0.25")
      .to(".hero-inner .reveal-up, .page-hero .reveal-up",
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12 }, "-=0.6");
  }

  /* ============ Scroll reveals ============ */
  gsap.utils.toArray(".gs-reveal").forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 86%" },
    });
  });

  gsap.utils.toArray("main .reveal-up").forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });

  /* Statement paragraphs: words brighten as you scroll through them */
  document.querySelectorAll("[data-scrub]").forEach((el) => {
    const words = splitWords(el);
    gsap.set(words, { y: 0, opacity: 0.14 });
    gsap.to(words, {
      opacity: 1, stagger: 0.06, ease: "none",
      scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
    });
  });

  /* Work rows cascade in */
  ScrollTrigger.batch(".work-row", {
    start: "top 90%",
    onEnter: (rows) => gsap.to(rows, { opacity: 1, y: 0, stagger: 0.08, duration: 0.8, ease: "power3.out" }),
  });
  gsap.set(".work-row", { opacity: 0, y: 30 });

  /* ============ Nav: shrink + hide on scroll down ============ */
  const nav = document.getElementById("nav");
  let lastY = 0;
  const navUpdate = (y) => {
    nav.classList.toggle("scrolled", y > 60);
    nav.classList.toggle("hidden", y > 300 && y > lastY);
    lastY = y;
  };
  if (lenis) lenis.on("scroll", ({ scroll }) => navUpdate(scroll));
  else window.addEventListener("scroll", () => navUpdate(scrollY), { passive: true });

  /* ============ Custom cursor ============ */
  if (matchMedia("(hover: hover) and (pointer: fine)").matches && !prefersReduced) {
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    const dx = gsap.quickTo(dot, "x", { duration: 0.08 });
    const dy = gsap.quickTo(dot, "y", { duration: 0.08 });
    const rx = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" });
    window.addEventListener("mousemove", (e) => {
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
    });
    document.querySelectorAll("a, button, .work-row, input").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("hovering"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hovering"));
    });
  } else {
    document.getElementById("cursorDot").remove();
    document.getElementById("cursorRing").remove();
  }
}
