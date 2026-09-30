import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Privacy Policy — StrataCouncil.ca",
  description:
    "How StrataCouncil.ca collects, uses, stores and protects personal information, mapped against BC's PIPA and Canada's PIPEDA.",
};

const EFFECTIVE_DATE = "[Effective date — set before publishing]";

export default function PrivacyPage() {
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
          <h1>Privacy Policy</h1>
          <p className="legal__updated">
            Effective date: {EFFECTIVE_DATE} &middot; Last updated: {EFFECTIVE_DATE}
          </p>

          <div className="legal__placeholder">
            <strong>Before publishing:</strong> the effective date still
            needs a real value. This
            draft is organized around PIPA/PIPEDA&rsquo;s ten fair
            information principles (§§2&ndash;11) so a lawyer can check it
            principle by principle, but it has not yet been reviewed by one —
            have counsel confirm it, especially §9 (secondary use of
            de-identified data) and §5 (cross-border transfers), before this
            page is linked from signup.
          </div>

          <p className="legal__intro">
            StrataCouncil.ca (&ldquo;StrataCouncil,&rdquo; &ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;) provides free strata
            council education and the StrataSphere&trade; governance
            platform to strata corporations, council members, and owners in
            British Columbia. This policy explains what personal information
            we collect, why, who we share it with, and the choices and
            rights you have. It applies to the marketing site
            (stratacouncil.ca), the application (app.stratacouncil.ca), and
            StrataSphere.
          </p>
          <p className="legal__intro">
            We&rsquo;re committed to complying with British
            Columbia&rsquo;s <em>Personal Information Protection Act</em>{" "}
            (&ldquo;PIPA&rdquo;) and, where it applies, the federal{" "}
            <em>Personal Information Protection and Electronic Documents
            Act</em> (&ldquo;PIPEDA&rdquo;). Both are built on the same ten
            principles, and this policy is organized around them so it&rsquo;s
            easy to check that we&rsquo;ve actually addressed each one, not
            just written something that sounds like a privacy policy.
          </p>

          <h2>1. What information we collect</h2>
          <p>
            StrataCouncil.ca is open to anyone &mdash; you don&rsquo;t need
            to be a licensed professional, a council member, or connected to
            any strata corporation to use the free training platform. What
            we collect depends on how far you go: creating a free account,
            connecting to a strata corporation, or subscribing to
            StrataSphere.
          </p>

          <h3>To create an account</h3>
          <p>
            Your full name and email address. That&rsquo;s it &mdash;
            account creation doesn&rsquo;t require anything else. We
            don&rsquo;t use passwords: signing in works by emailing you a
            one-time sign-in link, so there&rsquo;s no password for us to
            store or for you to reuse elsewhere.
          </p>

          <h3>Account security information (if you choose to enable it)</h3>
          <p>
            Two-factor authentication (an authenticator app) is available
            as an optional extra layer of security you can turn on from
            Account Settings &mdash; it is not required to create or use an
            account. If you enable it, we store which authenticator app
            factor is associated with your account (never the codes it
            generates) and a set of backup recovery codes in hashed form
            &mdash; we cannot read them back once they&rsquo;re generated,
            and only you can see the plaintext codes, once, at the time
            they&rsquo;re created.
          </p>

          <h3>If you set up a strata corporation</h3>
          <p>
            The Strata Plan document you upload (from which we parse the
            strata plan number, legal name, address, unit count, and
            province) and a short attestation form &mdash; your name,
            address, email, phone number, and a confirmation that
            you&rsquo;re authorized to represent that corporation. This is
            reviewed manually before a corporation is created.
          </p>

          <h3>Training records</h3>
          <p>
            Which training modules and knowledge checks you&rsquo;ve
            completed, and any certificates issued. These belong to your
            account, not to any strata corporation, and stay private to you
            unless you connect to a corporation (§3).
          </p>

          <h3>Governance and council data</h3>
          <p>
            If your strata corporation subscribes to StrataSphere, we store
            the documents, agendas, motions, votes, minutes, decisions, and
            other governance material your council uploads or generates
            through the platform. This belongs to your strata corporation
            and the members who created it &mdash; not to us.
          </p>

          <h3>Roster information</h3>
          <p>
            A connected corporation&rsquo;s admin may upload an owner/council
            roster (strata lot numbers, names, contact details, roles, and
            similar fields tied to unit ownership) to support governance
            features such as attendance, voting, and minutes.
          </p>

          <h3>Payment information</h3>
          <p>
            Payment details for a StrataSphere subscription are collected
            and processed by Stripe, our payment processor. We never see or
            store full card or bank account numbers on our own servers
            &mdash; we retain only billing metadata such as amounts, dates,
            and transaction identifiers.
          </p>

          <h3>Usage and technical data</h3>
          <p>
            Platform activity (such as AI query counts, feature usage, and
            login activity), browser type, IP address, and device
            information, collected for security, fraud prevention, and
            service improvement.
          </p>

          <h2>2. Why we collect it (identifying purposes)</h2>
          <p>We collect and use the information above only to:</p>
          <ul>
            <li>Create and operate your account, including two-factor authentication if you choose to enable it</li>
            <li>Deliver training content and issue certificates</li>
            <li>Review and process strata corporation creation and join requests</li>
            <li>Provide StrataSphere&rsquo;s governance features to subscribing corporations</li>
            <li>Process StrataSphere subscription payments and billing</li>
            <li>Power StrataSphere&rsquo;s AI features (§6)</li>
            <li>Send service notifications, receipts, and (only with your separate consent) marketing updates (§4)</li>
            <li>Detect fraud, secure the platform, and enforce our Terms &amp; Conditions</li>
            <li>Meet legal, regulatory, and tax obligations</li>
            <li>Where properly de-identified, generate aggregate statistics and industry insights (§9)</li>
          </ul>
          <p>
            We don&rsquo;t use your personal information for a new purpose
            without either telling you or getting your consent first.
          </p>

          <h2>3. Training visibility within a connected corporation</h2>
          <p>
            A deliberate, narrow exception to the rule that your training
            records are private: once you&rsquo;re connected to a strata
            corporation, which training tracks you&rsquo;ve{" "}
            <em>completed</em> becomes visible to other members connected to
            that same corporation &mdash; so a council can see who has
            completed which certification. Your granular progress (modules
            started, quiz results) is never shown to anyone but you.
          </p>

          <h2>4. Consent</h2>
          <p>
            Creating an account requires agreeing to this policy and our{" "}
            <Link href="/terms">Terms &amp; Conditions</Link> &mdash; that
            consent is what lets us provide the account itself; it
            can&rsquo;t be partially withdrawn without closing your
            account, since the account can&rsquo;t exist without it.
          </p>
          <h3>Marketing communications (CASL)</h3>
          <p>
            Sending you marketing email &mdash; legislative updates, new
            StrataSphere features, and similar &mdash; is governed
            separately by Canada&rsquo;s <em>Anti-Spam Legislation</em>{" "}
            (&ldquo;CASL&rdquo;), which requires express, opt-in consent
            distinct from agreeing to our Terms. At signup, and anywhere
            else we ever offer it, this is a separate checkbox, unchecked by
            default &mdash; we never bundle it into required consent or
            pre-check it for you. We record when you opted in, so we have a
            clear answer if that consent is ever questioned. You can
            withdraw this consent at any time from Account Settings or via
            the unsubscribe link in any marketing email; we&rsquo;ll honour
            it within 10 business days, as CASL requires. Withdrawing
            marketing consent has no effect on your account, your access to
            training, or any strata corporation you&rsquo;re connected to
            &mdash; it only stops marketing email.
          </p>
          <p>
            Transactional email &mdash; sign-in links, invite notifications,
            billing receipts, and similar &mdash; isn&rsquo;t marketing and
            isn&rsquo;t covered by this opt-in; you&rsquo;ll receive it as
            part of using the Service regardless.
          </p>

          <h2>5. Limiting collection, use, and disclosure</h2>
          <p>
            We collect only what a given feature actually needs (§1) and use
            it only for the purposes we&rsquo;ve described (§2). We
            don&rsquo;t sell or rent your personal information to third
            parties, and we don&rsquo;t use it for third-party advertising.
          </p>
          <p>We share personal information only with:</p>
          <ul>
            <li>
              <strong>Service providers</strong> who help us run the
              platform, each bound by their own data protection terms:
              Supabase (database, authentication, and file storage),
              Anthropic (AI model processing, §6), Voyage AI (text
              embeddings for search and retrieval), Stripe (subscription
              payment processing), Mailtrap (transactional email delivery),
              and Vercel/Cloudflare (hosting, content delivery, and DNS).
            </li>
            <li>
              <strong>Other members of your strata corporation</strong>,
              only as described in this policy (training completions, §3;
              roster and governance data your corporation itself manages,
              §1) &mdash; never with a different corporation.
            </li>
            <li>
              Anyone else, only where required by law, court order, or a
              regulatory authority, or where necessary to protect the
              rights, property, or safety of our users, the public, or
              StrataCouncil.ca.
            </li>
          </ul>
          <p>
            <strong>Where your data is stored.</strong> Your account and
            governance records are stored in our production database, hosted
            in Canada on Supabase, which meets ISO 27001 information security
            standards. Data is encrypted both in transit and at rest.
          </p>
          <p>
            <strong>Cross-border transfers.</strong> Not everything stays in
            Canada. When you use StrataSphere&rsquo;s AI features, the
            relevant portion of your query and records is sent to Anthropic
            and Voyage AI for processing, and that processing may occur
            outside Canada, including in the United States. This is
            governed by contractual data-protection terms with those
            providers, and PIPA/PIPEDA permit this on that basis &mdash;
            but it does mean that information can become subject to the
            laws of the country it&rsquo;s processed in. We&rsquo;d rather
            say this plainly than claim &ldquo;all data stays in
            Canada,&rdquo; which wouldn&rsquo;t be accurate given how the AI
            features work. If you enable two-factor authentication, its
            codes are generated by an authenticator app on your own device
            and never leave it to reach us &mdash; nothing is transmitted
            through a third party to deliver them.
          </p>

          <h2>6. AI features and StrataSphere</h2>
          <p>
            StrataSphere uses Anthropic&rsquo;s Claude models to help
            councils search and ask questions about their own governance
            documents, decisions, and applicable BC legislation.
          </p>
          <ul>
            <li>
              When you ask StrataSphere a question, the relevant portions of
              your corporation&rsquo;s records are sent to Anthropic to
              generate a response.
            </li>
            <li>
              Owners are referred to by strata lot number (e.g.
              &ldquo;SL&nbsp;061&rdquo;), not by name, in the AI&rsquo;s
              working context &mdash; a roster lookup resolves names to lot
              numbers before anything reaches the model, rather than relying
              on the AI to avoid using a name it was given.
            </li>
            <li>
              Where StrataSphere draws on de-identified precedent from other
              subscribing corporations, personal information is stripped
              (§9 describes the same process that supports aggregate data
              more generally) before that content is ever pooled across
              corporations.
            </li>
            <li>
              Under our agreement with Anthropic, your queries and documents
              are not used to train Anthropic&rsquo;s models.
            </li>
            <li>Usage is logged for quality monitoring and fair-use enforcement.</li>
          </ul>
          <p>
            <strong>
              AI-generated responses may be incomplete or inaccurate and are
              not legal advice.
            </strong>{" "}
            StrataSphere is a tool to help your council find and understand
            its own records and general legislation &mdash; it does not
            replace the judgment of your council or advice from a qualified
            lawyer where one is needed.
          </p>

          <h2>7. Cookies and tracking</h2>
          <p>
            The application uses only the session cookies necessary to keep
            you signed in. We do not deploy advertising or third-party
            analytics tracking cookies on the marketing site or in the
            application.
          </p>

          <h2>8. Safeguards</h2>
          <p>
            We use encrypted connections (HTTPS) throughout, database-level
            access controls (row-level security), and passwordless sign-in
            through Supabase Auth: rather than a password that can be
            reused, guessed, or leaked from another site, every sign-in is a
            fresh, single-use link emailed to your address, which we treat
            as a meaningful security property in its own right, not an
            absence of one. Two-factor authentication is available as an
            additional layer for anyone who wants it (§1). Payment details
            never touch our own servers &mdash; Stripe handles that
            directly. No system is completely secure; if you&rsquo;ve
            enabled two-factor authentication, keep your backup codes safe,
            and let us know right away at{" "}
            <a href="mailto:support@stratacouncil.ca">
              support@stratacouncil.ca
            </a>{" "}
            if you suspect unauthorized access to your account.
          </p>

          <h2>9. Secondary use: aggregate and de-identified data</h2>
          <p>
            Beyond providing you the Service, we may compile statistical,
            aggregated, and de-identified data drawn from platform activity
            &mdash; for example, training completion trends, or patterns in
            governance decisions across many strata corporations &mdash; and
            use it, or share or license it to third parties such as
            insurers, service organizations, and developers, for research,
            product development, industry benchmarking, and other business
            purposes, including as a future revenue source.
          </p>
          <p>
            <strong>
              This is never your personal information.
            </strong>{" "}
            Data used this way is stripped and aggregated using the same
            de-identification pipeline that already supports
            StrataSphere&rsquo;s cross-corporation AI precedent pool (§6) —
            names resolved to strata lot numbers or removed, contact
            details, financial account numbers, and other identifiers
            redacted before anything is pooled — and is combined across
            enough corporations that it can&rsquo;t reasonably be used to
            identify you, or, we intend, any single strata corporation. We
            do not sell your name, contact details, or any document
            specific to your corporation.
          </p>
          <p>
            <strong>
              [Flagged for legal review, not resolved by this draft:
            </strong>{" "}
            whether our existing stripping pipeline meets the legal bar for
            &ldquo;de-identified&rdquo;/&ldquo;anonymized&rdquo; data under
            PIPA and PIPEDA — which turns on re-identification risk, not
            just redacting obvious fields — especially for a distinctive or
            small strata corporation where aggregate patterns might still be
            identifiable. This matters more as this becomes an actual
            revenue line than it does for the AI precedent pool it&rsquo;s
            borrowed from, and should be confirmed with counsel, with
            appropriate technical safeguards (minimum aggregation
            thresholds, for instance) in place before any such data is
            shared or sold.]
          </p>

          <h2>10. Data retention</h2>
          <p>
            Account deletion on StrataCouncil.ca is immediate and
            self-serve, not a request that waits on manual review. When you
            delete your account, we distinguish between two kinds of data:
          </p>
          <ul>
            <li>
              <strong>Deleted immediately:</strong> your profile, your
              connections to any strata corporation, your training
              completions and certificates, and your StrataSphere
              conversation history.
            </li>
            <li>
              <strong>
                Retained, as part of your strata corporation&rsquo;s
                permanent governance record:
              </strong>{" "}
              documents you uploaded, decisions you moved or seconded, and
              minutes you&rsquo;re recorded in stay part of that
              corporation&rsquo;s record, still attributed to you, the same
              way they would if you resigned from council without deleting
              your account. Strata corporations have their own legal
              recordkeeping obligations under BC strata legislation that
              this platform doesn&rsquo;t override.
            </li>
          </ul>
          <p>Other retention periods:</p>
          <ul>
            <li>Billing records: 7 years, per Canadian tax law</li>
            <li>Marketing consent records: kept for as long as the consent is in effect, plus a reasonable period after withdrawal to demonstrate CASL compliance</li>
            <li>
              Security and access logs: retained for a limited period to
              investigate suspicious activity, then deleted
            </li>
          </ul>

          <h2>11. Your rights, and how to exercise them</h2>
          <p>Subject to applicable law, you may:</p>
          <ul>
            <li>Request access to the personal information we hold about you</li>
            <li>Ask us to correct inaccurate information</li>
            <li>
              Ask us to delete your personal information, subject to legal
              retention requirements (§10)
            </li>
            <li>Request your data in a portable, machine-readable format</li>
            <li>Withdraw consent, where consent is the basis for our use of it (§4)</li>
          </ul>
          <p>
            You can also delete most of your own account data yourself, at
            any time, from Account Settings (§10), and keep your name,
            email, and marketing preference up to date there. For anything
            else &mdash; including a formal access or correction request
            &mdash; contact our Privacy Officer at{" "}
            <a href="mailto:privacy@stratacouncil.ca">
              privacy@stratacouncil.ca
            </a>
            . We aim to respond within 30 days.
          </p>
          <p>
            If you&rsquo;re not satisfied with our response, you can ask us
            to review it again, or contact the Office of the Information
            and Privacy Commissioner for British Columbia directly.
          </p>

          <h2>12. Age requirement</h2>
          <p>
            StrataCouncil.ca is intended for adults. You must be at least 18
            years old to create an account. We do not knowingly collect
            personal information from anyone under 18; if we learn we have,
            we&rsquo;ll delete it promptly.
          </p>

          <h2>13. Changes to this policy</h2>
          <p>
            We may update this policy from time to time. Updates will
            appear on this page with a revised &ldquo;last updated&rdquo;
            date; for material changes, we&rsquo;ll email active users at
            least 14 days before the change takes effect.
          </p>

          <h2>14. Accountability and how to reach us</h2>
          <p>
            StrataCouncil.ca has designated a Privacy Officer, responsible
            for our compliance with this policy and with PIPA/PIPEDA.
          </p>
          <p>
            Email:{" "}
            <a href="mailto:privacy@stratacouncil.ca">
              privacy@stratacouncil.ca
            </a>{" "}
            (privacy requests and complaints) or{" "}
            <a href="mailto:support@stratacouncil.ca">
              support@stratacouncil.ca
            </a>{" "}
            (everything else)
            <br />
            Location: British Columbia, Canada
          </p>
          <p>
            If you have an unresolved privacy concern after contacting us,
            you may also contact the Office of the Information and Privacy
            Commissioner for British Columbia.
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
