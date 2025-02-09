import { expect, test } from "vitest";

import { createDocumentModelMock } from "../domain/DocumentModel";
import { renderDocumentCard } from "./DocumentCard";

test("Should render a document card", () => {
  const documentModel = createDocumentModelMock();
  const documentCard = renderDocumentCard(documentModel);
  expect(documentCard).toContain(documentModel.title);
  expect(documentCard).toContain(documentModel.version);
  expect(documentCard).toContain(documentModel.contributors.join(", "));
  expect(documentCard).toContain(documentModel.attachment.join(", "));
});
