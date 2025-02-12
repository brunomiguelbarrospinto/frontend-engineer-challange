import { expect, test } from "vitest";

import { renderBellIcon } from "./BellIcon";

test("Should render a Bell icon", () => {
  const icon = renderBellIcon();
  expect(icon).toContain("<svg");
  expect(icon).toContain("svg-bell-icon");
  expect(icon).toContain("</svg>");
});
