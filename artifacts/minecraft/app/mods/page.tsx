import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ModCard from "@/components/ModCard";
import { useEffect, useState } from "react";

export default function ModsPage() {
  const [mods, setMods] = useState([]);

  useEffect(() => {
    const fetchMods = async () => {
      const res = await fetch('/api/mods');
      const data = await res.json();
      setMods(data);
    }
    fetchMods();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Mods</h1>
      <div className="flex gap-4 mb-8">
        <Input placeholder="Search for mods..." className="flex-grow" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Minecraft Version" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1.19">1.19</SelectItem>
            <SelectItem value="1.18">1.18</SelectItem>
            <SelectItem value="1.17">1.17</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fabric">Fabric</SelectItem>
            <SelectItem value="forge">Forge</SelectItem>
          </SelectContent>
        </Select>
        <Button>Search</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mods.map(mod => (
          <ModCard key={mod._id} mod={mod} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button>Load More</Button>
      </div>
    </div>
  );
}
