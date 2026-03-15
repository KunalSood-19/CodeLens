function analyzeCode(code){

 let language = "Unknown";

 if(code.includes("#include"))
  language = "C++";

 else if(code.includes("System.out.println"))
  language = "Java";

 else if(code.includes("def "))
  language = "Python";

 else if(code.includes("<html"))
  language = "HTML";


 /* LOOP DETECTION */

 const loops = (code.match(/for|while|do/g) || []).length;


 /* COMPLEXITY */

 let complexity = "O(1)";

 if(loops === 1)
  complexity = "O(n)";

 else if(loops === 2)
  complexity = "O(n²)";

 else if(loops >= 3)
  complexity = "O(n³)";


 /* SCORE */

 let score = 100;

 if(loops >= 2) score -= 10;
 if(!code.includes("//")) score -= 5;
 if(code.length > 200) score -= 5;

 if(score < 50) score = 50;


 /* AI REVIEW */

 let aiReview = [];

 if(loops >= 2)
  aiReview.push("Nested loops detected. Consider optimizing algorithm.");

 if(!code.includes("//"))
  aiReview.push("Add comments to improve code readability.");

 if(code.includes("int i") || code.includes("int j"))
  aiReview.push("Use more descriptive variable names instead of 'i' or 'j'.");

 if(aiReview.length === 0)
  aiReview.push("Code structure looks good.");


 return {
  language,
  complexity,
  score,
  suggestions:["Consider improving variable naming"],
  aiReview
 };

}

module.exports = analyzeCode;