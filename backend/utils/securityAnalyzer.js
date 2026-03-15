function analyzeSecurity(code){

let issues = [];

if(code.includes("eval(")){
issues.push("Avoid using eval() as it can cause security vulnerabilities");
}

if(code.includes("password =")){
issues.push("Hardcoded password detected");
}

if(code.includes("SELECT * FROM")){
issues.push("Possible SQL query detected. Use parameterized queries");
}

if(code.includes("console.log")){
issues.push("Remove console.log in production code");
}

return issues;

}

module.exports = analyzeSecurity;