

var canvas = d3.select(".viz")
    .append("svg")
    .attr("viewBox", [100, 100, SVGwd, SVGht]);
// .attr("width", SVGwd)
// .attr("height", SVGht);


let slider = document.querySelector(".slider");
let speed = slider.value;
slider.oninput = function () {
    speed = this.value;
    if (this.value == 0)
        speed = 1;
}
console.log(speed);


let radius;
let strokeWidth;

var lastchild = null;
var lasti = -1;

async function addPath(child, vertexNum) {

    return new Promise(
        function (resolve, reject) {
            if(speed == 0)
                exit(1);
            let data = [{ cx: tree[vertexNum].cx, cy: tree[vertexNum].cy },
            { cx: tree[child].cx, cy: tree[child].cy }];

            var group = canvas.append("g").attr("transform", "translate(100, 100)");

            var path = group.append("path")
                .datum(data)
                .attr("stroke", "black")
                .attr("stroke-width", strokeWidth)
                .attr("d", d3.line()
                    .x(function (data) { return data.cx; })
                    .y(function (data) { return data.cy; }))

            let length = Math.sqrt(((data[0].cx) * (data[0].cx)) + ((data[1].cy) * (data[1].cy)));



            var marker = group.append("svg:defs").append("svg:marker")
                .attr("id", "arrow")
                .attr("refX", 2)
                .attr("refY", 6)
                .attr("markerWidth", 200)
                .attr("markerHeight", 200)
                .attr("orient", "auto")
                .attr("markerUnits", "userSpaceOnUse")
                .append("svg:path")
                .attr("d", "M2,2 L2,11 L10,6 L2,2")
                .style("fill", "#000");

            let animatePath = path.attr("stroke-dasharray", length + " " + length)
                .attr("stroke-dashoffset", length)
                .transition()
                .ease(d3.easeLinear)
                .attr("stroke-dashoffset", 0)
                .duration(50000 / speed)
                .attr("marker-end", "url(#arrow)")



            setTimeout(() => { resolve() }, 20000 / speed);
        }
    );
}

let stack = document.querySelector(".stack");

async function addCircle(vertexNum) {
    return new Promise(function (resolve, reject) {

        if(speed == 0)
            exit(1);
        
        let nodeDiv = document.createElement("div");
        nodeDiv.classList.add("stack-element");
        nodeDiv.innerText = `fun(${tree[vertexNum].arg})`;
        stack.prepend(nodeDiv);

        var group = canvas.append("g").attr("transform", "translate(100, 100)");
        var outerCircle = group.append("circle")
            .attr("class", "circle")
            .attr("cx", tree[vertexNum].cx)
            .attr("cy", tree[vertexNum].cy)
            .attr("r", radius + 6)
            .attr("fill", "black")
        var innerCircle = group.append("circle")
            .attr("class", "circle")
            .attr("cx", tree[vertexNum].cx)
            .attr("cy", tree[vertexNum].cy)
            .attr("r", radius)
            .attr("fill", "white")

        if (tree[vertexNum].memo == true)
            innerCircle.transition()
                .delay(50)
                .attr("fill", "#2fc702");


        var text = group.append("text")
            .attr("x", tree[vertexNum].cx)
            .attr("y", tree[vertexNum].cy + 8)
            .text(tree[vertexNum].arg)
            .attr("text-anchor", "middle")
            .style("font", `${5 * radius / 3}px times`)
            .attr("fill", "steelblue")
            .attr("font-weight", "bold")
        // .attr("z-index", 2);

        setTimeout(() => { resolve() }, 1 / speed);
        // resolve();
    });
}

async function appendTree(vertexNum) {

    return new Promise(async function (resolve, reject) {

        await addCircle(vertexNum);

        traverse(0);
        async function traverse(i) {
            if (speed == 0) {
                lasti = i;
                lastchild = vertexNum;
                exit(1);
            }

            if (i == tree[vertexNum].children.length)
                return resolve();

            let child = tree[vertexNum].children[i];

            await addPath(child, vertexNum);
            await appendTree(child);

            var group = canvas.append("g").attr("transform", "translate(100, 100)");

            var edgewt = group.append("text")
                .attr("x", (tree[vertexNum].cx + tree[child].cx) / 2)
                .attr("y", ((tree[vertexNum].cy + tree[child].cy) / 2) - 5)
                .text(tree[child].result)
                .attr("text-anchor", "middle")
                .attr("fill", "red")
                .style("font", `${4 * radius / 3}px times`)
                .style("font-weight", "bold")
                .style("opacity", "0")
                .transition()
                .delay(100 / speed)
                .ease(d3.easeLinear)
                .style("opacity", "1");
            await traverse(i + 1);
            stack.firstChild.remove();
        }
    });
}
