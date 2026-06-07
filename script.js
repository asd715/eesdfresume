(function () {
  const data = window.SITE_DATA;
  const $ = (selector) => document.querySelector(selector);

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("growth-lab-theme", theme);
  }

  function render() {
    $("#profile-name").textContent = data.profile.name;
    $("#profile-tagline").textContent = data.profile.tagline;
    $("#profile-subtitle").textContent = data.profile.subtitle;
    $("#portrait").src = data.profile.portrait;
    $("#email-link").href = `mailto:${data.profile.email}`;
    $("#email-link").textContent = data.profile.email;
    $("#douyin-link").href = data.profile.douyin;

    $("#metrics").innerHTML = data.metrics.map((item) => `
      <article class="metric">
        <strong>${item.value}</strong>
        <span>${item.label}</span>
        <p>${item.note}</p>
      </article>
    `).join("");

    $("#cases-grid").innerHTML = data.cases.map((item, index) => `
      <article class="case-card">
        <div>
          <span class="case-tag">0${index + 1} / ${item.tag}</span>
          <h3>${item.title}</h3>
          <p>${item.body}</p>
        </div>
        <div class="case-result">${item.result}</div>
      </article>
    `).join("");

    $("#archive-list").innerHTML = data.archive.map((item, index) => `
      <article class="timeline-item"><strong>0${index + 1}</strong>${item}</article>
    `).join("");

    $("#research-list").innerHTML = data.research.map((item) => `<span>${item}</span>`).join("");

    $("#insights-list").innerHTML = data.insights.map((item) => `
      <article class="insight-card">
        <strong>${item}</strong>
        <small>持续整理中</small>
      </article>
    `).join("");

    renderEvidence(Object.keys(data.evidence)[0]);
  }

  function renderEvidence(activeKey) {
    const keys = Object.keys(data.evidence);
    $("#tabs").innerHTML = keys.map((key) => `
      <button class="tab ${key === activeKey ? "active" : ""}" type="button" data-tab="${key}">
        ${data.evidence[key].label}
      </button>
    `).join("");

    const items = data.evidence[activeKey].items;
    $("#evidence-grid").innerHTML = items.map((item) => `
      <article class="evidence-card" data-src="${item.src}" data-title="${item.title}" data-desc="${item.desc}">
        <img src="${item.src}" alt="${item.title}" loading="lazy">
        <div class="evidence-copy">
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
        </div>
      </article>
    `).join("");
  }

  document.addEventListener("click", (event) => {
    const tab = event.target.closest(".tab");
    if (tab) renderEvidence(tab.dataset.tab);

    const card = event.target.closest(".evidence-card");
    if (card) {
      const box = $("#lightbox");
      box.querySelector("img").src = card.dataset.src;
      box.querySelector("img").alt = card.dataset.title;
      box.querySelector("p").textContent = `${card.dataset.title}｜${card.dataset.desc}`;
      box.classList.add("open");
      box.setAttribute("aria-hidden", "false");
    }

    if (event.target.closest(".lightbox-close") || event.target.id === "lightbox") {
      const box = $("#lightbox");
      box.classList.remove("open");
      box.setAttribute("aria-hidden", "true");
    }
  });

  $(".theme-toggle").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(next);
  });

  setTheme(localStorage.getItem("growth-lab-theme") || "light");
  render();
})();
