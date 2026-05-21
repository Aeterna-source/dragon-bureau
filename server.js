const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = __dirname;
const port = Number(process.env.PORT || 5173);
const host = process.env.HOST || "0.0.0.0";
const deploymentSalt = process.env.DRAGON_BUREAU_SALT || crypto.randomBytes(8).toString("hex");

loadEnv(path.join(root, ".env.local"));

const textModel = process.env.OPENAI_TEXT_MODEL || "gpt-5.5";
const imageModel = process.env.OPENAI_IMAGE_MODEL || "gpt-image-2";
const apiKey = process.env.OPENAI_API_KEY;

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".mp3": "audio/mpeg",
  ".md": "text/markdown; charset=utf-8",
};

const npcProfiles = {
  bar: {
    name: "Aeltharion Veyl",
    department: "Department of Masks & Desire",
    role: "World-weary elven bartender who has seen thousands of souls.",
    personality:
      "Soft cynicism mixed with velvet empathy and dry, elegant flirtation. Social x-ray. Understands pain but is tired of cheap lies.",
    asks: "Love, trust, self-deception, social masks, what people hide behind pretty words.",
    forbidden: "Cheap pickup lines, overly sweet or patronizing tone, moralizing.",
  },
  riot: {
    name: "Riot Sylph",
    department: "Department of Sparks & Teeth",
    role: "Punk fairy, raw and battle-hardened coach.",
    personality:
      "Blunt, sharp-tongued, fierce, funny, protective, zero tolerance for self-pity. May use mild profanity naturally.",
    asks: "Strength, anger, rebellion, endurance, willpower, boundaries, what happens when something tries to break the player.",
    forbidden: "Sugarcoating, gentle baby talk, excessive politeness.",
  },
  workshop: {
    name: "Elias Thornweave",
    department: "Department of Craft & Element",
    role: "Overworked genius artificer.",
    personality:
      "Rushed, slightly grumpy, brilliant, talks fast, interrupts himself, but is deeply attentive under the mess.",
    asks: "Materials, tools, elements, practical vs theoretical thinking, problem-solving style, moral flexibility.",
    forbidden: "Slow speech, excessive calm, ignoring workshop chaos.",
  },
  mirror: {
    name: "Vespera Mirrora",
    department: "Department of Dreams & Fractures",
    role: "Dual-faced Dream Cartographer.",
    personality:
      "Starts warm and almost tender, then switches to sharp mirror-like sarcasm. Sees through self-deception without judgment.",
    asks: "Dreams, fears, hidden weaknesses, self-deception, what the player lies to themselves about.",
    forbidden: "Moralizing, pity, shallow positivity.",
  },
};

