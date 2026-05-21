const asset = (path) => `./assets/${path}`;

const scenes = [
  {
    id: "entrance",
    title: "Bureau of Inner Dragons",
    kicker: "Public Entrance",
    background: asset("web/backgrounds/00-entrance.jpg"),
    audio: asset("audio/00-entrance.mp3"),
  },
  {
    id: "bar",
    title: "Aeltharion Veyl",
    kicker: "Department of Masks & Desire",
    background: asset("web/backgrounds/01-bar.jpg"),
    audio: asset("audio/01-bar.mp3"),
    npcImage: asset("web/npc/01-aeltharion-veil.png"),
    role: "Elven Bartender",
  },
  {
    id: "riot",
    title: "Riot Sylph",
    kicker: "Department of Sparks & Teeth",
    background: asset("web/backgrounds/02-riot.jpg"),
    audio: asset("audio/02-riot.mp3"),
    npcImage: asset("web/npc/02-riot-sylph.png"),
    role: "Punk Fairy",
  },
  {
    id: "workshop",
    title: "Elias Thornweave",
    kicker: "Department of Craft & Element",
    background: asset("web/backgrounds/03-workshop.jpg"),
    audio: asset("audio/03-workshop.mp3"),
    npcImage: asset("web/npc/03-elias-thornweave.png"),
    role: "Artificer",
  },
  {
    id: "mirror",
    title: "Vespera Mirrora",
    kicker: "Department of Dreams & Fractures",
    background: asset("web/backgrounds/04-mirror.jpg"),
    audio: asset("audio/04-mirror.mp3"),
    npcImage: asset("web/npc/04-vespera-mirrora.png"),
    role: "Dream Cartographer",
  },
];

const fallbackText = {
  en: {
    entranceQuestion: "Hello, stranger. Enter? / Привіт. Увійти?",
    entranceWarning:
      "Then mind the threshold. This is not a quiz booth, not exactly. Four Bureau agents will speak with you in your language, each from their own department. Answer honestly or beautifully; the Bureau can usually tell the difference. At the end, your inner dragon will be named, assigned a clan, and prepared for summoning.",
    placeholder: "Answer in any language. The Bureau will follow.",
    required: "The Bureau dislikes empty paperwork. Give them something to ruin beautifully.",
    start: "Answer the door",
    continue: "Enter the Bureau",
    next: "Continue",
    summon: "Summon my dragon",
    restart: "Restart",
    loading: "The Bureau is listening...",
    summoning: "The registry is naming the dragon...",
    imageLoading: "Summoning the portrait card...",
    imageFailed: "The portrait portal flickered. The written registry survived.",
    entering: "Entering",
    continueJourney: "Continue",
    resultLabel: "Your Inner Dragon",
    notesLabel: "Bureau Notes",
  },
  ua: {
    entranceQuestion: "Hello, stranger. Enter? / Привіт. Увійти?",
    entranceWarning:
      "Тоді обережно з порогом. Це не зовсім тест і точно не звичайна анкета. Чотири агенти Бюро говоритимуть із тобою твоєю мовою, кожен зі свого департаменту. Відповідай чесно або красиво; Бюро зазвичай відрізняє одне від іншого. Наприкінці твій внутрішній дракон отримає ім'я, клан і буде підготовлений до призову.",
    placeholder: "Відповідай будь-якою мовою. Бюро підхопить.",
    required: "Бюро не любить порожні бланки. Дай їм хоч щось красиво зіпсувати.",
    start: "Відповісти дверям",
    continue: "Увійти до Бюро",
    next: "Далі",
    summon: "Покликати мого дракона",
    restart: "Спочатку",
    loading: "Бюро слухає...",
    summoning: "Реєстр дає дракону ім'я...",
    imageLoading: "Призиваємо портретну картку...",
    imageFailed: "Портал портрета блимнув. Письмовий реєстр вцілів.",
    entering: "Входимо",
    continueJourney: "Далі",
    resultLabel: "Твій внутрішній дракон",
    notesLabel: "Нотатки Бюро",
  },
};

