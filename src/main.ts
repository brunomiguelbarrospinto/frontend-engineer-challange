import "./style.css";

import { initDocumentsModule } from "./modules/documents/app";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
   <div>Documents</div>
   <div id="documents"></div>
  </div>
`;

initDocumentsModule();
