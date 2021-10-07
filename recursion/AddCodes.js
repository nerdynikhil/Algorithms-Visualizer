
let body = document.querySelector("body");
let codeContainer = document.querySelector(".code");
let codeSelector = document.querySelector(".code-selector");

let selectedCode = codeSelector.value;
setCode(selectedCode)

$(".code-selector").click(function () {
    selectedCode = this.value;
    setCode(selectedCode)
});

function setCode(selectedCode) {
    var code = document.createElement("pre");

    if (selectedCode == "Fibonacci") {
        code.innerText =
`function fun(n)
{
    if(n <= 1)
        return n;
    else 
        fun(n-1) + fun(n-2);
}`
    }
    else if (selectedCode == "Factorial") {
        code.innerText =
`function fun(n)
{
    if(n <= 1)
        return n;
    else 
        n*fun(n-1);
}`
    }
    else if (selectedCode == "Binomial Coefficient") {
        code.innerText =
`function fun(n, k)
{
    if (k == 0 || k == n)
        return 1;
    else
        return fun(n-1, k-1) 
        + fun(n-1, k);
    }
}`
    }
    else if(selectedCode == "Coin Change")
    {
        code.innerText = `function fun(size, target)
{
    if (target == 0)
        return 1;
        
    if (target < 0)
        return 0;
    
    if (size <= 0 && target >= 1)
        return 0;
    
    return fun(size - 1, target) 
    + fun(size, n - coins[size - 1]);
}
    `
    }

    codeContainer.innerText = "";
    codeContainer.append(code);
}