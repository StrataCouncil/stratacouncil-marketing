import Link from "next/link";
import { Logo } from "@/components/Logo";

/** Where the app's sign-up and sign-in live. */
export const SIGNUP_URL = "https://app.stratacouncil.ca/signup";
export const SIGNIN_URL = "https://app.stratacouncil.ca/login";

/** The header on every page. Section links point at the homepage, so they work from the legal pages too. */
export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <Link href="/" className="wordmark" data-testid="header-logo-link">
          <Logo className="wordmark__mark" />
          <span>StrataCouncil.ca</span>
        </Link>
        <nav aria-label="Primary" className="site-nav">
          <Link href="/#built-for" className="site-nav__section">
            What you&rsquo;ll learn
          </Link>
          <Link href="/#stratasphere" className="site-nav__section">
            Stratasphere&trade;
          </Link>
          <Link href="/#faq" className="site-nav__section">
            FAQ
          </Link>
          <a href={SIGNIN_URL} data-testid="nav-signin">
            Sign in
          </a>
          <a href={SIGNUP_URL} className="button button-primary" data-testid="nav-cta">
            Start Learning
          </a>
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
            <a href={SIGNIN_URL}>Sign in</a>
          </li>
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
  );
}
