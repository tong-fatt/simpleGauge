var needle = [];
function createGauges(worksheetData)
	{   for (i = 0 ; i< worksheetData.length; i++){
        
        needle[worksheetData[i][0]._value] = new Needle(chart, worksheetData[i][1]._value);
		needle[worksheetData[i][0]._value].moveTo( worksheetData[i][1]._value, 0.3, 1,
			worksheetData[i][0]._value);    
			console.log('worksheetData:' + JSON.stringify(worksheetData[i][0]._value));              
		}
	
  }			





  

    var barWidth, chart, chartInset, degToRad, repaintGauge,
        height, margin, numSections, padRad, percToDeg, percToRad,
        percent, radius, sectionIndx, svg, totalPercent, width,
            targetText, actualText, fullText, labelText, formatValue, k;
 
    percent = .85;
    numSections = 1;
    sectionPerc = 1 / numSections / 2;
    padRad = 0.005;
    chartInset = 10;
 
    // Orientation of gauge:
    totalPercent = 0.75;
 
	el = d3.select('.chart-gauge');
	console.log('e1: ' , JSON.stringify(el));
 
    margin = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
 
    width = el[0][0].offsetWidth - margin.left - margin.right;
    height = width;
    radius = Math.min(width, height) / 3;
    barWidth = 40 * width / 300;
 
 
    /*
      Utility methods 
    */
    percToDeg = function (perc) {
        return perc * 360;
    };
 
    percToRad = function (perc) {
        return degToRad(percToDeg(perc));
    };
 
    degToRad = function (deg) {
        return deg * Math.PI / 180;
    };
 
    // Create SVG element
    svg = el.append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);
 
    // Add layer for the panel
    chart = svg.append('g').attr('transform', "translate(" + ((width + margin.left) / 2) + ", " + ((height + margin.top) / 2) + ")");
    chart.append('path').attr('class', "arc chart-filled");
    chart.append('path').attr('class', "arc chart-empty");
    chart.append('path').attr('class', "arc chart-target");
 
    targetText = chart.append("text")
                    .attr('id', "Value")
                    .attr("font-size", 16)
                    .attr("text-anchor", "middle")
                    .attr("dy", ".5em")
                    .style("fill", ' #69b3a2');
 
    actualText = chart.append('text')
                .attr('id', "Value")
                    .attr("font-size", 16)
                    .attr("text-anchor", "middle")
                    .attr("dy", ".5em")
                    .style("fill", ' #69b3a2')
                    .attr('class', 'needle').attr('cx', 0).attr('cy', 0).attr('r', this.radius);

    fullText = chart.append('text')
                .attr('id', "Value")
                    .attr("font-size", 16)
                    .attr("text-anchor", "middle")
                    .attr("dy", ".5em")
                    .style("fill", ' #69b3a2')
     
    labelText = chart.append('text')
                    .attr('id', "Value")
                        .attr("font-size", 18)
                        .attr("text-anchor", "middle")
                        .attr("dy", ".5em")
                        .style("fill", '#111111')


 
    formatValue = d3.format('1%');
 
    arc3 = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth)
    arc2 = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth)
    arc1 = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth)
 
    repaintGauge = function (actualPerc, targetPerc) {
         
        var next_start = totalPercent;
        arcStartRad = percToRad(next_start);
        arcEndRad = arcStartRad + percToRad(actualPerc / 2);
        next_start += actualPerc / 2;
 
        arc1.startAngle(arcStartRad).endAngle(arcEndRad);
 
        var next_start1 = totalPercent;
        arcStartRad = percToRad(next_start1);
        arcEndRad = arcStartRad + percToRad(targetPerc / 2);
        next_start1 += targetPerc / 2;
 
        arc3.startAngle(arcEndRad - padRad).endAngle(arcEndRad);
 
 
 
        arcStartRad = percToRad(next_start);
        arcEndRad = arcStartRad + percToRad((1 - actualPerc) / 2);
		// console.log("arcStart: " + arcStartRad);
		// console.log("arcEnd: " + arcEndRad);
        arc2.startAngle(arcStartRad).endAngle(arcEndRad);

        var fillColor = "#CD6660";
        if (actualPerc <= targetPerc) {
            fillColor = "#94BFF5";
        }
 
        chart.select(".chart-filled").style("fill", fillColor).attr('d', arc1);
        chart.select(".chart-empty").style("fill", "#D6E3DF").attr('d', arc2);
        chart.select(".chart-target").style('fill', '#69b3a2').attr('d', arc3);
 
    }
 
 
    var Needle = (function () {
        /** 
          * Helper function that returns the `d` value
          * for moving the needle
        **/
        var recalcPointerPos = function (perc) {
            var centerX, centerY, leftX, leftY, rightX, rightY, thetaRad, topX, topY;
            thetaRad = percToRad(perc / 2);
            centerX = 0;
            centerY = 0;
            console.log('recalc');
            topX = centerX - this.len * Math.cos(thetaRad);
            topY = centerY - this.len * Math.sin(thetaRad);
            leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2);
            leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2);
            rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2);
            rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2);
            return "M " + leftX + " " + leftY + " L " + topX + " " + topY + " L " + rightX + " " + rightY;
        };
 
        function Needle(el, site) {
            this.el = el;
            this.site = site;
            this.len = width / 3;
            this.radius = this.len / 6;
        }
 
        Needle.prototype.render = function () {
            return this.el;
        };
 
        Needle.prototype.moveTo = function (act, tgt, max, lbl) {
            var perc = act / max;
            var perc2 = tgt / max; 
                self,
                oldValue = this.perc || 0;
				console.log('label: ' + lbl);
            this.perc = perc;
            self = this;
            console.log('e1 before tween:: '+ JSON.stringify(el))
            // Reset pointer position
            this.el.transition().delay(100).ease('quad').duration(200).select('.needle').tween('reset-progress', function () {
                return function (percentOfPercent) {
                    var progress = (1 - percentOfPercent) * oldValue;
 
                    repaintGauge(progress, perc2);
                    return d3.select(this).attr('d', recalcPointerPos.call(self, progress));
                };
            });
            console.log('e1 before tween::: '+ JSON.stringify(el))
            this.el.transition().delay(300).ease('bounce').duration(1500).select('.needle').tween('progress', function () {
                return function (percentOfPercent) {
                    var progress = percentOfPercent * perc;
                     
                    repaintGauge(progress, perc2);
 
                    var thetaRad = percToRad(perc2 / 2);
                    var textX = -(self.len + 5) * Math.cos(thetaRad);
                    var textY = -(self.len + 5) * Math.sin(thetaRad);
                    var maxTextX = (self.len + 5);
                    var maxTextY = 0;
                    var lblTextX = 0;
                    var lblTextY = +20;
 
                    actualText.text(formatValue(act))
                     
 
                    targetText.text(formatValue(tgt))
                    .attr('transform', "translate(" + textX*1.1 + "," + textY + ")")

                    fullText.text(formatValue(max))
                    .attr('transform', "translate(" + maxTextX*1.1 + "," + maxTextY + ")")

                    labelText.text(lbl)
                    .attr('transform', "translate(" + lblTextX*1.1 + "," + lblTextY + ")")


 
                    return d3.select(this).attr('d', recalcPointerPos.call(self, progress));
                };
            });
 
        };
 
		return Needle;
		

 
    })();
 
    // needle = new Needle(chart);
    // needle.render();
 
	// needle.moveTo(percent);
	
	
 




 
