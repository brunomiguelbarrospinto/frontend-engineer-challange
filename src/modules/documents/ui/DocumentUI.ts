import { type DocumentService } from "../application/DocumentService";
import { DocumentModel } from "../domain/DocumentModel";
import { renderDocumentCard } from "./DocumentCard";
import { renderAddDocumentCard } from "./DocumentCardAdd";
import { renderContainer } from "./Container";

export class DocumentUI {
  public gridLayoutButton: HTMLElement | null;
  public listLayoutButton: HTMLElement | null;
  public listTitles: HTMLElement | null;
  public sortSelect: HTMLSelectElement | null;
  public containerList: HTMLElement | null;
  public listUiMode: string = "list";

  constructor(private documentService: DocumentService) {
    document.querySelector<HTMLDivElement>("#app-documents")!.innerHTML =
      renderContainer();

    this.gridLayoutButton = document.querySelector("#grid-layout-button");
    this.listLayoutButton = document.querySelector("#list-layout-button");
    this.listTitles = document.querySelector("#documents-container-titles");
    this.sortSelect = document.querySelector("#sort-select");
    this.containerList = document.querySelector("#document-list");

    this.updateListUiMode();

    this.gridLayoutButton!.addEventListener("click", () => {
      this.setListUiMode("grid");
    });

    this.listLayoutButton!.addEventListener("click", () => {
      this.setListUiMode("list");
    });

    this.sortSelect!.addEventListener("change", async (event) => {
      const sortValue = (event.target as HTMLSelectElement).value;

      const sortedDocuments = this.documentService.sortDocuments(
        sortValue as "title" | "version" | "createdAt"
      );
      this.updateUI(sortedDocuments);
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
