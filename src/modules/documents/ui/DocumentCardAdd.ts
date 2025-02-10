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
          <div>
            <label for="contributors">Contributors</label>
            <span id="add-contributor" class="add-contributor">add</span>
            <div id="container-input-contributors">
              <input
                id="input-contributor"
                type="text"
                name="contributors"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <label for="attachments">Attachments</label>
          <input type="text" id="attachments" name="attachments" required />
        </div>
        <button type="submit" class="dialog__content__save-button">Save</button>
      </form>
    </div>
  </dialog>`;
}
