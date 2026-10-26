import Link from "next/link";
import { Logo } from "@/components/Logo";

/** Where the app's sign-up and sign-in live. */
export const SIGNUP_URL = "https://app.stratacouncil.ca/signup";
export const SIGNIN_URL = "https://app.stratacouncil.ca/login";
/** The investor briefing (request form and deck), in the app. */
export const INVESTORS_URL = "https://app.stratacouncil.ca/investors";
/** The Request a demo form on the home page. */
export const DEMO_HREF = "/#demo";

/** The header on every page: a white bar floating over the top. Section links point at the homepage, so they work from the legal pages too. */
export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="wordmark" data-testid="header-logo-link">
          <Logo className="wordmark__mark" />
          <span>StrataCouncil.ca</span>
        </Link>
        <nav aria-label="Primary" className="site-nav">
          <div className="site-nav__links">
            <Link href="/#how-it-works">How it works</Link>
            <Link href="/#managers">For managers</Link>
            <Link href="/#free">What&rsquo;s free</Link>
            <Link href="/#faq">FAQ</Link>
            <a href={INVESTORS_URL}>Investors</a>
          </div>
          <a href={SIGNIN_URL} className="site-nav__signin" data-testid="nav-signin">
            Sign in
          </a>
          <div className="site-nav__buttons">
            <Link href={DEMO_HREF} className="button button-secondary button--small site-nav__demo">
              Request a demo
            </Link>
            <a href={SIGNUP_URL} className="button button-primary button--small" data-testid="nav-cta">
              <span className="site-nav__full">Start free training</span>
              <span className="site-nav__short">Start free</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <div className="site-footer__brand">
          <span className="wordmark wordmark--small">
            <Logo className="wordmark__mark" />
            <span>StrataCouncil.ca</span>
          </span>
          <p>Training and governance tools for BC strata councils.</p>
        </div>
        <ul className="site-footer__links">
          <li>
            <a href={SIGNUP_URL}>Start free training</a>
          </li>
          <li>
            <Link href={DEMO_HREF}>Request a demo</Link>
          </li>
          <li>
            <a href={SIGNIN_URL}>Sign in</a>
          </li>
          <li>
            <a href={INVESTORS_URL}>Investors</a>
          </li>
          <li>
            <Link href="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </li>
        </ul>
        <div className="site-footer__legal">
          <p>&copy; {new Date().getFullYear()} StrataCouncil.ca</p>
          <p>Investor information is not an offer to sell, or a solicitation of an offer to buy, any securities.</p>
        </div>
      </div>
    </footer>
  );
}
