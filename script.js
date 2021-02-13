function formOutput(form) {
  document.querySelector('.form__container').appendChild(formOfJson(form));
}

function formOfJson(file) {
  let formObj = JSON.parse(file).form;
  let form = document.createElement("form");
      form.setAttribute("class", formObj.class);
  
  if (formObj.name) {
    let formTitle = document.createElement('h2');
        formTitle.textContent = formObj.name;
    form.appendChild(formTitle);
  }
  document.querySelector('.form__container').appendChild(form);
  
  if (formObj.postmessage) {
    let formResponse = document.createElement('div');
        formResponse.setAttribute("class", "form-response");
        formResponse.innerHTML = formObj.postmessage;
  }
  
  let formElementsObj = formObj.items;
  let i = 0;
  let formElements = [];

  formElementsObj.forEach(item => {
    formElements[i] = [];

    /* [0]Label - start */
    if (item.attributes.label) {
      formElements[i].push(document.createElement('label'));
      formElements[i][0].textContent = item.attributes.label;
    } else {
      formElements[i][0] = "";
    }

    /* [1]Input - start */
    if (item.type == "textarea") {
      formElements[i][1] = document.createElement('textarea');
    } else if (item.type == "select") {
      formElements[i][1] = document.createElement('select');
      item.attributes.options.forEach(option => {
        let optionElement = document.createElement("option")
            optionElement.setAttribute("value", option.value);
            optionElement.textContent = option.text;
        (option.selected) ?
          optionElement.setAttribute("selected", "") : null;
        formElements[i][1].appendChild(optionElement);
      })
    } else {
      formElements[i][1] = document.createElement('input');
      formElements[i][1].setAttribute("type", item.type);
    }
    formElements[i][1].setAttribute("class", item.attributes.class);
    formElements[i][1].setAttribute("name", item.attributes.name);

    (item.type != "submit") ? (item.type != "checkbox") ?
      formElements[i][1].setAttribute("placeholder", item.attributes.placeholder) : null :
      formElements[i][1].setAttribute("value", item.attributes.value);
    (item.type == "checkbox" && item.attributes.checked) ?
      formElements[i][1].setAttribute("checked", "") : null;
    (item.attributes.required) ?
      formElements[i][1].setAttribute("required", true) : null;
    (item.attributes.disabled) ?
      formElements[i][1].setAttribute("disabled", true) : null;        
    /* [1]Input - end */

    if (formElements[i][0] == "") {
      formElements[i][0] = formElements[i][1];
    } else {
      formElements[i][0].appendChild(formElements[i][1]);
    }
    formElements[i][1] = item.attributes.validationRules;
    form.appendChild(formElements[i][0]);
  });
  return form;
}

fetch("./json/form.json")
  .then(response => {return response.json()})
  .then(data => formOutput(JSON.stringify(data)));
