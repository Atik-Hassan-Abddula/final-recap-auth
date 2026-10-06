
"use client";

import { useState } from "react";
import { Link, Button } from "@heroui/react";
import { signOut, useSession } from "@/lib/auth-client";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session,isPending } = useSession();
  if(isPending){
    return <div className="flex justify-center pt-10">
  <span className="loading loading-spinner loading-xl"></span>
</div>
  }

  console.log("user session Navbar", session);

  const links = (
    <>
      <li>
        <Link href="#">Features</Link>
      </li>

      <li>
        <Link
          href="#"
          className="font-medium text-accent"
          aria-current="page"
        >
          Dashboard
        </Link>
      </li>

      <li>
        <Link href="#">Pricing</Link>
      </li>
    </>
  );

  const authlinks = (
    <>
      {session?.user ? (
        <>
          <span>Welcome, {session.user.name}</span>

          <Button onClick={() => signOut()}>
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Link href="/auth/sign-in">
            Sign In
          </Link>

          <Link href="/auth/sign-up">
            <Button>
              Sign Up
            </Button>
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">

        {/* Left side */}
        <div className="flex items-center gap-4">

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>

            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <p className="font-bold">ACME</p>
          </div>
        </div>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-4 md:flex">
          {links}
        </ul>

        {/* Desktop authentication */}
        <div className="hidden items-center gap-4 md:flex">
          {authlinks}
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            {links}

            <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
              {authlinks}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

