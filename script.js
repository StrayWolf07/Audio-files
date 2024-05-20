// Set the dimensions and margins of the graph
const width = window.innerWidth;
const height = window.innerHeight;

// Append the svg object to the body of the page
const svg = d3.select("#globe")
    .attr("width", width)
    .attr("height", height);

// Create a projection and path generator
const projection = d3.geoOrthographic()
    .scale(height / 2.1)
    .translate([width / 2, height / 2])
    .rotate([0, 0]);

const path = d3.geoPath()
    .projection(projection);

// Load the data and draw the globe
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(data) {
    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "#666") // Country fill color
        .attr("stroke", "#444") // Country border color
        .on("mouseover", function(event, d) {
            d3.select(this)
                .attr("fill", "#ff8c00"); // Change color on hover
        })
        .on("mouseout", function(d) {
            d3.select(this)
                .attr("fill", "#666"); // Restore original color on mouseout
        });

    // Add rotation interaction
    svg.call(d3.drag().on("drag", function(event) {
        const rotate = projection.rotate();
        const k = 1 / projection.scale();
        projection.rotate([rotate[0] + event.dx * k, rotate[1] - event.dy * k]);
        svg.selectAll("path").attr("d", path);
    }));
});

