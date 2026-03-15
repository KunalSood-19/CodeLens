const analyzeCode = require("../utils/codeAnalyzer");
const fs = require("fs");

const reviewCode = async (req, res) => {

 const code = req.body.code;

 if (!code) {
  return res.status(400).json({ message: "No code provided" });
 }

 try {

  const result = analyzeCode(code);

  let aiSuggestions = [];

  if (code.includes("for(") && code.includes("for(")) {
   aiSuggestions.push("Nested loops detected. Consider optimizing algorithm.");
  }

  if (code.includes("int i")) {
   aiSuggestions.push("Use more descriptive variable names instead of 'i'.");
  }

  if (!code.includes("//")) {
   aiSuggestions.push("Add comments to improve code readability.");
  }

  if (code.length > 200) {
   aiSuggestions.push("Consider breaking large code blocks into functions.");
  }

  res.json({
   ...result,
   aiReview: aiSuggestions
  });

 } catch (error) {

  console.error(error);

  res.status(500).json({
   error: "Code review failed"
  });

 }

};

const uploadCodeFile = (req, res) => {

 if (!req.file) {
  return res.status(400).json({ message: "No file uploaded" });
 }

 try {

  const code = fs.readFileSync(req.file.path, "utf8");

  const result = analyzeCode(code);

  res.json(result);

 } catch (error) {

  console.error(error);
  res.status(500).json({ error: "File processing error" });

 }

};

module.exports = { reviewCode, uploadCodeFile };