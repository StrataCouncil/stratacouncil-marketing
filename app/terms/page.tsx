import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Terms & Conditions — StrataCouncil.ca",
  description:
    "The terms that govern use of StrataCouncil.ca, its free training platform, and the StrataSphere governance subscription.",
};

const EFFECTIVE_DATE = "[Effective date — set before publishing]";

export default function TermsPage() {
  return (
    <>
      <header className="site-header">
        <div className="wrap site-header__inner">
          <Link href="/" className="wordmark" data-testid="header-logo-link">
            <Logo className="wordmark__mark" />
            <span>StrataCouncil.ca</span>
          </Link>
          <nav aria-label="Primary" className="site-nav">
            <Link href="/#built-for">What you&rsquo;ll learn</Link>
            <Link href="/#who-its-for">Who it&rsquo;s for</Link>
            <Link href="/join" className="button button-primary" data-testid="nav-cta">
              Start Learning
            </Link>
          </nav>
        </div>
      </header>

      <main className="wrap">
        <article className="legal">
          <h1>Terms &amp; Conditions</h1>
          <p className="legal__updated">
            Effective date: {EFFECTIVE_DATE} &middot; Last updated: {EFFECTIVE_DATE}
          </p>

          <div className="legal__placeholder">
            <strong>Before publishing:</strong> the effective date still
            needs a real value, and §7 (Content, data ownership, and
            aggregate data) especially needs a lawyer&rsquo;s eyes &mdash;
            it&rsquo;s where the future plan to license or sell
            aggregated/de-identified platform data to insurers, service
            organizations, and developers is disclosed, and that&rsquo;s the
            section most likely to need real legal engineering (not just
            wording) once that line of business is closer to launching. This
            draft has not been reviewed by a lawyer.
          </div>

          <p className="legal__intro">
            These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your use
            of StrataCouncil.ca, including the free training platform and the
            StrataSphere&trade; governance subscription (together, the
            &ldquo;Service&rdquo;), operated by StrataCouncil.ca
            (&ldquo;StrataCouncil,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;).
            By creating an account or otherwise using the Service, you agree
            to these Terms. If you don&rsquo;t agree, please don&rsquo;t use
            the Service.
          </p>

          <h2>1. Eligibility</h2>
          <p>
            You must be at least 18 years old to create an account.
            StrataCouncil.ca is open to anyone with an interest in strata
            governance &mdash; you do not need to be a licensed professional,
            a council member, or connected to any strata corporation to use
            the free training platform. Setting up or administering a strata
            corporation on the platform requires that you confirm, by
            attestation, that you are authorized to represent it (see
            &ldquo;Corporation creation&rdquo; below).
          </p>

          <h2>2. Your account</h2>
          <p>
            You&rsquo;re responsible for the accuracy of the information you
            provide and for keeping your account secure. Every account
            requires a working phone number and completing SMS-based
            two-factor authentication (2FA) as part of account setup, before
            you can use the Service &mdash; this applies to every account,
            whether or not it&rsquo;s ever connected to a strata corporation.
            You&rsquo;re responsible for keeping your enrolled phone number
            current and your backup recovery codes safe; StrataCouncil is not
            liable for losses arising from your failure to do so, or from
            unauthorized use of your account that occurs before you notify us.
          </p>
          <p>
            Your full name is locked after your first training module
            completion (so it matches the name on any certificate you earn)
            and can&rsquo;t be changed afterward through self-service.
          </p>
          <p>
            At signup you&rsquo;ll also see a separate, optional checkbox
            for marketing email (legislative updates, new StrataSphere
            features, and similar) &mdash; unchecked by default, and
            entirely independent of agreeing to these Terms. See our{" "}
            <Link href="/privacy">Privacy Policy</Link> for how that consent
            works and how to withdraw it.
          </p>

          <h2>3. Free training and free corporation membership</h2>
          <p>
            Creating an account and completing training is free. Connecting
            to, or joining, an existing strata corporation is also free.
            Setting up a new strata corporation is free but requires manual
            review before the corporation is created (see below). None of
            this requires a StrataSphere subscription or payment method on
            file.
          </p>

          <h2>4. Corporation creation and attestation</h2>
          <p>
            Setting up a strata corporation requires uploading its Strata
            Plan document and completing a short attestation confirming that
            you are authorized to represent that corporation. We review
            corporation creation requests manually before a corporation is
            created; we may approve or deny a request at our discretion. You
            are solely responsible for the accuracy of the information and
            attestation you provide, and a false attestation may result in
            immediate termination of your account and removal of any
            corporation created on that basis, without limiting any other
            remedy available to us or to the affected strata corporation.
          </p>

          <h2>5. StrataSphere subscription</h2>
          <p>
            StrataSphere &mdash; Meeting Mode, the governance document
            repository, the AI knowledge base, and the AI assistant &mdash;
            is a separate, optional subscription a strata corporation may
            purchase once it exists on the platform. Key terms:
          </p>
          <ul>
            <li>
              Every corporation receives one full, unrestricted Meeting Mode
              session before ever subscribing, at no cost and with no
              payment method required.
            </li>
            <li>
              Subscriptions are billed monthly or annually, in Canadian
              dollars, by card or pre-authorized debit (PAD), through Stripe.
              Annual billing is discounted relative to monthly.
            </li>
            <li>
              Subscriptions are pay-first: access begins once payment is
              successfully processed.
            </li>
            <li>
              There is no grace period for a failed or lapsed payment;
              access moves to a deactivated state until payment resumes or
              the corporation completes reactivation review.
            </li>
            <li>
              <strong>
                Cancelling or deactivating mid-term does not entitle you to a
                refund
              </strong>{" "}
              for the unused portion of a monthly or annual term.
            </li>
            <li>
              We may change subscription pricing with at least 30
              days&rsquo; notice; changes take effect at your next renewal,
              not mid-term.
            </li>
          </ul>
          <p>
            A corporation that lapses can be reactivated only by someone who
            provides proof of being the corporation&rsquo;s council
            president, subject to manual review.
          </p>

          <h2>6. Acceptable use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>
              Use the Service for any unlawful purpose or in violation of any
              applicable law or regulation
            </li>
            <li>
              Attempt to gain unauthorized access to any account, corporation,
              or system, or interfere with the Service&rsquo;s normal
              operation
            </li>
            <li>
              Scrape, harvest, or bulk-extract data from the Service
            </li>
            <li>
              Misrepresent your identity or your authority to act on behalf of
              a strata corporation
            </li>
            <li>
              Use StrataSphere&rsquo;s AI features to generate or distribute
              content you represent as legally binding, official strata
              correspondence, or professional advice without appropriate
              human review
            </li>
            <li>
              Upload content you don&rsquo;t have the right to share, or that
              infringes anyone else&rsquo;s rights
            </li>
          </ul>

          <h2>7. Content, data ownership, and aggregate data</h2>
          <p>
            You and your strata corporation retain ownership of the documents,
            agendas, minutes, decisions, and other content you upload or
            create through the Service. We don&rsquo;t claim ownership of it,
            and we use it only to provide the Service to you (including, for
            StrataSphere subscribers, generating AI responses grounded in
            your own records, as described in our{" "}
            <Link href="/privacy">Privacy Policy</Link>).
          </p>
          <p>
            Strata corporation governance records &mdash; documents, decisions,
            minutes &mdash; are retained as part of the corporation&rsquo;s
            permanent record even after an individual account is deleted,
            consistent with strata corporations&rsquo; own recordkeeping
            obligations under BC legislation, and are generally retained for a
            minimum of 7 years after any termination of the corporation&rsquo;s
            use of the Service.
          </p>
          <p>
            <strong>
              We will never sell, rent, or otherwise disclose your, or your
              corporation&rsquo;s, personal information &mdash; names,
              contact details, or documents specific to your corporation
              &mdash; to a third party for that third party&rsquo;s own use.
            </strong>{" "}
            That&rsquo;s a hard line, not a marketing line.
          </p>
          <p>
            Separately: you grant StrataCouncil a licence to compile
            statistical, aggregated, and de-identified data derived from
            content and activity on the Service &mdash; across many strata
            corporations, not any single one &mdash; and to use, share, or
            license that aggregated/de-identified data to third parties,
            including insurers, service organizations, and developers, for
            research, product development, industry benchmarking, and other
            business purposes, including as a future revenue source. This
            license survives your account&rsquo;s deletion for data already
            compiled before deletion. See our{" "}
            <Link href="/privacy">Privacy Policy</Link> (§9) for how
            de-identification works and what&rsquo;s explicitly out of
            scope.
          </p>

          <h2>8. AI features disclaimer</h2>
          <p>
            StrataSphere&rsquo;s AI features are provided to help your council
            find and understand information already in your own records and
            general legislation. AI-generated content, including summarized
            minutes, may contain errors and should be reviewed by a person
            before you rely on it or distribute it. It is general information,
            not legal, financial, or professional advice, and is not a
            substitute for professional review where one is legally required
            or otherwise appropriate.
          </p>

          <h2>9. Termination</h2>
          <p>
            You may delete your account at any time from Account Settings;
            deletion is immediate, not a request that waits on review &mdash;
            see our <Link href="/privacy">Privacy Policy</Link> for exactly
            what is deleted and what&rsquo;s retained as part of a strata
            corporation&rsquo;s governance record. If you&rsquo;re the sole
            admin of a corporation, contact us first so the admin role can be
            reassigned.
          </p>
          <p>
            We may suspend or terminate your access to the Service, with or
            without notice, if we reasonably believe you&rsquo;ve violated
            these Terms, provided false information (including a false
            corporation-creation attestation), or created risk or legal
            exposure for StrataCouncil, another user, or a strata corporation.
            A StrataSphere subscription terminated for cause is not entitled
            to a refund.
          </p>

          <h2>10. Disclaimers</h2>
          <p>
            THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
            AVAILABLE,&rdquo; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS
            OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT
            THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE, OR THAT
            AI-GENERATED CONTENT WILL BE ACCURATE OR COMPLETE. THE SERVICE IS
            NOT A SUBSTITUTE FOR LEGAL, FINANCIAL, OR OTHER PROFESSIONAL
            ADVICE.
          </p>

          <h2>11. Limitation of liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, STRATACOUNCIL WILL NOT BE
            LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
            PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL,
            ARISING FROM YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY FOR ANY
            CLAIM RELATING TO THE SERVICE WILL NOT EXCEED THE AMOUNT YOUR
            STRATA CORPORATION PAID US IN THE THREE MONTHS PRECEDING THE
            CLAIM, OR, FOR ACCOUNTS WITH NO SUBSCRIPTION, ONE HUNDRED CANADIAN
            DOLLARS (CAD $100).
          </p>

          <h2>12. Indemnification</h2>
          <p>
            You agree to indemnify and hold StrataCouncil harmless from any
            claim arising from your violation of these Terms, your misuse of
            the Service, or your breach of any representation you&rsquo;ve
            made to us (including a corporation-creation attestation),
            including reasonable legal fees.
          </p>

          <h2>13. Changes to the Service and these Terms</h2>
          <p>
            We may update these Terms from time to time; updates will appear
            on this page with a revised &ldquo;last updated&rdquo; date. We
            may also modify or discontinue features of the Service, though we
            will make reasonable efforts to notify affected users of material
            changes in advance.
          </p>

          <h2>14. Governing law</h2>
          <p>
            These Terms are governed by the laws of British Columbia and the
            applicable federal laws of Canada, without regard to conflict-of-
            law principles. You agree to the exclusive jurisdiction of the
            courts of British Columbia for any dispute arising from these
            Terms or the Service.
          </p>

          <h2>15. Contact us</h2>
          <p>
            Questions about these Terms can be sent to{" "}
            <a href="mailto:support@stratacouncil.ca">
              support@stratacouncil.ca
            </a>
            .
          </p>
        </article>
      </main>

      <footer className="site-footer">
        <div className="wrap site-footer__inner">
          <span className="wordmark wordmark--small">
            <Logo className="wordmark__mark" />
            <span>StrataCouncil.ca</span>
          </span>
          <ul className="site-footer__links">
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms &amp; Conditions</Link>
            </li>
          </ul>
          <p>&copy; {new Date().getFullYear()} StrataCouncil.ca</p>
        </div>
      </footer>
    </>
  );
}
