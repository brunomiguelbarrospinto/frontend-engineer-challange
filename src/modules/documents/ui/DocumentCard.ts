import { DocumentModel } from "../domain/DocumentModel";

export function renderDocumentCard(document: DocumentModel) {
  return /* HTML */ `<div class="documents-container__list__item">
    <div>
      ${document.title}<br />
      ${document.version}
    </div>
    <div>${document.contributors}</div>
    <div>${document.attachment}</div>
  </div>`;
}
