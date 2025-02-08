import { DocumentModel } from "../domain/DocumentModel";

export function renderDocumentCard(document: DocumentModel) {
  return /* HTML */ `<div class="document-card">
    <div>
      <div class="document-card__title">${document.title}</div>

      <div class="document-card__version">${document.version}</div>
    </div>
    <div class="document-card__contributors">
      ${document.contributors.join(", ")}
    </div>
    <div class="document-card__attachments">
      ${document.attachment.join(", ")}
    </div>
  </div>`;
}
