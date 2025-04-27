const btn1 = document.getElementById("btn1");
const dialog1 = document.getElementById("dialog1");
const btn2 = document.getElementById("btn2");
const form = document.getElementById("form");
btn1.addEventListener("click", openDialog);
btn2.addEventListener("click", closeDialog);
form.addEventListener("submit", dataIn);

const dialog2 = document.getElementById("dialog2");
const form2 = document.getElementById("form2");
const editbtn = document.getElementById("editbtn");
const submit2 = document.getElementById("submit2");
const idnumber = document.getElementById("editinputnumber");
editbtn.addEventListener("click", openDialog2);
form2.addEventListener("submit", removerow);
function openDialog(e) {
  dialog1.showModal();
}
function closeDialog(e) {
  e.preventDefault();
  dialog1.close();
}
function openDialog2(e) {
  dialog2.showModal();
}
let data = [];
document.addEventListener("DOMContentLoaded", () => {
  isUsersInLocalStorage();
});

async function isUsersInLocalStorage() {
  data = JSON.parse(localStorage.getItem("localData")) || [];
  if (!data.length) {
    await fetchUser();
    localStorage.setItem("localData", JSON.stringify(data));
  } else {
    console.log("data is loaded from local storage ");
  }

  displayUsersTable(data);
}

async function fetchUser() {
  try {
    let res = await fetch("https://dummyjson.com/users?limit=10");
    if (!res.ok) {
      throw new Error("HTTP error!");
    }
    let parsed = await res.json();
    data = parsed.users;
  } catch (error) {
    alert("something went wrong ");
  }
}
function updatelocalstorage() {
  localStorage.setItem("localData", JSON.stringify(data));
}

function displayUsersTable(datatodisplay) {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";
  datatodisplay.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${user.id}</td>
    <td>
          <div class="nameImg">
            <img id="img" src="Screenshot 2025-01-12 112347.jpg" alt="" />${user.firstName}
          </div>
        </td>
        <td>${user.birthDate}</td>
        <td class="mail">${user.email}</td>
        <td>${user.gender}</td>`;

    tableBody.appendChild(row);
  });
}

function dataIn(e) {
  e.preventDefault();
  dialog1.close();
  const formData = new FormData(form);

  const formDataObject = {
    id: formData.get("id"),
    firstName: formData.get("name"),
    birthDate: formData.get("Date"),
    email: formData.get("Email"),
    gender: formData.get("gender"),
  };

  const user = data.find(
    (person) => Number(person.id) == Number(formDataObject.id)
  );
  if (user) {
    user.firstName = formDataObject.firstName;
    user.birthDate = formDataObject.birthDate;
    user.email = formDataObject.email;
    user.gender = formDataObject.gender;
  } else {
    data.push(formDataObject);
  }
  displayUsersTable(data);
  updatelocalstorage();
  form.reset();
}

function removerow(e) {
  dialog2.close();
  const idToRemove = parseInt(idnumber.value);

  data = data.filter((person) => parseInt(person.id) !== idToRemove);
  displayUsersTable(data);
  removeRowFromLocalStorage(idToRemove);
  idnumber.value = "";
  e.preventDefault();
}
function removeRowFromLocalStorage(idToRemove) {
  const storedData = JSON.parse(localStorage.getItem("localData"));
  const updatedData = storedData.filter(
    (person) => parseInt(person.id) !== idToRemove
  );
  localStorage.setItem("localData", JSON.stringify(updatedData));
}

const editbtn2 = document.getElementById("editbtn2");
editbtn2.addEventListener("click", edit);
function edit(e) {
  const txt = document.getElementsByClassName("txt")[0];
  txt.textContent = "Edit User Details";
  dialog1.showModal();
}
