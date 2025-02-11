import { HttpResponse, http } from "msw";
import { beforeEach, expect, test, vi } from "vitest";

import { DocumentRepository } from "../infrastructure/DocumentRepository";
import { DocumentService } from "../application/DocumentService";
import { DocumentUI } from "./DocumentUI";
import { compare } from "compare-versions";
import { createDocumentMock } from "../domain/DocumentModel";
import { setupServer } from "msw/node";

const documentMocks = [createDocumentMock()];

beforeEach(() => {
  globalThis.HTMLDialogElement.prototype.showModal = vi.fn();

  const server = setupServer(
    http.get(import.meta.env.VITE_API_HOST + "/documents", () => {
      return HttpResponse.json(documentMocks);
    })
  );
  server.listen();
  document.body.innerHTML = '<div id="app-documents"></div>';
});

test("Should render a list of documents", async () => {
  const documentRepository = new DocumentRepository();
  const documentService = new DocumentService(documentRepository);
  const documentUi = new DocumentUI(documentService);

  await documentUi.renderDocuments();

  expect(document.body.innerHTML).toContain(documentMocks[0].Title);
});

test("Should render a list as list and grid", async () => {
  const documentRepository = new DocumentRepository();
  const documentService = new DocumentService(documentRepository);
  const documentUi = new DocumentUI(documentService);

  await documentUi.renderDocuments();

  documentUi.gridLayoutButton?.click();
  expect(documentUi.listUiMode).toBe("grid");
  expect(documentUi.listLayoutButton?.classList.contains("active")).toBe(false);
  expect(documentUi.gridLayoutButton?.classList.contains("active")).toBe(true);
  expect(
    documentUi.containerList?.classList.contains(
      "documents-container__list--grid"
    )
  ).toBe(true);
  documentUi.listLayoutButton?.click();
  expect(documentUi.listUiMode).toBe("list");
  expect(documentUi.listLayoutButton?.classList.contains("active")).toBe(true);
  expect(documentUi.gridLayoutButton?.classList.contains("active")).toBe(false);
  expect(
    documentUi.containerList?.classList.contains(
      "documents-container__list--grid"
    )
  ).toBe(false);
});

test("Should sort documents by title", async () => {
  const documentRepository = new DocumentRepository();
  const documentService = new DocumentService(documentRepository);
  const documentUi = new DocumentUI(documentService);

  await documentUi.renderDocuments();
  const documentModels = documentRepository.documents;
  documentUi.sortSelect!.value = "title";
  documentUi.sortSelect?.dispatchEvent(new Event("change"));
  expect(
    (documentUi.containerList?.firstChild as HTMLElement)?.innerHTML
  ).toContain(
    documentModels.sort((a, b) => (a.title > b.title ? 1 : -1))[0].title
  );
});

test("Should sort documents by version", async () => {
  const documentRepository = new DocumentRepository();
  const documentService = new DocumentService(documentRepository);
  const documentUi = new DocumentUI(documentService);

  await documentUi.renderDocuments();
  const documentModels = (documentRepository.documents =
    documentRepository.documents.reverse());

  documentUi.sortSelect!.value = "version";
  documentUi.sortSelect?.dispatchEvent(new Event("change"));

  expect(
    (documentUi.containerList?.firstChild as HTMLElement)?.innerHTML
  ).toContain(
    documentModels.sort((a, b) =>
      compare(a.version, b.version, ">") ? 1 : -1
    )[0].version
  );
});

