import { Button } from "@/components/ui/button";

export default function ServerPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Minecraft Server</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Server Status</h2>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-lg">Status: <span className="text-green-500">Online</span></p>
            <p className="text-lg">Players: <span className="text-yellow-500">10/100</span></p>
            <p className="text-lg">Version: <span className="text-blue-500">1.19</span></p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Join the Server</h2>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-lg mb-4">IP Address: <span className="text-yellow-500">play.yojitgamingpro.com</span></p>
            <Button>Copy IP</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
