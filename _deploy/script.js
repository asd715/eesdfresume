(async function () {
  let data = window.SITE_DATA;
  const $ = (selector) => document.querySelector(selector);

  const defaults = {
    about: {
      eyebrow: "About",
      title: "我做过很多看起来毫不相关的事。",
      cards: [
        {
          number: "1",
          title: "我一直在追问：这个社会的钱，到底是怎么来的？",
          paragraphs: [
            "大学里，我参加社团、打创赛、做商赛；后来又去摆摊、接 PPT、做数据分析、尝试短视频获客、参加实习。这些经历放在简历里，好像东一块西一块。",
            "但我自己很清楚，我只是在围绕一个问题不断探索。最开始，我在学校里接触的是书本上的商业逻辑。后来一次偶然的机会，我开始主动把自己放进真实的商业环境里，不是为了把经历凑得更丰富，而是想亲自看看一件事从无到有到底是怎么发生的。"
          ]
        },
        {
          number: "2",
          title: "慢慢地，我发现它们绕不开同一条链路。",
          highlight: "需求 → 流量 → 转化 → 交付 → 复购",
          paragraphs: [
            "我开始对每一个环节产生兴趣：用户为什么会停下来看？为什么会咨询？为什么愿意付费？为什么有的人会再次回来？为什么同样的产品，有的人卖得出去，有的人卖不出去？",
            "相比做一个标准意义上的“好学生”，我更喜欢把自己丢进真实场景里观察这些问题。因为我一直想知道：商业到底是怎么运转的，人、需求、流量和交易之间究竟遵循着什么规律。而我后来接触的数据分析、增长运营和 AI 自动化，本质上也只是沿着这条主线继续往前走。"
          ]
        }
      ]
    },
    insights: {
      eyebrow: "Insights",
      title: "我的思考",
      intro: "这里先留给后续文章。等我把聊天记录、项目复盘和商业思考整理出来，会按栏目继续补上。",
      cards: [
        { title: "增长运营", body: "", status: "持续整理中" },
        { title: "用户增长", body: "", status: "持续整理中" },
        { title: "商业闭环", body: "", status: "持续整理中" },
        { title: "AI自动化", body: "", status: "持续整理中" },
        { title: "数据分析", body: "", status: "持续整理中" },
        { title: "个人成长", body: "", status: "持续整理中" }
      ]
    },
    contact: {
      eyebrow: "Contact",
      title: "如果你想聊增长、运营、AI 自动化，或者一个具体问题。",
      items: [
        { label: "3057678053@qq.com", href: "mailto:3057678053@qq.com" },
        { label: "抖音主页", href: "https://v.douyin.com/lefzbaCtyPU" },
        { label: "GitHub / 小红书 / 微信二维码：后续补充", href: "" }
      ]
    }
  };

  async function loadData() {
    try {
      const response = await fetch("content/site.json", { cache: "no-store" });
      if (!response.ok) throw new Error(`content/site.json ${response.status}`);
      data = await response.json();
    } catch (error) {
      console.warn("Using bundled fallback data.", error);
    }
  }

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("growth-lab-theme", theme);
  }

  function render() {
    $("#profile-name").textContent = data.profile.name;
    $("#profile-tagline").textContent = data.profile.tagline;
    $("#profile-subtitle").textContent = data.profile.subtitle;
    $("#portrait").src = data.profile.portrait;

    $("#metrics").innerHTML = data.metrics.map((item) => `
      <article class="metric">
        <strong>${item.value}</strong>
        <span>${item.label}</span>
        <p>${item.note}</p>
      </article>
    `).join("");

    renderAbout(data.about || defaults.about);

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

    renderInsights(data.insights && !Array.isArray(data.insights) ? data.insights : defaults.insights);
    renderContact(data.contact || defaults.contact);

    renderEvidence(Object.keys(data.evidence)[0]);
  }

  function renderAbout(about) {
    $("#about-head").innerHTML = `
      <p class="eyebrow">${about.eyebrow || defaults.about.eyebrow}</p>
      <h2>${about.title || defaults.about.title}</h2>
    `;
    $("#about-grid").innerHTML = (about.cards || []).map((card, index) => `
      <article class="about-card">
        <span class="about-number">${card.number || index + 1}</span>
        <div>
          <h3>${card.title || ""}</h3>
          ${card.highlight ? `<p class="flow-line">${card.highlight}</p>` : ""}
          ${(card.paragraphs || []).map((paragraph) => `<p>${paragraph}</p>`).join("")}
        </div>
      </article>
    `).join("");
  }

  function renderInsights(insights) {
    $("#insights-head").innerHTML = `
      <p class="eyebrow">${insights.eyebrow || defaults.insights.eyebrow}</p>
      <h2>${insights.title || defaults.insights.title}</h2>
      <p>${insights.intro || ""}</p>
    `;
    $("#insights-list").innerHTML = (insights.cards || []).map((item) => `
      <article class="insight-card">
        <strong>${item.title || ""}</strong>
        ${item.body ? `<p>${item.body}</p>` : ""}
        <small>${item.status || ""}</small>
      </article>
    `).join("");
  }

  function renderContact(contact) {
    $("#contact-head").innerHTML = `
      <p class="eyebrow">${contact.eyebrow || defaults.contact.eyebrow}</p>
      <h2>${contact.title || defaults.contact.title}</h2>
    `;
    $("#contact-links").innerHTML = (contact.items || []).map((item) => {
      if (item.href) {
        return `<a href="${item.href}" target="${item.href.startsWith("http") ? "_blank" : "_self"}" rel="noreferrer">${item.label}</a>`;
      }
      return `<span class="muted">${item.label}</span>`;
    }).join("");
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

  await loadData();
  setTheme(localStorage.getItem("growth-lab-theme") || "light");
  render();
})();
