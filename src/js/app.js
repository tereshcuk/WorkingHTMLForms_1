import Widget from "./Widget";

document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.createElement("div");
  formContainer.id = "formContainer";
  formContainer.classList.add("container");

  // Добавляем HTML-код формы
  formContainer.innerHTML = `
      <form id="myForm" novalidate>
        <div class="form-control">
          <label for="username">Имя пользователя:</label>
          <input name="login" type="text" id="username" required />
        </div>
        <div class="form-control">
          <label for="email">Электронная почта:</label>
          <input name="email" type="email" id="email" required />
        </div>
        <div class="form-control">
          <label for="terms">Принять условия:</label>
          <input name="terms" type="checkbox" id="terms" required />
        </div>
        <div>
          <button type="submit">Зарегистрироваться</button>
        </div>
      </form>
    `;

  const body = document.body;
  body.appendChild(formContainer);

  new Widget(formContainer.id);
});
