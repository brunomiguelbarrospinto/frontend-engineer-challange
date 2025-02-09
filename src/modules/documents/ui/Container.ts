import { renderActions } from "./Actions";

export function renderContainer() {
  return /* HTML */ `
    <div id="documents-container" class="documents-container">
      <h1 class="documents-container__title">Documents</h1>
      ${renderActions()}
      <div id="documents-container-titles" class="documents-container__titles">
        <div>Title</div>
        <div>Contributors</div>
        <div>Attachment</div>
      </div>
      <div id="document-list" class="documents-container__list">
        <div class="document-card">Add document</div>
      </div>
    </div>
  `;
}
