"use client";

import { BrainCircuit, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <BrainCircuit className="h-5 w-5" />
                  <span>AI Content Studio</span>
                </Link>
                <Link href="/" className="hover:text-foreground/80">
                  Dashboard
                </Link>
                {/* <Link href="/templates" className="hover:text-foreground/80">
                  Templates
                </Link>
                <Link href="/projects" className="hover:text-foreground/80">
                  Projects
                </Link>
                <Link href="/ads" className="hover:text-foreground/80">
                  Google Ads
                </Link>
                <Link href="/settings" className="hover:text-foreground/80">
                  Settings
                </Link> */}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <BrainCircuit className="h-5 w-5" />
            <span className="hidden md:inline-block">AI Content Studio</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-foreground/80">
              Dashboard
            </Link>
            {/* <Link href="/templates" className="hover:text-foreground/80">
              Templates
            </Link>
            <Link href="/projects" className="hover:text-foreground/80">
              Projects
            </Link>
            <Link href="/ads" className="hover:text-foreground/80">
              Google Ads
            </Link> */}
          </nav>
        </div>
        <div>
          <nav className="flex items-center gap-2 text-sm font-medium ">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
