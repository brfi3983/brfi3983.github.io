---
title: Home
---

<!-- ================= HERO ================= -->
<section class="hero">
  <canvas class="ice-canvas"></canvas>
  <div class="hero-inner">
    <p class="mono-label reveal-up">Glaciology — Numerical modeling — Field geophysics</p>
    <h1 class="split-lines">Ice in<br><span class="outline">motion</span></h1>
    <div class="hero-sub">
      <p class="lede reveal-up">
        Brandon Finley — PhD researcher building GPU-accelerated models of glacier flow,
        from subglacial hydrology to the sediments of Greenland fjords.
      </p>
      <div class="hero-coords reveal-up">
        <b>69.2°N&nbsp;&nbsp;51.1°W</b><br>
        Ilulissat Icefjord — field site<br>
        est. velocity ~40 m/day
      </div>
    </div>
  </div>
  <span class="scroll-hint">Scroll</span>
</section>

<!-- ================= MARQUEE ================= -->
<div class="marquee" aria-hidden="true">
  <div class="marquee-track">
    <span>Subglacial hydrology <em>✦</em> Sediment transport <em>✦</em> Glacial erosion <em>✦</em> Variational solvers <em>✦</em> Fjord geophysics <em>✦</em> GPU computing <em>✦</em></span>
    <span>Subglacial hydrology <em>✦</em> Sediment transport <em>✦</em> Glacial erosion <em>✦</em> Variational solvers <em>✦</em> Fjord geophysics <em>✦</em> GPU computing <em>✦</em></span>
  </div>
</div>

<!-- ================= STATEMENT ================= -->
<section class="section">
  <span class="section-index">01 / Research</span>
  <p class="mono-label gs-reveal">What I do</p>
  <p class="statement" data-scrub>
    I build numerical models of <span class="hl">how glaciers flow</span>,
    drain, and erode — and test them against
    <span class="hl-e">data from the fjords</span> they carve.
  </p>
</section>

<!-- ================= WORK INDEX ================= -->
<section class="section" style="padding-top: 0;">
  <span class="section-index">02 / Selected work</span>
  <p class="mono-label gs-reveal">Selected work</p>
  <div class="work-list">

    <a class="work-row" href="/projects">
      <span class="work-num">001</span>
      <span class="work-title">IGM hydrology &amp; sediment modules</span>
      <span class="work-tag">Ice flow · GPU</span>
      <span class="work-arrow"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg></span>
      <p class="work-desc">Subglacial drainage, sediment transport, and erosion for a TensorFlow-based glacier model.</p>
    </a>

    <a class="work-row" href="/projects">
      <span class="work-num">002</span>
      <span class="work-title">Fjord sub-bottom imaging</span>
      <span class="work-tag">Geophysics · Field</span>
      <span class="work-arrow"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg></span>
      <p class="work-desc">Chirp SBP processing and bathymetric mapping of sediment architecture at marine glacier margins.</p>
    </a>

    <a class="work-row" href="/projects">
      <span class="work-num">003</span>
      <span class="work-title">Variational ice flow solvers</span>
      <span class="work-tag">Numerics · ML</span>
      <span class="work-arrow"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg></span>
      <p class="work-desc">Energy-minimization formulations of higher-order ice flow, from Newton methods to Deep Ritz.</p>
    </a>

    <a class="work-row" href="/visualization">
      <span class="work-num">004</span>
      <span class="work-title">Scientific visualization</span>
      <span class="work-tag">3D · Interactive</span>
      <span class="work-arrow"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg></span>
      <p class="work-desc">Interactive models and figures — glacier geometry, bathymetry, and simulation output.</p>
    </a>

  </div>
</section>

<!-- ================= EQUATION MOMENT ================= -->
<div class="eq-moment">
  <section class="section gs-reveal">
    <p class="mono-label" style="text-align:center;">The governing idea</p>
    $$ \dot{\varepsilon}_{ij} \;=\; A\,\tau_e^{\,n-1}\,\tau_{ij} $$
    <p class="eq-caption">
      Glen's flow law — ice as a shear-thinning fluid. Most of my work amounts to
      solving this well, at scale, on real geometry.
    </p>
  </section>
</div>
