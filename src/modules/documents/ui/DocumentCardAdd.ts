import { renderCloseIcon } from "./CloseIcon";

export function renderAddDocumentCard() {
  return /* HTML */ `<div
      id="document-card-add"
      class="document-card document-card--add"
    >
      Add document
    </div>
    ${renderAddDocumentDialog()} `;
}

export function renderAddDocumentDialog() {
  return /* HTML */ ` <dialog id="dialog" class="dialog">
    <button class="dialog-close-button" onclick="window.dialog.close();">
      ${renderCloseIcon()}
    </button>
    <div class="dialog__content">
      <div class="dialog__content__title">Add document</div>
      <form id="add-document-form">
        <div>
          <label for="title">Title</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div>
          <label for="version">Version</label>
          <input type="number" id="version" name="version" required />
        </div>

        <div>
          <label>Contributors</label>
          <span id="add-contributor" class="add">add</span>
          <div id="container-input-contributors">
            <input
              id="input-contributor"
              type="text"
              name="contributors"
              required
            />
          </div>
        </div>

        <div>
          <label>Attachments</label>
          <span id="add-attachments" class="add">add</span>
          <div id="container-input-attachments">
            <input
              id="input-attachments"
              type="text"
              name="attachments"
              required
            />
          </div>
        </div>

        <button type="submit" class="dialog__content__save-button">Save</button>
      </form>
    </div>
  </dialog>`;
}
