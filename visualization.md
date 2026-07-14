---
title: Visualization
permalink: /visualization/
---

<p class="eyebrow">Scientific visualization</p>

# Scientific visualization

Interactive figures and 3D models. The layout already loads Google's `<model-viewer>` and MathJax on every page, so both can be dropped straight into Markdown.

## Interactive 3D model

Drag to rotate, scroll to zoom. Replace `src` with a path to your own `.glb` file (e.g. `/assets/models/glacier.glb`) — a glacier surface, fjord bathymetry, or anything exported from Blender or ParaView.

<model-viewer
  src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
  alt="Placeholder 3D model"
  camera-controls
  auto-rotate
  shadow-intensity="1">
</model-viewer>

## Math rendering

Display math works out of the box, e.g. the shallow-ice approximation:

$$
q = -\frac{2A(\rho g)^n}{n+2}\, H^{n+2} \,|\nabla s|^{n-1}\nabla s
$$

## Embedded React (optional)

For small interactive widgets, React can be loaded inline on any page. This example is a working slider — swap the logic for your own tool later.

<div id="react-demo"></div>

<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script>
  const { useState, createElement: h } = React;

  function Demo() {
    const [n, setN] = useState(3);
    return h('div', { className: 'card' },
      h('h3', null, 'Glen flow-law exponent'),
      h('input', {
        type: 'range', min: 1, max: 5, step: 0.1, value: n,
        style: { width: '100%' },
        onChange: e => setN(parseFloat(e.target.value))
      }),
      h('p', null, `n = ${n.toFixed(1)} — strain rate scales as stress`,
        h('sup', null, n.toFixed(1)))
    );
  }

  ReactDOM.createRoot(document.getElementById('react-demo')).render(h(Demo));
</script>