test("Should create document with single contributors and attachments", async () => {
  const documentRepository = new DocumentRepository();
  const documentService = new DocumentService(documentRepository);
  const documentUi = new DocumentUI(documentService);

  await documentUi.renderDocuments();

  documentUi.addDocumentCard?.click();
  expect(documentUi.containerList?.innerHTML).toContain("form");

  // fill title input
  const titleInput = document.querySelector(
    '[name="title"]'
  ) as HTMLInputElement;
  titleInput.value = "New Document";
  titleInput.dispatchEvent(new Event("input", { bubbles: true }));
  expect(titleInput.value).toBe("New Document");

  //Fill version input
  const versionInput = document.querySelector(
    '[name="version"]'
  ) as HTMLInputElement;
  versionInput.value = "100";
  versionInput.dispatchEvent(new Event("input", { bubbles: true }));
  expect(versionInput.value).toBe("100");

  // fill contributors inputs
  const contributorsInputs = document.querySelectorAll('[name="contributors"]');
  contributorsInputs.forEach((input, index) => {
    (input as HTMLInputElement).value = `Contributor ${index + 1}`;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    expect((input as HTMLInputElement).value).toBe(`Contributor ${index + 1}`);
  });

  // fill attachments inputs
  const attachmentsInputs = document.querySelectorAll('[name="attachments"]');
  attachmentsInputs.forEach((input, index) => {
    (input as HTMLInputElement).value = `Attachment ${index + 1}`;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    expect((input as HTMLInputElement).value).toBe(`Attachment ${index + 1}`);
  });

  // submit form with submit button doing click
  const submitAddDocumentButton = document.querySelector(
    "#submit-add-document-button"
  ) as HTMLButtonElement;

  submitAddDocumentButton?.click();

  // check if the document was created
  expect(documentRepository.documents.length).toBe(2);
});

test("Should create document with multiple contributors and attachments", async () => {
  const documentRepository = new DocumentRepository();
  const documentService = new DocumentService(documentRepository);
  const documentUi = new DocumentUI(documentService);

  await documentUi.renderDocuments();

  documentUi.addDocumentCard?.click();
  expect(documentUi.containerList?.innerHTML).toContain("form");

  //clic in add contributors button 5 times
  for (let i = 0; i < 4; i++) {
    documentUi.addContributorButton?.click();
  }
  // addContributorButton should be hide
  expect(documentUi.addContributorButton?.style.display).toBe("none");
  // check not more than 5 contributors inputs
  expect(document.querySelectorAll('[name="contributors"]').length).toBe(5);

  //clic in add attachment button 5 times
  for (let i = 0; i < 4; i++) {
    documentUi.addAttachmentsButton?.click();
  }
  // addAttachmentsButton should be hide
  expect(documentUi.addAttachmentsButton?.style.display).toBe("none");
  // check not more than 5 attachments inputs
  expect(document.querySelectorAll('[name="attachments"]').length).toBe(5);

  // fill title input
  const titleInput = document.querySelector(
    '[name="title"]'
  ) as HTMLInputElement;
  titleInput.value = "New Document";
  titleInput.dispatchEvent(new Event("input", { bubbles: true }));
  expect(titleInput.value).toBe("New Document");

  //Fill version input
  const versionInput = document.querySelector(
    '[name="version"]'
  ) as HTMLInputElement;
  versionInput.value = "100";
  versionInput.dispatchEvent(new Event("input", { bubbles: true }));
  expect(versionInput.value).toBe("100");

  // fill contributors inputs
  const contributorsInputs = document.querySelectorAll('[name="contributors"]');
  contributorsInputs.forEach((input, index) => {
    (input as HTMLInputElement).value = `Contributor ${index + 1}`;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    expect((input as HTMLInputElement).value).toBe(`Contributor ${index + 1}`);
  });

  // fill attachments inputs
  const attachmentsInputs = document.querySelectorAll('[name="attachments"]');
  attachmentsInputs.forEach((input, index) => {
    (input as HTMLInputElement).value = `Attachment ${index + 1}`;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    expect((input as HTMLInputElement).value).toBe(`Attachment ${index + 1}`);
  });

  // submit form with submit button doing click
  const submitAddDocumentButton = document.querySelector(
    "#submit-add-document-button"
  ) as HTMLButtonElement;

  submitAddDocumentButton?.click();

  // check if the document was created
  expect(documentRepository.documents.length).toBe(2);
});
