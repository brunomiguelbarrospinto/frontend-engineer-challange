import { type DocumentService } from "../application/DocumentService";
import { DocumentModel } from "../domain/DocumentModel";
import { renderDocumentCard } from "./DocumentCard";
import { renderAddDocumentCard } from "./DocumentCardAdd";

export class DocumentUI {
  public gridLayoutButton: HTMLElement | null = document.querySelector(
    "#grid-layout-button"
  );
  public listLayoutButton: HTMLElement | null = document.querySelector(
    "#list-layout-button"
  );
  public listTitles: HTMLElement | null = document.querySelector(
    "#documents-container-titles"
  );

  public containerList: HTMLElement | null =
    document.querySelector("#document-list");
  public listUiMode: string = "list";

  constructor(private documentService: DocumentService) {
    this.updateListUiMode();
    this.gridLayoutButton!.addEventListener("click", () => {
      this.setListUiMode("grid");
    });

    this.listLayoutButton!.addEventListener("click", () => {
      this.setListUiMode("list");
    });
  }

  async renderDocuments() {
    const documents = await this.documentService.fetchDocuments();
    this.updateUI(documents);
  }

  updateUI(documents: DocumentModel[]) {
    const htmlDocumentCards = documents
      .map((document) => renderDocumentCard(document))
      .join("");
    const htmlAddDocumentButton = renderAddDocumentCard();
    this.containerList!.innerHTML = htmlDocumentCards + htmlAddDocumentButton;
  }

  updateListUiMode() {
    this.gridLayoutButton!.classList.remove("active");
    this.listLayoutButton!.classList.remove("active");
    this.listTitles!.style.display =
      this.listUiMode === "grid" ? "none" : "grid";
    if (this.listUiMode === "grid") {
      this.gridLayoutButton!.classList.add("active");
      this.containerList!.classList.add("documents-container__list--grid");
    } else {
      this.listLayoutButton!.classList.add("active");
      this.containerList!.classList.remove("documents-container__list--grid");
    }
  }

  setListUiMode(mode: string) {
    this.listUiMode = mode;
    this.updateListUiMode();
  }
}
