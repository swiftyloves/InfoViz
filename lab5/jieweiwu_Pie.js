//Part 1 function to draw pie charts 
function drawPie(salaryData, projectList, pieSvg) {

    /////STEP1.1 set up grid layout for pie charts///
    //1. determine the width of each sub chart. 
    // subChartHorizontalN is the number of sub chart in a row
    var subChartWidth = (svgWidth) / subChartHorizontalN;
    //2. determine how many rows we need to have for our dataset. 
    //   (e.g, subChartVerticalN=5 if salaryData.length=50 and subChartHorizontalN=10 )
    var subChartVerticalN = Math.ceil(salaryData.length / subChartHorizontalN);
    //3. determine the height of each subchart 
    var subChartHeight = Math.ceil((svgHeight) / subChartVerticalN);

    //4. create a list to store the xlocation of each pie chart
    //We store these because for each row, the x locations are fixed (e.g.if you have 10 pies in a row, you only have 10 possible x locations).
    //You can calculate this just using the index of the data.
    var xCoordinates = [];
    for (var i = 0; i < subChartHorizontalN; i++) {
        xCoordinates.push((i % subChartHorizontalN) * subChartWidth + subChartWidth / 2);
    }
    //5. determine radius. 
    //because a pie needs to fit in a subChart, we take the min value for subChartHeight,subChartWidth and divide by 2
    //we minus pieOffset so that we have spaces for texts.
    var pieOffset = 10;
    var radius = Math.min(subChartHeight, subChartWidth) / 2 - pieOffset;


    var colorScale = d3.scale.category20();

    //STEP 1.2
    var arc = d3.svg.arc()
        .outerRadius(radius)//YOUR WORK HERE
        .innerRadius(0);//YOUR WORK HERE
    //uncomment and complete lines above
    
    //STEP 1.5
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (d, i) {
            return "<strong>" + projectList[i] + "</strong> <span style='color:red'>" + d.value + "</span>";//your work here
        });
    //STEP 1.3 plotOneChart
    var pie = d3.layout.pie();
    for (var idx in salaryData) {

        var aPieChart = pieSvg.append('g')//create a group for each pie
            .attr("class", "pie" + idx);
        //gather data for each pie 
        var employee = salaryData[idx];
        var dataset = [employee.salaryA, employee.salaryB, employee.salaryC, employee.salaryD];

        //determine the location of the pie chart in grid style 
        var cx = xCoordinates[idx % subChartHorizontalN];
        var cy = (subChartHeight / 2 + Math.floor(idx / subChartHorizontalN) * subChartHeight);
        //draw arcs 
        var arcs = aPieChart.selectAll(".arc")
            .data(pie(dataset))//pie is the d3.layout.pie function 
            .enter()
            .append("path")
            .attr("class", "arc")
            .attr("d", arc)
            .attr("transform", "translate(" + cx + " " + cy + ")")
            .style("fill", function (d, i) {
                return colorScale(i)
            });
        //append text 
        aPieChart.append("text")
            .text(salaryData[idx].name)
            .attr("x", cx)
            .attr("y", (Math.floor(idx / subChartHorizontalN) * subChartHeight) + subChartHeight)//your work here //set the title on the bottom of the subchart.
            .style("text-anchor", "middle")
            .style("font-size", "14px");
        //add tips  
        aPieChart.call(tip);
        aPieChart.selectAll("path")
            .on('mouseover', function (d, i) {
                tip.show
            })
            .on('mousemove', tip.show)
            .on('mouseout', tip.hide)
    }
    return colorScale//returned for part 3
};

