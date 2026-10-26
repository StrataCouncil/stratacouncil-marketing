import Link from "next/link";
import { Logo } from "@/components/Logo";
import { InvestorModal } from "@/components/InvestorModal";
import { TrickfilmLogo } from "@/components/TrickfilmLogo";

/** Where the app's sign-up and sign-in live. */
export const SIGNUP_URL = "https://app.stratacouncil.ca/signup";
export const SIGNIN_URL = "https://app.stratacouncil.ca/login";
/** The investor briefing (sign-up and deck), in the app. The footer's Investors opens a sign-up dialog instead. */
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
        <span className="wordmark wordmark--small">
          <Logo className="wordmark__mark" />
          <span>StrataCouncil.ca</span>
        </span>
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
            <InvestorModal />
          </li>
          <li>
            <Link href="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </li>
        </ul>
        <div className="site-footer__legal">
          <p>
            &copy; {new Date().getFullYear()} Trickfilm Entertainment Inc. StrataCouncil.ca is a product of Trickfilm.
          </p>
          <p className="site-footer__powered">
            Powered by <TrickfilmLogo height={20} />
          </p>
          <p className="site-footer__photos">
            Photos by Theo Decker on <a href="https://www.pexels.com/">Pexels</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}