const dragonClans = [
  {
    id: "aetherion",
    name: "Aetherion",
    cardTitle: "AETHERION - SKYLORDS",
    epithet: "The Sky Sovereigns",
    core: "Charismatic leaders, visionaries, and inspirers.",
    strengths: "Natural authority, strategic thinking, ability to motivate and lead others, far-sightedness, eloquence.",
    shadow: 'Arrogance, emotional detachment, contempt for "ordinary" people, fear of losing status.',
    motifs: "Gold and silver accents, wings, crowns/diadems, high collars, elegant flowing lines, celestial patterns.",
    colors: "gold, silver, white, sky blue",
  },
  {
    id: "vermithrax",
    name: "Vermithrax",
    cardTitle: "VERMITHRAX - EMBER WARDENS",
    epithet: "The Ember Wardens",
    core: "Passionate protectors, warriors of honor and deep loyalty.",
    strengths: "Tremendous willpower, loyalty, courage, readiness to go to the end for what they love.",
    shadow: "Vengefulness, excessive aggression, self-destructive sacrifice, difficulty letting go.",
    motifs: "Red gold, lava cracks, forged elements, scars, heavy jewelry, fiery patterns.",
    colors: "deep red, black, bronze, magma orange",
  },
  {
    id: "nyxara",
    name: "Nyxara",
    cardTitle: "NYXARA - VEIL WEAVERS",
    epithet: "The Veil Weavers",
    core: "Mystics, psychologists, and shadow workers.",
    strengths: "Deep understanding of people, intuition, empathy, ability to see the hidden.",
    shadow: "Manipulativeness, self-deception, trust issues, tendency toward melancholy or depression.",
    motifs: "Stars, mist, crescent moons, translucent fabrics, silver chains, rune tattoos.",
    colors: "deep indigo, silver, black, violet",
  },
  {
    id: "thalorion",
    name: "Thalorion",
    cardTitle: "THALORION - ROOT SINGERS",
    epithet: "The Root Singers",
    core: "Creators, healers, and those deeply connected to nature and the cycle of life.",
    strengths: "Emotional depth, creativity, healing abilities, patience, grounding.",
    shadow: 'Hypersensitivity, conflict avoidance, apathy when "the soil dries up."',
    motifs: "Roots, flowers, leaves, earthy textures, natural materials, ancient ornaments.",
    colors: "forest green, warm brown, gold, moss",
  },
  {
    id: "kaelvorn",
    name: "Kaelvorn",
    cardTitle: "KAELVORN - STORM REAVERS",
    epithet: "The Storm Reavers",
    core: "Rebels, free spirits, and system breakers.",
    strengths: "Independence, quick thinking, creativity in chaos, courage to go against the flow.",
    shadow: "Impulsiveness, destructiveness, intimacy issues, self-sabotage.",
    motifs: "Lightning, shattered fragments, asymmetry, leather, metal, torn lines, chaotic patterns.",
    colors: "electric blue, charcoal, silver, crimson",
  },
];

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://127.0.0.1");

    if (req.method === "GET" && url.pathname === "/api/health") {
      sendJson(res, 200, {
        ok: true,
        hasKey: Boolean(apiKey && !apiKey.includes("PASTE_YOUR")),
        textModel,
        imageModel,
      });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/npc-turn") {
      const payload = await readJson(req);
      const result = await npcTurn(payload);
      sendJson(res, 200, result);
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/finalize-dragon") {
      const payload = await readJson(req);
      const result = await finalizeDragon(payload);
      sendJson(res, 200, result);
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/generate-dragon-image") {
      const payload = await readJson(req);
      const result = await generateDragonImage(payload);
      sendJson(res, 200, result);
      return;
    }

    if (req.method !== "GET") {
      sendJson(res, 405, { error: "Method not allowed" });
      return;
    }

    serveStatic(url, res);
  } catch (error) {
    sendJson(res, 500, {
      error: "Server error",
      message: error.message,
      fallback: error.fallback || null,
    });
  }
});