const mockQuestions = {
  en: {
    bar: [
      "Oh, darling. When love or friendship asks to really see you, what do you show first: charm, honesty, silence, control, or a polished lie?",
      "And when someone disappoints you, do you forgive, perform indifference, disappear, negotiate, or quietly start keeping score?",
      "Last sip. What do you secretly want people to notice about you without making you ask for it?",
    ],
    riot: [
      "Damn it, no polishing. When something tries to break you, what shows up first: teeth, tears, strategy, rage, or that spark that refuses to die?",
      "Where is your line: insult, betrayal, injustice, boredom, control, or someone touching what you love?",
      "If you had to rebel without destroying yourself, what would you protect first?",
    ],
    workshop: [
      "Reality cracked again. Do you reach for steel, wood, code, paper, instinct, theory, or something morally flexible?",
      "Do you trust tools you can hold, systems you can understand, people you can read, or chaos you can ride?",
      "Choose your working element: air, fire, water, earth, shadow, lightning, root, glass, or ink. Why that one?",
    ],
    mirror: [
      "Which fear do you keep dressing up as wisdom?",
      "What dream returns when your guard gets tired?",
      "If your weakness could speak kindly and then mock you, what would it say?",
    ],
  },
  ua: {
    bar: [
      "Ох, золотце. Коли любов або дружба просить побачити тебе по-справжньому, що ти показуєш першим: шарм, чесність, тишу, контроль чи відполіровану брехню?",
      "А коли тебе розчаровують, ти пробачаєш, граєш байдужість, зникаєш, домовляєшся чи тихенько починаєш вести рахунок?",
      "Останній ковток. Що ти потай хочеш, аби люди в тобі помічали, не змушуючи тебе просити?",
    ],
    riot: [
      "Чорт забирай, без лаку. Коли щось намагається тебе зламати, що виходить першим: зуби, сльози, стратегія, лють чи іскра, яка не гасне?",
      "Де твоя межа: образа, зрада, несправедливість, нудьга, контроль чи коли чіпають те, що ти любиш?",
      "Якби треба було збунтуватися і не знищити себе, що б ти захистила першим?",
    ],
    workshop: [
      "Реальність знову тріснула. Ти тягнешся до сталі, дерева, коду, паперу, інстинкту, теорії чи чогось морально гнучкого?",
      "Ти довіряєш інструментам, які можна тримати, системам, які можна зрозуміти, людям, яких можна читати, чи хаосу, на якому можна їхати?",
      "Обери робочу стихію: повітря, вогонь, вода, земля, тінь, блискавка, коріння, скло чи чорнило. Чому вона?",
    ],
    mirror: [
      "Який страх ти переодягаєш у мудрість?",
      "Який сон повертається, коли твоя охорона втомлюється?",
      "Якби твоя слабкість могла спершу говорити ніжно, а потім колоти сарказмом, що б вона сказала?",
    ],
  },
};

const mockResults = {
  en: {
    dragon_clan_id: "nyxara",
    dragon_clan_label: "Nyxara - The Veil Weavers",
    dragon_name: "Vaelryn Ash-of-Mirrors",
    visible_description:
      "The Bureau sees a dragon that protects tenderness with theatre and reads shadows before they have the manners to introduce themselves.",
    bureau_notes: ["intuitive", "guarded", "dramatic in useful ways", "drawn to hidden doors"],
    image_prompt:
      "Create a cinematic fantasy portrait card of a unique dragon. Write the dragon clan on the top of the card: NYXARA - VEIL WEAVERS. Also write the name on the card: Vaelryn Ash-of-Mirrors. Basic palette: deep indigo, silver, black, violet. Clan motifs: stars, mist, crescent moons, translucent fabrics, rune tattoos. Include personal signature details: opal sparks under translucent scales, a tiny key twirling around the tail, silver thread wrapped around one claw. Style: whimsical neo-fantasy, luminous details, dramatic lighting, elegant dragon anatomy, high detail, magical but not cartoonish. Avoid unnecessary heads, deformed wings, or human characters.",
  },
  ua: {
    dragon_clan_id: "nyxara",
    dragon_clan_label: "Nyxara - The Veil Weavers",
    dragon_name: "Vaelryn Ash-of-Mirrors",
    visible_description:
      "Бюро бачить дракона, який захищає ніжність театром і читає тіні раніше, ніж вони встигають чемно представитися.",
    bureau_notes: ["інтуїція", "обережність", "корисна драматичність", "тяжіння до прихованих дверей"],
    image_prompt:
      "Create a cinematic fantasy portrait card of a unique dragon. Write the dragon clan on the top of the card: NYXARA - VEIL WEAVERS. Also write the name on the card: Vaelryn Ash-of-Mirrors. Basic palette: deep indigo, silver, black, violet. Clan motifs: stars, mist, crescent moons, translucent fabrics, rune tattoos. Include personal signature details: opal sparks under translucent scales, a tiny key twirling around the tail, silver thread wrapped around one claw. Style: whimsical neo-fantasy, luminous details, dramatic lighting, elegant dragon anatomy, high detail, magical but not cartoonish. Avoid unnecessary heads, deformed wings, or human characters.",
  },
};

