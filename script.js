function showForm(eventName) {
  document.getElementById('eventName').value = eventName;
  document.getElementById('registrationForm').style.display = 'block';
}

function submitForm(e) {
  e.preventDefault();

  const name = document.getElementById('studentName').value;
  const email = document.getElementById('studentEmail').value;
  const event = document.getElementById('eventName').value;
  const studentClass = document.getElementById('studentClass').value;
  const studentYear = document.getElementById('studentYear').value;

  const registration = { name, email, event, studentClass, studentYear };
  let registrations = JSON.parse(localStorage.getItem('registrations')) || [];
  registrations.push(registration);
  localStorage.setItem('registrations', JSON.stringify(registrations));

  alert(`Thank you for registering, ${name}!`);
  document.getElementById('registrationForm').reset();
  document.getElementById('registrationForm').style.display = 'none';

  displayRegistrations();
  updateStats();
}

function displayRegistrations() {
  const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
  const tableBody = document.querySelector('#registrationTable tbody');
  tableBody.innerHTML = '';

  registrations.forEach(reg => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${reg.name}</td><td>${reg.email}</td><td>${reg.event}</td><td>${reg.studentClass}</td><td>${reg.studentYear}</td>`;
    tableBody.appendChild(row);
  });
}

function updateStats() {
  const registrations = JSON.parse(localStorage.getItem('registrations')) || [];

  const techTalkCount = registrations.filter(r => r.event === "Tech Talk: AI in 2025").length;
  const databricksCount = registrations.filter(r => r.event === "Azure Databricks Workshop").length;

  document.getElementById("registeredCount1").innerText = techTalkCount;
  document.getElementById("availableSeats1").innerText = 150 - techTalkCount;

  document.getElementById("registeredCount2").innerText = databricksCount;
  document.getElementById("availableSeats2").innerText = 150 - databricksCount;

  // Disable buttons if seats are full
  if (150 - techTalkCount <= 0) {
    document.querySelector("button[onclick=\"showForm('Tech Talk: AI in 2025')\"]").disabled = true;
    document.querySelector("button[onclick=\"showForm('Tech Talk: AI in 2025')\"]").innerText = "Fully Booked";
  }

  if (150 - databricksCount <= 0) {
    document.querySelector("button[onclick=\"showForm('Azure Databricks Workshop')\"]").disabled = true;
    document.querySelector("button[onclick=\"showForm('Azure Databricks Workshop')\"]").innerText = "Fully Booked";
  }
}

window.onload = function() {
  displayRegistrations();
  updateStats();
};
