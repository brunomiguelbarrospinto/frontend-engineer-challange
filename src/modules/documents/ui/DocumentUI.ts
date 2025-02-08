import { type DocumentService } from "../application/DocumentService";
import { DocumentModel } from "../domain/DocumentModel";
import { renderDocumentCard } from "./DocumentCard";

export class DocumentUI {
  constructor(private documentService: DocumentService) {}

  async renderDocuments() {
    const documents = await this.documentService.fetchDocuments();
    this.updateUI(documents);
  }

  updateUI(documents: DocumentModel[]) {
    const container = document.querySelector("#document-list");
    container!.innerHTML = documents
      .map((document) => renderDocumentCard(document))
      .join("");
  }
}
