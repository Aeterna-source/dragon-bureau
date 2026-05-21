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
      "Then mind the threshold. This is a place where what lives inside you will be given form: your own inner Dragon. This is not quite a test and certainly not an ordinary questionnaire. Four agents from different Bureau departments will speak with you in your language. Answer honestly, and do not fear your own words. At the end, once you pass the trial of sincerity, your inner dragon will be prepared for summoning. Wait a few minutes while the artist paints the portrait. Beware: lies bend the mirrors.",
    placeholder: "Answer in any language. The Bureau will follow.",
    required: "The Bureau dislikes empty paperwork. Give them something to ruin beautifully.",
    start: "Answer the door",
    continue: "Enter the Bureau",
    next: "Continue",
    summon: "Summon my dragon",
    restart: "Restart",
    loading: "The Bureau is listening...",
    summoning: "The registry is naming the dragon...",
    imageLoading: "The portrait portal is working. This can take a couple of minutes; the written registry is already safe.",
    imageFailed: "The portrait portal did not answer in time. The written registry survived, and the image prompt can be copied.",
    copyPrompt: "Copy Image Prompt",
    copied: "Prompt copied",
    entering: "Entering",
    continueJourney: "Continue",
    resultLabel: "Your Inner Dragon",
    notesLabel: "Bureau Notes",
  },
  ua: {
    entranceQuestion: "Hello, stranger. Enter? / Привіт. Увійти?",
    entranceWarning:
      "Тоді обережно з порогом. Це місце, де те, що у тебе всередині, отримає форму: твого власного внутрішнього Дракона. Це не зовсім тест і точно не звичайна анкета. Чотири агенти із різних департаментів Бюро говоритимуть із тобою твоєю мовою. Відповідай чесно і не бійся слів. Наприкінці, коли ти пройдеш випробування щирістю, твій внутрішній дракон буде підготовлений до призову. Лиш зачекай кілька хвилин, поки художник робитиме портрет. Стережись: брехня викривляє дзеркала.",
    placeholder: "Відповідай будь-якою мовою. Бюро підхопить.",
    required: "Бюро не любить порожні бланки. Дай їм хоч щось красиво зіпсувати.",
    start: "Відповісти дверям",
    continue: "Увійти до Бюро",
    next: "Далі",
    summon: "Покликати мого дракона",
    restart: "Спочатку",
    loading: "Бюро слухає...",
    summoning: "Реєстр дає дракону ім'я...",
    imageLoading: "Портретний портал працює. Це може тривати кілька хвилин; письмовий реєстр уже в безпеці.",
    imageFailed: "Портретний портал не відповів вчасно. Письмовий реєстр вцілів, а prompt можна скопіювати.",
    copyPrompt: "Скопіювати prompt",
    copied: "Prompt скопійовано",
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

const sceneVolume = 0.18;
const summonVolume = 0.28;
const progressKey = "dragon-bureau-progress-v2";

const state = {
  index: 0,
  entranceStep: "question",
  language: "en",
  sessionId: window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
  audioOn: true,
  turns: [],
  currentDraft: null,
  draftAnswer: "",
  pendingFarewell: "",
  pendingNextIndex: null,
  questionIndex: 0,
  resultPrompt: "",
  currentResult: null,
  resultImageUrl: "",
  resultImageStatus: "",
  imageRequestId: 0,
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
  els.audio.volume = els.audio.dataset.volume ? Number(els.audio.dataset.volume) : sceneVolume;
  void els.audio.play().catch(() => {});
}

function setAudio(src, loop = true, volume = sceneVolume) {
  if (!els.audio.src.endsWith(src.replace("./", ""))) {
    els.audio.pause();
    els.audio.src = src;
  }
  els.audio.dataset.volume = String(volume);
  els.audio.volume = volume;
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

function saveProgress() {
  try {
    localStorage.setItem(progressKey, JSON.stringify({
      version: 2,
      savedAt: Date.now(),
      index: state.index,
      entranceStep: state.entranceStep,
      language: state.language,
      sessionId: state.sessionId,
      audioOn: state.audioOn,
      turns: state.turns,
      currentDraft: state.currentDraft,
      draftAnswer: state.draftAnswer,
      pendingFarewell: state.pendingFarewell,
      pendingNextIndex: state.pendingNextIndex,
      questionIndex: state.questionIndex,
      resultPrompt: state.resultPrompt,
      currentResult: state.currentResult,
      resultImageUrl: state.resultImageUrl,
      resultImageStatus: state.resultImageStatus,
    }));
  } catch {
    // Some private browser modes disable localStorage; the quest still works without resume.
  }
}

function restoreProgress() {
  try {
    const raw = localStorage.getItem(progressKey);
    if (!raw) return false;

    const saved = JSON.parse(raw);
    if (saved.version !== 2 || !Number.isInteger(saved.index)) return false;

    state.index = Math.max(0, Math.min(saved.index, scenes.length));
    state.entranceStep = saved.entranceStep === "warning" ? "warning" : "question";
    state.language = saved.language === "ua" ? "ua" : "en";
    state.sessionId = saved.sessionId || state.sessionId;
    state.audioOn = saved.audioOn !== false;
    state.turns = Array.isArray(saved.turns) ? saved.turns : [];
    state.currentDraft = saved.currentDraft || null;
    state.draftAnswer = saved.draftAnswer || "";
    state.pendingFarewell = saved.pendingFarewell || "";
    state.pendingNextIndex = Number.isInteger(saved.pendingNextIndex) ? saved.pendingNextIndex : null;
    state.questionIndex = Math.max(0, Math.min(Number(saved.questionIndex || 0), 2));
    state.resultPrompt = saved.resultPrompt || "";
    state.currentResult = saved.currentResult || null;
    state.resultImageUrl = saved.resultImageUrl || "";
    state.resultImageStatus = saved.resultImageStatus || "";
    return true;
  } catch {
    return false;
  }
}

function clearProgress() {
  try {
    localStorage.removeItem(progressKey);
  } catch {
    // Ignore storage failures; restart should still reset the in-memory state.
  }
}

function renderDialogueParts(parts) {
  const lines = parts
    .map((part) => String(part || "").trim())
    .filter(Boolean);

  els.dialogue.innerHTML = lines.map((line) => `<span>${escapeHtml(line)}</span>`).join("");
}

function setNpcCard(scene, isVisible = true) {
  els.npcCard.classList.toggle("is-hidden", !isVisible);
  els.npcImage.src = scene.npcImage;
  els.npcImage.alt = `${scene.title}, ${scene.role}`;
  els.npcName.textContent = scene.title;
  els.npcRole.textContent = scene.role;
}

function preloadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = resolve;
    image.src = src;
  });
}

