"use client";

import { useEffect, useRef, useState } from "react";
import { DemoRequestForm } from "@/components/DemoRequestForm";

/**
 * The closing call to action (2026-11-25): two buttons, as in the approved
 * design. Request a demo opens the demo request form in place; it also
 * opens when the page is reached at #demo (the header and hero links), so
 * every "Request a demo" still lands on the form.
 */
export function DemoReveal({ signupUrl }: { signupUrl: string }) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => {
      if (window.location.hash === "#demo") setOpen(true);
    };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  useEffect(() => {
    if (open) panel.current?.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true });
  }, [open]);

  return (
    <>
      <div className="actions">
        <button
          type="button"
          className="button button-primary"
          aria-expanded={open}
          aria-controls="demo-form"
          onClick={() => setOpen(true)}
          data-testid="closer-demo"
        >
          Request a demo <span aria-hidden="true">&rarr;</span>
        </button>
        <a href={signupUrl} className="button button-secondary">
          Start free training
        </a>
      </div>
      <div className="panel closer__form" id="demo-form" ref={panel} hidden={!open}>
        <DemoRequestForm page="home" legal />
      </div>
    </>
  );
}
