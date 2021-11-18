//Nhut Ly - CS 559 - Fall 2021


function setup() {
    var canvas = document.getElementById('myCanvas');

    var r1stFly = 100; //radius that the original fly will fly around
    var r2ndFly = 8; //radius that the second fly will fly around
    var rWing = 10; //radius for the flys wing
    var rHand = 20;
    var angle = 0; //starting angle for the fly
    var x1 = 0;
    var y1 = 0;
    var handAngle1 = Math.PI / 3;
    var handAngle2 = 2 * Math.PI / 3;
    var reachMin = true;

    function draw() {
        var context = canvas.getContext('2d');
        /******************************************************/
        // idk why but without this it is not working
        canvas.width = canvas.width;
        context.save(); // save original coordinates

        // draw axes to better understanding the current coordinates
        function DrawAxes(color) {
            context.strokeStyle = color;
            context.lineWidth = 3;
            context.beginPath();
            // Axes
            context.moveTo(120, 0);
            context.lineTo(0, 0);
            context.lineTo(0, 120);
            // Arrowheads
            context.moveTo(110, 5);
            context.lineTo(120, 0);
            context.lineTo(110, -5);
            context.moveTo(5, 110);
            context.lineTo(0, 120);
            context.lineTo(-5, 110);
            // X-label
            context.moveTo(130, 0);
            context.lineTo(140, 10);
            context.moveTo(130, 10);
            context.lineTo(140, 0);
            // Y-label
            context.moveTo(0, 130);
            context.lineTo(5, 135);
            context.lineTo(10, 130);
            context.moveTo(5, 135);
            context.lineTo(5, 142);
            context.stroke();
            context.lineWidth = 1;
        }

        // draw a line with given parameters
        function Drawline(startX, startY, endX, endY, color) {
            context.strokeStyle = color;
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(startX, startY);
            context.lineTo(endX, endY);
            context.closePath();
            context.stroke();
            context.lineWidth = 1;
        }

        // draw a circle with given parameters
        function DrawCircle(colorFilled, colorStroke, centerX, centerY, radius) {
            context.beginPath();
            context.arc(x = centerX, y = centerY, r = radius, sAngle = 0, eAngle = 2 * Math.PI);
            context.fillStyle = colorFilled;
            context.strokeStyle = colorStroke;
            context.fill();
            context.stroke();
        }

        // draw a bug given its size (radius)
        function DrawBug(radius) {
            //calculate the center of the bugs body
            x1 = radius * Math.cos(angle);
            y1 = radius * Math.sin(angle);
            angle = angle + .02;
            DrawCircle("black", "black", x1, y1, 10);
            //translate to the center of the bugs body
            //this will make all the parts of the bug move relatively to
            //the body of the bug that we just draw
            context.translate(x1, y1);
            //draw hand 1
            var xh11 = rHand * Math.cos(angle + handAngle1);
            var yh11 = rHand * Math.sin(angle + handAngle1);
            Drawline(0, 0, xh11, yh11, "red");

            //draw hand 2 that is opposite from hand 1
            var xh12 = rHand * Math.cos(angle + handAngle1 + Math.PI);
            var yh12 = rHand * Math.sin(angle + handAngle1 + Math.PI);
            Drawline(0, 0, xh12, yh12, "green");

            //draw hand 3
            var xh13 = rHand * Math.cos(angle + handAngle2);
            var yh13 = rHand * Math.sin(angle + handAngle2);
            Drawline(0, 0, xh13, yh13, "blue");

            //draw hand 4 that is opposite from hand 3
            var xh14 = rHand * Math.cos(angle + handAngle2 + Math.PI);
            var yh14 = rHand * Math.sin(angle + handAngle2 + Math.PI);
            Drawline(0, 0, xh14, yh14, "orange");

            //to make the bug moving hierarchically, its 4 hands (4 children)
            //keep rotating from 60 degrees to 120 degrees and back.
            //all 4 hands move relative to the bug
            //espcially hand 2 also moves relatively to hand 1
            //hand 4 also moves relatively to hand 3
            if (reachMin == true) {
                handAngle1 = handAngle1 + .05;
                handAngle2 = handAngle2 - .05;
            } else {
                handAngle1 = handAngle1 - .05;
                handAngle2 = handAngle2 + .05;
            }

            if (handAngle1 <= Math.PI / 3) {
                reachMin = true;
            } else if (handAngle1 >= 2 * Math.PI / 3) {
                reachMin = false;
            }

            //draw wing 1
            var xw11 = rWing * Math.cos(angle);
            var yw11 = rWing * Math.sin(angle);
            DrawCircle("gray", "black", xw11, yw11, 8);
            //draw wing 2
            var xw12 = rWing * Math.cos(angle + Math.PI);
            var yw12 = rWing * Math.sin(angle + Math.PI);
            DrawCircle("gray", "black", xw12, yw12, 8);
            //DrawAxes("red");
        }

        /********** Start drawing **************/

        context.translate(250, 525);
        //drawing the cake
        DrawCircle("brown", "black", 0, -130, 20);
        DrawCircle("brown", "black", 0, -80, 50);
        DrawCircle("brown", "black", 0, 0, 100);

        context.restore(); // get back the saved origin (0,0)

        context.save();

        context.translate(250, 250);
        DrawBug(r1stFly);
        //making the second bug move relatively to the first bug
        context.translate(y1, x1);
        context.rotate(Math.PI / 4);
        DrawBug(r2ndFly);
        //making the third bug move relatively to the first two bugs
        context.rotate(Math.PI);
        //scaling the coordinate to make the third bug bigger relatively to the first bug
        context.scale(1.5, 1.5);
        DrawBug(60);
        window.requestAnimationFrame(draw);
    }
    draw();
}
window.onload = setup;