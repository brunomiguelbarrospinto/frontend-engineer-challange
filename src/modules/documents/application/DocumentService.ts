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
}
