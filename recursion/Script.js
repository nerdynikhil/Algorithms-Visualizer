
let SVGht = 1000;
let SVGwd = 1000;

let maxChildren = 0;


function clear() {
    tree = [];
    st = [];
    i = 0;
    ans = 0;
    maxChildren = 0;
    radius = 0;
    strokeWidth = 0;
    calls = 0;
    canvas.selectAll("*").remove();
    $("#ansspan").remove();
    $(".memo-txt").remove();
    running = false;
    $(".stack").html("");
}    

function RecursionException(message) {
    this.name = "RecursionException";
    this.message = message;

    alert(this.message);
}    


selectedCode = codeSelector.value;

$(".code-selector").click(function () {
    selectedCode = codeSelector.value;
    addArgumentBox(selectedCode);
});

function addArgumentBox(selectedCode) {
    if (selectedCode == "Fibonacci") {
        let argBox = $(`<div class="arguments-input">
                            <label for="args">Enter value of n</label><br />
                            <input id="args" />
                        </div>`);

        $(".arguments-input").remove();
        $(".code-container").prepend(argBox);
    }

    else if (selectedCode == "Factorial") {
        let argBox = $(`<div class="arguments-input">
                            <label for="args">Enter value of n</label><br />
                            <input id="args" />
                        </div>`);

        $(".arguments-input").remove();
        $(".code-container").prepend(argBox);
    }

    else if (selectedCode == "Binomial Coefficient") {
        let argBox1 = $(`<div class="arguments-input">
                            <label for="args">Enter value of n</label><br />
                            <input id="args" />
                        </div>`);
        let argBox2 = $(`<div class="arguments-input">
                            <label for="args2">Enter value of k</label><br />
                            <input id="args2" />
                        </div>`);

        $(".arguments-input").remove();
        $(".code-container").prepend(argBox2);
        $(".code-container").prepend(argBox1);
    }

    else if (selectedCode == "Coin Change") {
        let argBox1 = $(`<div class="arguments-input">
                            <label for="args">Enter value of target</label><br />
                            <input id="args" />
                        </div>`);
        let argBox2 = $(`<div class="arguments-input">
                            <label for="args2">Enter size of array</label><br />
                            <input id="args2" />
                        </div>`);
        let argBox3 = $(`<div class="arguments-input">
                            <label for="args3">Enter the Array</label><br />
                            <input id="args3" />
                        </div>`);

        $(".arguments-input").remove();
        $(".code-container").prepend(argBox3);
        $(".code-container").prepend(argBox2);
        $(".code-container").prepend(argBox1);
    }

}



var tree = [];
var st = [];
var i = 0;
let ans = 0;



let run = document.querySelector(".run");
let stop = document.querySelector(".stop");


$(".run").click(function () {

    try {
        console.log("RUN");
        console.log(selectedCode);

        if (running) {
            // clear();
            $(".stop").click();
            running = false;
            setTimeout(() => { $(".run").click() }, 500);
        }
        else {
            clear();
            runCode(selectedCode).then(async function () {

                console.log("PAR");
                tree[0].par = -1;

                console.log("Finding all Depths");
                dfs(0);

                console.log(tree);

                console.log("Calcpos");
                calcPosition();

                radius = 45 / maxChildren;
                strokeWidth = 10 / maxChildren;

                var group = canvas.append("g").attr("transform", "translate(100, 100)");
                var demoCircle = group.append("circle")
                    .attr("class", "circle")
                    .attr("cx", tree[0].cx + 200)
                    .attr("cy", tree[0].cy)
                    .attr("r", radius + 6)
                    .attr("fill", "black")
                var innerCircle = group.append("circle")
                    .attr("class", "circle")
                    .attr("cx", tree[0].cx + 200)
                    .attr("cy", tree[0].cy)
                    .attr("r", radius)
                    .attr("fill", "#2fc702")

                let demotxt = $(`<span class="memo-txt"> => Repeated Node (Memoization Possible)</span>`)
                demotxt.css({ "position": "absolute", "font-weight": "bold" });
                demotxt.offset({ left: tree[0].cx + 400, top: tree[0].cy - 20 });
                $("body").append(demotxt);

                await visualize();

                let ansSpan = $(`<span id="ansspan"> Answer = ${ans} </span>`)
                ansSpan.css({ "position": "absolute", "color": "green", "font-weight": "bold" });
                ansSpan.offset({ left: tree[0].cx + 80, top: tree[0].cy - 20 });
                $("body").append(ansSpan);


                run.innerText = "Visualize";
                running = false;

            }).catch(function (err) {
                alert(err);
                return;
            });
        }
    }
    catch (err) {
        alert(err);
    }
});

