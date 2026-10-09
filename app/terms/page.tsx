import Link from "next/link";
import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Terms & Conditions — StrataCouncil.ca",
  description:
    "The terms that govern access to and use of StrataCouncil.ca, including its training platform and the Stratasphere governance platform.",
};

const EFFECTIVE_DATE = "September 29, 2026";
const LAST_UPDATED = "October 9, 2026";

export default function TermsPage() {
  return (
    <>
      <SiteHeader />

      <main className="wrap">
        <article className="legal">
          <h1>Terms &amp; Conditions</h1>
          <p className="legal__updated">
            Effective date: {EFFECTIVE_DATE} &middot; Last updated: {LAST_UPDATED}
          </p>

          <p className="legal__intro">
            These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your
            access to and use of StrataCouncil.ca, including its training
            platform and the Stratasphere governance platform (collectively,
            the &ldquo;Service&rdquo;).
          </p>
          <p className="legal__intro">
            The Service is operated by StrataCouncil.ca
            (&ldquo;StrataCouncil,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo;
            or &ldquo;our&rdquo;).
          </p>
          <p>
            By creating an account, accessing the Service, or using any part
            of the Service, you agree to these Terms. If you are using the
            Service on behalf of a strata corporation or other organization,
            you represent that you are authorized to accept these Terms on
            its behalf.
          </p>
          <p>
            If you do not agree to these Terms, do not create an account or
            use the Service.
          </p>
          <p>
            Our <Link href="/privacy">Privacy Policy</Link> forms part of the
            framework governing your use of the Service and explains how we
            collect, use, disclose, retain, and protect personal information.
          </p>

          <h2>1. Eligibility</h2>
          <p>
            You must be at least 18 years old to create an account or use the
            Service.
          </p>
          <p>
            StrataCouncil.ca&rsquo;s training platform is available to anyone
            with an interest in strata governance. You do not need to be a
            licensed professional, strata council member, or member of a
            strata corporation to use the training platform.
          </p>
          <p>
            Certain functions, including creating or administering a strata
            corporation within Stratasphere, require you to confirm that you
            have authority to act on behalf of that corporation.
          </p>
          <p>
            You are responsible for providing accurate information about
            yourself and your authority to use any corporation-related
            functionality.
          </p>

          <h2>2. Your account</h2>
          <p>You are responsible for:</p>
          <ul>
            <li>providing accurate and current information;</li>
            <li>maintaining the security of your account;</li>
            <li>
              maintaining access to the email address associated with your
              account;
            </li>
            <li>
              protecting any authentication or recovery information provided
              to you; and
            </li>
            <li>
              notifying us promptly if you believe your account has been
              compromised.
            </li>
          </ul>
          <p>
            You are responsible for activity conducted through your account
            unless you have notified us of unauthorized access and the
            circumstances indicate that the activity was not reasonably
            attributable to you.
          </p>
          <p>
            We may require additional authentication or verification when
            necessary to protect an account, strata corporation, or the
            Service.
          </p>

          <h3>Account information</h3>
          <p>
            You may be required to provide a working email address and other
            information necessary to create and secure your account.
          </p>
          <p>
            If two-factor authentication is required for a particular account
            or feature, you must complete the applicable authentication
            process before accessing that feature.
          </p>

          <h3>Name and certificates</h3>
          <p>
            Your name may be used on training certificates issued through
            StrataCouncil.ca.
          </p>
          <p>
            Where necessary to preserve the integrity of a certificate or
            training record, certain account information may not be editable
            through self-service after a certificate or training record has
            been issued.
          </p>
          <p>
            If you believe your name or other information is incorrect,
            contact us at{" "}
            <a href="mailto:support@stratacouncil.ca">
              support@stratacouncil.ca
            </a>
            .
          </p>

          <h3>Marketing</h3>
          <p>
            Marketing communications are optional and are governed separately
            from these Terms.
          </p>
          <p>
            Your decision to receive or not receive marketing communications
            does not affect your agreement to these Terms or your ability to
            use the Service.
          </p>
          <p>
            See our <Link href="/privacy">Privacy Policy</Link> for
            information about marketing communications and consent.
          </p>

          <h2>3. Free training and corporation membership</h2>
          <p>
            Creating an account and accessing the standard training platform
            is free.
          </p>
          <p>
            Connecting an account to an existing strata corporation is also
            free unless the particular feature expressly identifies a charge.
          </p>
          <p>
            Creating a new strata corporation within the platform is free but
            may require manual review and verification.
          </p>
          <p>
            Free services do not require a Stratasphere subscription or
            payment method.
          </p>
          <p>
            We may change, add, restrict, or discontinue free features in
            accordance with Section 13.
          </p>

          <h2>4. Creating and administering a strata corporation</h2>
          <p>
            Stratasphere is designed to support actual strata corporations
            and their governance activities.
          </p>
          <p>
            When requesting that a strata corporation be created within the
            Service, you may be required to:
          </p>
          <ul>
            <li>provide the strata corporation&rsquo;s strata plan or other documentation;</li>
            <li>provide information necessary to identify the corporation;</li>
            <li>confirm your identity; and</li>
            <li>attest that you are authorized to act on behalf of the corporation.</li>
          </ul>
          <p>
            You are responsible for the accuracy of the information and
            representations you provide.
          </p>
          <p>
            We may manually review corporation-creation requests and may
            approve, reject, or request additional information before
            creating or activating a corporation.
          </p>
          <p>
            We may suspend or remove a corporation created on the basis of
            materially false or misleading information, including a false
            representation of authority.
          </p>
          <p>
            This does not affect any rights or remedies that may exist
            between the strata corporation and the person who provided the
            information.
          </p>

          <h2>5. Stratasphere subscriptions</h2>
          <p>Stratasphere is an optional paid service for strata corporations.</p>
          <p>
            Depending on the subscription selected, Stratasphere may include
            features such as:
          </p>
          <ul>
            <li>Meeting Mode;</li>
            <li>governance document storage;</li>
            <li>document search;</li>
            <li>an AI knowledge base;</li>
            <li>AI-assisted search and analysis;</li>
            <li>AI-generated summaries; and</li>
            <li>other governance tools identified as included with the applicable subscription.</li>
          </ul>

          <h3>Trial or introductory access</h3>
          <p>
            Each eligible strata corporation may receive one full Meeting
            Mode session before subscribing, at no charge and without
            providing a payment method.
          </p>
          <p>
            We may change or discontinue introductory offers for future
            users.
          </p>

          <h3>Subscription term</h3>
          <p>
            Subscriptions may be billed monthly or annually, as shown at the
            time of purchase.
          </p>
          <p>
            Unless otherwise stated at the time of purchase, a subscription
            renews automatically for another equivalent billing period until
            cancelled.
          </p>

          <h3>Payment</h3>
          <p>Subscriptions are billed in Canadian dollars.</p>
          <p>
            Payments may be made using the payment methods made available
            through the Service, which may include credit card and
            pre-authorized debit.
          </p>
          <p>Payments are processed through third-party payment providers.</p>
          <p>
            By purchasing a subscription, you authorize the applicable
            payment provider to charge the payment method you provide for the
            subscription and applicable taxes.
          </p>

          <h3>Taxes</h3>
          <p>
            Subscription prices do not include applicable taxes unless
            expressly stated otherwise.
          </p>
          <p>
            You are responsible for applicable sales taxes associated with
            your subscription.
          </p>

          <h3>Failed payments</h3>
          <p>
            If a subscription payment fails, we may suspend or deactivate
            access to paid features.
          </p>
          <p>
            We may attempt to collect an outstanding payment using the
            payment method associated with the account.
          </p>
          <p>
            A corporation may regain access after the outstanding amount has
            been paid and any applicable account or identity verification has
            been completed.
          </p>

          <h3>Cancellation</h3>
          <p>
            A subscription may be cancelled through the available account
            controls or by contacting us.
          </p>
          <p>
            Unless otherwise required by applicable law or expressly stated
            at the time of purchase, cancellation takes effect at the end of
            the current paid subscription period.
          </p>
          <p>
            Cancelling a subscription does not automatically entitle the
            subscriber to a refund for the unused portion of the current
            billing period.
          </p>
          <p>
            This does not limit any refund, cancellation, or other rights
            that cannot lawfully be excluded.
          </p>

          <h3>Annual subscriptions</h3>
          <p>
            If you purchase an annual subscription, the annual charge covers
            the applicable annual subscription period.
          </p>
          <p>
            Cancelling during that period prevents the next renewal but does
            not, unless required by law or otherwise expressly agreed, create
            a right to a prorated refund for the unused portion of the
            current annual term.
          </p>

          <h3>Price changes</h3>
          <p>We may change subscription prices.</p>
          <p>
            For an existing subscription, a price increase will normally take
            effect at the next renewal after we provide at least 30
            days&rsquo; notice.
          </p>
          <p>
            If you do not wish to continue at the new price, you may cancel
            before the renewal date.
          </p>
          <p>
            Price changes do not apply retroactively to a paid subscription
            term.
          </p>

          <h2>6. Corporation administration and subscription authority</h2>
          <p>
            A Stratasphere subscription belongs to the subscribing strata
            corporation, not to an individual council member personally.
          </p>
          <p>
            The person who purchases or administers a subscription represents
            that they are authorized to do so on behalf of the corporation.
          </p>
          <p>
            StrataCouncil may request reasonable evidence of authority where
            necessary, including when:
          </p>
          <ul>
            <li>creating a corporation;</li>
            <li>activating or reactivating a subscription;</li>
            <li>changing the corporation&rsquo;s primary administrator;</li>
            <li>transferring administrative control; or</li>
            <li>responding to a dispute over access to the corporation&rsquo;s account.</li>
          </ul>
          <p>
            If a council member&rsquo;s term ends, the corporation remains
            responsible for ensuring that appropriate administrative access
            is transferred to an authorized person.
          </p>
          <p>
            If a corporation&rsquo;s subscription has lapsed, we may require
            reasonable evidence that the person requesting reactivation is
            authorized to act for the corporation.
          </p>

          <h2>7. Your content and corporation records</h2>
          <p>
            You and your strata corporation retain ownership of documents,
            records, data, and other content that you upload to or create
            through the Service (&ldquo;Customer Content&rdquo;).
          </p>
          <p>Customer Content may include:</p>
          <ul>
            <li>agendas;</li>
            <li>minutes;</li>
            <li>motions;</li>
            <li>decisions;</li>
            <li>correspondence;</li>
            <li>notices;</li>
            <li>documents;</li>
            <li>rosters;</li>
            <li>strata lot information;</li>
            <li>meeting records; and</li>
            <li>other governance material.</li>
          </ul>
          <p>
            We do not acquire ownership of Customer Content merely because
            you upload it to the Service.
          </p>

          <h3>Licence to operate the Service</h3>
          <p>
            You grant StrataCouncil a limited, non-exclusive, worldwide
            licence to host, store, reproduce, transmit, process, display,
            and otherwise use Customer Content solely as reasonably necessary
            to:
          </p>
          <ul>
            <li>provide and maintain the Service;</li>
            <li>provide features requested by you;</li>
            <li>store and retrieve your records;</li>
            <li>generate search results and AI-assisted responses;</li>
            <li>secure and troubleshoot the Service;</li>
            <li>prevent fraud and abuse;</li>
            <li>maintain backups;</li>
            <li>comply with legal obligations; and</li>
            <li>enforce these Terms.</li>
          </ul>
          <p>
            This licence continues only for as long as reasonably necessary
            to perform these purposes, including any period during which
            Customer Content is retained in accordance with our{" "}
            <Link href="/privacy">Privacy Policy</Link> or applicable law.
          </p>

          <h3>Corporation records</h3>
          <p>
            Where Customer Content constitutes a record of a strata
            corporation, deleting an individual&rsquo;s account does not
            necessarily delete that record.
          </p>
          <p>
            The corporation&rsquo;s governance records may remain available
            to authorized representatives of the corporation after an
            individual user leaves the council or deletes their personal
            account.
          </p>
          <p>
            The corporation is responsible for determining what records it
            must retain and who should have access to them.
          </p>

          <h2>8. Aggregated and de-identified information</h2>
          <p>
            StrataCouncil may create aggregated or de-identified information
            from information generated through the Service.
          </p>
          <p>This may include information about:</p>
          <ul>
            <li>training completion;</li>
            <li>feature usage;</li>
            <li>governance activity;</li>
            <li>product performance;</li>
            <li>general strata governance patterns; and</li>
            <li>industry trends.</li>
          </ul>
          <p>
            We may use and share aggregated or de-identified information for
            legitimate business purposes, including:
          </p>
          <ul>
            <li>product development;</li>
            <li>service improvement;</li>
            <li>research;</li>
            <li>analytics;</li>
            <li>industry benchmarking;</li>
            <li>reporting; and</li>
            <li>developing new products and services.</li>
          </ul>
          <p>
            We will take reasonable steps to ensure that information treated
            as de-identified is not reasonably capable of being associated
            with an identifiable individual.
          </p>
          <p>
            We will not use this provision to claim ownership of Customer
            Content or to authorize the disclosure of identifiable personal
            information for unrelated third-party use.
          </p>
          <p>
            Our <Link href="/privacy">Privacy Policy</Link> provides
            additional information about how we handle aggregated and
            de-identified information.
          </p>

          <h2>9. Your responsibilities for Customer Content</h2>
          <p>
            You are responsible for Customer Content that you upload, submit,
            create, or otherwise make available through the Service.
          </p>
          <p>You represent and warrant that:</p>
          <ul>
            <li>you have the authority to provide the Customer Content to us;</li>
            <li>
              you have the rights necessary for us to process the Customer
              Content as contemplated by these Terms;
            </li>
            <li>your use of the Service does not violate applicable law;</li>
            <li>
              your Customer Content does not knowingly infringe another
              person&rsquo;s intellectual property, privacy, or other rights;
              and
            </li>
            <li>
              you will not knowingly upload malicious code or material
              designed to interfere with the Service.
            </li>
          </ul>
          <p>
            You are responsible for determining whether information should be
            entered into Stratasphere and for ensuring that your use of the
            Service is consistent with the legal obligations applicable to
            you or your organization.
          </p>
          <p>
            For strata corporations, this includes determining whether the
            corporation has appropriate authority to collect, use, disclose,
            and store information entered into Stratasphere.
          </p>

          <h2>10. Acceptable use</h2>
          <p>You must not use the Service to:</p>
          <ul>
            <li>violate applicable law or regulation;</li>
            <li>
              gain unauthorized access to an account, strata corporation,
              system, or network;
            </li>
            <li>interfere with the normal operation or security of the Service;</li>
            <li>scrape, harvest, or bulk-extract data from the Service;</li>
            <li>circumvent access controls or usage restrictions;</li>
            <li>impersonate another person or misrepresent your authority;</li>
            <li>
              create or administer a strata corporation without appropriate
              authority;
            </li>
            <li>upload content that you do not have the right to provide;</li>
            <li>upload malicious code, malware, or other harmful material;</li>
            <li>use the Service to infringe another person&rsquo;s rights;</li>
            <li>
              attempt to reverse engineer or decompile the Service except to
              the extent such restriction is prohibited by applicable law;
            </li>
            <li>
              use automated systems to access the Service in a manner that
              places unreasonable load on our systems;
            </li>
            <li>
              use the Service to develop or operate a competing service by
              systematically copying or extracting its functionality or
              content; or
            </li>
            <li>
              use AI-generated content as official, legally binding, or
              professional advice without appropriate human review.
            </li>
          </ul>
          <p>
            We may investigate suspected violations of these Terms and take
            reasonable action to protect the Service, users, and affected
            organizations.
          </p>

          <h2>11. AI features</h2>
          <p>Stratasphere may use artificial intelligence to assist with:</p>
          <ul>
            <li>searching governance records;</li>
            <li>summarizing documents;</li>
            <li>identifying information relevant to a question;</li>
            <li>generating draft meeting materials;</li>
            <li>organizing information; and</li>
            <li>answering questions about information available through the Service.</li>
          </ul>
          <p>AI-generated content is provided as an assistance tool.</p>
          <p>
            AI systems can produce inaccurate, incomplete, outdated, or
            misleading information.
          </p>
          <p>
            You are responsible for reviewing AI-generated content before
            relying on it, distributing it, or incorporating it into an
            official record.
          </p>
          <p>In particular, AI-generated content should not be treated as:</p>
          <ul>
            <li>legal advice;</li>
            <li>financial advice;</li>
            <li>professional advice;</li>
            <li>a definitive interpretation of legislation;</li>
            <li>
              a substitute for a lawyer, accountant, licensed strata
              professional, engineer, or other qualified professional; or
            </li>
            <li>
              an official record unless it has been reviewed and adopted by
              the appropriate human decision-maker.
            </li>
          </ul>
          <p>
            Where Stratasphere generates draft minutes, motions,
            correspondence, summaries, or other governance material, the
            applicable strata corporation remains responsible for reviewing
            and approving that material.
          </p>

          <h2>12. Third-party services</h2>
          <p>
            The Service depends on third-party infrastructure and service
            providers.
          </p>
          <p>These may include providers of:</p>
          <ul>
            <li>cloud hosting;</li>
            <li>databases;</li>
            <li>authentication;</li>
            <li>email;</li>
            <li>payment processing;</li>
            <li>artificial intelligence;</li>
            <li>search and data processing;</li>
            <li>security; and</li>
            <li>content delivery.</li>
          </ul>
          <p>
            Our <Link href="/privacy">Privacy Policy</Link> describes the
            principal categories of third-party providers we use and how
            personal information is handled.
          </p>
          <p>
            Third-party services may have their own terms and policies. Your
            use of a third-party service may therefore also be subject to the
            terms of that provider.
          </p>
          <p>
            We are not responsible for a third party&rsquo;s independent
            products or services, except to the extent required by applicable
            law.
          </p>

          <h2>13. Changes to the Service</h2>
          <p>We are continually developing StrataCouncil and Stratasphere.</p>
          <p>We may:</p>
          <ul>
            <li>add new features;</li>
            <li>modify existing features;</li>
            <li>remove features;</li>
            <li>change technical requirements;</li>
            <li>change free or paid functionality; or</li>
            <li>discontinue a feature or portion of the Service.</li>
          </ul>
          <p>
            We will make reasonable efforts to provide advance notice of
            material changes where appropriate.
          </p>
          <p>
            Nothing in these Terms requires us to maintain a particular
            feature indefinitely.
          </p>
          <p>
            If we discontinue a paid Service entirely before the end of a
            prepaid subscription term, we will provide an appropriate remedy
            where required by applicable law and may, at our discretion,
            provide a refund or credit for the unused portion of the affected
            prepaid term.
          </p>

          <h2>14. Suspension and termination</h2>
          <p>You may stop using the Service at any time.</p>
          <p>You may delete your account through the available account controls.</p>
          <p>
            If you are the sole administrator of a strata corporation, you
            should contact us before deleting your account so that
            administrative control can be transferred to another authorized
            person.
          </p>
          <p>
            We may suspend or terminate access to all or part of the Service
            if we reasonably believe that:
          </p>
          <ul>
            <li>you have materially breached these Terms;</li>
            <li>you have provided materially false or misleading information;</li>
            <li>
              you have misrepresented your authority to act for a strata
              corporation;
            </li>
            <li>
              your use of the Service creates a significant security, legal,
              or operational risk;
            </li>
            <li>payment for a paid subscription remains outstanding;</li>
            <li>continued access would violate applicable law; or</li>
            <li>
              suspension is reasonably necessary to protect the Service,
              another user, or a strata corporation.
            </li>
          </ul>
          <p>
            Where reasonably practicable, we will provide notice and an
            opportunity to address the issue before terminating access for a
            curable breach.
          </p>
          <p>
            We may suspend access immediately where necessary to address a
            security threat, fraud, unauthorized access, unlawful activity,
            or other urgent risk.
          </p>

          <h3>Effect of termination</h3>
          <p>
            Termination of an individual account does not automatically
            terminate a strata corporation&rsquo;s subscription or delete the
            corporation&rsquo;s records.
          </p>
          <p>
            Termination of a corporation&rsquo;s subscription will generally
            result in the deactivation of paid features.
          </p>
          <p>
            Subject to applicable law and our retention obligations, Customer
            Content will be handled in accordance with the{" "}
            <Link href="/privacy">Privacy Policy</Link> and any applicable
            subscription or account procedures.
          </p>

          <h2>15. Intellectual property</h2>
          <p>
            StrataCouncil and its licensors own all rights, title, and
            interest in:
          </p>
          <ul>
            <li>the Service;</li>
            <li>StrataCouncil&rsquo;s software;</li>
            <li>the Stratasphere platform;</li>
            <li>the StrataCouncil.ca website;</li>
            <li>trademarks and branding;</li>
            <li>software code;</li>
            <li>interface designs;</li>
            <li>documentation;</li>
            <li>training materials;</li>
            <li>original templates; and</li>
            <li>other materials provided by StrataCouncil,</li>
          </ul>
          <p>except for Customer Content and third-party materials.</p>
          <p>
            These Terms do not transfer ownership of StrataCouncil&rsquo;s
            intellectual property to you.
          </p>
          <p>
            Subject to these Terms and your applicable subscription, we grant
            you a limited, non-exclusive, non-transferable right to access
            and use the Service for its intended purpose.
          </p>
          <p>
            You may not copy, reproduce, distribute, sell, sublicense, or
            commercially exploit StrataCouncil&rsquo;s proprietary materials
            except as expressly permitted by us or applicable law.
          </p>

          <h2>16. Training materials</h2>
          <p>
            Training content provided through StrataCouncil.ca is intended
            for educational purposes.
          </p>
          <p>
            You may access and use the training materials for your own
            personal or organizational education while you have authorized
            access to the Service.
          </p>
          <p>
            You may not reproduce, resell, redistribute, publish, or
            commercially exploit the training materials without our written
            permission.
          </p>
          <p>
            Completion of a training course does not create a professional
            designation, licence, certification, or authorization unless
            expressly stated otherwise.
          </p>

          <h2>17. Disclaimers</h2>
          <p>
            To the maximum extent permitted by law, the Service is provided
            on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis.
          </p>
          <p>We do not guarantee that:</p>
          <ul>
            <li>the Service will always be available;</li>
            <li>the Service will be uninterrupted;</li>
            <li>the Service will be error-free;</li>
            <li>every feature will remain available;</li>
            <li>
              information stored through the Service will never be lost or
              corrupted;
            </li>
            <li>AI-generated information will be accurate or complete; or</li>
            <li>
              the Service will meet every particular requirement of your
              organization.
            </li>
          </ul>
          <p>
            We will use reasonable efforts to maintain the availability,
            security, and reliability of the Service.
          </p>
          <p>
            Nothing in these Terms excludes or limits any warranty,
            condition, right, or remedy that cannot lawfully be excluded or
            limited.
          </p>

          <h2>18. Professional advice disclaimer</h2>
          <p>
            StrataCouncil provides software, educational material, and
            governance tools.
          </p>
          <p>
            We are not your lawyer, accountant, insurer, engineer, strata
            manager, or other professional advisor solely because you use the
            Service.
          </p>
          <p>
            Information provided through the Service is not legal,
            accounting, financial, insurance, engineering, or other
            professional advice.
          </p>
          <p>
            Legislation, regulations, court decisions, government guidance,
            and other information can change.
          </p>
          <p>You should obtain professional advice where the circumstances warrant it.</p>

          <h2>19. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, StrataCouncil will not be
            liable for indirect, incidental, special, consequential,
            exemplary, or punitive damages arising from or related to your
            use of the Service, including loss of profits, business
            opportunity, goodwill, or anticipated savings.
          </p>
          <p>
            To the maximum extent permitted by law, StrataCouncil&rsquo;s
            total aggregate liability arising from or relating to the Service
            or these Terms will not exceed the greater of:
          </p>
          <ul>
            <li>
              the amount paid by the applicable customer to StrataCouncil for
              the Service during the three months immediately preceding the
              event giving rise to the claim; or
            </li>
            <li>CAD $100.</li>
          </ul>
          <p>
            For a customer who has not paid for a subscription, the liability
            cap is CAD $100.
          </p>
          <p>
            This limitation does not apply to liability that cannot legally
            be limited or excluded.
          </p>
          <p>
            Nothing in these Terms limits liability to the extent that doing
            so would be prohibited by applicable law.
          </p>

          <h2>20. Indemnification</h2>
          <p>
            To the extent permitted by law, you agree to indemnify and hold
            harmless StrataCouncil and its officers, directors, employees,
            and contractors from third-party claims, losses, liabilities,
            damages, and reasonable legal costs arising directly from:
          </p>
          <ul>
            <li>your material breach of these Terms;</li>
            <li>your unlawful use of the Service;</li>
            <li>your unauthorized use of another person&rsquo;s information;</li>
            <li>
              your infringement of another person&rsquo;s intellectual
              property or other rights;
            </li>
            <li>
              your material misrepresentation of authority to act for a
              strata corporation; or
            </li>
            <li>
              Customer Content that you knowingly provide without the
              necessary rights or authority.
            </li>
          </ul>
          <p>
            This obligation does not apply to the extent that a claim results
            from StrataCouncil&rsquo;s own negligence, willful misconduct, or
            breach of applicable law.
          </p>
          <p>
            We will provide reasonable notice of a claim subject to
            indemnification and allow you reasonable participation in the
            defence, subject to applicable law.
          </p>

          <h2>21. Privacy</h2>
          <p>
            Our collection, use, disclosure, retention, and protection of
            personal information are governed by our{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>
          <p>
            If there is a conflict between these Terms and the Privacy Policy
            concerning the handling of personal information, the Privacy
            Policy will govern to the extent necessary to comply with
            applicable privacy law.
          </p>

          <h2>22. Changes to these Terms</h2>
          <p>We may update these Terms from time to time.</p>
          <p>
            The current version will be posted on this page with its
            effective date and last-updated date.
          </p>
          <p>
            For material changes that affect your rights or obligations, we
            will provide reasonable notice where appropriate.
          </p>
          <p>
            If you continue to use the Service after the revised Terms become
            effective, your continued use constitutes acceptance of the
            revised Terms to the extent permitted by applicable law.
          </p>
          <p>
            If you do not agree to a material change, you may stop using the
            Service and, where applicable, cancel your subscription.
          </p>
          <p>Changes to subscription prices are governed separately by Section 5.</p>

          <h2>23. Governing law</h2>
          <p>
            These Terms are governed by the laws of British Columbia and the
            applicable federal laws of Canada.
          </p>
          <p>
            Nothing in these Terms prevents a consumer from exercising rights
            or remedies available under applicable consumer protection or
            other mandatory legislation.
          </p>

          <h2>24. General provisions</h2>

          <h3>Entire agreement</h3>
          <p>
            These Terms, together with the Privacy Policy and any applicable
            subscription order or additional terms expressly incorporated
            into the Service, constitute the agreement between you and
            StrataCouncil concerning your use of the Service.
          </p>

          <h3>Severability</h3>
          <p>
            If a court or other authority determines that a provision of
            these Terms is invalid or unenforceable, the remaining provisions
            will continue to apply to the extent permitted by law.
          </p>

          <h3>No waiver</h3>
          <p>
            Our failure to enforce a provision of these Terms does not
            constitute a waiver of our right to enforce it later.
          </p>

          <h3>Assignment</h3>
          <p>
            You may not transfer your rights or obligations under these Terms
            without our prior written consent, except where a transfer is
            permitted by law.
          </p>
          <p>
            We may transfer our rights and obligations under these Terms as
            part of a merger, acquisition, corporate reorganization, sale of
            assets, or similar business transaction, subject to applicable
            law.
          </p>

          <h3>Survival</h3>
          <p>
            Provisions that by their nature should continue after termination
            will survive termination, including provisions concerning:
          </p>
          <ul>
            <li>intellectual property;</li>
            <li>Customer Content;</li>
            <li>aggregated and de-identified information;</li>
            <li>limitations of liability;</li>
            <li>indemnification;</li>
            <li>dispute-related rights;</li>
            <li>payment obligations; and</li>
            <li>any other provisions intended to survive termination.</li>
          </ul>

          <h2>25. Contact us</h2>
          <p>
            Questions about these Terms, your account, or a Stratasphere
            subscription can be sent to:
          </p>
          <p>
            StrataCouncil.ca
            <br />
            British Columbia, Canada
          </p>
          <p>
            General support:{" "}
            <a href="mailto:support@stratacouncil.ca">
              support@stratacouncil.ca
            </a>
          </p>
          <p>
            Privacy:{" "}
            <a href="mailto:privacy@stratacouncil.ca">
              privacy@stratacouncil.ca
            </a>
          </p>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
