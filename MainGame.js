window.addEventListener('DOMContentLoaded', function(){
    var canvas = document.getElementById('renderCanvas');
    canvas.getContext = function(type, data) {
        data.preserveDrawingBuffer = true;
        return HTMLCanvasElement.prototype.getContext.call(canvas, type, data);
    }
    const engine = new BABYLON.Engine(canvas, true);
    function run(){
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
        
         scene.clearColor = new BABYLON.Color3(0, 0.804, 1);
         basicSetup();
         
         createBox(0, 0, 0, 10, 0.1, 10, 0, 0.5, 0, new BABYLON.Color3(0.5, 0.5, 0.5));
         createTorusKnot(0, 5, 0, 0.15, 100, 1, 0, 0, 0, new BABYLON.Color3(0.5, 0.5, 0.9));
         
         createBox(0, 3, -1, 1, 1, 1, 0, 0, 0, new BABYLON.Color3(0.5, 0.9, 0.9), 1);
         createSphere(1, 2, 0, 10, 1, new BABYLON.Color3(0.5, 0.9, 0.5));
         createCylinder(0, 4, 1, 1, 1, 1, 0, 0, 0, new BABYLON.Color3(0.9, 0.5, 0.5));
         
         createBox(0, 13, 1.5, 1, 1, 1, 0, 0, 0, new BABYLON.Color3(0.5, 0.9, 0.9), 1);
         createSphere(0.5, 12, 0.5, 10, 1, new BABYLON.Color3(0.5, 0.9, 0.5));
         createCylinder(0, 14, -1.5, 1, 1, 1, 0, 0, 0, new BABYLON.Color3(0.9, 0.5, 0.5));
         
         function pointerLock(){
            canvas.requestPointerLock();
         }
         scene.registerAfterRender(function() {
             playerMovement();
        });
         return scene;
        }
    
    const scene = run();
    //Render the scene
    engine.runRenderLoop(function(){
        scene.render();
    });
    
});