function setSceneShell(index, options = {}) {
  state.index = index;
  const scene = scenes[index];
  const hideNpc = options.hideNpc === true;

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

  setNpcCard(scene, !hideNpc);
  els.speaker.textContent = scene.title;
  els.answer.classList.remove("is-hidden");
  if (!hideNpc) {
    els.answer.focus({ preventScroll: true });
  }
}

async function enterNpcScene(index, options = {}) {
  const scene = scenes[index];
  await showTransition(scene, options);
  setSceneShell(index, { hideNpc: true });
  state.questionIndex = 0;
  state.currentDraft = null;
  state.draftAnswer = "";
  saveProgress();
  await Promise.all([loadNpcTurn(), preloadImage(scene.npcImage)]);
  setNpcCard(scene, true);
  els.answer.focus({ preventScroll: true });
}

function showTransition(scene, options = {}) {
  const showLocation = options.showLocation === true;
  const duration = showLocation ? 2200 : 700;

  if (showLocation) {
    els.scene.classList.add("is-previewing");
    els.scene.dataset.scene = scene.id;
    els.background.style.backgroundImage = `url("${scene.background}")`;
    if (scene.audio) setAudio(scene.audio, true);
    els.npcCard.classList.add("is-hidden");
    els.answer.classList.add("is-hidden");
    els.dialogue.innerHTML = "";
    els.speaker.textContent = text().entering;
    els.progress.textContent = "";
    els.kicker.textContent = scene.kicker;
    els.title.textContent = scene.title;
    return new Promise((resolve) => {
      setTimeout(() => {
        els.scene.classList.remove("is-previewing");
        resolve();
      }, duration);
    });
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
  renderDialogueParts([turn.npc_reply, turn.question]);
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
  state.draftAnswer = "";
  saveProgress();
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
  state.draftAnswer = "";
  saveProgress();

  if (state.questionIndex < 2) {
    state.questionIndex += 1;
    state.currentDraft = null;
    els.answer.value = "";
    saveProgress();
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
    saveProgress();
    return;
  }

  await finalize();
}

async function finalize() {
  setBusy(true, text().summoning);
  els.answer.classList.add("is-hidden");
  els.summonAudio.pause();
  setAudio(asset("audio/Summon Anthem.mp3"), true, summonVolume);

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
  const imageRequestId = ++state.imageRequestId;
  showResult(result, null, text().imageLoading);
  setBusy(false);
  els.primary.textContent = text().restart;

  try {
    const image = await apiPost("/api/generate-dragon-image", {
      prompt: result.image_prompt,
      dragonName: result.dragon_name,
    }, { timeoutMs: 180000 });
    if (imageRequestId !== state.imageRequestId) return;
    showResult(result, image.imageUrl);
  } catch (error) {
    console.warn("Image API failed:", error);
    if (imageRequestId !== state.imageRequestId) return;
    showResult(result, null, text().imageFailed);
  } finally {
    if (imageRequestId === state.imageRequestId) {
      setBusy(false);
      els.primary.textContent = text().restart;
    }
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
  state.currentResult = result;
  state.resultImageUrl = imageUrl || "";
  state.resultImageStatus = imageStatus || "";
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
  els.copyPrompt.classList.toggle("is-hidden", !state.resultPrompt);
  els.copyPrompt.textContent = text().copyPrompt;
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
  saveProgress();
}

function handlePrimary() {
  if (els.primary.dataset.mode === "handoff") {
    const nextIndex = state.pendingNextIndex;
    state.pendingFarewell = "";
    state.pendingNextIndex = null;
    setActionMode("normal");
    saveProgress();
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
      state.draftAnswer = "";
      playCurrentAudio();
      setSceneShell(0);
      saveProgress();
      return;
    }

    playCurrentAudio();
    saveProgress();
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
  clearProgress();
  state.index = 0;
  state.entranceStep = "question";
  state.language = "en";
  state.turns = [];
  state.currentDraft = null;
  state.draftAnswer = "";
  state.pendingFarewell = "";
  state.pendingNextIndex = null;
  state.questionIndex = 0;
  state.resultPrompt = "";
  state.currentResult = null;
  state.resultImageUrl = "";
  state.resultImageStatus = "";
  state.imageRequestId += 1;
  setActionMode("normal");
  els.dialogue.innerHTML = "";
  setSceneShell(0);
}

function resumeSavedScreen() {
  updateAudioButton();

  if (state.index >= scenes.length && state.currentResult) {
    showResult(state.currentResult, state.resultImageUrl, state.resultImageStatus || text().imageFailed);
    setBusy(false);
    els.primary.textContent = text().restart;
    return;
  }

  if (state.index >= scenes.length) {
    restart();
    return;
  }

  setSceneShell(state.index);

  if (state.index === 0) {
    els.answer.value = state.draftAnswer;
    return;
  }

  if (state.pendingNextIndex !== null && state.pendingFarewell) {
    els.answer.classList.add("is-hidden");
    els.dialogue.textContent = state.pendingFarewell;
    els.primary.textContent = text().continueJourney;
    setActionMode("handoff");
    return;
  }

  if (state.currentDraft?.question && state.currentDraft.questionIndex === state.questionIndex) {
    renderDialogueParts([state.currentDraft.npcReply, state.currentDraft.question]);
    els.answer.value = state.draftAnswer;
    els.primary.textContent = state.questionIndex === 2 && state.index === scenes.length - 1
      ? text().summon || "Summon my dragon"
      : text().next;
    return;
  }

  void loadNpcTurn();
}

async function apiPost(url, payload, options = {}) {
  const timeoutMs = options.timeoutMs || 120000;
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || data.error || `Request failed: ${response.status}`);
    }
    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
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
els.answer.addEventListener("input", () => {
  state.draftAnswer = els.answer.value;
  saveProgress();
});
els.copyPrompt.addEventListener("click", async () => {
  if (!state.resultPrompt) return;
  await navigator.clipboard.writeText(state.resultPrompt);
  els.copyPrompt.textContent = text().copied;
  window.setTimeout(() => {
    els.copyPrompt.textContent = text().copyPrompt;
  }, 1400);
});

if (restoreProgress()) {
  resumeSavedScreen();
} else {
  updateAudioButton();
  setSceneShell(0);
}
