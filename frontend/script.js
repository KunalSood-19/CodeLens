let editor;
let chart;

/* CREATE EDITOR */

editor = CodeMirror(document.getElementById("editor"), {
 value: "// Paste code here",
 mode: "javascript",
 lineNumbers: true,
 theme: "default"
});


/* FILE UPLOAD */

document.getElementById("fileInput").addEventListener("change", function () {

 const file = this.files[0];
 if (!file) return;

 const reader = new FileReader();

 reader.onload = function (e) {
  editor.setValue(e.target.result);
 };

 reader.readAsText(file);

});


/* ANALYZE CODE */

async function analyzeCode(){

 const code = editor.getValue();

 if(!code.trim()){
  alert("Paste some code first");
  return;
 }

 document.getElementById("resultsPanel").style.display = "block";

 /* Lines Counter */
 const lines = code.split("\n").length;
 document.getElementById("loc").innerText = lines;

 /* Loop Counter */
 const loops = (code.match(/for|while|do/g) || []).length;
 document.getElementById("loops").innerText = loops;

 try {

  const response = await fetch("http://localhost:5000/api/review",{
   method:"POST",
   headers:{
    "Content-Type":"application/json"
   },
   body:JSON.stringify({code})
  });

  if(!response.ok) throw new Error("Server error");

  const data = await response.json();

  const language = data.language || "Unknown";
  const complexity = data.complexity || "O(1)";
  const score = data.score || 0;

  document.getElementById("language").innerText = language;
  document.getElementById("complexity").innerText = complexity;
  document.getElementById("score").innerText = score;

  /* Suggestions */

  const suggestions = document.getElementById("suggestions");
  suggestions.innerHTML = "";

  if(Array.isArray(data.suggestions)){
   data.suggestions.forEach(s=>{
    const li=document.createElement("li");
    li.innerText=s;
    suggestions.appendChild(li);
   });
  }

  /* AI Review */

  const aiReview=document.getElementById("aiReview");
  aiReview.innerHTML="";

  if(Array.isArray(data.aiReview)){
   data.aiReview.forEach(s=>{
    const li=document.createElement("li");
    li.innerText=s;
    aiReview.appendChild(li);
   });
  }

  createChart(score);

 } catch(err){

  console.error(err);
  alert("Backend connection failed");

 }

}

/* CHART */

function createChart(score) {

 const ctx = document.getElementById("scoreChart");

 if (!ctx) return;

 if (chart) chart.destroy();

 let color = "#00ff88";

 if (score < 70) color = "#ff9800";
 if (score < 50) color = "#ff4d4d";

 chart = new Chart(ctx, {

  type: "doughnut",

  data: {

   labels: ["Code Quality", "Remaining"],

   datasets: [{

    data: [score, 100 - score],

    backgroundColor: [color, "#444"]

   }]

  },

  options: {

   plugins: { legend: { display: false } },

   cutout: "70%"

  }

 });

}


/* COPY CODE */

function copyCode() {

 const code = editor.getValue();

 navigator.clipboard.writeText(code);

 alert("Code copied!");

}


/* DOWNLOAD CODE */

function downloadCode() {

 const code = editor.getValue();

 const blob = new Blob([code], { type: "text/plain" });

 const link = document.createElement("a");

 link.href = URL.createObjectURL(blob);
 link.download = "code.txt";

 link.click();

}


/* DOWNLOAD PDF REPORT */

function downloadReport() {

 const { jsPDF } = window.jspdf;

 const doc = new jsPDF();

 const language = document.getElementById("language").innerText;
 const complexity = document.getElementById("complexity").innerText;
 const score = document.getElementById("score").innerText;
 const lines = document.getElementById("loc").innerText;
 const loops = document.getElementById("loops").innerText;

 doc.setFillColor(2, 132, 199);
 doc.rect(0, 0, 210, 20, "F");

 doc.setTextColor(255, 255, 255);
 doc.setFontSize(18);
 doc.text("AI Code Review Report", 105, 13, null, null, "center");

 doc.setTextColor(0, 0, 0);
 doc.setFontSize(14);
 doc.text("Code Analysis Summary", 20, 35);

 doc.setFontSize(12);

 doc.text(`Language: ${language}`, 20, 45);
 doc.text(`Time Complexity: ${complexity}`, 20, 52);
 doc.text(`Quality Score: ${score}/100`, 20, 59);
 doc.text(`Lines of Code: ${lines}`, 20, 66);
 doc.text(`Loops Used: ${loops}`, 20, 73);

 doc.save("AI_Code_Review_Report.pdf");

}