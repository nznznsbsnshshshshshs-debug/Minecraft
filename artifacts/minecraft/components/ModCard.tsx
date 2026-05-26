import { Button } from "@/components/ui/button";

export default function ModCard({ mod }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <img src={mod.thumbnail} alt={mod.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{mod.title}</h2>
        <p className="text-gray-400 mb-4">{mod.description}</p>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">{mod.minecraftVersion}</p>
          <Button>Download</Button>
        </div>
      </div>
    </div>
  );
}
