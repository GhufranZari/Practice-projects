$(document).ready(function () {

  const tableBody = $("#table1");

  function loadUsers() {
    $.ajax({
      url: "http://localhost:3030/users",
      method: "GET",
      dataType: "json",
      success: function (users) {

        console.log("Users loaded from API:", users);

        tableBody.empty();

        $.each(users, function (index, user) {
          const row = `
            <tr>
              <td>${user.id}</td>
              <td>${user.name}</td>
              <td>${user.email}</td>
            </tr>
          `;
          tableBody.append(row);
        });
      },
      error: function (error) {
        console.error("Error loading users:", error);
        alert("Failed to load users from API!");
      }
    });
  }

  loadUsers();
});
