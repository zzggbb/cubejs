var cfg = {
    width  : 512,
    height : 512,
    fg     : "#ffffff",
    bg     : "#394046",
    grid_bg: "#ffffff",
    grid_fg: "#6e7b87",
    geo    : 16
}

var colors = [
    "ffffff","6e7b87","ae163c","2a8e6a",
    "dbab3b","1b8edb","9d2d8f","31adc9"
]
var cvs,ctx,down,
    mouse_down,mouse_pix,round,setcolor

$(document).ready(function () {

    cvs = $("#canvas")[0];
    ctx = cvs.getContext("2d");
    down = false;
    
    $.extend(cvs,{width: cfg.width,height:cfg.height});
    
    ctx.fillStyle = cfg.grid_bg;
    ctx.fillRect(0,0,cfg.width,cfg.height);

    // draw the grid
    ctx.strokeStyle=cfg.grid_fg;
    for (var i = 0; i < cfg.width; i+=cfg.geo) {
        ctx.moveTo(i,0);
        ctx.lineTo(i,cfg.height);
        ctx.moveTo(0,i);
        ctx.lineTo(cfg.width,i);
    }
    ctx.stroke();
    

    // utility functions

    mouse_pos = function (evt) {
        rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX-rect.left,
            y: evt.clientY-rect.top
        }
    }
    mouse_pix = function (pos) {
        return {
            x: round(pos.x)-cfg.geo,
            y: round(pos.y)-cfg.geo
        }
    }
    round = function (n) {
        return Math.ceil(n/cfg.geo) * cfg.geo;
    }
    setcolor = function(color) {
        cfg.fg = "#" + color;
    
    }
    addcolor = function(color) {
        $("#colors").append(
            $("<div></div>")
            .attr({
                "id": "color",
                "class": "center-block"
            })
            .css("background-color",color)
            .append(
                $("<div></div>")
                .attr("id","colornum")
                .text(colors.indexOf(color) + 1)
            )
        );
    }
    
    _.each(colors,addcolor);

    $("#canvas")
    .mousemove(function (event) {
        var pix = mouse_pix(mouse_pos(event)); 
        //$("#pos").html("["+pix.x+","+pix.y+"]");
        if (down) {
            ctx.fillStyle = cfg.fg;
            ctx.fillRect(pix.x,pix.y,cfg.geo,cfg.geo);
        } 
    })
    .mousedown(function (event) {
        down = true;
        var pix = mouse_pix(mouse_pos(event));
        ctx.fillStyle = cfg.fg;
        ctx.fillRect(pix.x,pix.y,cfg.geo,cfg.geo);
    });
    $(window)
    .mouseup(function () {
        down = false;
        ctx.save()
    });
    
    $(document).keypress(function(event){
        // offset, '0' key is 48, '1' is 49, etc
        key = event.which - 48 - 1;
        if (_.contains(_.range(10), key)) {
            setcolor(colors[key]);
            console.log("num key pressed", key);

        }
    });
});
