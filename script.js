const form = document.querySelector("#user-form");
const table = document.querySelector("#user-table");
const userData = document.querySelector("#user-data");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const dobInput = document.querySelector("#dob");
const termsCheckbox = document.querySelector("#terms");

// Load data from web storage
const loadData = () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.password}</td>
      <td>${user.dob}</td>
      <td>${user.terms ? "Yes" : "No"}</td>
    `;
    userData.appendChild(row);
  });
};

// Save data to web storage
const saveData = (user) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

// Handle form submit event
const submitListener = (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const dob = dobInput.value.trim();
  const terms = termsCheckbox.checked;

  // Validate date of birth
  const today = new Date();
  const dobDate = new Date(dob);
  const age = today.getFullYear() - dobDate.getFullYear();
  if (age < 18 || age > 55) {
    alert("You must be between 18 and 55 years old to register.");
    return;
  }

  // Create new user object
  const user = {
    name,
    email,
    password,
    dob,
    terms,
  };

  // Save user to web storage and add to table
  saveData(user);
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.password}</td>
    <td>${user.dob}</td>
    <td>${user.terms ? "Yes" : "No"}</td>
  `;
  userData.appendChild(row);

  // Reset form
  form.reset();
};

// Load saved data on page load
loadData();