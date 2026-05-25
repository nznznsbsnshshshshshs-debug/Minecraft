import { useGetYouTubeRSS } from "@workspace/api-client-react";

export default function YoutubePage() {
  const { data, isLoading } = useGetYouTubeRSS();

  const videos = data?.videos ?? [];

  return (
    <main className="min-h-screen bg-black text-white p-5">
      <h1 className="text-4xl font-bold mb-6 text-green-400">
        YGP YouTube Feed
      </h1>

      {isLoading ? (
        <p className="text-gray-400">
          Loading videos...
        </p>
      ) : videos.length === 0 ? (
        <p className="text-red-400">
          No videos available
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {videos.map((video) => (
            <a
              key={video.videoId}
              href={video.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-green-400 transition"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full aspect-video object-cover"
              />

              <div className="p-4">
                <p className="text-green-400 text-sm mb-2">
                  {video.channel}
                </p>

                <h2 className="font-bold line-clamp-2">
                  {video.title}
                </h2>

                <p className="text-gray-400 text-sm mt-2">
                  {new Date(video.published).toLocaleDateString()}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
