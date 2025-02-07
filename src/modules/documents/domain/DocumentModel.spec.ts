import { DocumentModel, createDocumentMock } from "./DocumentModel";
import { expect, test } from "vitest";

test("should create a DocumentModel instance", () => {
  const document = createDocumentMock({
    Title: "Bruno",
  });
  const documentModel = new DocumentModel(document);

  expect(documentModel.id).toBe(document.ID);
  expect(documentModel.title).toBe(document.Title);
  expect(documentModel.contributors).toEqual(
    document.Contributors.map((contributor) => contributor.Name)
  );
  expect(documentModel.version).toBe(document.Version);
  expect(documentModel.attachment).toEqual(document.Attachments);
  expect(documentModel.createdAt).toEqual(document.CreatedAt);
  expect(documentModel.updatedAt).toEqual(document.UpdatedAt);
});
