/**
 * Created with JetBrains WebStorm.
 * User: honsytshen
 * Date: 15-1-14
 * Time: 下午3:18
 * To change this template use File | Settings | File Templates.
 */
var proxy = function(that, fun) {
    return function() {
        fun.apply(that, arguments);
    };
};
var lights = (function(_) {
    var pointLight = new _.PointLight(0xFFFFFF);
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;
    var lights = [];
    lights.push({
        body: pointLight,
        behavior: function(){
        }
    });
    return lights;
})(THREE);

var objects = (function (_, lights) {
    var geo = new _.BoxGeometry(1,1,1),
        material = new _.MeshLambertMaterial( { color: 0xCC0000 }),
        mesh = new _.Mesh(geo, material);
    var objs = [];
    objs.push({
        body: mesh,
        xx:0.01,
        yy:0.01,
        behavior: function(){
            if(this.body.scale.y > this.yy) {
//                this.body.scale.x += this.xx;
//                this.body.scale.y -= this.yy;
            }
        },
        on: 'mouse move'
    });
    objs = objs.concat(lights);
    return objs;
})(THREE, lights);

var scene = (function (_, objs) {
    var scene = new _.Scene;
    for(var key in objs) {
        scene.add(objs[key].body);
    }
    return scene;
})(THREE, objects);

var renderer = (function (_){
    var renderer = new _.WebGLRenderer();
    renderer.setClearColor(0xFFFFFF,1.0);
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    return renderer;
})(THREE);

var camera = (function (_){
    var camera = new _.PerspectiveCamera( 65, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 1;
    camera.position.x = 2;
    return {
        body : camera,
        behavior : function() {

        }
    };
})(THREE);

var app = (function(s,c,r,objs) {
    this.run = function() {
        requestAnimationFrame(this.run);
        for(var key in objs) {
            objs[key].behavior.apply(objs[key]);
        }
        c.behavior();
        r.render(s, c.body);
    };
    return {
        run: this.run
    }
})(scene,camera,renderer,objects);

var register =(function(window, objects){
    for(var key in objects) {
        switch (objects[key].on) {
            case 'mouse move':
//                document.addEventListener('click', proxy(app, app.run), false);
                var obj = objects[key];
                document.onmouseup = function(e) {
                    obj.body.position.x = e.clientX/500;
                    obj.body.position.y = window.innerHeight/500 - e.clientY/500;
                    app.run.apply(app);
                };
                break;
            default :
        }
    }

})(window, objects);



