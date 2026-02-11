export default class Tooltip {
  constructor() {
    this._tooltips = []; // Используем нижнее подчеркивание для приватных свойств
  }

  showTooltip(message, element) {
    const id = Date.now().toString(); // Генерируем уникальный ID
    const tooltipElement = document.createElement("div"); // DIV пишем в нижнем регистре
    tooltipElement.id = id;
    tooltipElement.className = "form-error"; // Используем camelCase для классов CSS
    tooltipElement.textContent = message;

    this._tooltips.push({ id, element: tooltipElement });

    document.body.appendChild(tooltipElement); // appendChild предпочтительнее для добавления узлов

    const { right, top } = element.getBoundingClientRect();

    tooltipElement.style.left = `${right + 5}px`;
    tooltipElement.style.top = `${top + element.offsetHeight / 2 - tooltipElement.offsetHeight / 2}px`;

    return id;
  }

  removeTooltip(id) {
    const tooltip = this._tooltips.find((t) => t.id === id);
    if (!tooltip) {
      console.warn(`Попытка удалить несуществующую подсказку (${id})`);
      return;
    }

    try {
      tooltip.element.remove();
    } catch (err) {
      console.error("Ошибка при удалении элемента:", err);
    }

    this._tooltips = this._tooltips.filter((t) => t.id !== id);
  }
}


