import { expect, test } from "vitest";

import { renderGridIcon } from "./GridIcon";

test("Should render a Grid icon", () => {
  const gridIcon = renderGridIcon();
  expect(gridIcon).toContain("<svg");
  expect(gridIcon).toContain("svg-grid-icon");
  expect(gridIcon).toContain("</svg>");
});
