import { Document, DocumentModel } from "../domain/DocumentModel";

export class DocumentRepository {
  public documents: DocumentModel[] = [];

  async getDocuments(): Promise<DocumentModel[]> {
    const response = await fetch(import.meta.env.VITE_API_HOST + "/documents");
    const data = await response.json();
    this.documents.push(
      ...data.map((document: Document) => new DocumentModel(document))
    );
    return this.documents;
  }

  async addDocument(document: DocumentModel): Promise<void> {
    /* await fetch(import.meta.env.VITE_API_HOST + "/documents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(document),
    }); */

    this.documents.push(document);
  }
}