async function runCode(selectedCode) {
    return new Promise(function (resolve, reject) {

        if (selectedCode == "Fibonacci") {
            let input = document.querySelector("#args");
            n = parseInt(input.value);
            console.log(n);
            console.log(selectedCode);

            if (n == undefined || n == "" || n == null || isNaN(n))
                return reject("Add an Argument please");

            fibo(n)
        }

        else if (selectedCode == "Factorial") {
            let input = document.querySelector("#args");
            n = parseInt(input.value);
            console.log(n);
            console.log(selectedCode);

            if (n == undefined || n == "" || n == null || isNaN(n))
                return reject("Add an Argument please");

            fact(n);
        }
        else if (selectedCode == "Binomial Coefficient") {
            let input1 = document.querySelector("#args");
            n = parseInt(input1.value);
            let input2 = document.querySelector("#args2");
            let k = parseInt(input2.value);

            if (n == undefined || n == "" || n == null || isNaN(n) || k == undefined || k == "" || k == null || isNaN(k)) {
                reject("Add all Argument please");
                return;
            }

            bincof(n, k);
        }
        else if (selectedCode == "Coin Change") {
            let input1 = document.querySelector("#args");
            n = parseInt(input1.value);
            let input2 = document.querySelector("#args2");
            let k = parseInt(input2.value);
            let input3 = document.querySelector("#args3");
            let arr = JSON.parse(input3.value);
            if (n == undefined || n == "" || n == null || isNaN(n) || k == undefined || k == "" || k == null || isNaN(k) || arr == undefined || arr == "" || arr == null) {
                reject("Add all Argument please");
                return;
            }
            coin_change(arr, k, n);
        }

        resolve();
    });
}





// Constructing Tree ==========================================================================


function dfs(u) {
    tree[u].depth = getDepth(u);
    let childrencnt = 0;
    for (let v of tree[u].children) {
        dfs(v);
        childrencnt++;
    }
    maxChildren = Math.max(maxChildren, childrencnt);
}



function getDepth(vertexNum) {
    if (tree[vertexNum].par == -1)
        return 0;
    return getDepth(tree[vertexNum].par) + 1;
}


function calcPosition() {
    let leaves = 0, leafProcessed = 0;
    let maxdep = 0;
    for (let i = 0; i < tree.length; i++) {
        if (tree[i].children.length == 0)
            leaves++;
        maxdep = Math.max(maxdep, tree[i].depth);
    }

    makePoints(0);
    function makePoints(vertexNum) {
        if (maxdep == 0)
            tree[vertexNum].cy = 1 / 2 * (SVGht - 400) + 50;
        else tree[vertexNum].cy = (tree[vertexNum].depth / maxdep) * (SVGht - 400) + 50;

        let childSize = tree[vertexNum].children.length;
        if (childSize == 0) {
            tree[vertexNum].cx = (++leafProcessed / (leaves + 1)) * (SVGwd - 100) + 50;
            return { sumx: tree[vertexNum].cx, subcnt: 1 };
        }
        else {
            var sumx = 0;
            var subcnt = 0;
            for (let i = 0; i < childSize; i++) {
                let child = tree[vertexNum].children[i];
                makePoints(child);

                sumx += tree[child].cx;
                subcnt++;
            }
            tree[vertexNum].cx = (sumx / subcnt);
            return { sumx: sumx, subcnt: subcnt };
        }
    }
}



let running = false;

async function visualize() {
    return new Promise(async function (resolve, reject) {
        if (running == true) {
            run.innerText = "Visualize";
            running = false;
            console.log(running);
            $("#args").click();
        }

        else if (running == false) {
            $(".text").fadeOut(20)
            run.innerText = "Reset";
            running = true;

            await appendTree(0);
        }
        return resolve();
    });
}

stop.addEventListener("click", function () {
    run.innerText = "Visualize";
    running = false;
    clear();
});

