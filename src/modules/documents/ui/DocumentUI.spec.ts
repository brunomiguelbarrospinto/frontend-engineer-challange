import { HttpResponse, http } from "msw";
import { expect, test } from "vitest";

import { DocumentRepository } from "../infrastructure/DocumentRepository";
import { DocumentService } from "../application/DocumentService";
import { DocumentUI } from "./DocumentUI";
import { createDocumentMock } from "../domain/DocumentModel";
import { setupServer } from "msw/node";

test("Should render a list of documents ", async () => {
  const documentMocks = [createDocumentMock()];

  const server = setupServer(
    http.get(import.meta.env.VITE_API_HOST + "/documents", () => {
      return HttpResponse.json(documentMocks);
    })
  );
  server.listen();

  document.body.innerHTML = '<div id="app-documents"></div>';

  const documentRepository = new DocumentRepository();
  const documentService = new DocumentService(documentRepository);
  const documentUi = new DocumentUI(documentService);

  await documentUi.renderDocuments();

  expect(document.body.innerHTML).toContain(documentMocks[0].Title);
  expect(document.body.innerHTML).toContain(documentMocks[0].CreatedAt);
});
