import { generateMock } from "@anatine/zod-mock";
import { z } from "zod";

// Define the schema for the document
export const DocumentSchema = z.object({
  ID: z.string(),
  Title: z.string(),
  Contributors: z.array(
    z.object({
      ID: z.string(),
      Name: z.string(),
    })
  ),
  Version: z.number(),
  Attachments: z.array(z.string()),
  UpdatedAt: z.string().datetime(),
  CreatedAt: z.string().datetime(),
});

// Create a mock document
export function createDocumentMock(
  overwrite?: Partial<z.infer<typeof DocumentSchema>>
) {
  return { ...generateMock(DocumentSchema), ...overwrite };
}

// Define the document type
export type Document = z.infer<typeof DocumentSchema>;

// Define the document model
export class DocumentModel {
  public id: string;
  public title: string;
  public contributors: string[];
  public version: number;
  public attachment: string[];
  public createdAt: string;
  public updatedAt: string;

  constructor(document: Document) {
    this.id = document.ID;
    this.title = document.Title;
    this.contributors = document.Contributors.map(
      (contributor) => contributor.Name
    );
    this.version = document.Version;
    this.attachment = document.Attachments;
    this.createdAt = document.CreatedAt;
    this.updatedAt = document.UpdatedAt;
  }
}
