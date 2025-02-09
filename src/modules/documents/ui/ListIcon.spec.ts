import { expect, test } from "vitest";

import { renderListIcon } from "./ListIcon";

test("Should render a list icon", () => {
  const listIcon = renderListIcon();
  expect(listIcon).toContain("<svg");
  expect(listIcon).toContain("svg-list-icon");
  expect(listIcon).toContain("</svg>");
});
