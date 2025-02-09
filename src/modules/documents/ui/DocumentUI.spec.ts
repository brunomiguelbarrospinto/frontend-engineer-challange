import { HttpResponse, http } from "msw";
import { beforeEach, expect, test } from "vitest";

import { DocumentRepository } from "../infrastructure/DocumentRepository";
import { DocumentService } from "../application/DocumentService";
import { DocumentUI } from "./DocumentUI";
import { compare } from "compare-versions";
import { createDocumentMock } from "../domain/DocumentModel";
import { setupServer } from "msw/node";

const documentMocks = [createDocumentMock()];

beforeEach(() => {
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
