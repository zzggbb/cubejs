$(document).ready(function () {
    cfg = {
        "width" : 512,
        "height" : 512,
        "grid_bg": "#ffffff",
        "grid_fg": "#6e7b87",
        "grid_geo" : 16
    }
    var cvs = document.getElementById('canvas')
    var ctx = cvs.getContext('2d');
    setup(ctx, cfg);
    $( "#canvas" ).mousemove(function(  event ) {
        var pos = mouse_pos(cvs,event);
        var round = function( pos ){
            return Math.ceil(pos/cfg.grid_geo) * cfg.grid_geo;
        }

        var pix = { x: round(pos.x), y: round(pos.y) };
        $('#pos').html( "real: "+pos.x+", "+pos.y+" pixel: "+pix.y+","+pix.y );
    });
    $("#canvas").mousedown(function (event) {
        var round = function( pos ){
            return Math.ceil(pos/cfg.grid_geo) * cfg.grid_geo;
        }

        var pos = mouse_pos(cvs,event);
        var pix = { x: round(pos.x), y: round(pos.y) };
        console.log(pix);
        ctx.fillStyle = "#2a8e6a";
        ctx.fillRect(pix.x-cfg.grid_geo,pix.y-cfg.grid_geo,cfg.grid_geo,cfg.grid_geo);
    });
});

function controls() {
    
}
function draw(x,y) {
    
}
function mouse_pos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function setup(ctx,cfg) {
    console.log("initializing window", cfg.width, "x", cfg.height);
    ctx.canvas.width = cfg.width;
    ctx.canvas.height = cfg.height; 
    // draw background
    ctx.fillStyle = cfg.grid_bg;
    ctx.fillRect(0,0,cfg.width,cfg.height);

    // draw gridlines
    ctx.strokeStyle=cfg.grid_fg;
    for (var x = 0; x < cfg.width; x+=cfg.grid_geo) {
        ctx.moveTo(x,0);
        ctx.lineTo(x,cfg.height);
    }
    for (var y = 0; y < cfg.height; y+=cfg.grid_geo) {
        ctx.moveTo(0,y);
        ctx.lineTo(cfg.width,y);
    }
    ctx.stroke();
    
}
