---
title: Visualization
eyebrow: 04 / Interactive
subtitle: 3D models, equations, and small interactive tools.
permalink: /visualization/
---

<div class="section prose" markdown="1">

The site loads Google's `<model-viewer>` and MathJax on every page, so both drop straight into Markdown.

## Interactive 3D model

Drag to rotate, scroll to zoom. Replace `src` with your own `.glb` (e.g. `/assets/models/glacier.glb`) — glacier surfaces, fjord bathymetry, anything exported from Blender or ParaView.

<model-viewer
  src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
  alt="Placeholder 3D model"
  camera-controls
  auto-rotate
  exposure="0.9"
  shadow-intensity="1">
</model-viewer>

## Math rendering

Display math works out of the box — the shallow-ice flux, for instance:

$$
q = -\frac{2A(\rho g)^n}{n+2}\, H^{n+2}\, |\nabla s|^{n-1}\nabla s
$$

## Embedded React

Small interactive widgets can run inline on any page with React from a CDN — no build step. This slider is a working example; swap the logic for your own tool.

<div id="react-demo" markdown="0"></div>

<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script>
  const { useState, createElement: h } = React;

  function Demo() {
    const [n, setN] = useState(3);
    return h('div', { className: 'widget' },
      h('p', { className: 'mono-label' }, 'Interactive'),
      h('h3', null, "Glen flow-law exponent"),
      h('input', {
        type: 'range', min: 1, max: 5, step: 0.1, value: n,
        onChange: e => setN(parseFloat(e.target.value))
      }),
      h('p', { className: 'readout' }, 'n = ', h('b', null, n.toFixed(1)),
        ` — strain rate scales as stress^${n.toFixed(1)}`)
    );
  }

  ReactDOM.createRoot(document.getElementById('react-demo')).render(h(Demo));
</script>

</div>
