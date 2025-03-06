
/////////////////// page4a: Pie Chart //////////////////////////
const pieUrl = "https://api.sheety.co/9cd1eec4d95b2275d6100039175039f2/mockData/network";
d3.json(pieUrl).then(data=>{
    console.log(data.network)
    const pieData = data.network;  //verify in the console the data is loaded

// Create colorScales for the pie Chart
//Each of the section/slice will have different color
const color = d3.scaleOrdinal(d3.schemeSet2);

const pieWidth = 500;
const pieHeight = 500;
const pieRadius = Math.min(pieWidth, pieHeight)/2 - 20; // 20 is the padding

//Create an SVG element
//Create an SVG element with the id of pie-chart
//Set the width and height of the svg element with the piewidth and pieheight
//Append a group element to the svg element
//Translate the group element to the center of the svg element [center of the circle]
const svg = d3.select("#pie-chart")
.attr("width", pieWidth)
.attr("height", pieHeight)
.append("g")
.attr("transform",`translate(${pieWidth/2}, ${pieHeight/2})`);

//create the pie function
const pie = d3.pie().value(d => d.value) //d.value is the value of the data [stocks]

//Create the arc generator
const arc = d3.arc().innerRadius(0).outerRadius(pieRadius)

//create expanded arc generator for hover effect
const arcHover = d3.arc().innerRadius(0).outerRadius(pieRadius + 10)

//Draw the Pie Charts

// Bind data to pie chart (page 278)
//Select all or create <path> elements inside the svg element
//Based on the data given in pieData
const slices = svg.selectAll("path")
    .data(pie(pieData))
    .enter()
    .append("path")
    .attr("d", arc)   //d is the path attribute
    .attr("fill", (d, i) => color(i))   //The color is based on the colorScale
    .attr("stroke", "#fff")
    .style("stroke-width", "2px")

    .style("cursor","pointer")
    .on("mouseover", function(event, data) { 
        d3.select(this)
        .transition()
        .duration(1000)
        .attr("d", arcHover)
    //show the tooltip
        d3.select("#tooltip")
        .style("display", "block")   
        .style("left", (event.pageX + 10) + "px")  //position the tooltip
        .style("top", (event.pageY - 10) + "px")   //position the tooltip
        .html(`Network: ${data.data.producttype} <br/> Storage: ${data.data.value}`)
    })
    .on("mouseout", function(event, data) { 
        d3.select(this)
        .transition()
        .duration(1000)
        .attr("d", arc)
        //Hide back the tooltip
        d3.select("#tooltip")
        .style("display","none") 
    })

})