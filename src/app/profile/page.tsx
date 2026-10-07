import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import {
  BookOpen,
  CheckCircle2,
  Mail,
  PlusCircle,
  ShieldCheck,
  UserRound,
  PenLine,
} from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/");
  }

  const user = session.user;

  const initials =
    user.name
      ?.split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <main className="min-h-[calc(100vh-70px)] bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        {/* =====================================================
            PROFILE HEADER
        ====================================================== */}
        <section className="mb-10 flex flex-col gap-6 sm:mb-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            {/* Small label */}
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />

              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Sanctuary Account
              </span>
            </div>

            <h1 className="font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
              Your Profile
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Contemplative registry, authenticated literary identity, and
              active editorial credentials.
            </p>
          </div>

          {/* Create Post */}
          <Button asChild className="h-11 w-full rounded-full px-6 sm:w-fit">
            <Link className="flex items-center" href="/post/create">
              <PlusCircle className="mr-2 size-4" />
              <span>Create Post</span>
            </Link>
          </Button>
        </section>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}
        <section className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
          {/* ===================================================
              ACCOUNT INFORMATION CARD
          ==================================================== */}
          <Card className="rounded-2xl border-border bg-card shadow-none">
            <CardHeader className="px-6 pt-7 sm:px-8 sm:pt-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <CardTitle className="font-serif text-2xl font-medium">
                    Account Information
                  </CardTitle>

                  <CardDescription className="mt-2 text-sm">
                    Your Profile Information
                  </CardDescription>
                </div>

                {/* Session Status */}
                <div className="flex w-fit items-center gap-2 rounded-full bg-muted px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />

                  <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                    Session Active
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-6 pb-7 sm:px-8 sm:pb-8">
              <div className="mt-7 grid grid-cols-1 gap-8 md:grid-cols-[150px_minmax(0,1fr)] md:items-center">
                {/* Avatar */}
                <div className="flex justify-start">
                  <div className="relative">
                    <div className="flex h-28 w-28 items-center justify-center rounded-full border border-border bg-background">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name || "Profile"}
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="font-serif text-4xl text-foreground">
                          {initials}
                        </span>
                      )}
                    </div>

                    {/* Verification badge */}
                    <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border border-background bg-background shadow-sm">
                      <CheckCircle2 className="size-5 text-amber-500" />
                    </div>
                  </div>
                </div>

                {/* User Information */}
                <div className="space-y-5">
                  {/* Name */}
                  <div className="flex flex-col gap-2 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                    <div className="flex items-center gap-3">
                      <UserRound className="size-4 text-muted-foreground" />

                      <span className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
                        Name:
                      </span>
                    </div>

                    <span className="text-base font-medium text-foreground sm:text-right">
                      {user.name}
                    </span>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                    <div className="flex items-center gap-3">
                      <Mail className="size-4 text-muted-foreground" />

                      <span className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
                        Email:
                      </span>
                    </div>

                    <span className="break-all text-sm text-foreground sm:text-right">
                      {user.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Account Information */}
              <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <ShieldCheck className="size-4 shrink-0" />

                  <span>End-to-end encrypted Chronicle identity</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">UID</span>

                  <span className="max-w-[220px] truncate rounded-md bg-muted px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground">
                    {user.id}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ===================================================
              RIGHT SIDE
          ==================================================== */}
          <div className="grid grid-cols-1 gap-5">
            {/* Editorial Pulse */}
            <Card className="rounded-2xl border-border bg-card shadow-none">
              <CardContent className="p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    Editorial Pulse
                  </span>

                  <BookOpen className="size-5 text-amber-500" />
                </div>

                <p className="mt-5 font-serif text-xl font-medium italic leading-8 text-foreground">
                  "The written word remains the only permanent record of human
                  consciousness."
                </p>

                <div className="mt-7 flex items-center justify-between gap-4">
                  <span className="text-sm text-muted-foreground">
                    Archival Standing
                  </span>

                  <span className="text-sm font-medium text-foreground">
                    Fellow Contributor
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Dispatch Gateway */}
            <Card className="rounded-2xl border-border bg-card shadow-none">
              <CardContent className="p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <PenLine className="size-4 text-muted-foreground" />

                  <span className="text-xs font-medium uppercase tracking-[0.1em] text-foreground">
                    Dispatch Gateway
                  </span>
                </div>

                <p className="mt-5 text-sm leading-6 text-muted-foreground">
                  Ready to share your next observation, essay, or intellectual
                  thesis with the community?
                </p>

                <Button
                  asChild
                  variant="secondary"
                  className="mt-5 h-11 w-full justify-between rounded-full px-5"
                >
                  <Link href="/post/create">
                    <span>Open Minimalist Editor</span>

                    <span className="text-lg text-muted-foreground">→</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
