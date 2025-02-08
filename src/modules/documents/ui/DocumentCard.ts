import { DocumentModel } from "../domain/DocumentModel";

export function renderDocumentCard(document: DocumentModel) {
  return /* HTML */ `<div class="document-card">
    <div>
      <div class="document-card__title">${document.title}</div>

      <div class="document-card__version">${document.version}</div>
    </div>
    <div>${document.contributors}</div>
    <div>${document.attachment}</div>
  </div>`;
}
