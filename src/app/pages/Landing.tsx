import { Link } from "react-router";
import { BookOpen, Calendar, CheckCircle2, Flame, ListChecks, Rocket, Timer } from "lucide-react";
import { Button } from "../components/ui/button";

export function Landing() {
  return (
    <main
      className="min-h-screen px-6 py-16"
      style={{ background: "linear-gradient(135deg, #FAF8F3 0%, #f5f0e8 100%)" }}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col">
        <section className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <BookOpen className="h-8 w-8 text-white" />
          </div>

          <h1 className="text-5xl" style={{ fontFamily: "var(--font-heading)" }}>
            TaskFlow
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Turn chaotic school weeks into a game plan you can actually follow.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild className="h-11 rounded-xl px-6">
              <Link to="/login">Get Started</Link>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-xl px-6">
              <Link to="/app/dashboard">Open Dashboard</Link>
            </Button>
          </div>
        </section>

        <section className="mt-12 grid gap-4 text-left md:grid-cols-3">
          <article className="rounded-2xl border border-border bg-white p-5 shadow-sm transition-transform hover:-translate-y-1">
            <ListChecks className="mb-3 h-5 w-5 text-primary" />
            <h2 className="text-lg">Track Tasks</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Stack assignments by urgency and stop missing hidden deadlines.
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-white p-5 shadow-sm transition-transform hover:-translate-y-1">
            <Calendar className="mb-3 h-5 w-5 text-primary" />
            <h2 className="text-lg">Plan Ahead</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              See your week at a glance so exam prep never sneaks up on you.
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-white p-5 shadow-sm transition-transform hover:-translate-y-1">
            <Flame className="mb-3 h-5 w-5 text-primary" />
            <h2 className="text-lg">Keep Streaks</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Build momentum with quick daily wins and visible progress.
            </p>
          </article>
        </section>

        <section className="mt-10 rounded-3xl border border-border bg-white/80 p-6 shadow-sm">
          <h3 className="text-2xl" style={{ fontFamily: "var(--font-heading)" }}>
            A tiny demo day in TaskFlow
          </h3>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-muted/40 p-4">
              <Timer className="mb-2 h-5 w-5 text-primary" />
              <p className="text-sm text-muted-foreground">8:00 AM</p>
              <p className="mt-1 font-medium">Check upcoming deadlines</p>
            </div>
            <div className="rounded-2xl bg-muted/40 p-4">
              <Rocket className="mb-2 h-5 w-5 text-primary" />
              <p className="text-sm text-muted-foreground">2:00 PM</p>
              <p className="mt-1 font-medium">Finish one high-priority task</p>
            </div>
            <div className="rounded-2xl bg-muted/40 p-4">
              <CheckCircle2 className="mb-2 h-5 w-5 text-primary" />
              <p className="text-sm text-muted-foreground">9:00 PM</p>
              <p className="mt-1 font-medium">Close the day with clear wins</p>
            </div>
          </div>
        </section>

        <section className="mt-10 mb-6 flex flex-col items-center rounded-3xl border border-border bg-primary px-6 py-10 text-center text-primary-foreground">
          <h3 className="text-3xl" style={{ fontFamily: "var(--font-heading)" }}>
            Ready to make deadlines less dramatic?
          </h3>
          <p className="mt-3 max-w-2xl text-sm text-primary-foreground/90">
            Short setup. Clear priorities. More progress. That is the whole vibe.
          </p>
          <Button asChild variant="secondary" className="mt-6 h-11 rounded-xl px-6">
            <Link to="/login">Start in 30 seconds</Link>
          </Button>
        </section>
      </div>
    </main>
  );
}
