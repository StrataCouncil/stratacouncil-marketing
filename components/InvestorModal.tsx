"use client";

import { useEffect, useRef } from "react";
import { InvestorRequestForm } from "@/components/InvestorRequestForm";

/**
 * "Investors" in the footer: opens the investor briefing sign-up in a
 * dialog, with the securities notice at the bottom. A link to /#investors
 * opens it too.
 */
export function InvestorModal() {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (window.location.hash === "#investors") dialog.current?.showModal();
  }, []);

  return (
    <>
      <button type="button" className="link-button" onClick={() => dialog.current?.showModal()}>
        Investors
      </button>
      <dialog
        ref={dialog}
        className="modal"
        aria-label="Investor briefing"
        onClick={(e) => {
          // A click on the backdrop (the dialog element itself) closes it.
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        <div className="modal__body">
          <button type="button" className="modal__close" aria-label="Close" onClick={() => dialog.current?.close()}>
            &times;
          </button>
          <InvestorRequestForm />
          <p className="site-form__legal">
            Investor information is not an offer to sell, or a solicitation of an offer to buy, any securities.
          </p>
        </div>
      </dialog>
    </>
  );
}
