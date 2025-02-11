import { DocumentModel, createDocumentMock } from "../domain/DocumentModel";
import { HttpResponse, http } from "msw";
import { expect, test } from "vitest";

import { DocumentRepository } from "./DocumentRepository";
import { setupServer } from "msw/node";

const documentMocks = [createDocumentMock()];

const server = setupServer(
  http.get(import.meta.env.VITE_API_HOST + "/documents", () => {
    return HttpResponse.json(documentMocks);
  })
);
server.listen();

const documentRepository = new DocumentRepository();

test("should fetch documents", async () => {
  const documentModels = await documentRepository.getDocuments();
  expect(documentModels).toEqual(
    documentMocks.map((doc) => new DocumentModel(doc))
  );
});

test("should add document", async () => {
  const document = createDocumentMock();
  documentRepository.addDocument(new DocumentModel(document));
  expect(documentRepository.documents).toContainEqual(
    new DocumentModel(document)
  );
});
