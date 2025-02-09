export function renderSelect() {
  const sortOptionValues = [
    { value: "title", text: "Title" },
    { value: "version", text: "Version" },
    { value: "createdAt", text: "Created At" },
  ];

  return /* HTML */ `<select id="sort-select">
    <option value="">Select one...</option>
    ${sortOptionValues
      .map(
        (optionValue) =>
          `<option value="${optionValue.value}">${optionValue.text}</option>`
      )
      .join("")}
  </select>`;
}
