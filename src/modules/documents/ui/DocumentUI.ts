import { type DocumentService } from "../application/DocumentService";
import { DocumentModel } from "../domain/DocumentModel";
import { renderDocumentCard } from "./DocumentCard";

export class DocumentUI {
  public containerList: HTMLElement | null =
    document.querySelector("#document-list");
  public listUiMode: string = "list";

  constructor(private documentService: DocumentService) {
    document
      .querySelector("#grid-layout-button")!
      .addEventListener("click", () => {
        this.setListUiMode("grid");
      });

    document
      .querySelector("#list-layout-button")!
      .addEventListener("click", () => {
        this.setListUiMode("list");
      });
  }

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
    this.containerList!.classList.remove("documents-container__list--grid");

    if (this.listUiMode === "grid") {
      this.containerList!.classList.add("documents-container__list--grid");
    }
  }

  setListUiMode(mode: string) {
    this.listUiMode = mode;
    this.updateListUiMode();
  }
}
