
var WordcloudPanel = (function() {
    
    var fill = d3.scale.category20b();

    //WordcloudPanel.inherits(Subpanel);
    function WordcloudPanel (words) {       
        //Subpanel.call(this);
        
        
        var scale = 1,
            w = window.innerWidth-50,
            h = window.innerHeight - 24 - 7 - 110,
            counter = 0;

        var layout = d3.layout.cloud()
            .timeInterval(10)
            .size([w, h])
            .rotate(function() {
                counter++;
                if (counter <= 10) return 0; // Display horizontally the first 10 words
                return ~~(Math.random() * 2) * 90; // The rest will be random
            })
            .font("Impact")
            .text(function(d) { return d.text; })    
            .on("end", function (data, bounds) {
                counter = 0; // Restart the word counter so that next time we'll count from the start
                drawWordcloud(data, bounds);
            });

        var background = undefined,
            vis = undefined;
            
            

        function drawWordcloud(data, bounds) {
            scale = bounds ? Math.min(
                w / Math.abs(bounds[1].x - w / 2),
                w / Math.abs(bounds[0].x - w / 2),
                h / Math.abs(bounds[1].y - h / 2),
                h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;  
            var text = vis.selectAll("text")
                .data(data, function(d) { return d.text.toLowerCase(); });
            text.transition()
                .duration(1000)
                .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
                .style("font-size", function(d) { return d.size + "px"; });
            text.enter().append("text")
                .attr("text-anchor", "middle")
                .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
                .style("font-size", function(d) { return d.size + "px"; })
                .on("click", function(d) { // Left and middle click		
                    ui.appendQuery(d.text);
                })
                .on("contextmenu", function (d) { // Right click
                    ui.query({query: d.text});
                    d3.event.preventDefault();
                })
                .on("mouseenter", function () {
                    d3.select(this).style("opacity", 0.5);
                })
                .on("mouseleave", function () {
                    d3.select(this).style("opacity", 1);
                })
                .style("opacity", 1e-6)
                .transition()
                .duration(1000)
                .style("opacity", 1);
            text.style("fill", function(d) { 
                    return fill(d.text.toLowerCase()); 
                })
                .text(function(d) { return d.text; });
            var exitGroup = background.append("g")
                .attr("transform", vis.attr("transform"));
            var exitGroupNode = exitGroup.node();
            text.exit().each(function() {
                exitGroupNode.appendChild(this);
            });
            exitGroup.transition()
                .duration(1000)
                .style("opacity", 1e-6)
                .remove();
            vis.transition()
                .delay(1000)
                .duration(750)
                .attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")");
        }

            
        this.renderOn = function (html) {
            
            var fontSize = d3.scale.linear().range([10, 100]);
            if (words.length) fontSize.domain([+words[words.length - 1].size || 1, +words[0].size]);  

            w = window.innerWidth-50;
            h = window.innerHeight - 24 - 7 - 110;

            var container = d3.select(html)
                .append("div")
                .attr("id", "wordcloud");
                
                
            var svg = container.append("svg")
                .attr("height", h);

            background = svg.append("g");

            vis = svg.append("g")
                .attr("transform", "translate(" + [w >> 1, h >> 1] + ")");

            layout
                .fontSize(function(d) { return fontSize(+d.size); })
                .stop()
                .words(words.slice(0, Math.min(words.length, 150)))
                .start();            
        };
    }
    
    /*
    function downloadPNG(a) {
        var watermark = new Image();
        watermark.onload = function () {
            var powered = new Image();
            powered.onload = function () {                
                var canvas = document.createElement("canvas"),
                    c = canvas.getContext("2d");            
                canvas.width = w;
                canvas.height = h + powered.height;
                c.save();
                c.translate(w >> 1, h >> 1);
                c.scale(scale, scale);
                words.forEach(function(word, i) {
                    c.save();
                    c.translate(word.x, word.y);
                    c.rotate(word.rotate * Math.PI / 180);
                    c.textAlign = "center";
                    c.fillStyle = fill(word.text.toLowerCase());
                    c.font = word.size + "px " + word.font;
                    c.fillText(word.text, 0, 0);
                    c.restore();
                });

                c.restore();
                c.save();
                c.translate(w / 2 - watermark.width / 2, h / 2 - watermark.height / 2);
                c.drawImage(watermark, 0, 0);
                
                c.restore();
                c.translate(canvas.width - powered.width, canvas.height - powered.height);
                c.drawImage(powered, 0, 0);
                
                a.attr("href", canvas.toDataURL("image/png"));
                a.transition()
                    .duration(500)
                    .style("opacity", 1);
            };
            powered.src = "assets/powered.png";
        };
        watermark.src = "assets/watermark.png";
    }
    */
   
    return WordcloudPanel;
})();

function wordcloudShow(words){
	var wordCloud =  new WordcloudPanel(words);
	var stop;
	wordCloud.renderOn("clouddiv");
}
