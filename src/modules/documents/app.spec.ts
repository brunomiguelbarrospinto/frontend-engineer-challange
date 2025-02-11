import { HttpResponse, http } from "msw";
import { expect, test } from "vitest";

import { createDocumentMock } from "./domain/DocumentModel";
import { initDocumentsModule } from "./app";
import { setupServer } from "msw/node";

test("mount documents app", async () => {
  const documentMocks = [createDocumentMock()];

  const server = setupServer(
    http.get(import.meta.env.VITE_API_HOST + "/documents", () => {
      return HttpResponse.json(documentMocks);
    })
  );
  server.listen();
  document.body.innerHTML = '<div id="app-documents"></div>';
  initDocumentsModule();

  await expect
    .poll(() => document.body.innerHTML)
    .toContain(documentMocks[0].Title);
});