const allowMockFallback =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname.startsWith("192.168.");

const state = {
  index: 0,
  entranceStep: "question",
  language: "en",
  sessionId: window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
  audioOn: true,
  turns: [],
  currentDraft: null,
  pendingFarewell: "",
  pendingNextIndex: null,
  questionIndex: 0,
  resultPrompt: "",
};

const els = {
  scene: document.querySelector("#scene"),
  background: document.querySelector("#sceneBackground"),
  title: document.querySelector("#sceneTitle"),
  kicker: document.querySelector("#sceneKicker"),
  npcCard: document.querySelector("#npcCard"),
  npcImage: document.querySelector("#npcImage"),
  npcName: document.querySelector("#npcName"),
  npcRole: document.querySelector("#npcRole"),
  speaker: document.querySelector("#speakerName"),
  progress: document.querySelector("#progressText"),
  dialogue: document.querySelector("#dialogueText"),
  answer: document.querySelector("#answerInput"),
  primary: document.querySelector("#primaryButton"),
  restart: document.querySelector("#restartButton"),
  audio: document.querySelector("#sceneAudio"),
  summonAudio: document.querySelector("#summonAudio"),
  audioToggle: document.querySelector("#audioToggle"),
  audioIcon: document.querySelector("#audioIcon"),
  copyPrompt: document.querySelector("#copyPromptButton"),
  transition: document.querySelector("#sceneTransition"),
  transitionKicker: document.querySelector("#transitionKicker"),
  transitionTitle: document.querySelector("#transitionTitle"),
};

function text() {
  return fallbackText[state.language];
}

function hasCyrillic(value) {
  return /[А-Яа-яІіЇїЄєҐґ]/.test(value);
}

function updateLanguageFromAnswer(value) {
  if (hasCyrillic(value)) {
    state.language = "ua";
  } else if (/[A-Za-z]/.test(value)) {
    state.language = "en";
  }
}

function playCurrentAudio() {
  if (!state.audioOn) return;
  void els.audio.play().catch(() => {});
}

function setAudio(src, loop = true) {
  if (!els.audio.src.endsWith(src.replace("./", ""))) {
    els.audio.pause();
    els.audio.src = src;
  }
  els.audio.loop = loop;
  playCurrentAudio();
}

function updateAudioButton() {
  els.audioIcon.textContent = state.audioOn ? "♪" : "×";
  els.audioToggle.setAttribute("aria-label", state.audioOn ? "Mute audio" : "Enable audio");
  if (state.audioOn) {
    playCurrentAudio();
  } else {
    els.audio.pause();
    els.summonAudio.pause();
  }
}

function setBusy(isBusy, label = "") {
  els.scene.classList.toggle("is-busy", isBusy);
  els.primary.disabled = isBusy;
  els.answer.disabled = isBusy;
  if (isBusy && label) {
    els.dialogue.textContent = label;
  }
}

function setActionMode(mode) {
  els.primary.dataset.mode = mode;
}

function setSceneShell(index) {
  state.index = index;
  const scene = scenes[index];

  els.scene.dataset.scene = scene.id;
  els.background.style.backgroundImage = `url("${scene.background}")`;
  els.title.textContent = scene.title;
  els.kicker.textContent = scene.kicker;
  els.progress.textContent = index === 0 ? "Entrance" : `${index} / 4`;
  els.answer.value = "";
  els.answer.placeholder = text().placeholder;
  els.copyPrompt.classList.add("is-hidden");

  if (scene.audio) setAudio(scene.audio, true);

  if (index === 0) {
    els.npcCard.classList.add("is-hidden");
    els.speaker.textContent = "The Bureau";
    els.dialogue.textContent =
      state.entranceStep === "question" ? text().entranceQuestion : text().entranceWarning;
    els.primary.textContent = state.entranceStep === "question" ? text().start : text().continue;
    els.answer.classList.toggle("is-hidden", state.entranceStep !== "question");
    if (state.entranceStep === "question") {
      els.answer.focus({ preventScroll: true });
    }
    return;
  }

  els.npcCard.classList.remove("is-hidden");
  els.npcImage.src = scene.npcImage;
  els.npcImage.alt = `${scene.title}, ${scene.role}`;
  els.npcName.textContent = scene.title;
  els.npcRole.textContent = scene.role;
  els.speaker.textContent = scene.title;
  els.answer.classList.remove("is-hidden");
  els.answer.focus({ preventScroll: true });
}

