export function renderAddDocumentCard() {
  return /* HTML */ `<div
      id="document-card-add"
      class="document-card document-card--add"
      onclick="window.dialog.showModal();"
    >
      Add document
    </div>
    ${renderAddDocumentDialog()} `;
}

export function renderAddDocumentDialog() {
  return /* HTML */ ` <dialog id="dialog">
    <h2>Add document</h2>
    <form>
      <label for="title">Title</label>
      <input type="text" id="title" name="title" required />
      <label for="version">Version</label>
      <input type="text" id="version" name="version" required />
      <label for="contributors">Contributors</label>
      <input type="text" id="contributors" name="contributors" required />
      <label for="attachments">Attachments</label>
      <input type="text" id="attachments" name="attachments" required />
      <button type="submit">Save</button>
    </form>

    <button onclick="window.dialog.close();">Cerrar</button>
  </dialog>`;
}
