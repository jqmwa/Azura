import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="relative flex flex-col items-center gap-6">
        <Image
          src="/azura-character.png"
          alt="Azura"
          width={320}
          height={420}
          className="drop-shadow-[0_0_40px_rgba(99,102,241,0.15)]"
          priority
        />
        <div className="flex flex-col items-center gap-2 -mt-4">
          <span className="text-7xl font-bold text-purple-400">
            404
          </span>
          <h1 className="text-xl font-semibold text-gray-50">
            This page got lost in the void
          </h1>
          <p className="max-w-sm text-center text-sm text-gray-400">
            Even Azura couldn&apos;t find what you&apos;re looking for. Let&apos;s
            get you back on track.
          </p>
        </div>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