async function enterNpcScene(index, options = {}) {
  await showTransition(scenes[index], options);
  setSceneShell(index);
  state.questionIndex = 0;
  await loadNpcTurn();
}

function showTransition(scene, options = {}) {
  const showLocation = options.showLocation === true;
  const duration = showLocation ? 1900 : 850;

  if (showLocation) {
    els.scene.dataset.scene = scene.id;
    els.background.style.backgroundImage = `url("${scene.background}")`;
    if (scene.audio) setAudio(scene.audio, true);
    els.npcCard.classList.add("is-hidden");
    els.answer.classList.add("is-hidden");
    els.dialogue.textContent = "";
    els.speaker.textContent = text().entering;
    els.progress.textContent = "";
    els.kicker.textContent = scene.kicker;
    els.title.textContent = scene.title;
    return new Promise((resolve) => setTimeout(resolve, duration));
  }

  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

async function loadNpcTurn() {
  const scene = scenes[state.index];
  setBusy(true, text().loading);

  try {
    const turn = await apiPost("/api/npc-turn", {
      sceneId: scene.id,
      language: state.language,
      sessionId: state.sessionId,
      questionIndex: state.questionIndex,
      turns: state.turns,
    });
    applyNpcTurn(turn);
  } catch (error) {
    console.warn("NPC API fallback:", error);
    if (!allowMockFallback) {
      applyApiError(error);
      return;
    }
    const questions = mockQuestions[state.language][scene.id];
    applyNpcTurn({
      npc_reply: state.questionIndex === 0 ? "" : state.language === "ua" ? "Мм. Записала." : "Mm. Noted.",
      question: questions[state.questionIndex],
      trait_updates: {},
      notes_for_final: "Mock fallback turn.",
      farewell: state.language === "ua" ? "Гаразд. Іди далі, поки двері ще вдають, що вони звичайні." : "Good. Go on, before the next door pretends it is ordinary.",
    });
  } finally {
    setBusy(false);
  }
}

function applyNpcTurn(turn) {
  const scene = scenes[state.index];
  const reply = turn.npc_reply ? `${turn.npc_reply}\n\n` : "";
  els.dialogue.textContent = `${reply}${turn.question}`;
  els.primary.textContent = state.questionIndex === 2 && state.index === scenes.length - 1
    ? text().summon || "Summon my dragon"
    : text().next;

  if (state.questionIndex > 0 && state.turns.length > 0) {
    const previous = state.turns[state.turns.length - 1];
    previous.traitUpdates = turn.trait_updates || {};
    previous.notesForFinal = turn.notes_for_final || "";
  }

  state.currentDraft = {
    sceneId: scene.id,
    npcName: scene.title,
    questionIndex: state.questionIndex,
    npcReply: turn.npc_reply || "",
    question: turn.question,
    answer: "",
    traitUpdates: turn.trait_updates || {},
    notesForFinal: "",
    farewell: turn.farewell || "",
  };
}

async function submitNpcAnswer() {
  const answer = els.answer.value.trim();
  if (!answer) {
    els.dialogue.textContent = text().required;
    els.answer.focus();
    return;
  }

  updateLanguageFromAnswer(answer);
  state.currentDraft.answer = answer;
  state.turns.push(state.currentDraft);

  if (state.questionIndex < 2) {
    state.questionIndex += 1;
    els.answer.value = "";
    await loadNpcTurn();
    return;
  }

  if (state.index < scenes.length - 1) {
    state.pendingFarewell =
      state.currentDraft.farewell ||
      (state.language === "ua" ? "Гаразд. Далі тебе чекає інший департамент." : "Good. Another department is waiting.");
    state.pendingNextIndex = state.index + 1;
    els.answer.classList.add("is-hidden");
    els.dialogue.textContent = state.pendingFarewell;
    els.primary.textContent = text().continueJourney;
    setActionMode("handoff");
    return;
  }

  await finalize();
}

async function finalize() {
  setBusy(true, text().summoning);
  els.answer.classList.add("is-hidden");
  els.summonAudio.pause();
  setAudio(asset("audio/Summon Anthem.mp3"), true);

  let result;
  try {
    result = await apiPost("/api/finalize-dragon", {
      language: state.language,
      sessionId: state.sessionId,
      turns: state.turns,
    });
  } catch (error) {
    console.warn("Finalize API fallback:", error);
    if (!allowMockFallback) {
      applyApiError(error);
      return;
    }
    result = mockResults[state.language];
  }

  state.resultPrompt = result.image_prompt;
  showResult(result, null, text().imageLoading);
  setBusy(true);

  try {
    const image = await apiPost("/api/generate-dragon-image", {
      prompt: result.image_prompt,
      dragonName: result.dragon_name,
    });
    showResult(result, image.imageUrl);
  } catch (error) {
    console.warn("Image API failed:", error);
    showResult(result, null, text().imageFailed);
  } finally {
    setBusy(false);
    els.primary.textContent = text().restart;
  }
}

function applyApiError(error) {
  setBusy(false);
  els.answer.classList.add("is-hidden");
  els.dialogue.textContent =
    state.language === "ua"
      ? `Бюро спіткнулося об серверну помилку: ${error.message}. Це не відповідь моделі; треба глянути Railway logs або змінні.`
      : `The Bureau hit a server error: ${error.message}. This is not the model's answer; check Railway logs or variables.`;
  els.primary.textContent = text().restart;
  state.index = scenes.length;
}

function showResult(result, imageUrl, imageStatus = "") {
  state.index = scenes.length;
  const notes = Array.isArray(result.bureau_notes) ? result.bureau_notes : [];
  const imageMarkup = imageUrl
    ? `<img class="dragon-portrait" src="${imageUrl}" alt="${escapeHtml(result.dragon_name)} portrait card" />`
    : `<div class="dragon-portrait dragon-portrait--pending">${escapeHtml(imageStatus || text().imageLoading)}</div>`;

  els.title.textContent = state.language === "ua" ? "Дракон відповів" : "The Dragon Has Answered";
  els.kicker.textContent = "Final Registry";
  els.speaker.textContent = "The Bureau";
  els.progress.textContent = "Result";
  els.npcCard.classList.add("is-hidden");
  els.answer.classList.add("is-hidden");
  els.dialogue.innerHTML = `
    <div class="result-layout">
      <article class="result-card result-card--image">
        ${imageMarkup}
      </article>
      <aside class="result-card result-card--notes">
        <small>${escapeHtml(text().resultLabel)}</small>
        <h2>${escapeHtml(result.dragon_name)}</h2>
        <p><strong>${escapeHtml(result.dragon_clan_label)}</strong></p>
        <p>${escapeHtml(result.visible_description)}</p>
        <small>${escapeHtml(text().notesLabel)}</small>
        <ul class="traits">${notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>
      </aside>
    </div>
  `;
}

function handlePrimary() {
  if (els.primary.dataset.mode === "handoff") {
    const nextIndex = state.pendingNextIndex;
    state.pendingFarewell = "";
    state.pendingNextIndex = null;
    setActionMode("normal");
    void enterNpcScene(nextIndex, { showLocation: true });
    return;
  }

  if (state.index === 0) {
    if (state.entranceStep === "question") {
      const answer = els.answer.value.trim();
      if (!answer) {
        els.dialogue.textContent = text().required;
        els.answer.focus();
        return;
      }

      updateLanguageFromAnswer(answer);
      state.entranceStep = "warning";
      playCurrentAudio();
      setSceneShell(0);
      return;
    }

    playCurrentAudio();
    void enterNpcScene(1);
    return;
  }

  if (state.index >= scenes.length) {
    restart();
    return;
  }

  void submitNpcAnswer();
}

function restart() {
  state.index = 0;
  state.entranceStep = "question";
  state.language = "en";
  state.turns = [];
  state.currentDraft = null;
  state.pendingFarewell = "";
  state.pendingNextIndex = null;
  state.questionIndex = 0;
  state.resultPrompt = "";
  setActionMode("normal");
  els.dialogue.innerHTML = "";
  setSceneShell(0);
}

async function apiPost(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.error || `Request failed: ${response.status}`);
  }
  return data;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

els.primary.addEventListener("click", handlePrimary);
els.restart.addEventListener("click", restart);
els.audioToggle.addEventListener("click", () => {
  state.audioOn = !state.audioOn;
  updateAudioButton();
});
els.answer.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    handlePrimary();
  }
});

updateAudioButton();
setSceneShell(0);
