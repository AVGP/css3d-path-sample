var THREE         = require('three'),
    Animation     = require('./animation'),
    CSS3D         = require('./css3d');

var WIDTH = window.innerWidth, HEIGHT = window.innerHeight;

// initialise CSS3D

// The 3D renderer & scene & camera
var cssRenderer = new CSS3D.Renderer(),
    cssScene    = new THREE.Scene(),
    camera      = new THREE.PerspectiveCamera(
      45,                // field of view, degrees
      WIDTH / HEIGHT,    // aspect ratio
      1,                 // near plane
      2000               // far plane
    );

camera.position.set(0, 0, 1500);

// configure & add the CSS3D renderer to the DOM
cssRenderer.setSize( window.innerWidth, window.innerHeight );
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = 0;
document.body.appendChild(cssRenderer.domElement);

// Animation path data
var pathPoints = [
  {position: {x: 0, y: 0, z:   0}}
];

function mkSVG() {
  var svgns = "http://www.w3.org/2000/svg";
  var shape = document.createElementNS(svgns, "circle");
  shape.setAttributeNS(null, "cx", 5);
  shape.setAttributeNS(null, "cy", 5);
  shape.setAttributeNS(null, "r",  5);
  shape.setAttributeNS(null, "fill", "green");

  return shape;
}

// create a bunch of elements & animation path points
for(var i=0; i<10; i++) {
  var elem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  elem.appendChild(mkSVG());
  elem.setAttribute("viewBox", "0 0 10 10");

  var cssObj = new CSS3D.Object3D(elem);
  cssObj.position.set(
    (i % 2 === 0 ? -1 : 1) * 500,
     -500 * i,
    -1000 * i
  );//(i % 2 === 0 ? -1 : 1) * 200 * i, -100 * i, -500 + -1000 * i);

  pathPoints.push({
    x: (i % 2 === 0 ? -1 : 1) * 500,
    y: -500 * i,
    z: -500 + -1000 * (i-1)
  });
  cssObj.scale.set(0.2, 0.2, 0.2);
  cssScene.add(cssObj);
}

function render() {
  Animation.update()
  // Rendering, updating the world
  cssRenderer.render(cssScene, camera);
  requestAnimationFrame(render);
}

requestAnimationFrame(render);

var currentPathPoint = 1;
setInterval(function() {
  Animation.animate(camera, pathPoints[currentPathPoint++])
  console.log('animate!');
  if(currentPathPoint == pathPoints.length) currentPathPoint = 0;
}, 2000);
