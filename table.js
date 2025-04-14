const people = [
  {
    name: "emma",
    type: "Policy review",
    date: "Jul 10, 2024",
    plan: "Silver",
    provider: "SafeDrive",
    email: "emma.martinez@example.com",
    emailed: false,
  },
  {
    name: "alex",
    type: "Claims processing",
    date: "Aug 5, 2024",
    plan: "Platinum",
    provider: "InsureRight",
    email: "alex.wilson@example.com",
    emailed: true,
  },
  {
    name: "sophia",
    type: "Renewal approval",
    date: "Sep 15, 2024",
    plan: "Essential Plus",
    provider: "CoverAll",
    email: "sophia.garcia@example.com",
    emailed: false,
  },
];

const tableBody = document.querySelector(" tbody ");

people.forEach((app) => {
  const row = document.createElement("tr");
  row.innerHTML = `<td>
        <div class="nameImg">
          <img id="img" src="Screenshot 2025-01-12 112347.jpg" alt="" />${
            app.name
          }
        </div>
      </td>
      <td class="d2">${app.type}</td>
      <td>${app.date}</td>
      <td><div class="Essential">${app.plan}</div></td>
      <td>${app.provider}</td>
      <td class="mail">${app.email}</td>
      <td>
        <div class="checkboxContainer">
          <input type="checkbox" class="checkbox" ${
            app.emailed ? "checked" : ""
          }>
        </div>
      </td>`;

  tableBody.appendChild(row);
});
