import { DocumentModel } from "../domain/DocumentModel";
import { type DocumentRepository } from "../infrastructure/DocumentRepository";

export class DocumentService {
  public documentRepository: DocumentRepository;

  constructor(documentRepository: DocumentRepository) {
    this.documentRepository = documentRepository;
  }

  async fetchDocuments(): Promise<DocumentModel[]> {
    return await this.documentRepository.getDocuments();
  }

  sortDocuments(sortValue: "title" | "version" | "createdAt"): DocumentModel[] {
    return this.documentRepository.documents.sort((a, b) =>
      a[sortValue] > b[sortValue] ? 1 : -1
    );
  }
}
