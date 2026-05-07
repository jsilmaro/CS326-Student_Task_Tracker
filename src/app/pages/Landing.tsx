import { Link } from "react-router";
import { BookOpen, Calendar, ListChecks } from "lucide-react";
import { Button } from "../components/ui/button";

export function Landing() {
  return (
    <main
      className="min-h-screen px-6 py-16"
      style={{ background: "linear-gradient(135deg, #FAF8F3 0%, #f5f0e8 100%)" }}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
          <BookOpen className="h-8 w-8 text-white" />
        </div>

        <h1 className="text-5xl" style={{ fontFamily: "var(--font-heading)" }}>
          TaskFlow
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          A simple student task tracker for assignments, calendars, and daily progress.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="h-11 rounded-xl px-6">
            <Link to="/login">Get Started</Link>
          </Button>
          <Button asChild variant="outline" className="h-11 rounded-xl px-6">
            <Link to="/app/dashboard">Open Dashboard</Link>
          </Button>
        </div>

        <section className="mt-12 grid w-full gap-4 text-left md:grid-cols-3">
          <article className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <ListChecks className="mb-3 h-5 w-5 text-primary" />
            <h2 className="text-lg">Track Tasks</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Organize assignments by priority and due date.
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <Calendar className="mb-3 h-5 w-5 text-primary" />
            <h2 className="text-lg">Plan Ahead</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Stay on top of deadlines with a clear calendar view.
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <BookOpen className="mb-3 h-5 w-5 text-primary" />
            <h2 className="text-lg">Build Habits</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Keep momentum through focused daily progress.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
