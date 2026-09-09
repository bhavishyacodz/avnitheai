const commandInput = document.getElementById("command");
const executeButton = document.getElementById("execute");
const output = document.getElementById("output");
const status = document.getElementById("status");

async function checkHealth() {
  try {
    const response = await fetch("/api/health");
    const data = await response.json();

    if (data.ok) {
      status.textContent = "Online";
      status.classList.add("online");
    }
  } catch {
    status.textContent = "Offline";
  }
}

async function executeCommand() {
  const command = commandInput.value.trim();

  if (!command) {
    output.textContent = "Enter a command first.";
    return;
  }

  executeButton.disabled = true;
  executeButton.textContent = "Executing...";

  output.textContent = "Sending command...";

  try {
    const response = await fetch("/api/command", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ command })
    });

    const data = await response.json();

    output.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    output.textContent = `Error: ${error.message}`;
  } finally {
    executeButton.disabled = false;
    executeButton.textContent = "Execute";
  }
}

executeButton.addEventListener("click", executeCommand);

commandInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.ctrlKey) {
    executeCommand();
  }
});

checkHealth();