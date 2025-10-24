// Wait for the page to load
document.addEventListener("DOMContentLoaded", () => {
  
  // Get the button and text areas from the HTML
  const checkButton = document.getElementById("check-button");
  const myText = document.getElementById("my-text");
  const output = document.getElementById("output");

  // Add a click listener to the button
  checkButton.addEventListener("click", () => {
    // Call our main AI function
    runProofreader();
  });

  async function runProofreader() {
    // 1. Check if the Proofreader API even exists in the browser
    if (!('Proofreader' in self)) {
      output.textContent = "Error: The Proofreader API is not supported in this browser.";
      return;
    }

    try {
      // 2. Create a new Proofreader instance
      const proofreader = await Proofreader.create();
      const text = myText.value;
      
      // 3. This is the main API call!
      // We ask it to find errors in our text
      const result = await proofreader.proofread(text);
      
      console.log(result); // Good for debugging
      
      // 4. Clear the old output and show the new results
      output.innerHTML = ""; // Clear previous results

      if (result.errors.length === 0) {
        output.textContent = "No mistakes found!";
      } else {
        // Loop through each error the AI found
        result.errors.forEach(error => {
          // Display the error and the suggestion
          output.innerHTML += `
            <p>
              <strong>Error:</strong> "${error.originalText}"<br>
              <strong>Suggestion:</strong> ${error.suggestions.join(", ")}
            </p>
          `;
        });
      }

    } catch (err) {
      // Handle any errors (like the model not being ready)
      output.textContent = `Error: ${err.message}`;
      console.error(err);
    }
  }
});
