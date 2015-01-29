/**
 * Created with JetBrains WebStorm.
 * User: honsytshen
 * Date: 15-1-14
 * Time: 下午3:18
 * To change this template use File | Settings | File Templates.
 */
var objects = (function (_) {
    var geo = new _.BoxGeometry(1,1,1),
        material = new _.MeshBasicMaterial( { color: 0x00ff00 }),
        mesh = new _.Mesh(geo, material);
    var objs = [];
    objs.push({
        body: mesh,
        behavior: function(){
            this.body.position.x+=0.01;
            this.body.position.y+=0.01;
        }
    });
    return objs;
})(THREE);
var scene = (function (_, objs) {
    var scene = new _.Scene;
    for(var key in objs) {
        scene.add(objs[key].body);
    }
    return scene;
})(THREE, objects);

var renderer = (function (_){
    var renderer = new _.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    return renderer;
})(THREE);

var camera = (function (_){
    var camera = new _.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    return camera;
})(THREE);

var app = (function(s,c,r,objs) {
    this.run = function() {
        requestAnimationFrame(this.run);
        for(var key in objs) {
            objs[key].behavior.apply(objs[key]);
        }
        r.render(s, c);
    };
    return {
        run: this.run
    }
})(scene,camera,renderer,objects);
