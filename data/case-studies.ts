export type Block =
  | { type: "paragraph"; text: string; link?: { label: string; href: string }; boldPrefix?: string }
  | { type: "subheading"; text: string; id?: string }
  | { type: "finding"; title: string; body: string; bg?: string; num?: string; reasoning?: string; logoSrc?: string; borderColor?: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; attribution: string }
  | { type: "callout"; text: string; bg?: string }
  | { type: "image"; label: string; aspect: string; cols?: 1 | 2; caption?: string; src?: string }
  | { type: "image-row"; images: { label: string; aspect?: string; src?: string; caption?: string }[]; fullWidth?: boolean }
  | { type: "iteration-cards"; cards: Array<{ pill: string; title: string; image?: { src: string; alt: string; aspect: string }; images?: Array<{ src: string; alt: string; aspect: string }>; annotations: Array<{ text: string; boldSuffix?: string }>; bridgeAfter?: string }> }
  | { type: "media-row"; aspect: string; items: { kind: "image" | "video"; label: string; src?: string; caption?: string }[] }
  | { type: "target-goals"; target: string; goals: string[] }
  | { type: "target-goals-pills"; target: string; goals: string[] }
  | { type: "video"; label: string; aspect?: string; caption?: string }
  | { type: "video-row"; videos: { label: string; caption?: string; src?: string; phoneFrame?: boolean }[]; aspect?: string }
  | { type: "youtube-comments"; label?: string; comments: { username: string; text: string; likes: number; translation?: "see-original" | "translate" }[] }
  | { type: "external-link"; label: string; href: string }
  | { type: "carousel"; images: { src: string; alt: string }[] }
  | { type: "before-after-toggle"; beforeSrc?: string; afterSrc?: string; beforeLabel: string; afterLabel: string };

export interface TocSection {
  id: string;
  label: string;
  heading: string;
  blocks: Block[];
}

export interface CaseStudy {
  scrollPhone?: {
    sections: any[];
  };
  id: string;
  title: string;
  subtitle: string;
  context: string;
  category: string;
  year: string;
  tools: string[];
  heroImage: { label: string; aspect: string; src?: string };
  sections: TocSection[];
}

