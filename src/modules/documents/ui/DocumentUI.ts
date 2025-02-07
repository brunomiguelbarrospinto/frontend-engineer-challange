import { type DocumentService } from "../application/DocumentService";
import { DocumentModel } from "../domain/DocumentModel";

export class DocumentUI {
  constructor(private documentService: DocumentService) {}

  async renderDocuments() {
    const documents = await this.documentService.fetchDocuments();
    this.updateUI(documents);
  }

  updateUI(documents: DocumentModel[]) {
    const container = document.querySelector("#documents");
    container!.innerHTML = documents
      .map((document) => `<div class="document-item">${document.title} </div>`)
      .join("");
  }
}
