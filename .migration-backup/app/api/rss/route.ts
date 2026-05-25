import { NextResponse } from "next/server";
import { getAllYouTubeRSS } from "@/lib/rss";

export async function GET() {
  try {
    const videos = await getAllYouTubeRSS();

    return NextResponse.json({
      success: true,
      count: videos.length,
      videos,
    });
  } catch (error) {
    console.error("API RSS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "RSS fetch failed",
      },
      {
        status: 500,
      }
    );
  }
}
