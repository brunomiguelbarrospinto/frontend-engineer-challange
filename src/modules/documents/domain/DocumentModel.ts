import { generateMock } from "@anatine/zod-mock";
import { getRelativeTime } from "../../../utils/dayjs";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

// Define the schema for the contributor
export const ContributorSchema = z.object({
  ID: z.string().optional(),
  Name: z.string(),
});

export type Contributor = z.infer<typeof ContributorSchema>;

// Define the schema for the document
export const DocumentSchema = z.object({
  ID: z.string().optional(),
  Title: z.string(),
  Contributors: z.array(ContributorSchema),
  Version: z.number().transform((value) => value.toString()),
  Attachments: z.array(z.string()),
  UpdatedAt: z.string().datetime().optional(),
  CreatedAt: z.string().datetime().optional(),
});

// Create a mock document
export function createDocumentMock(
  overwrite?: Partial<z.infer<typeof DocumentSchema>>
) {
  return { ...generateMock(DocumentSchema), ...overwrite };
}

// Create a mock DocumentModel
export function createDocumentModelMock(
  overwrite?: Partial<z.infer<typeof DocumentSchema>>
) {
  return new DocumentModel(createDocumentMock(overwrite));
}

// Define the document type
export type Document = z.infer<typeof DocumentSchema>;

// Define the document model
export class DocumentModel {
  public id: string;
  public title: string;
  public contributors: string[];
  public version: string;
  public attachment: string[];
  public createdAt: string;
  public createdAtRelative: string;
  public updatedAt: string;

  constructor(document: Document) {
    this.id = document.ID || uuidv4();
    this.title = document.Title;
    this.contributors = document.Contributors.map(
      (contributor) => contributor.Name
    );
    this.version = document.Version.toString();
    this.attachment = document.Attachments;
    this.createdAt = document.CreatedAt || new Date().toISOString();
    this.updatedAt = document.UpdatedAt || new Date().toISOString();
    this.createdAtRelative = getRelativeTime(
      new Date(this.createdAt).toISOString()
    );
  }
}
