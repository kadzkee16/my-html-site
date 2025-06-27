function signupUser(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please fill all fields.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("spotify_users")) || [];

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    alert("Email already registered. Please log in.");
    return;
  }

  users.push({ email, password });
  localStorage.setItem("spotify_users", JSON.stringify(users));
  alert("Account created! You can now log in.");

  window.location.href = "login.html";
}
