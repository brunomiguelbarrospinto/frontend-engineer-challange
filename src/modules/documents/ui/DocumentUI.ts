import { type DocumentService } from "../application/DocumentService";
import { DocumentModel } from "../domain/DocumentModel";
import { renderDocumentCard } from "./DocumentCard";
import { renderAddDocumentCard } from "./DocumentCardAdd";
import { renderContainer } from "./Container";
import { v4 as uuidv4 } from "uuid";

declare global {
  interface Window {
    dialog: {
      showModal: () => void;
      close: () => void;
    };
  }
}

export class DocumentUI {
  public gridLayoutButton: HTMLElement | null;
  public listLayoutButton: HTMLElement | null;
  public listTitles: HTMLElement | null;
  public sortSelect: HTMLSelectElement | null;
  public containerList: HTMLElement | null;
  public listUiMode: string = "list";
  public addDocumentForm!: HTMLFormElement | null;
  public addDocumentCard!: HTMLElement | null;

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

    this.sortSelect!.addEventListener("change", async () => {
      this.sortDocuments();
    });
  }

  sortDocuments() {
    const sortValue = this.sortSelect!.value;
    const sortedDocuments = this.documentService.sortDocuments(
      sortValue as "title" | "version" | "createdAt"
    );
    this.updateUI(sortedDocuments);
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

    this.handleFormSubmit();
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

  handleFormSubmit() {
    const addDocumentCard = document.querySelector(
      "#document-card-add"
    ) as HTMLElement;
    const addDocumentForm = document.querySelector(
      "#add-document-form"
    ) as HTMLFormElement;

    const addContributorButton = document.querySelector(
      "#add-contributor"
    ) as HTMLElement;

    addDocumentCard!.addEventListener("click", () => {
      window.dialog.showModal();
    });

    addContributorButton?.addEventListener("click", () => {
      const containerInputContributors = document.querySelector(
        "#container-input-contributors"
      );
      const inputContributor = document.createElement("input");
      inputContributor.type = "text";
      inputContributor.name = "contributors";
      inputContributor.required = true;
      containerInputContributors?.appendChild(inputContributor);

      if (document.querySelectorAll("input[name=contributors]").length > 4) {
        addContributorButton.style.display = "none";
      }
    });

    addDocumentForm?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(addDocumentForm!);
      const formValues: {
        [key: string]: FormDataEntryValue | FormDataEntryValue[];
      } = {};

      formData.forEach((value, key) => {
        if (formValues[key]) {
          if (!Array.isArray(formValues[key])) {
            formValues[key] = [formValues[key]];
          }
          formValues[key].push(value);
        } else {
          formValues[key] = value;
        }
      });

      const documentModel = new DocumentModel({
        Title: formValues.title as string,
        Version: formValues.version as string,
        Contributors: (formValues.contributors as []).map(
          (contributor: string) => ({
            ID: uuidv4(),
            Name: contributor,
          })
        ),
        Attachments: [formValues.attachments as string],
      });

      await this.documentService.createDocument(documentModel);
      this.updateUI(this.documentService.documents());
      this.sortDocuments();
    });
  }
}
