import { type DocumentService } from "../application/DocumentService";
import { DocumentModel } from "../domain/DocumentModel";
import { renderDocumentCard } from "./DocumentCard";

export class DocumentUI {
  public containerList: HTMLElement | null =
    document.querySelector("#document-list");
  public listUiMode: string = "list";

  constructor(private documentService: DocumentService) {}

  async renderDocuments() {
    const documents = await this.documentService.fetchDocuments();
    this.updateUI(documents);
  }

  updateUI(documents: DocumentModel[]) {
    this.containerList!.innerHTML = documents
      .map((document) => renderDocumentCard(document))
      .join("");
  }

  updateListUiMode() {
    this.containerList!.classList.remove(
      this.listUiMode === "list" ? "grid" : "list"
    );
    this.containerList!.classList.add(
      this.listUiMode === "list" ? "list" : "grid"
    );
  }

  setListUiMode(mode: string) {
    this.listUiMode = mode;
    this.updateListUiMode();
  }
}
