let email = document.getElementById("email");
let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
let btn = document.getElementById("btn");
let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

const validateEmail = (email) => {
  return regex.test(email.value);
};

const validateName = (name) => {
  if (name === null || name === "") {
    return false;
  } else if (name.length < 3 || name.length > 20) {
    return false;
  } else {
    return true;
  }
};

btn?.addEventListener("click", () => {
  if (validateName(fname) && validateName(lname) && validateEmail(email)) {
    alert("Tu mensaje se envió correctamente");
  } else {
    alert("Completa correctamente todos los campos");
  }
});
