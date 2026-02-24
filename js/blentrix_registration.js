document.addEventListener("DOMContentLoaded", function () {
  const radios = document.querySelectorAll('input[name="reg_type"]');
  const individual = document.getElementById("individualSection");
  const organization = document.getElementById("organizationBlock");

  function toggleSections() {
    const selected = document.querySelector(
      'input[name="reg_type"]:checked',
    )?.value;
    if (selected === "organization") {
      if (individual) individual.style.display = "none";
      if (organization) organization.style.display = "";
    } else {
      if (organization) organization.style.display = "none";
      if (individual) individual.style.display = "";
    }
  }

  radios.forEach((r) => r.addEventListener("change", toggleSections));
  toggleSections(); // run once on load

  // Add delegate row (+)
  const delegateRows = document.getElementById("delegateRows");
  const addBtn = document.getElementById("addDelegateBtn");

  function renumberDelegates() {
    const rows = delegateRows
      ? delegateRows.querySelectorAll("[data-delegate-row]")
      : [];
    rows.forEach((row, idx) => {
      const label = row.querySelector("label");
      if (label) label.innerHTML = idx + 1 + '. Name<span class="req">*</span>';
    });
  }

  function addDelegateRow() {
    if (!delegateRows) return;

    const currentCount = delegateRows.querySelectorAll(
      "[data-delegate-row]",
    ).length;
    const newIndex = currentCount + 1;

    const row = document.createElement("div");
    row.setAttribute("data-delegate-row", "1");
    row.className = "field";
    row.style.cssText =
      "display:flex; gap:10px; align-items:center; margin-bottom:12px;";

    row.innerHTML = `
          <div style="display: flex; width: 100%;">
                    <div style="width: 100%;">
                      <label>Name :<span class="req">*</span></label>
                    <input type="text" name="delegate_details[]" placeholder="e.g., Arjun Kumar">
                    </div>
                    <div style="width: 100%;">
                      <label>Designation :<span class="req">*</span></label>
                    <input type="text" name="delegate_details[]" placeholder="e.g., Purchase Manager">
                    </div>
                  </div>
          <button type="button"
            aria-label="Remove delegate"
            style="height:40px; width:40px; border-radius:6px; border:1px solid var(--line); background:#fff; font-size:18px; cursor:pointer; margin-top:25px">
            −
          </button>
        `;

    row.querySelector("button").addEventListener("click", () => {
      row.remove();
      renumberDelegates();
    });

    delegateRows.appendChild(row);
    renumberDelegates();
  }

  // Make sure first row is counted
  const firstRow = delegateRows
    ? delegateRows.querySelector("[data-delegate-row]")
    : null;
  if (firstRow) {
    firstRow.setAttribute("data-delegate-row", "1");
  }
  if (addBtn) {
    addBtn.addEventListener("click", addDelegateRow);
  }

  const toggleBtn = document.querySelector(".menu-toggle");
  const nav = document.getElementById("siteNav");
  console.log("hello");
  if (toggleBtn && nav) {
    toggleBtn.addEventListener("click", () => {
      nav.classList.toggle("is-open");

      const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
      toggleBtn.setAttribute("aria-expanded", !expanded);
    });
  }
});
