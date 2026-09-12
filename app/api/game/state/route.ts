import { NextResponse } from "next/server";
import { getServerGameState, saveServerGameState } from "@/lib/game/server-storage";
import type { FullGameState } from "@/lib/game/default-state";

export async function GET() {
  try {
    const state = getServerGameState();
    return NextResponse.json({
      success: true,
      source: "backend",
      data: state,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to retrieve game state from backend" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as FullGameState;
    if (!body || !body.character) {
      return NextResponse.json(
        { success: false, error: "Invalid game state payload" },
        { status: 400 }
      );
    }
    const saved = saveServerGameState(body);
    return NextResponse.json({
      success: true,
      source: "backend",
      data: saved,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to save game state to backend" },
      { status: 500 }
    );
  }
}
