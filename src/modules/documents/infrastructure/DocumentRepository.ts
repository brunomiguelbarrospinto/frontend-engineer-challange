import { Document, DocumentModel } from "../domain/DocumentModel";

export class DocumentRepository {
  async getDocuments(): Promise<DocumentModel[]> {
    const response = await fetch("http://localhost:8080/documents");
    const data = await response.json();
    return data.map((document: Document) => new DocumentModel(document));
  }
}
