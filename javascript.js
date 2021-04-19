$(function(){

    
/*
    var canvas = document.getElementById("paint");
    var context = canvas.getContext('2d');
    
    //draw a line
    context.beginPath();
    
    //set line width
    context.lineWidth = 40;
    
    //set color of line
    context.strokeStyle = "#42e565";
    
    context.lineCap = "round";
    
    context.linetJoin = "round";
    
    //position the context point
    context.moveTo(50,50);
    
    context.lineTo(200,200);
    
    context.lineTo(400,100);
    
    //Make line visible
    context.stroke();
    
*/
    
    var paint = false;
    
    var paint_erase = "paint";
    
    
    var canvas = document.getElementById("paint");
    
    var ctx = canvas.getContext("2d");
    
    var container = $("#container");

    var mouse = {x:0, y:0};
    if(localStorage.getItem("imgCanvas") != null){
        var img = new Image();
        img.onload = function(){
            ctx.drawImage(img, 0, 0);
        }
        img.src = localStorage.getItem("imgCanvas");
    };
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    
    container.mousedown(function(e){
       paint = true;
        ctx.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
//        mouse.y = e.pageY - this.offsetTop;
        
        ctx.moveTo(mouse.x,mouse.y);
    });
    
    container.mousemove(function(e){
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if(paint==true){
            if(paint_erase == "paint"){
                ctx.strokeStyle = $("#paintColor").val();
            }
            else{
                ctx.strokeStyle = "white";
            }
            
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }          
        
    });
    
    container.mouseup(function(){
        paint = false;
    });
    
    container.mouseleave(function(){
        paint = false;
    });
    
    //reset function
    $("#reset").click(function(){
       ctx.clearRect(0, 0, canvas.width, canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("eraseMode");
    });
    
    //local storage
    $("#save").click(function(){
            if (typeof(localStorage) != null){
        localStorage.setItem("imgCanvas", canvas.toDataURL());
    }
    else{
        window.alert("You may lose your session if you close your browser");
        }
    });

    
    //erase function
    $("#erase").click(function(){
        if (paint_erase == "paint"){
            paint_erase = "erase";
        }
        else{
            paint_erase = "paint";
        }
        $(this).toggleClass("eraseMode");
    });
    
    //change color
    $("#paintColor").change(function(){
        @("#circle").css("background-color", $(this).val());
    });
    
    // Line Width Thickness
        $("#slider").slider({
        min: 3,
        max: 30,
        slide: function(event, ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth = ui.value;
        }
    });
    
    
});

