let historyList = [];

// Generate password
function generatePassword() {
  const length = document.getElementById("length").value;
  const upper = document.getElementById("uppercase").checked;
  const lower = document.getElementById("lowercase").checked;
  const number = document.getElementById("numbers").checked;
  const symbol = document.getElementById("symbols").checked;

  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()";

  let allChars = "";

  if (upper) allChars += upperChars;
  if (lower) allChars += lowerChars;
  if (number) allChars += numberChars;
  if (symbol) allChars += symbolChars;

  if (allChars === "") {
    alert("⚠️ Select at least one option!");
    return;
  }

  let password = "";

  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  document.getElementById("password").value = password;

  checkStrength(password);
  addToHistory(password);
}

// Copy function
function copyText(text) {
  navigator.clipboard.writeText(text);

  let popup = document.getElementById("popup");
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 1500);
}

// Copy button
document.getElementById("copyBtn").addEventListener("click", () => {
  let password = document.getElementById("password").value;
  if (password) copyText(password);
});

// Eye toggle
document.getElementById("toggleEye").addEventListener("click", () => {
  let input = document.getElementById("password");
  input.type = input.type === "password" ? "text" : "password";
});

// Strength checker
function checkStrength(password) {
  let bar = document.getElementById("strength-bar");
  let text = document.getElementById("strength-text");

  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 2) {
    bar.style.width = "30%";
    bar.style.background = "red";
    text.innerText = "Weak ⚠️";
    text.style.color = "red";
  } 
  else if (strength <= 4) {
    bar.style.width = "70%";
    bar.style.background = "orange";
    text.innerText = "Medium 👍";
    text.style.color = "orange";
  } 
  else {
    bar.style.width = "100%";
    bar.style.background = "green";
    text.innerText = "Strong 💪";
    text.style.color = "green";
  }
}

// History
function addToHistory(password) {
  historyList.unshift(password);

  if (historyList.length > 5) {
    historyList.pop();
  }

  let list = document.getElementById("historyList");
  list.innerHTML = "";

  historyList.forEach(pwd => {
    let li = document.createElement("li");
    li.textContent = pwd;

    // click to copy
    li.addEventListener("click", () => {
      copyText(pwd);
    });

    list.appendChild(li);
  });
}