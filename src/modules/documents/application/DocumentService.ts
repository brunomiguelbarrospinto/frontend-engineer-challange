import { DocumentModel, Document, Contributor } from "../domain/DocumentModel";
import { type DocumentRepository } from "../infrastructure/DocumentRepository";
import { compare } from "compare-versions";
import { v4 as uuidv4 } from "uuid";

export class DocumentService {
  public documentRepository: DocumentRepository;

  constructor(documentRepository: DocumentRepository) {
    this.documentRepository = documentRepository;
  }

  documents(): DocumentModel[] {
    return this.documentRepository.documents;
  }

  async fetchDocuments(): Promise<DocumentModel[]> {
    return await this.documentRepository.getDocuments();
  }

  sortDocuments(sortValue: "title" | "version" | "createdAt"): DocumentModel[] {
    return this.documentRepository.documents.sort((a, b) =>
      sortValue === "version"
        ? compare(a[sortValue], b[sortValue], ">")
          ? 1
          : -1
        : a[sortValue] > b[sortValue]
        ? 1
        : -1
    );
  }
  createDocument(document: Partial<Document>): void {
    const newDocument = new DocumentModel({
      Title: document.Title as string,
      Version: document.Version as string,
      Contributors: document.Contributors?.map((contributor) => ({
        ID: uuidv4(),
        Name: contributor.Name,
      })) as Contributor[],
      Attachments: document.Attachments as string[],
    });
    this.documentRepository.addDocument(newDocument);
  }
}
