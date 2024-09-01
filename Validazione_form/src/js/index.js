/* console.log(document.forms);
console.log(document.forms["login"]);
console.log(document.forms["pippo"]); */

const form = document.forms["login"];
const user = form.elements["user"];
const pass = form.elements["pass"];

const regExpression = {
  email:
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
};

form.addEventListener("submit", handleSubmit);
/* console.log(form.elements.length); */
for (let i = 0; i < form.elements.length - 1; i++) {
  form.elements[i].addEventListener("focus", handleFieldFocus);
}

function handleFieldFocus(e) {
  const field = e.target;
  field.classList.remove("errore");
}

function handleSubmit(e) {
  e.preventDefault();

  if (isValidModulo()) {
    form.submit();
  }
}

function isValidModulo() {
  let isValidModule = true;
  for (let i = 0; i < form.elements.length - 1; i++) {
    isValidModule =
      isValidField(form.elements[i] /* , form.elements[i].dataset.pattern */) &&
      isValidModule;
  }

  return isValidModule;
}

function isValidField(campo) {
  const propRegEspress = campo.dataset.pattern;
  console.log(propRegEspress)
  const validityField = regExpression[propRegEspress].test(campo.value.trim());
  console.log(validityField)

  if (!validityField) {
    aggiungiErrore(campo, `Errore. ${propRegEspress} non valida`);
  } else {
    rimuoviErrore(campo);
  }

  return validityField;
}

function rimuoviErrore(campoX) {
  campoX.classList.remove("errore");
}

function aggiungiErrore(campoX, messaggio) {
  campoX.classList.add("errore");
  campoX.nextElementSibling.textContent = messaggio;
}
