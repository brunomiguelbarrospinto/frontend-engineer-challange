import { type DocumentService } from "../application/DocumentService";
import { DocumentModel, Contributor } from "../domain/DocumentModel";
import { renderDocumentCard } from "./DocumentCard";
import { renderAddDocumentCard } from "./DocumentCardAdd";
import { renderContainer } from "./Container";

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
  public addContributorButton!: HTMLElement | null;
  public addAttachmentsButton!: HTMLElement | null;

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
    this.addDocumentCard = document.querySelector(
      "#document-card-add"
    ) as HTMLElement;
    const addDocumentForm = document.querySelector(
      "#add-document-form"
    ) as HTMLFormElement;

    this.addContributorButton = document.querySelector(
      "#add-contributor"
    ) as HTMLElement;

    this.addAttachmentsButton = document.querySelector(
      "#add-attachments"
    ) as HTMLElement;

    this.addDocumentCard!.addEventListener("click", () => {
      (document.getElementById("dialog") as HTMLDialogElement)?.showModal();
    });

    this.addContributorButton?.addEventListener("click", () => {
      const containerInputContributors = document.querySelector(
        "#container-input-contributors"
      );
      const inputContributor = document.createElement("input");
      inputContributor.type = "text";
      inputContributor.name = "contributors";
      inputContributor.required = true;
      containerInputContributors?.appendChild(inputContributor);

      if (document.querySelectorAll("input[name=contributors]").length > 4) {
        if (this.addContributorButton) {
          this.addContributorButton.style.display = "none";
        }
      }
    });

    this.addAttachmentsButton?.addEventListener("click", () => {
      const containerInputAttachments = document.querySelector(
        "#container-input-attachments"
      );
      const inputContributor = document.createElement("input");
      inputContributor.type = "text";
      inputContributor.name = "attachments";
      inputContributor.required = true;
      containerInputAttachments?.appendChild(inputContributor);

      if (document.querySelectorAll("input[name=attachments]").length > 4) {
        if (this.addAttachmentsButton) {
          this.addAttachmentsButton.style.display = "none";
        }
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

      await this.documentService.createDocument({
        Title: formValues.title as string,
        Version: formValues.version as string,
        Contributors: Array.isArray(formValues.contributors)
          ? (formValues.contributors as string[]).map(
              (contributor: string): Contributor => {
                return { ID: undefined, Name: contributor };
              }
            )
          : [
              {
                ID: undefined,
                Name: formValues.contributors as string,
              },
            ],
        Attachments: Array.isArray(formValues.attachments)
          ? (formValues.attachments as string[])
          : [formValues.attachments as string],
      });
      this.updateUI(this.documentService.documents());
      this.sortDocuments();
    });
  }
}
