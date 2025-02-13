import "./styles/documents.css";

import { DocumentRepository } from "./infrastructure/DocumentRepository";
import { DocumentService } from "./application/DocumentService";
import { DocumentUI } from "./ui/DocumentUI";

export function initDocumentsModule() {
  const documentRepository = new DocumentRepository();
  const documentService = new DocumentService(documentRepository);
  const documentUI = new DocumentUI(documentService);
  documentUI.renderDocuments();
}
