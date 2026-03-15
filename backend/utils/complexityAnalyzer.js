function analyzeComplexity(code){

let loops = (code.match(/for\s*\(/g) || []).length +
            (code.match(/while\s*\(/g) || []).length;

if(loops == 0){
return "O(1)"
}

if(loops == 1){
return "O(n)"
}

if(loops == 2){
return "O(n²)"
}

if(loops >= 3){
return "O(n³)"
}

}

module.exports = analyzeComplexity;