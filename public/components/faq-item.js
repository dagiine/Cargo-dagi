// ===============================================
// FAQ ITEM RENDER HELPER
// Web component биш. Нэг FAQ item-ийн HTML string буцаана.
// ===============================================

// HTML дотор текст хийхэд аюулгүй болгоно.
function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Нэг асуулт/хариултын HTML үүсгэнэ.
export function buildFaqItem(faq = {}) {
  const category = faq.category || "Захиалга";
  const question = faq.question || "Асуулт";
  const answer = faq.answer || "";

  return `
    <article class="faq-item" data-category="${escapeHTML(category)}">
      <details>
        <summary>${escapeHTML(question)}</summary>
        <p>${escapeHTML(answer)}</p>
      </details>
    </article>
  `;
}