// ─────────────────────────────────────────────────────────────
// MiDorm — content sourced verbatim from nehajaitly.com/midorm
// ─────────────────────────────────────────────────────────────
const midorm: CaseStudy = {
  id: "midorm",
  title: "MiDorm",
  subtitle: "Dorm Decisions, made easy",
  context: "This was a team project, part of Advanced Design (SI 407) course at the University of Michigan",
  category: "UX / Product Design",
  year: "2025",
  tools: ["Figma"],
  heroImage: {
    label: "MiDorm — hero image",
    aspect: "16/9",
    src: "/gen.png",
  },
  scrollPhone: {
    sections: [
      { id: "overview",         videoSrc: "/overview-video.mp4.mov" },
      { id: "the-problem",      videoSrc: null },
      { id: "research",         videoSrc: null },
      { id: "discovery",        videoSrc: null },
      { id: "mobile-first",     videoSrc: "/mobile-first-video.mp4.mov" },
      { id: "design-decisions", videoSrc: null },
      { id: "photo-gallery",    videoSrc: null },
      { id: "user-testing",     videoSrc: null },
      { id: "final-delivery",   videoSrc: null },
      { id: "reflections",      videoSrc: null },
    ],
  },
  sections: [
    {
      id: "overview",
      label: "Overview",
      heading: "Overview",
      blocks: [
        {
          type: "paragraph",
          text: "As an incoming freshman, choosing where to live can feel overwhelming. Information scattered and no easy way to compare dorms, students often rely on guesswork and word of mouth.",
        },
        {
          type: "paragraph",
          boldPrefix: "MiDorm",
          text: " simplifies this by organizing key information and creating an easy way to explore and compare options to help students make informed decisions.",
        },
      ],
    },
    {
      id: "the-problem",
      label: "The Problem",
      heading: "The Problem",
      blocks: [
        {
          type: "paragraph",
          text: "For each competitor, we examined the clarity of option presentation, the transparency of option information, and personalization.",
          link: {
            label: "View competitive review →",
            href: "https://docs.google.com/document/d/1lDZNoxvxYziQn9rOfPbV4yBp19L2dNPc8-QA7ITbRro/edit?usp=sharing",
          },
        },
        {
          type: "subheading",
          text: "Key Findings",
        },
        {
          type: "finding",
          title: "Cluttered Interfaces Make Dorm Selection Overwhelming",
          body: "Students struggle to quickly identify dorms that meet their needs due to dense option presentation and limited visibility into dorm information.",
        },
        {
          type: "finding",
          title: "No Way to Track or Compare Preferred Dorms",
          body: "Existing tools do not allow students to save or compare dorms they are considering. This causes students to rely on memory or external tools.",
        },
      ],
    },
    {
      id: "research",
      label: "Research",
      heading: "Research",
      blocks: [
        {
          type: "paragraph",
          text: "After conducting this user research, we compiled our findings into a Product Vision Board. This method allowed us to capture the overall app implementation strategy and ensure that our app leveraged the strengths of the University.",
        },
        {
          type: "image",
          label: "Product Vision Board",
          aspect: "4/3",
          cols: 1,
          caption: undefined,
          src: "/Product%20Vision%20Board.png",
        },
        {
          type: "target-goals-pills",
          target: "Incoming students @ University of Michigan",
          goals: [
            "Visual descriptions of dorms",
            "Filtering and sorting options",
            "Dorm ranking",
          ],
        },
      ],
    },
    {
      id: "discovery",
      label: "Discovery",
      heading: "Discovery",
      blocks: [
        {
          type: "paragraph",
          text: "Our ideation phase included Crazy 8 sketches and Mid-Fi wireframes.",
        },
        {
          type: "image",
          label: "Crazy 8 sketches / early ideation",
          aspect: "4/3",
          cols: 2,
          caption: "Crazy 8 sketches",
          src: "/12D696F6-7F6E-4B60-AA6D-1C6EF6B79849_1_201_a.jpeg",
        },
        {
          type: "image",
          label: "Mid-fidelity wireframes",
          aspect: "4/3",
          cols: 2,
          caption: "Mid-Fi wireframes",
          src: "/mid%20fi.png",
        },
        {
          type: "callout",
          text: "Visual details are the most engaging and useful to students. This led us to adopt a photo-first design for dorm detail screens.",
        },
      ],
    },
    {
      id: "mobile-first",
      label: "Mobile First",
      heading: "Mobile First + Design System",
      blocks: [
        {
          type: "paragraph",
          text: "We followed a Mobile First approach and aligned with Apple's iOS Human Interface Guidelines, and created a design system to streamline our process.",
        },
        {
          type: "video-row",
          videos: [
            { label: "Video 01", src: "/video 4.mov" },
            { label: "Video 02", src: "/video 2.mov" },
            { label: "Video 03", src: "/video 3.mov" },
          ],
        },
      ],
    },
    {
      id: "design-decisions",
      label: "Design Decisions",
      heading: "Design Decisions",
      blocks: [
        {
          type: "paragraph",
          text: "We progressed major app screens from sketches to high-fidelity prototyped wireframes.",
        },
        {
          type: "subheading",
          text: "Photo Gallery",
          id: "photo-gallery",
        },
        {
          type: "paragraph",
          text: "Increasing visual transparency by placing a photo gallery at the top of each dorm page, featuring student-submitted images of real rooms and spaces help students make more informed decisions.",
        },
        {
          type: "subheading",
          text: "User Testing Insights",
          id: "user-testing",
        },
        {
          type: "paragraph",
          text: "We found that our design performed as intended. All five participants were able to complete the key tasks with ease and they appreciated the level of transparency and detail provided in the dorm information.",
        },
        {
          type: "quote",
          text: "The filters are really easy to scroll through",
          attribution: "Diya Sankla — Senior @ UMich",
        },
        {
          type: "quote",
          text: "I really appreciated pictures of the dorms because I didn't have that when initially going through the process",
          attribution: "Reeva Bohra — Junior @ UMich",
        },
        {
          type: "subheading",
          text: "Revisions",
        },
        {
          type: "list",
          items: [
            "Diverse preferences for contacting roommates outside of in-app messaging → Allowed users to share multiple third-party contact methods (email, phone number, Instagram, etc.) with their roommate",
            "Desire for more functionality out of dorm maps → Allowed users to explore nearby campus buildings and see dorm-to-building distance estimates, following map conventions like location filters, search bars, and pinch-to-zoom gesture",
          ],
        },
        {
          type: "before-after-toggle",
          beforeSrc: "/revision-before.png",
          afterSrc: "/revision-after.png",
          beforeLabel: "Original design before user testing",
          afterLabel: "Revised design after user testing",
        },
      ],
    },
    {
      id: "final-delivery",
      label: "Developer Handoff",
      heading: "Developer Handoff",
      blocks: [
        {
          type: "paragraph",
          text: "We created a detailed developer handoff that captures both the functionality and the native iOS behavior of MiDorm. We noted our color and typography styles for easy reuse, annotated intended screen content states and component interactions, and documented hardware-integrated features (e.g., when the user's camera or photo library is triggered).",
        },
        {
          type: "image",
          label: "Developer handoff — specs",
          aspect: "16/9",
          cols: 2,
          src: "/a.png",
        },
        {
          type: "image",
          label: "Developer handoff — annotations",
          aspect: "16/9",
          cols: 2,
          src: "/b.png",
        },
      ],
    },
    {
      id: "reflections",
      label: "Reflections",
      heading: "Reflections",
      blocks: [
        {
          type: "subheading",
          text: "Our Approach",
        },
        {
          type: "callout",
          text: "A native app for a common U-M student problem that currently has no university-specific solution. Building within the U-M system required navigating both Apple's iOS guidelines and the University's design standards, often making tradeoffs where they conflicted. Despite these constraints, our decisions consistently prioritized user needs and expectations.",
        },
        {
          type: "subheading",
          text: "Next Sprint",
        },
        {
          type: "callout",
          text: "In our next sprint, we would enhance visual dorm details by adding student-created video walkthroughs to build transparency and trust. We would also conduct additional user research to identify the most valuable features and guide future updates.",
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Micro Merchant Loan — content sourced verbatim from nehajaitly.com/paytm
// ─────────────────────────────────────────────────────────────
const microMerchantLoan: CaseStudy = {
  id: "micro-merchant-loan",
  title: "Micro Merchant Loan",
  subtitle: "Fintech platforms in India design loan products for larger amounts and longer repayment cycles. Paytm's merchants needed something different.",
  context: "UX / UI Internship · Paytm",
  category: "UX / UI Design",
  year: "2025",
  tools: ["Figma"],
  heroImage: {
    label: "Image placeholder: Micro Merchant Loan hero",
    aspect: "16/9",
  },
  sections: [
    {
      id: "overview",
      label: "Overview",
      heading: "Why This Product Exists",
      blocks: [
        {
          type: "paragraph",
          text: "Fintech platforms in India typically design loan products for larger amounts and longer repayment cycles. But internal Paytm data showed a different pattern; the majority of Paytm's merchants were low-income, small-scale business owners who needed smaller amounts, quickly, with short repayment windows.",
        },
        {
          type: "paragraph",
          text: "This gap led to design a micro-loan experience built around how these users actually think and behave, not how fintech assumes they do. It also became a chance to rethink the existing lending flow entirely.",
        },
        {
          type: "callout",
          text: "How might we design a micro-loan experience for low-income merchants that is easy to understand, transparent and trustworthy, and quick to apply for and repay while also improving the existing experience?",
          bg: "#DAE7F3",
        },
      ],
    },
    {
      id: "research",
      label: "Research",
      heading: "Research",
      blocks: [
        {
          type: "subheading",
          text: "UX Audit",
        },
        {
          type: "paragraph",
          text: "I audited the existing lending flow screen by screen, mapping where users would drop off and why.",
        },
        {
          type: "finding",
          title: "Lack of Loan Awareness",
          body: "Users didn't understand loan timelines, deductions, or required documents.",
          borderColor: "#5A8FA8",
        },
        {
          type: "finding",
          title: "Overwhelming Landing Page",
          body: "Text-heavy, unclear on benefits or eligibility. Users quit before even starting.",
          borderColor: "#5A8FA8",
        },
        {
          type: "finding",
          title: "No Feedback During Wait Times",
          body: "No progress indicators at key steps, users thought the app had frozen.",
          borderColor: "#5A8FA8",
        },
        {
          type: "image-row",
          images: [
            { label: "UX audit — existing lending flow screens", src: "/ux audit.png" },
            { label: "UX audit — recommendations", src: "/ux audit 1.png" },
          ],
        },
        {
          type: "subheading",
          text: "YouTube Comments Analysis",
        },
        {
          type: "paragraph",
          text: "The main goal was understanding the users. I explored real-world user behavior through YouTube. Many creators publish videos in Hindi and simplified English explaining how merchant loans works. These videos target users who are not fluent in English, are new to digital financial systems or who learn through easy explanations.",
        },
        {
          type: "paragraph",
          text: "I analyzed the comment section of these videos to understand user tone, the language they communicate in and exactly where they get stuck.",
        },
        {
          type: "youtube-comments",
          label: "YouTube comments — translated from Hindi",
          comments: [
            {
              username: "@user4821",
              text: "Sir I do not know the email id in which I opened the account, I also do not have its number, now how will I apply for the loan",
              likes: 0,
              translation: "see-original",
            },
            {
              username: "@merchant_23k",
              text: "17k offer 🎉 but today reject 😢 Why😨",
              likes: 1,
            },
            {
              username: "@paytm_user99",
              text: "There is a limit of 1 lakh, will my payment be deducted daily or monthly?",
              likes: 2,
              translation: "see-original",
            },
            {
              username: "@shopkeeper_raj",
              text: "after opening merchant account how many days i need to wait...?apko kithne din ke baad offer aaya he",
              likes: 0,
              translation: "translate",
            },
          ],
        },
        {
          type: "subheading",
          text: "Competitive Analysis",
        },
        {
          type: "paragraph",
          text: "I looked at how BharatPay, CRED, and PhonePe handle merchant lending to understand the current landscape.",
        },
        {
          type: "finding",
          title: "BharatPay",
          body: "Quick onboarding, minimal docs, transaction-based approvals optimised for Tier 2/3 users.",
          logoSrc: "https://www.google.com/s2/favicons?domain=bharatpe.com&sz=32",
          borderColor: "#5A8FA8",
        },
        {
          type: "finding",
          title: "CRED",
          body: "Animations and gamified feedback make financial actions feel light and premium.",
          logoSrc: "https://www.google.com/s2/favicons?domain=cred.club&sz=32",
          borderColor: "#5A8FA8",
        },
        {
          type: "finding",
          title: "PhonePe",
          body: "Clean UI with merchant dashboard and multilingual support. Loans tied to transaction history.",
          logoSrc: "https://www.google.com/s2/favicons?domain=phonepe.com&sz=32",
          borderColor: "#5A8FA8",
        },
        {
          type: "subheading",
          text: "User Personas",
        },
        {
          type: "image-row",
          images: [
            { label: "User Persona 1", src: "/Frame 58.png" },
            { label: "User Persona 2", src: "/Frame 57.png" },
          ],
        },
      ],
    },
    {
      id: "design-process",
      label: "Design Process",
      heading: "Design Process",
      blocks: [
        {
          type: "paragraph",
          text: "The audit, the comments, and the competitor research all pointed to the same thing: users weren't confused by the loan, they were confused by the product.",
        },
        {
          type: "subheading",
          text: "Design Principles",
        },
        {
          type: "finding",
          title: "Clarity over complexity",
          body: "Plain language throughout. Never assume users know what \"tenure\" or \"EMI\" means.",
          reasoning: "Given the target users were low-income merchants unfamiliar with financial jargon, language needed to feel approachable and never daunting.",
          bg: "#DAE7F3",
        },
        {
          type: "finding",
          title: "Education upfront",
          body: "Explain what a micro-loan is before users enter the flow.",
          reasoning: "Users needed to understand what a micro-loan actually is before deciding to apply — informed users make more confident decisions.",
          bg: "#DAE7F3",
        },
        {
          type: "finding",
          title: "Transparency builds trust",
          body: "Show loan amount, tenure, and interest rate early before the user commits.",
          reasoning: "Surfacing loan amount, tenure, and interest rate early means users are never caught off guard, reducing drop-off and building confidence.",
          bg: "#DAE7F3",
        },
        {
          type: "subheading",
          text: "Wireframes",
        },
        {
          type: "paragraph",
          text: "I created wireframes to address key moments of confusion and drop-off in the existing flow. The main focus was designing a landing page that clearly communicated the product and surfaced the information users needed upfront. I worked through quick iterations and shared these with the product and business teams to gather feedback and validate the direction.",
        },
        {
          type: "image",
          label: "Wireframes",
          aspect: "4/3",
          cols: 1,
          src: "/wireframes.png",
        },
        {
          type: "iteration-cards",
          cards: [
            {
              pill: "Iteration 1",
              title: "Testing the information hierarchy",
              image: { src: "/iterationnn1.png", alt: "Iteration 1 screens", aspect: "4/3" },
              annotations: [
                { text: "Without the loan slider, the information wasn't very clear" },
                { text: "Users wanted more specific information that would benefit and inform them" },
              ],
              bridgeAfter: "Iteration 1 showed users needed more control over the amount and clearer financial details upfront — which directly shaped Iteration 2",
            },
            {
              pill: "Iteration 2",
              title: "Adding transparency and control",
              images: [
                { src: "/iteration 2.png", alt: "Micro Loan slider screen", aspect: "4/3" },
                { src: "/iteration 2a.png", alt: "FAQ + lending partners screen", aspect: "4/3" },
              ],
              annotations: [
                { text: "Named the product — \"Micro Loan\" explained upfront. ", boldSuffix: "Transparency = Trust" },
                { text: "Slider showed installment + interest in real-time" },
                { text: "Providing all the loan information early on to keep the user informed" },
                { text: "FAQ section — Based on the merchant help desk (MHD), these were the top asked questions. Providing answers early on will keep the user more informed" },
                { text: "Social proofing builds trust within the user" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "reflections",
      label: "Reflections",
      heading: "Reflections",
      blocks: [
        {
          type: "subheading",
          text: "What I Learned",
        },
        {
          type: "finding",
          title: "Design is about legibility, not just functionality",
          body: "This project showed me that clarity builds trust and that even small decisions, from language to information order, can determine whether a user moves forward or drops off.",
          borderColor: "#5A8FA8",
        },
        {
          type: "finding",
          title: "Research methods should match your users",
          body: "YouTube comment sections gave me access to real merchants describing confusion in their own words.",
          borderColor: "#5A8FA8",
        },
        {
          type: "finding",
          title: "Data over assumptions",
          body: "Using merchant help desk data to build the FAQ made decisions easier to defend and the design immediately more credible.",
          borderColor: "#5A8FA8",
        },
        {
          type: "subheading",
          text: "If I Continued This Project",
        },
        {
          type: "finding",
          title: "Multilingual onboarding",
          body: "[SECTION PLACEHOLDER - add multilingual onboarding description here]",
          borderColor: "#5A8FA8",
        },
        {
          type: "finding",
          title: "In-context usability testing",
          body: "In-person testing with real Tier 2/3 merchants on their own devices — to see where attention falls and where it drops in real conditions.",
          borderColor: "#5A8FA8",
        },
      ],
    },
  ],
};

export const caseStudies: Record<string, CaseStudy> = {
  midorm,
  "micro-merchant-loan": microMerchantLoan,
};
