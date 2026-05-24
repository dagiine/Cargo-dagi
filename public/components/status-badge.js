// ===============================================
// STATUS BADGE RENDER HELPER
// Web component биш. Зүгээр HTML string буцаадаг helper.
// Ашиглах variant:
// 1. home     -> Нүүр хуудасны алхам
// 2. header   -> Захиалгын card-ийн дээд төлөв
// 3. timeline -> Захиалгын timeline алхам
// ===============================================

// Attribute / HTML дотор текст хийхэд аюулгүй болгоно.
function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Нүүр хуудасны step badge.
function homeBadge(icon, status, description) {
  return `
    <article class="status-badge status-badge--home step">
      <div class="step-icon">
        <span class="material-symbols-outlined">${escapeHTML(icon)}</span>
      </div>
      <span class="step-label">${escapeHTML(status)}</span>
      <p>${escapeHTML(description)}</p>
    </article>
  `;
}

// Захиалгын card-ийн дээд талын төлөв.
// Icon, border, background ашиглахгүй.
// Status болон шинэчлэгдсэн огноо 2 тусдаа мөрөөр гарна.
function headerBadge(status, date) {
  return `
    <div class="status-badge status-badge--header">
      <strong class="status-badge__status">${escapeHTML(status)}</strong>
      ${date ? `<span class="status-badge__date">Шинэчлэгдсэн: ${escapeHTML(date)}</span>` : ""}
    </div>
  `;
}

// Захиалгын timeline дээрх нэг status badge.
function timelineBadge(icon, status, date, state) {
  return `
    <li class="status-badge status-badge--timeline step ${escapeHTML(state)}">
      <span class="step-icon material-symbols-outlined">${escapeHTML(icon)}</span>
      <span class="status-badge__text">
        <span class="step-label">${escapeHTML(status)}</span>
        <small class="step-date">${escapeHTML(date || "...")}</small>
      </span>
    </li>
  `;
}

// Нэг function-оор 3 төрлийн badge зурна.
export function buildStatusBadge(options = {}) {
  const variant = options.variant || "home";
  const icon = options.icon || "circle";
  const status = options.status || "Төлөв";
  const description = options.description || "";
  const date = options.date || "";
  const state = options.state || "";

  if (variant === "timeline") {
    return timelineBadge(icon, status, date, state);
  }

  if (variant === "header") {
    return headerBadge(status, date);
  }

  return homeBadge(icon, status, description);
}
