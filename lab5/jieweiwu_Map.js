//Part 2 Plot Map

function drawMap(us, salaryData, mapSvg) {
    //STEP 2.1 draw us map
    var path = d3.geo.path();
    var states = mapSvg.append('g')
        .attr("class", "states")
        .append("path")
        .datum(topojson.feature(us, us.objects.states))//use datum because we want a single path instead of multiple paths.
        .attr("d", path);

    //STEP 2.2 organize the dataset for map drawing
    var stateSalary = createDataForEachState(salaryData, stateCoordinates);
    var totalSalaryRange = findTotalSalaryRange(stateSalary.features);
    var dotRadiusRange = {min: 10, max: 40};

    var dotColorScale = d3.scale.linear()
        .domain([totalSalaryRange.min, totalSalaryRange.average, totalSalaryRange.max])
        .range(["red", "white", "green"]);
    //STEP 2.3

    var dotRadiusScale = d3.scale.linear()
        .domain([totalSalaryRange.min, totalSalaryRange.max])//your work here
        .range([dotRadiusRange.min, dotRadiusRange.max]);//your work here

    //STEP 2.4 and STEP 2.5
    var symbols = mapSvg.append('g')
        .selectAll(".symbol")
        .data(stateSalary.features)
        .enter()
        .append("path")
        .attr("class", "symbol")
        .attr("d", path.pointRadius(function (d) {
            var totalS = d.properties.totalSalary;
            //step 2.5
            // your work here (update the next line)
            return dotRadiusScale(totalS / d.properties.employees.length);
        }))
        .style("fill", function (d, i) {
            var totalS = d.properties.totalSalary;
            //step 2.5
            // your work here (update the next line)
            return dotColorScale(totalS / d.properties.employees.length);   
        });


    return symbols
}

