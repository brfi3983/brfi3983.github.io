---
title: Scientific visualization
eyebrow: Interactive
subtitle: 3D models, equations, and small interactive tools.
permalink: /visualization/
---

The layout loads Google's `<model-viewer>` and MathJax on every page, so both drop straight into Markdown.

## Interactive 3D model

Drag to rotate, scroll to zoom. Replace `src` with your own `.glb` (e.g. `/assets/models/glacier.glb`) — glacier surfaces, fjord bathymetry, anything exported from Blender or ParaView.

<model-viewer
  src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
  alt="Placeholder 3D model"
  camera-controls
  auto-rotate
  shadow-intensity="1">
</model-viewer>

## Math rendering

Display math works out of the box — the shallow-ice flux, for instance:

$$
q = -\frac{2A(\rho g)^n}{n+2}\, H^{n+2}\, |\nabla s|^{n-1}\nabla s
$$

## Embedded React

Small interactive widgets can be built with React loaded inline on any page — no build step. This slider is a working example; swap the logic for your own tool.

<div id="react-demo"></div>

<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script>
  const { useState, createElement: h } = React;

  function Demo() {
    const [n, setN] = useState(3);
    return h('div', { className: 'card' },
      h('span', { className: 'tag' }, 'Interactive'),
      h('h3', null, "Glen flow-law exponent"),
      h('input', {
        type: 'range', min: 1, max: 5, step: 0.1, value: n,
        style: { width: '100%', accentColor: '#3D7E93' },
        onChange: e => setN(parseFloat(e.target.value))
      }),
      h('p', null, `n = ${n.toFixed(1)} — strain rate scales as stress`,
        h('sup', null, n.toFixed(1)))
    );
  }

  ReactDOM.createRoot(document.getElementById('react-demo')).render(h(Demo));
</script>
