/* Falling autumn leaves — dependency-free 3D animation.
 *
 * Each leaf gets a random size, depth (near = sharp, far = blurred),
 * fall duration, sway amplitude and 3D tumble. Runs on CSS transforms
 * only, pauses nothing in the layout, and is completely ignored when the
 * visitor prefers reduced motion.
 */
(function () {
  "use strict";

  var media = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (media.matches) return;

  var COLORS = ["#f59e0b", "#f97316", "#ea580c", "#d97706", "#fbbf24", "#c2410c"];
  var MAX_LEAVES = 16;

  var layer = document.createElement("div");
  layer.className = "leaf-layer";
  layer.setAttribute("aria-hidden", "true");
  document.body.appendChild(layer);

  var liveCount = 0;

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  function leafSVG(color) {
    return (
      '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<path d="M16 2C10 10 5 15.5 5 20.5 5 25 9.5 28 16 28s11-3 11-7.5C27 15.5 22 10 16 2Z" fill="' + color + '"/>' +
      '<path d="M16 5c-.4 7-.4 15 0 22" stroke="rgba(11,17,32,.35)" stroke-width="1.3" fill="none" stroke-linecap="round"/>' +
      "</svg>"
    );
  }

  function spawn() {
    if (!document.hidden && liveCount < MAX_LEAVES) {
      var leaf = document.createElement("div");
      leaf.className = "leaf";

      var near = Math.random() < 0.35; /* foreground vs background depth */
      var size = near ? random(26, 40) : random(13, 22);
      var color = COLORS[Math.floor(Math.random() * COLORS.length)];

      leaf.style.width = size.toFixed(1) + "px";
      leaf.style.left = random(-5, 105).toFixed(1) + "vw";
      leaf.style.opacity = near ? 0.85 : random(0.35, 0.6).toFixed(2);
      if (!near) {
        leaf.style.filter = "blur(" + random(0.8, 1.6).toFixed(1) + "px)";
      }

      var inner = document.createElement("span");
      inner.className = "leaf-inner";
      inner.innerHTML = leafSVG(color);
      leaf.appendChild(inner);
      layer.appendChild(leaf);
      liveCount++;

      var amp = random(6, 14);           /* horizontal sway, vw */
      var endDrift = random(-10, 14);    /* net drift at landing, vw */
      var rx = random(360, 900);         /* total tumble around X */
      var ry = random(180, 720);         /* total tumble around Y */
      var rz = random(-60, 60);          /* total lean around Z */
      var duration = random(9000, 18000);

      var fall = leaf.animate(
        [
          {
            transform: "translate3d(0,-8vh,0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
            offset: 0
          },
          {
            transform:
              "translate3d(" + amp.toFixed(1) + "vw,25vh,0) rotateX(" + (rx * 0.25).toFixed(0) + "deg) rotateY(" +
              (ry * 0.25).toFixed(0) + "deg) rotateZ(" + (rz + 25).toFixed(0) + "deg)",
            offset: 0.25
          },
          {
            transform:
              "translate3d(" + (-amp).toFixed(1) + "vw,50vh,0) rotateX(" + (rx * 0.5).toFixed(0) + "deg) rotateY(" +
              (ry * 0.5).toFixed(0) + "deg) rotateZ(" + (rz - 20).toFixed(0) + "deg)",
            offset: 0.5
          },
          {
            transform:
              "translate3d(" + (amp * 0.6).toFixed(1) + "vw,75vh,0) rotateX(" + (rx * 0.75).toFixed(0) + "deg) rotateY(" +
              (ry * 0.75).toFixed(0) + "deg) rotateZ(" + (rz + 15).toFixed(0) + "deg)",
            offset: 0.75
          },
          {
            transform:
              "translate3d(" + endDrift.toFixed(1) + "vw,108vh,0) rotateX(" + rx.toFixed(0) + "deg) rotateY(" +
              ry.toFixed(0) + "deg) rotateZ(" + rz.toFixed(0) + "deg)",
            offset: 1
          }
        ],
        { duration: duration, easing: "ease-in-out", fill: "none" }
      );

      function done() {
        leaf.remove();
        liveCount--;
      }
      fall.onfinish = done;
      fall.oncancel = done;
    }
    setTimeout(spawn, random(400, 1500));
  }

  spawn();
})();
