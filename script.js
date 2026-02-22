// Add these conditions inside the existing sendMessage() function
if (lower.includes("storage") || lower.includes("spoil") || lower.includes("shelf")) {
  reply = "Demo AI: Based on current humidity (65%) and temperature (30°C), your stored grain has a low spoilage risk for 90 days. Keep the area ventilated.";
} else if (lower.includes("sell") || lower.includes("profit") || lower.includes("future price")) {
  reply = "Demo AI: Market trends show a 10% increase in demand for pulses next month. AI recommends holding your harvest for 3 more weeks to maximize profit.";
} else if (lower.includes("rotation") || lower.includes("next crop") || lower.includes("soil")) {
  reply = "Demo AI: To regenerate soil nitrogen after Paddy, I recommend planting Mung Bean or Clover. This reduces fertilizer cost by 15% for the next cycle.";
}
function previewImage(event) {
  const preview = document.getElementById('imagePreview');
  const container = document.getElementById('imagePreviewContainer');
  const file = event.target.files[0];

  if (file) {
    preview.src = URL.createObjectURL(file);
    container.style.display = 'block';
  }
}

function detectDisease() {
  const resultBox = document.getElementById('detectionResult');
  const diseaseName = document.getElementById('diseaseName');
  const treatmentList = document.getElementById('treatmentList');
  
  // Show the box and reset content
  resultBox.style.display = 'block';
  diseaseName.textContent = "Scanning Image...";
  treatmentList.innerHTML = "<li>Processing visual data...</li>";

  // Simulate AI delay
  setTimeout(() => {
    // Demo Logic: This would be replaced by a real AI API call
    const diseases = [
      {
        name: "Early Blight (Fungal Disease)",
        treatments: [
          "Apply copper-based fungicides.",
          "Remove and burn infected lower leaves to prevent spread.",
          "Avoid overhead watering to keep foliage dry."
        ]
      },
      {
        name: "Aphid Infestation (Pest)",
        treatments: [
          "Spray with Neem oil or insecticidal soap.",
          "Introduce natural predators like ladybugs.",
          "Use a strong stream of water to wash them off the leaves."
        ]
      }
    ];

    // Pick a random result for the demo
    const result = diseases[Math.floor(Math.random() * diseases.length)];
    
    diseaseName.textContent = result.name;
    treatmentList.innerHTML = result.treatments.map(t => `<li>${t}</li>`).join('');
    
    // Smooth scroll to result
    resultBox.scrollIntoView({ behavior: 'smooth' });
  }, 2000);
}
async function detectDisease() {
  const resultBox = document.getElementById('detectionResult');
  const diseaseName = document.getElementById('diseaseName');
  const treatmentList = document.getElementById('treatmentList');
  const fileInput = document.getElementById('leafUpload');
  
  if (!fileInput.files[0]) return;

  // UI feedback for the farmer
  resultBox.style.display = 'block';
  diseaseName.textContent = "AI is analyzing your leaf...";
  treatmentList.innerHTML = "<li>Scanning for spots, fungi, and pests...</li>";

  const formData = new FormData();
  formData.append('leafImage', fileInput.files[0]);

  try {
    // In a real setup, replace '/api/analyze-plant' with your actual backend URL
    const response = await fetch('/api/analyze-plant', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();

    // Displaying real results from the AI
    diseaseName.textContent = data.disease;
    diseaseName.style.color = "#2e7d32"; // Change to green if healthy, keep red if diseased
    
    treatmentList.innerHTML = data.solutions.map(step => `<li>${step}</li>`).join('');

  } catch (error) {
    // Graceful fallback for the demo if the server isn't live yet
    diseaseName.textContent = "Analysis Complete (Simulation)";
    treatmentList.innerHTML = `
      <li><strong>Diagnosis:</strong> Possible Leaf Blast detected.</li>
      <li><strong>Chemical Solution:</strong> Spray Carbendazim 50 WP @ 2g/liter.</li>
      <li><strong>Organic Solution:</strong> Apply 5% Neem Seed Kernel Extract.</li>
    `;
  }
}