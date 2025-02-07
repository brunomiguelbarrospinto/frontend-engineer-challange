import { Document, DocumentModel } from "../domain/DocumentModel";

export class DocumentRepository {
  async getDocuments(): Promise<DocumentModel[]> {
    const response = await fetch(import.meta.env.VITE_API_HOST + "/documents");
    const data = await response.json();
    return data.map((document: Document) => new DocumentModel(document));
  }
}
