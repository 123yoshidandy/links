const tagsEl = document.getElementById("tags");
const gridEl = document.getElementById("grid");
const countEl = document.getElementById("count");
const clearEl = document.getElementById("clear");
const emptyEl = document.getElementById("empty");

let links = [];
const selected = new Set();

// 選択中のタグをすべて持つリンクだけを返す（AND条件）
function filterLinks(tags) {
  return links.filter((link) => [...tags].every((tag) => link.tags.includes(tag)));
}

function createTagButton(tag) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "tag";
  button.textContent = tag;
  button.setAttribute("aria-pressed", String(selected.has(tag)));
  button.addEventListener("click", () => toggleTag(tag));
  return button;
}

function createCard(link) {
  const li = document.createElement("li");
  li.className = "card";

  const a = document.createElement("a");
  a.className = "card-link";
  a.href = link.url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";

  const img = document.createElement("img");
  img.className = "thumb";
  img.src = link.thumbnail;
  img.alt = "";
  img.loading = "lazy";

  const body = document.createElement("div");
  body.className = "card-body";
  const name = document.createElement("h2");
  name.className = "card-name";
  name.textContent = link.name;
  body.append(name);
  if (link.description) {
    const desc = document.createElement("p");
    desc.className = "card-desc";
    desc.textContent = link.description;
    body.append(desc);
  }

  a.append(img, body);

  const tags = document.createElement("div");
  tags.className = "card-tags";
  tags.append(...link.tags.map(createTagButton));

  li.append(a, tags);
  return li;
}

function renderTags() {
  const allTags = [...new Set(links.flatMap((link) => link.tags))].sort((a, b) => a.localeCompare(b, "ja"));
  const buttons = allTags.map((tag) => {
    const button = createTagButton(tag);
    // 追加で選ぶと0件になるタグは押せないようにする
    if (!selected.has(tag)) {
      button.disabled = filterLinks([...selected, tag]).length === 0;
    }
    return button;
  });
  tagsEl.replaceChildren(...buttons);
}

function render() {
  const visible = filterLinks(selected);
  renderTags();
  gridEl.replaceChildren(...visible.map(createCard));
  countEl.textContent = `${visible.length} / ${links.length} 件`;
  clearEl.hidden = selected.size === 0;
  emptyEl.hidden = visible.length > 0;
}

function toggleTag(tag) {
  if (selected.has(tag)) {
    selected.delete(tag);
  } else {
    selected.add(tag);
  }
  render();
}

clearEl.addEventListener("click", () => {
  selected.clear();
  render();
});

fetch("links.json")
  .then((res) => res.json())
  .then((data) => {
    links = data;
    render();
  })
  .catch(() => {
    emptyEl.textContent = "links.json の読み込みに失敗しました";
    emptyEl.hidden = false;
  });
