document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("infoForm");
  const tableBody = document.getElementById("table1");

  // ✅ Load and display all users
  async function loadUsers() {
    try {
      const response = await fetch("http://localhost:3030/users");
      const users = await response.json();

      tableBody.innerHTML = ""; // Clear table

      users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>
            <button class="edit-btn" data-id="${user.id}">Edit</button>
            <button class="delete-btn" data-id="${user.id}">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });

      // ✅ Attach event listeners to buttons
      attachButtonListeners();

    } catch (error) {
      console.error("Error loading users:", error);
    }
  }

  // ✅ Attach Edit and Delete listeners
  function attachButtonListeners() {
    // Delete buttons
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", deleteUser);
    });

    // Edit buttons
    document.querySelectorAll(".edit-btn").forEach(btn => {
      btn.addEventListener("click", editUser);
    });
  }

  // ✅ Delete user (no popup)
  async function deleteUser(e) {
    const userId = e.target.getAttribute("data-id");

    try {
      const response = await fetch(`http://localhost:3030/users/${userId}`, {
        method: "DELETE"
      });

      if (response.ok) {
        loadUsers(); // Reload table
      }

    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  // ✅ Edit user (no popup)
  async function editUser(e) {
    const userId = e.target.getAttribute("data-id");

    try {
      const response = await fetch(`http://localhost:3030/users/${userId}`);
      const user = await response.json();

      // Split name into first and last
      const nameParts = user.name.split(" ");
      const fname = nameParts[0] || "";
      
      // Fill form with user data
      document.getElementById("fname").value = fname;
      document.getElementById("email").value = user.email;

      // Change submit button to update mode
      const submitBtn = document.querySelector("input[type='submit']");
      submitBtn.value = "Update";
      submitBtn.setAttribute("data-edit-id", userId);

    } catch (error) {
      console.error("Error loading user:", error);
    }
  }

  // ✅ Load users when page opens
  loadUsers();

  // ✅ Handle form submission (Add OR Update)
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) return;

    const fname = document.getElementById("fname").value;
    const email = document.getElementById("email").value;
    const fullName = fname;

    const submitBtn = document.querySelector("input[type='submit']");
    const editId = submitBtn.getAttribute("data-edit-id");

    try {
      let response;

      if (editId) {
        // ✅ UPDATE existing user
        response = await fetch(`http://localhost:3030/users/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: fullName, email: email })
        });

        if (response.ok) {
          submitBtn.value = "Submit";
          submitBtn.removeAttribute("data-edit-id");
        }

      } else {
        // ✅ ADD new user
        response = await fetch("http://localhost:3030/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: fullName, email: email })
        });
      }

      if (response.ok) {
        loadUsers(); // Reload table
        form.reset();
      }

    } catch (error) {
      console.error("Error:", error);
    }
  });
});
