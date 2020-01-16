var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;
scene.background = new THREE.Color( 0xffffff );
scene.background = new THREE.CubeTextureLoader()
  .setPath('images/')
  .load([
    'xpos.png',
    'xneg.png',
    'ypos.png',
    'yneg.png',
    'zpos.png',
    'zneg.png'
  ]);

var light = new THREE.AmbientLight( 0xffffff, 1.2 );
scene.add( light );

var directLight = new THREE.DirectionalLight(0xffffff, 2, 500);
directLight.position.set(0, 10, 0);
scene.add(directLight);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', function() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

var planeGeometry = new THREE.PlaneGeometry(10000, 10000);
var material = new THREE.MeshLambertMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( planeGeometry, material );
plane.rotation.x = 1.6;
plane.position.set(0, -1, 0);
scene.add( plane );

var geometry = new THREE.BoxGeometry(1,1,1);
var cubeMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('images/wood.jpg') });
var box = new THREE.Mesh( geometry, cubeMaterial );
scene.add(box);


// update scene
var update = function () {
  // box.rotation.x += 0.01;
  // box.rotation.y +=0.02;
};

// render function
var render = function () {
  renderer.render(scene, camera);
};

// run game loop (update, render, repeat)
var GameLoop = function () {
  requestAnimationFrame(GameLoop);

  update();
  render();
};

GameLoop();
