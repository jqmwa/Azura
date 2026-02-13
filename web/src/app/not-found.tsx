import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6">
      <span className="text-6xl font-bold text-purple-500">404</span>
      <h1 className="text-2xl font-bold text-gray-50">Page not found</h1>
      <p className="max-w-md text-center text-gray-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="mt-4">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
