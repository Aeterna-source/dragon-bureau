# AI Contract

The production version should not hardcode NPC dialogue.

The app should send GPT-5.5 structured scene data:

- NPC name, role, scene, acting formula, forbidden tone;
- the current conversation language inferred from the player's input;
- the player's prior answers;
- the current department goal;
- the dragon clan list.

GPT-5.5 should generate:

- one in-character line or reaction;
- one in-character question when needed;
- hidden trait signals for clan scoring;
- final clan, dragon name, visible description, and an English Image Gen prompt for a collectible fantasy CCG hero card.

Flow rule:

- each NPC asks exactly 3 questions;
- questions are asked one at a time;
- before questions 2 and 3, the NPC briefly reacts to the player's previous answer in character;
- after the final Vespera answer, the registry finalizes the clan, dragon name, visible notes, and hidden Image Gen prompt.

Visible text should follow the player's language. The hidden Image Gen prompt should be generated in English for image quality and should not be shown in the player UI. The generated image should be a collectible card: dragon name at top, clan and short description below the image, flavor text at the bottom.
