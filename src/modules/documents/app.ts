import { DocumentRepository } from "./infrastructure/DocumentRepository";
import { DocumentService } from "./application/DocumentService";
import { DocumentUI } from "./ui/DocumentUI";

export function initDocumentsModule() {
  const documentRepository = new DocumentRepository();
  const documentService = new DocumentService(documentRepository);
  const documentUI = new DocumentUI(documentService);
  documentUI.renderDocuments();
  /* 
  const ws = new WebSocket("ws://localhost:8080/notifications");

  ws.onopen = () => {
    console.log("Connected to WebSocket server");
  };

  ws.onmessage = (event) => {
    console.log("Received:", event.data);
  };

  ws.onclose = () => {
    console.log("WebSocket connection closed");
  };

  function sendMessage() {
    const message = "Hello from the client!";
    ws.send(message);
    console.log("Sent:", message);
  } */
}
