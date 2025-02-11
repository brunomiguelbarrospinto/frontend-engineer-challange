import { DocumentModel, createDocumentMock } from "../domain/DocumentModel";
import { HttpResponse, http } from "msw";
import { expect, test } from "vitest";

import { DocumentRepository } from "../infrastructure/DocumentRepository";
import { DocumentService } from "./DocumentService";
import { compare } from "compare-versions";
import { setupServer } from "msw/node";

const documentMocks = [
  createDocumentMock(),
  createDocumentMock(),
  createDocumentMock(),
];

const server = setupServer(
  http.get(import.meta.env.VITE_API_HOST + "/documents", () => {
    return HttpResponse.json(documentMocks);
  })
);
server.listen();

const documentRepository = new DocumentRepository();
const documentService = new DocumentService(documentRepository);

test("should fetch documents", async () => {
  const documentModels = await documentService.fetchDocuments();
  expect(documentModels).toEqual(
    documentMocks.map((doc) => new DocumentModel(doc))
  );
});

test("should sort documents", async () => {
  const documentModels = await documentService.fetchDocuments();
  let sortedTitleDocuments = documentService.sortDocuments("title");
  expect(sortedTitleDocuments).toEqual(
    documentModels.sort((a, b) => (a.title < b.title ? 1 : -1))
  );

  let sortedVersionDocuments = documentService.sortDocuments("version");
  expect(sortedVersionDocuments).toEqual(
    documentModels.sort((a, b) =>
      compare(a["version"], b["version"], "<") ? 1 : -1
    )
  );
});

test("should create document", async () => {
  const document = createDocumentMock();
  documentService.createDocument(document);
  expect(documentService.documents()).toContainEqual(
    new DocumentModel(document)
  );
});
