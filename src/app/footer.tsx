import Link from "next/link";

export function Footer() {
  return (
    <div className="h-40 bg-gray-100 mt-12 flex items-center">
      <div className="container mx-auto flex-col gap-4 md:flex-row flex  md:justify-between items-center">
        <div>FileHaven</div>

        <Link className="text-blue-900 hover:text-blue-500" href="/privacy">
          Privacy Policy
        </Link>
        <Link
          className="text-blue-900 hover:text-blue-500"
          href="/terms-of-service"
        >
          Terms of Service
        </Link>
        <Link className="text-blue-900 hover:text-blue-500" href="/about">
          About
        </Link>
      </div>
    </div>
  );
}
