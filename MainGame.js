window.addEventListener('DOMContentLoaded', function(){
    var canvas = document.getElementById('renderCanvas');
    canvas.getContext = function(type, data) {
        data.preserveDrawingBuffer = true;
        return HTMLCanvasElement.prototype.getContext.call(canvas, type, data);
    }
    const engine = new BABYLON.Engine(canvas, true);
    function run(){
        let menuEl = document.getElementById("menu");
        let plybtnEl = document.getElementById("ply-btn");
        let setbtnEl = document.getElementById("set-btn");
        let crdbtnEl = document.getElementById("crd-btn");
        let conbtnEl = document.getElementById("con-btn");
        let abtbtnEl = document.getElementById("abt-btn");
        let bckbtnEl = document.getElementById("bck-btn");

        let dlgbtnEl = document.getElementById("dlg-btn");
        let delag = false;
        let fpsbtnEl = document.getElementById("fps-btn");
        let FPS2 = document.getElementById('fps');
        let fpsOn = false;
        let fontbtnEl = document.getElementById("font-btn");
        let bodyEl = document.getElementById("body");
        let fancyFont = true;

        let d98linkEl = document.getElementById("dipper98-link");
        let settingWords = 'top:-120px;';

        //Create the scene
        const scene = new BABYLON.Scene(engine);
        
        let gravityVector = new BABYLON.Vector3(0,-20, 0);
        scene.enablePhysics(gravityVector, new BABYLON.CannonJSPlugin());
        
        var keys = {};
        window.addEventListener('keydown', function(e) {
            keys[e.key] = true;
        });
        window.addEventListener('keyup', function(e) {
            keys[e.key] = false;
        });
        
        scene.clearColor = new BABYLON.Color3(0, 0, 0);
        scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
        scene.fogColor = scene.clearColor;
        scene.fogStart = 20.0;
        scene.fogEnd = 50.0;
        
        //Creates the player
        const player = BABYLON.MeshBuilder.CreateSphere    ("player", {segments: 12, diameter: 3}, scene);
        
        player.material = new BABYLON.StandardMaterial("playerMaterial", scene);
        player.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
        
        player.position = new BABYLON.Vector3(0, 5, 0);
        player.physicsImpostor = new BABYLON.PhysicsImpostor(player, BABYLON.PhysicsImpostor.SphereImpostor, {mass: 1, restitution: 0.9}, scene);
        let canJump = true;
        let cooldown = 50;
        let inCooldown = false;
        
        //Creates the camera
        const camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(player.position.x, 10, player.position.z), scene);
        camera.attachControl();

        //Creates the light
        const light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(1, 10, 1), scene);
        light.range = 50;
        light.intensity = 0.7;
        const light2 = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(1, 10, 1), scene);
        light2.range = 50;
        light2.intensity = 0.7;

function createBox(x, y, z, w, h, d, xRot, yRot, zRot, clr, m) {
    const Box = BABYLON.MeshBuilder.CreateBox('Box', {
        width: w,
        height: h,
        depth: d
    }, scene);
    Box.material = new BABYLON.StandardMaterial("BoxMaterial", scene);
    Box.material.diffuseColor = clr;
    Box.position = new BABYLON.Vector3(x, y, z);
    Box.rotation = new BABYLON.Vector3(xRot, yRot, zRot);
    if (m === undefined) {
        m = 0;
    }
    Box.physicsImpostor = new BABYLON.PhysicsImpostor(Box, BABYLON.PhysicsImpostor.BoxImpostor, {
        mass: m,
        restitution: 0.5
    }, scene);
}

function createSphere(x, y, z, s, d, clr) {
    const Sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {
        segments: s,
        diameter: d
    }, scene);
    Sphere.material = new BABYLON.StandardMaterial("sphereMaterial", scene);
    Sphere.material.diffuseColor = clr;
    Sphere.position = new BABYLON.Vector3(x, y, z);
    Sphere.physicsImpostor = new BABYLON.PhysicsImpostor(Sphere, BABYLON.PhysicsImpostor.SphereImpostor, {
        mass: 1,
        restitution: 0.5
    }, scene);
}