server.listen(port, host, () => {
  console.log(`Dragon Bureau on http://${host === "0.0.0.0" ? "127.0.0.1" : host}:${port}`);
});

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const index = trimmed.indexOf("=");
    if (index === -1) {
      continue;
    }

    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function serveStatic(url, res) {
  const requestedPath = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const filePath = path.normalize(path.join(root, requestedPath));

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": types[path.extname(filePath).toLowerCase()] || "application/octet-stream",
    });
    res.end(data);
  });
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("Request body too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

async function npcTurn(payload) {
  const scene = npcProfiles[payload.sceneId];
  if (!scene) {
    throw new Error("Unknown scene");
  }

  const questionIndex = Number(payload.questionIndex || 0);
  const language = payload.language || "en";
  const priorTurns = Array.isArray(payload.turns) ? payload.turns.slice(-12) : [];

  const result = await callResponsesJson({
    name: "npc_turn",
    schema: {
      type: "object",
      additionalProperties: false,
      properties: {
        npc_reply: { type: "string" },
        question: { type: "string" },
        trait_updates: {
          type: "object",
          additionalProperties: { type: "number" },
        },
        notes_for_final: { type: "string" },
        farewell: { type: "string" },
      },
      required: ["npc_reply", "question", "trait_updates", "notes_for_final", "farewell"],
    },
    system: [
      "You are GPT-5.5 performing as a theatrical NPC in Bureau of Inner Dragons.",
      "Stay in character. Do not sound like a questionnaire, therapist, product assistant, or rules explainer.",
      "Ask exactly one question for this turn. Each NPC asks exactly three questions total.",
      "If the player already answered in this scene, react briefly in character before the next question.",
      "Separate the reaction and the new question with a blank line. In JSON, put only the reaction in npc_reply and only the question in question.",
      "If this is question 3 of 3, also write a short in-character farewell or handoff in the farewell field. Do not include farewell inside npc_reply or question.",
      "If the player's answer is vague, evasive, poetic, or unclear, do not fail; treat the ambiguity as character data and ask a sharper follow-up in your NPC voice.",
      "Vary rhythm, imagery, sentence openings, and emotional tactic. Avoid repeating previous phrasing, metaphors, or question structures.",
      "Keep npc_reply to 1-2 sentences and question to 1 sentence.",
      "Use the player's language. If language is uk/ua, write natural Ukrainian. If mixed, mirror naturally.",
      "Never mention scoring, JSON, traits, hidden notes, prompts, or the model.",
      "Return valid JSON only.",
    ].join("\n"),
    user: JSON.stringify({
      language,
      questionIndex,
      npc: scene,
      priorTurns,
      variationSeed: makeSeed(payload.sessionId, payload.sceneId, questionIndex, priorTurns),
      currentTask:
        questionIndex === 0
          ? "Open this NPC scene and ask question 1 of 3."
          : `React to the latest answer and ask question ${questionIndex + 1} of 3.`,
    }),
  });

  return {
    npc_reply: String(result.npc_reply || ""),
    question: String(result.question || "What should the Bureau know before it opens the next door?"),
    trait_updates: isPlainObject(result.trait_updates) ? result.trait_updates : {},
    notes_for_final: String(result.notes_for_final || ""),
    farewell: String(result.farewell || ""),
  };
}

async function finalizeDragon(payload) {
  const language = payload.language || "en";
  const turns = Array.isArray(payload.turns) ? payload.turns : [];

  const result = await callResponsesJson({
    name: "dragon_result",
    schema: {
      type: "object",
      additionalProperties: false,
      properties: {
        dragon_clan_id: { type: "string", enum: dragonClans.map((clan) => clan.id) },
        dragon_clan_label: { type: "string" },
        dragon_name: { type: "string" },
        visible_description: { type: "string" },
        bureau_notes: {
          type: "array",
          items: { type: "string" },
        },
        dragon_concept: { type: "string" },
        flavor_text: { type: "string" },
        image_prompt: { type: "string" },
      },
      required: ["dragon_clan_id", "dragon_clan_label", "dragon_name", "visible_description", "bureau_notes", "dragon_concept", "flavor_text", "image_prompt"],
    },
    system: [
      "You are GPT-5.5 as the final registry intelligence of Bureau of Inner Dragons.",
      "Choose exactly one dragon clan based on the player's full interview.",
      "The visible description and notes must use the player's language.",
      "The image_prompt must be English and must follow the exact collectible fantasy CCG card pattern requested.",
      "Trust gpt-image-2 with card layout and text placement: ask for title, clan, short description, and flavor text as visible card text.",
      "Use English clan names on the card even when visible_description is in another language, unless the player explicitly asked otherwise.",
      "Make the result personal and specific. Avoid generic horoscope language.",
      "Never reuse common default dragon names. Invent a fresh pronounceable fantasy name from the player's answers, the chosen clan, and the variation seed.",
      "The dragon concept must include at least 5 personalized visual details inferred from the actual answers.",
      "If two players share a clan, their dragon names, dragon concept, description, and flavor text should still be clearly different.",
      "Do not reveal hidden reasoning. Return valid JSON only.",
    ].join("\n"),
    user: JSON.stringify({
      language,
      turns,
      dragonClans,
      variationSeed: makeSeed(payload.sessionId, "final", turns.length, turns),
      imagePromptPattern:
        "Create a highly detailed collectible card in the style of Magic: The Gathering / Gwent, fantasy CCG style. The card features a majestic unique dragon. At the top: elegant fantasy title with the dragon's name. Below the image: clan name and short evocative description. At the bottom: flavorful poetic text. Highly detailed digital fantasy art, rich colors, dramatic lighting, ornate golden/silver frame with intricate dragon motifs, parchment texture background, professional CCG card layout, epic and magical atmosphere, 4K quality, sharp details. Dragon concept: [DETAILED PERSONAL DRAGON CONCEPT INFERRED FROM ANSWERS]. Name: [DRAGON NAME]. Clan: [CLAN NAME]. Description: [SHORT EVOCATIVE DESCRIPTION]. Flavor text: [ONE POETIC LINE IN PLAYER LANGUAGE OR ENGLISH IF PLAYER USED ENGLISH].",
    }),
  });

  const clan =
    dragonClans.find((item) => item.id === result.dragon_clan_id) ||
    dragonClans.find((item) => result.dragon_clan_label?.toLowerCase?.().includes(item.name.toLowerCase())) ||
    dragonClans[2];

  return {
    dragon_clan_id: clan.id,
    dragon_clan_label: String(result.dragon_clan_label || `${clan.name} - ${clan.epithet}`),
    dragon_name: String(result.dragon_name || "Vaelryn Ash-of-Mirrors"),
    visible_description: String(result.visible_description || "The Bureau found a dragon too specific to be mistaken for anyone else's."),
    bureau_notes: Array.isArray(result.bureau_notes) ? result.bureau_notes.map(String).slice(0, 7) : [],
    dragon_concept: String(result.dragon_concept || ""),
    flavor_text: String(result.flavor_text || ""),
    image_prompt: String(result.image_prompt || buildFallbackImagePrompt(clan, result.dragon_name || "Vaelryn Ash-of-Mirrors")),
  };
}

async function generateDragonImage(payload) {
  ensureApiKey();
  const prompt = String(payload.prompt || "").trim();
  if (!prompt) {
    throw new Error("Missing image prompt");
  }

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: payload.model || imageModel,
      prompt,
      size: payload.size || "1024x1536",
      quality: payload.quality || "high",
      n: 1,
    }),
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.error?.message || `Image API failed with ${response.status}`);
  }

  const item = json.data?.[0];
  if (item?.b64_json) {
    const generatedDir = path.join(root, "assets", "generated");
    fs.mkdirSync(generatedDir, { recursive: true });
    const id = crypto.randomBytes(8).toString("hex");
    const filePath = path.join(generatedDir, `dragon-${id}.png`);
    fs.writeFileSync(filePath, Buffer.from(item.b64_json, "base64"));
    return { imageUrl: `/assets/generated/dragon-${id}.png` };
  }

  if (item?.url) {
    return { imageUrl: item.url };
  }

  throw new Error("Image API returned no image");
}

