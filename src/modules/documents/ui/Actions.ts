import { renderGridIcon } from "./GridIcon";
import { renderListIcon } from "./ListIcon";
import { renderSelect } from "./SortSelect";

export function renderActions() {
  return /* HTML */ `<div class="documents-container__actions">
    <div><label>Sort by:</label> ${renderSelect()}</div>
    <div class="documents-container__actions__buttons">
      <div
        id="list-layout-button"
        class="documents-container__list__item__actions__buttons__view"
      >
        ${renderListIcon()}
      </div>
      <div
        id="grid-layout-button"
        class="documents-container__list__item__actions__buttons__view"
      >
        ${renderGridIcon()}
      </div>
    </div>
  </div>`;
}
