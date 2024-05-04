import { Scene, Mesh, BoxGeometry, MeshLambertMaterial, DirectionalLight, AmbientLight } from 'three';
import { Main, OrthographicCameraAuto } from '@three.ez/main';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const box = new Mesh(new BoxGeometry(1), new MeshLambertMaterial());
box.draggable = true;
const box2 = new Mesh(new BoxGeometry(1), new MeshLambertMaterial());

box2.draggable = true;
const camera = new OrthographicCameraAuto(5).translateZ(5);

const directionalLight = new DirectionalLight();

const scene = new Scene().activeSmartRendering();
scene.cursor = 'move';
scene.add(new AmbientLight(), directionalLight, box, box2);

directionalLight.matrixAutoUpdate = false;
directionalLight.matrix = camera.matrix; // the light will always follow the camera, must be done after added to scene.

const main = new Main();
main.createView({ scene, camera });

const controls = new OrbitControls(camera, main.renderer.domElement);
scene.on(['pointerdown', 'pointerup', 'dragend'], (e) => (controls.enabled = e.type === 'pointerdown' ? e.target === scene : true));
