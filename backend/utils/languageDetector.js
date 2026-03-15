function detectLanguage(code) {

 if (code.includes("#include") || code.includes("printf") || code.includes("scanf")) {
  return "C/C++";
 }

 else if (code.includes("public static void main") || code.includes("System.out.println")) {
  return "Java";
 }

 else if (code.includes("def ") || code.includes("print(")) {
  return "Python";
 }

 else if (code.includes("console.log") || code.includes("function(") || code.includes("=>")) {
  return "JavaScript";
 }

 else if (code.includes("<html") || code.includes("<body") || code.includes("<div")) {
  return "HTML";
 }

 else if (code.includes("SELECT") || code.includes("FROM") || code.includes("WHERE")) {
  return "SQL";
 }

 else {
  return "Unknown";
 }

}