function createCylinder(x, y, z, h, dt, db, xRot, yRot, zRot, clr) {
    const Cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", {
        height: h,
        diameterTop: dt,
        diameterBottom: db
    }, scene);
    Cylinder.material = new BABYLON.StandardMaterial("cylinderMaterial", scene);
    Cylinder.material.diffuseColor = clr;
    Cylinder.position = new BABYLON.Vector3(x, y, z);
    Cylinder.rotation = new BABYLON.Vector3(xRot, yRot, zRot);
    Cylinder.physicsImpostor = new BABYLON.PhysicsImpostor(Cylinder, BABYLON.PhysicsImpostor.CylinderImpostor, {
        mass: 0,
        restitution: 0.5
    }, scene);
}

function createTorus(x, y, z, d, t, xRot, yRot, zRot, clr) {
    const Torus = BABYLON.MeshBuilder.CreateTorus("torus", {
        diameter: d,
        thickness: t
    }, scene);
    Torus.material = new BABYLON.StandardMaterial("cylinderMaterial", scene);
    Torus.material.diffuseColor = clr;
    Torus.position = new BABYLON.Vector3(x, y, z);
    Torus.rotation = new BABYLON.Vector3(xRot, yRot, zRot);
}

        createBox(0, 0, 0, 800, 0.1, 800, 0, 0, 0, new BABYLON.Color3(0.3, 0.3, 0.3));
        createBox(0, 10, 0, 800, 0.1, 800, 0, 0, 0, new BABYLON.Color3(0.3, 0.3, 0.3));
        for (var i = -400; i < 400; i += 20){
            for(var j = -400; j < 400; j += 20)
            createCylinder(i, 5, j, 10, 2, 2, 0, 0, 0, new BABYLON.Color3(0.5, 0.5, 0.5));
        }
        function pointerLock(){
            canvas.requestPointerLock();
        }
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        function switchPages(){
            plybtnEl.style.display = 'none';
            setbtnEl.style.display = 'none';
            crdbtnEl.style.display = 'none';
            conbtnEl.style.display = 'none';
            abtbtnEl.style.display = 'none';
        }
        function setSettings(){
            menuEl.innerHTML = "<h1>Settings</h1><p style = 'position:relative; top:-120px; font-size:35px;'>Delag: "+capitalizeFirstLetter(delag.toString())+"<br><br><br>FPS Counter: "+capitalizeFirstLetter(fpsOn.toString())+"<br><br><br>Fancy Font: "+capitalizeFirstLetter(fancyFont.toString())+"<br><br><br>Dev Mode:</p>"
        }
        function play(){
            menuEl.style.left = '10000px';
            switchPages();
        }
        function settings(){
            switchPages();
            bckbtnEl.style.display = 'block';
            dlgbtnEl.style.display = 'block';
            fpsbtnEl.style.display = 'block';
            fontbtnEl.style.display = 'block';
            setSettings();
        }
        function credits(){
            menuEl.innerHTML = "<h1>Credits</h1><p style = 'position:relative; top:-90px;'>Credit to <a href = 'https://www.khanacademy.org/profile/kaid_351465532815782433620675' target = 'blank'>The Duke</a> for playtesting.<br><br>Credit to <a href = 'https://simplycoding.org/' target = 'blank'>Simply Coding</a> for basic Babylon.js stuff.</p>"
            switchPages();
            bckbtnEl.style.display = 'block';
        }
        function controls(){
            menuEl.innerHTML = "<h1>Controls</h1><p style = 'position:relative; top:-90px;'>Wasd to move<br><br>Mouse to look around<br><br>Q to attack<br><br>E to upgrade sword</p>";
            switchPages();
            bckbtnEl.style.display = 'block';
        }
        function about(){
            menuEl.innerHTML = "<h1>About</h1><p style = 'position:relative; top:-90px;'>Lost is an 3D Babylon.js Game made by <a href = 'https://github.com/Dip98' target = 'blank'>Dipper98</a>.<br><br>The faster the computer you have, the better. If your computer starts lagging, then turn on the delag setting.<br><br>Know that this may change some parts of the game for worse.<br><br>If you liked this game, then please consider following me on GitHub, or subscribing to me on Khan Academy.</p>";
            switchPages();
            bckbtnEl.style.display = 'block';
        }
        function back(){
            menuEl.innerHTML = '<h1>Lost</h1>';
            plybtnEl.style.display = 'block';
            setbtnEl.style.display = 'block';
            crdbtnEl.style.display = 'block';
            conbtnEl.style.display = 'block';
            abtbtnEl.style.display = 'block';
            bckbtnEl.style.display = 'none';
            dlgbtnEl.style.display = 'none';
            fpsbtnEl.style.display = 'none';
            fontbtnEl.style.display = 'none';
        }
        function setDelag(){
            if (delag){
                delag = false;
            }else{
                delag = true;
            }
            setSettings();
        }
        function setFPS(){
            if (fpsOn){
                fpsOn = false;
            }else{
                fpsOn = true;
            }
            setSettings();
        }
        function setFont(){
            if (fancyFont){
                fancyFont = false;
            }else{
                fancyFont = true;
            }
            setSettings();
        }
        scene.registerAfterRender(function() {
            //Player movement
            var vel = player.physicsImpostor.getLinearVelocity();
            player.physicsImpostor.setLinearVelocity(vel.scale(.95));

            var forward = camera.getFrontPosition(1).subtract(camera.position);
            forward.y = 0;
            forward = forward.normalize().scale(0.7);
            
            var up = BABYLON.Vector3.TransformCoordinates(1, BABYLON.Matrix.RotationZ((3 * Math.PI) / 2));
            var backward = BABYLON.Vector3.TransformCoordinates(forward, BABYLON.Matrix.RotationY(Math.PI));
            var left = BABYLON.Vector3.TransformCoordinates(forward, BABYLON.Matrix.RotationY((3 * Math.PI) / 2));
            var right = BABYLON.Vector3.TransformCoordinates(forward, BABYLON.Matrix.RotationY(Math.PI / 2));
            
            if (keys.w){
                player.applyImpulse(forward, player.getAbsolutePosition());
            }
            if (keys.a) {
                player.applyImpulse(left, player.getAbsolutePosition());
            }
            if (keys.d) {
                player.applyImpulse(right, player.getAbsolutePosition());
            }
            if (keys.s) {
                player.applyImpulse(backward, player.getAbsolutePosition());
            }
            if (keys[' '] && canJump){
                player.applyImpulse(new BABYLON.Vector3(0, 10, 0), player.getAbsolutePosition());
                canJump = false;
                inCooldown = true;
            }
            if (inCooldown){
                cooldown--;
            }
            if (cooldown <= 0){
                inCooldown = false;
                canJump = true;
                cooldown = 50;
            }
            camera.position = new BABYLON.Vector3(player.position.x, player.position.y+0.5, player.position.z);
            light.position = player.position;
            light2.position = new BABYLON.Vector3(player.position.x, player.position.y+5, player.position.z);
            if (menuEl.style.left === '10000px'){
                document.addEventListener("click", pointerLock);
            }
            plybtnEl.addEventListener("click", play)
            setbtnEl.addEventListener("click", settings)
            crdbtnEl.addEventListener("click", credits)
            conbtnEl.addEventListener("click", controls)
            abtbtnEl.addEventListener("click", about)
            bckbtnEl.addEventListener("click", back)
            dlgbtnEl.addEventListener("click", setDelag)
            fpsbtnEl.addEventListener("click", setFPS)
            fontbtnEl.addEventListener("click", setFont)
            if (fpsOn){
                FPS2.style.display = 'block';
            }
            if (!fpsOn){
                FPS2.style.display = 'none';
            }
            if (fancyFont){
                bodyEl.style.fontFamily = 'Tangerine';
            }else{
                bodyEl.style.fontFamily = 'Comfortaa';
            }
        });
         return scene;
        }
    
    const scene = run();
    //Render the scene
    engine.runRenderLoop(function(){
        scene.render();
    });
    
});
let FPS = document.getElementById('fps');
let before, now, fps;
let allFps = [];
let allFps1 = 0;
let avgFps = 60;
let fpsCooldown = 0;
before = Date.now();
fps = 0;
requestAnimationFrame(
    function loop(){
        now = Date.now();
        fps = Math.round(1000 / (now - before));
        before = now;
        requestAnimationFrame(loop);
        FPS.innerHTML = 'Average FPS: '+avgFps;
        if (fpsCooldown > 0){
            fpsCooldown--;
        }else{
        if (allFps.length < 100){
            allFps.push(fps);
        }else{
            for (let i = 0; i < allFps.length; i++){
                allFps1 += allFps[i];
            }
            avgFps = allFps1 / allFps.length;
            allFps1 = 0;
            allFps = [];
            fpsCooldown = 50;
        }
        }
    }
 );
