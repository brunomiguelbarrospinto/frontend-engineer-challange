import { DocumentModel } from "../domain/DocumentModel";

export function renderDocumentCard(document: DocumentModel) {
  return /* HTML */ `<div class="documents-container__list__item">
    <div>
      <div class="documents-container__list__item__title">
        ${document.title}
      </div>

      <div class="documents-container__list__item__version">
        ${document.version}
      </div>
    </div>
    <div>${document.contributors}</div>
    <div>${document.attachment}</div>
  </div>`;
}