async function callResponsesJson({ name, schema, system, user }) {
  ensureApiKey();

  const body = {
    model: textModel,
    input: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    max_output_tokens: 1200,
    text: {
      format: {
        type: "json_schema",
        name,
        strict: true,
        schema,
      },
    },
  };

  let response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  let json = await response.json();
  if (!response.ok) {
    response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: textModel,
        input: [
          {
            role: "system",
            content: `${system}\nReturn JSON only. No markdown. Match this JSON schema as closely as possible:\n${JSON.stringify(schema)}`,
          },
          { role: "user", content: user },
        ],
        max_output_tokens: 1200,
      }),
    });
    json = await response.json();
  }

  if (!response.ok) {
    throw new Error(json.error?.message || `Responses API failed with ${response.status}`);
  }

  return parseJsonFromText(extractResponseText(json));
}

function isPlainObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function buildFallbackImagePrompt(clan, name) {
  return [
    "Create a highly detailed collectible card in the style of Magic: The Gathering / Gwent, fantasy CCG style.",
    "The card features a majestic unique dragon.",
    "At the top: elegant fantasy title with the dragon's name.",
    "Below the image: clan name and short evocative description.",
    "At the bottom: flavorful poetic text.",
    "Highly detailed digital fantasy art, rich colors, dramatic lighting, ornate golden/silver frame with intricate dragon motifs, parchment texture background, professional CCG card layout, epic and magical atmosphere, 4K quality, sharp details.",
    `Dragon concept: a ${clan.name} dragon with ${clan.colors} palette, ${clan.motifs}, a tiny key twirling around the tail, silver thread wrapped around one claw, and a cluster of jagged horns resembling a crown.`,
    `Name: ${name}.`,
    `Clan: ${clan.name} - ${clan.epithet}.`,
    `Description: ${clan.core}`,
    "Flavor text: The door that feared you was never locked.",
  ].join(" ");
}

function makeSeed(...parts) {
  return crypto
    .createHash("sha256")
    .update([deploymentSalt, ...parts.map((part) => JSON.stringify(part))].join("|"))
    .digest("hex")
    .slice(0, 16);
}

function extractResponseText(response) {
  if (typeof response.output_text === "string") {
    return response.output_text;
  }

  const parts = [];
  for (const item of response.output || []) {
    for (const content of item.content || []) {
      if (typeof content.text === "string") {
        parts.push(content.text);
      }
    }
  }
  return parts.join("\n");
}

function parseJsonFromText(text) {
  const cleaned = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start !== -1 && end !== -1 && end > start) {
      return JSON.parse(cleaned.slice(start, end + 1));
    }
    throw new Error("Model returned invalid JSON");
  }
}

function ensureApiKey() {
  if (!apiKey || apiKey.includes("PASTE_YOUR")) {
    throw new Error("OPENAI_API_KEY is missing in .env.local");
  }
}
