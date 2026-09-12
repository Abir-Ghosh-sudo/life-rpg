import { NextResponse } from "next/server";
import { resetServerGameState } from "@/lib/game/server-storage";

export async function POST() {
  try {
    const freshState = resetServerGameState();
    return NextResponse.json({
      success: true,
      message: "Game state successfully reset to Level 1",
      data: freshState,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to reset game state on backend" },
      { status: 500 }
    );
  }
}
