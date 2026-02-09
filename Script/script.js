document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("infoForm");
  const tableBody = document.getElementById("table1");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); 

    if (!form.checkValidity()) return;

    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const status = document.getElementById("status").checked ? "On" : "Off";

   
    const emailsInTable = Array.from(tableBody.querySelectorAll("td:nth-child(3)")).map(td => td.textContent);
    if (emailsInTable.includes(email)) {
      alert("Error: This email already exists!");
      return; // stop execution
    }

    // Create new row
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${fname}</td>
      <td>${lname}</td>
      <td>${email}</td>
      <td>${password}</td>
      <td>${status}</td>
    `;

    tableBody.appendChild(row);
    form.reset(); // clear form
  });
});

