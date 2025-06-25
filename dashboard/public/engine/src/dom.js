// new proj/engine/src/dom.js
export function personalize(parentSelector, clickCounts) {
  const parent = document.querySelector(parentSelector);
  if (!parent) return;

  const sections = Array.from(parent.children);

  // Sort sections based on click counts
  sections.sort((a, b) => {
    const aCount = clickCounts[a.dataset.cluster] || 0;
    const bCount = clickCounts[b.dataset.cluster] || 0;
    return bCount - aCount; // Descending order
  });

  // Clear existing highlights from all sections
  sections.forEach(sec => sec.classList.remove("highlighted"));

  // Append sorted sections back to the parent
  sections.forEach(sec => parent.appendChild(sec));

  // Highlight the new top section
  if (sections.length > 0) {
    sections[0].classList.add("highlighted");
  }
}