import { expect, test } from "vitest";

import { renderAddDocumentCard } from "./DocumentCardAdd";

test("Should render a document card", () => {
  const documentCard = renderAddDocumentCard();
  expect(documentCard).toContain("Add document");
});
