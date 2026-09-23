import { Construction } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="flex items-center gap-3">
        <Construction className="h-8 w-8" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Hyuga Labs - Under Construction
        </h1>
      </div>
    </div>
  );
}
