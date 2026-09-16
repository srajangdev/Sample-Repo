async function explainCode() {
	const codeInput = document.getElementById("code");
	const output = document.getElementById("output");

	if (!codeInput || !output) {
		return;
	}

	const code = codeInput.value.trim();

	if (!code) {
		output.textContent = "Paste some JavaScript code to explain.";
		return;
	}

	output.textContent = "Explaining code... Please wait.";

	try {
		const response = await fetch("/explain", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ code })
		});

		if (!response.ok) {
			throw new Error(`Request failed with status ${response.status}`);
		}

		const data = await response.json();
		output.textContent = data.explanation || "No explanation was returned.";
	} catch (error) {
		output.textContent = "Unable to explain the code. Please try again.";
		console.error(error);
	}
}
