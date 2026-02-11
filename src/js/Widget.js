import Popover from "./Popover";
import Tooltip from "./Tooltip";

export default class Widget {
  constructor(id) {
    this.formContainer = document.getElementById(id);
    this.popover = document.createElement("div");
    this.btn = document.createElement("button");
    this.title = document.createElement("div");
    this.content = document.createElement("div");
    this.form = document.getElementById("myForm");
    this.tooltipFactory = new Tooltip();
    this.showTooltip = null;
    this.actualMessages = [];

    this.initUI();
  }

  initUI() {
    // Формируем основную структуру
    this.btn.id = "trigger";
    this.btn.textContent = "Нажми на меня!";
    this.formContainer.appendChild(this.btn);

    this.popover.id = "popover";
    this.popover.classList.add("popover");
    this.formContainer.appendChild(this.popover);

    this.title.textContent = "Название всплывающего окна";
    this.title.id = "title";
    this.popover.appendChild(this.title);

    this.content.textContent = "Это некоторый контент для всплывающего окна.";
    this.popover.appendChild(this.content);

    new Popover(this.btn.id, this.popover.id);

    this.showTooltip = (message, el) =>
      this.actualMessages.push({
        name: el.name,
        id: this.tooltipFactory.showTooltip(message, el),
      });

    // Добавляем обработчик формы
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault(); // Останавливаем отправку формы

    // Удаляем старые уведомления
    this.actualMessages.forEach(({ id }) => {
      this.tooltipFactory.removeTooltip(id);
    });
    this.actualMessages.length = 0; // Очищаем массив

    const elements = event.target.elements;
    Array.from(elements).some((elem) => {
      const errorMessage = this.myError(elem);
      if (errorMessage) {
        this.showTooltip(errorMessage, elem);
        return true;
      }
    });
  }

  myError(element) {
    if (!element.name) {
      return "Все хорошо!";
    }

    // Находим первое неправильное состояние поля
    const errorKey = Object.keys(ValidityState.prototype).find(
      (key) => !element.name || key === "valid" || element.validity[key],
    );

    if (!errorKey) return; // Если ошибок нет, возвращаем undefined

    // Возвращаем сообщение об ошибке

    return this.errorsList()[element.name][errorKey];
  }

  // Возвращает словарь ошибок для каждого поля формы
  errorsList() {
    return {
      login: {
        valueMissing: "Представьтесь, пожалуйста!",
      },
      email: {
        valueMissing: "Нам потребуется электропочта...",
        typeMismatch: "А это точно электропочта?",
      },
      terms: {
        valueMissing: "Примите условия.",
      },
    };
  }
}


