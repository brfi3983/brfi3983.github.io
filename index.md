---
title: Home
---

<!-- ============ HERO ============ -->
<section class="hero">
  <canvas class="flow-canvas"></canvas>
  <div class="hero-inner">
    <p class="eyebrow light reveal in">Glaciology · Numerical modeling · Field geophysics</p>
    <h1 class="reveal in">Ice in motion, <em>resolved numerically</em>.</h1>
    <p class="lede reveal in d1">
      I'm a PhD researcher developing GPU-accelerated models of glacier flow —
      subglacial hydrology, sediment transport, and erosion — grounded in
      marine geophysical fieldwork in Greenland fjords.
    </p>
    <div class="hero-actions reveal in d2">
      <a class="btn btn-primary" href="/projects">View projects</a>
      <a class="btn btn-ghost" href="/about">About me</a>
    </div>
  </div>
  <a class="hero-scroll" href="#focus" aria-label="Scroll down">↓</a>
</section>

<!-- ============ FOCUS AREAS ============ -->
<section class="section" id="focus">
  <div class="section-head reveal">
    <p class="eyebrow">Research focus</p>
    <h2>Three threads, one system</h2>
    <p>From the ice surface to the bed and the sediment beneath it — models, methods, and measurements.</p>
  </div>
  <div class="grid">
    <div class="card reveal">
      <span class="tag">Modeling</span>
      <h3>Subglacial hydrology</h3>
      <p>Coupled drainage systems beneath glaciers and their feedback on basal sliding, implemented in GPU-based ice flow frameworks.</p>
    </div>
    <div class="card reveal d1">
      <span class="tag earth">Fieldwork</span>
      <h3>Fjord geophysics</h3>
      <p>Sub-bottom profiling and bathymetric surveys in Greenland fjords, mapping sediment architecture at marine glacier margins.</p>
    </div>
    <div class="card reveal d2">
      <span class="tag">Methods</span>
      <h3>Variational PDE solvers</h3>
      <p>Energy-minimization formulations of higher-order ice flow, from classical Newton methods to neural approaches.</p>
    </div>
  </div>
</section>

<!-- ============ EQUATION BAND ============ -->
<div class="eq-band">
  <section class="section tight reveal">
    <p class="eyebrow light">The governing idea</p>
    $$ \dot{\varepsilon}_{ij} = A\,\tau_e^{\,n-1}\,\tau_{ij} $$
    <p>Glen's flow law — ice as a shear-thinning fluid. Most of my work amounts to solving this well, at scale, on real geometry.</p>
  </section>
</div>

<!-- ============ POINTERS ============ -->
<section class="section">
  <div class="grid">
    <div class="card reveal">
      <span class="tag">Explore</span>
      <h3>Projects</h3>
      <p>Research software: ice flow modules, geophysical processing pipelines, and numerical experiments.</p>
      <a class="card-link" href="/projects">Browse projects →</a>
    </div>
    <div class="card reveal d1">
      <span class="tag">Explore</span>
      <h3>Scientific visualization</h3>
      <p>Interactive 3D models and figures — glacier geometry, fjord bathymetry, and simulation output.</p>
      <a class="card-link" href="/visualization">See visualizations →</a>
    </div>
  </div>
</section>
