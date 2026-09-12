import fs from "fs";
import path from "path";
import { FullGameState, initialDefaultState } from "./default-state";

const DATA_DIR = path.join(process.cwd(), "data");
const STATE_FILE = path.join(DATA_DIR, "gamestate.json");

function ensureDirectoryExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getServerGameState(): FullGameState {
  try {
    ensureDirectoryExists();
    if (!fs.existsSync(STATE_FILE)) {
      fs.writeFileSync(STATE_FILE, JSON.stringify(initialDefaultState, null, 2), "utf8");
      return initialDefaultState;
    }
    const data = fs.readFileSync(STATE_FILE, "utf8");
    return JSON.parse(data) as FullGameState;
  } catch (error) {
    console.error("Error reading server game state:", error);
    return initialDefaultState;
  }
}

export function saveServerGameState(state: FullGameState): FullGameState {
  try {
    ensureDirectoryExists();
    const stateToSave = {
      ...state,
      lastUpdated: new Date().toISOString(),
    };
    fs.writeFileSync(STATE_FILE, JSON.stringify(stateToSave, null, 2), "utf8");
    return stateToSave;
  } catch (error) {
    console.error("Error writing server game state:", error);
    return state;
  }
}

export function resetServerGameState(): FullGameState {
  try {
    ensureDirectoryExists();
    const freshState = {
      ...initialDefaultState,
      lastUpdated: new Date().toISOString(),
    };
    fs.writeFileSync(STATE_FILE, JSON.stringify(freshState, null, 2), "utf8");
    return freshState;
  } catch (error) {
    console.error("Error resetting server game state:", error);
    return initialDefaultState;
  }
}
