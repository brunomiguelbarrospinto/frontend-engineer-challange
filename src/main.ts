import "./style.css";

import { initDocumentsModule } from "./modules/documents/app";

function renderListIcon() {
  return /* HTML */ `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="size-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
    />
  </svg> `;
}

function renderGridIcon() {
  return /* HTML */ `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="size-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
    />
  </svg> `;
}

function renderSelect() {
  const sortOptionValues = [
    { value: "title", text: "Title" },
    { value: "version", text: "Version" },
    { value: "createdAt", text: "Created At" },
  ];

  return /* HTML */ `<select id="sort">
    <option value="">Select one...</option>
    ${sortOptionValues
      .map(
        (optionValue) =>
          `<option value="${optionValue.value}">${optionValue.text}</option>`
      )
      .join("")}
  </select>`;
}

function renderActions() {
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

document.querySelector<HTMLDivElement>("#app")!.innerHTML = /* HTML */ `
  <div id="documents-container" class="documents-container">
    <h1 class="documents-container__title">Documents</h1>
    ${renderActions()}
    <div class="documents-container__titles">
      <div>Title</div>
      <div>Contributors</div>
      <div>Attachment</div>
    </div>
    <div id="document-list" class="documents-container__list "></div>
  </div>
`;

initDocumentsModule();
