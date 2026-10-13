export type Step = {
  title: string;
  summary: string;
  we: string;
  you: string;
  output: string;
};

export const processSteps: Step[] = [
  {
    title: "Discovery",
    summary: "We agree on what to build and why.",
    we: "Ask about your business, your customers and what is not working today. Review any existing site, app or system.",
    you: "One or two video calls, plus access to anything we need to look at.",
    output: "A written proposal with scope, timeline and cost. You decide whether to go ahead.",
  },
  {
    title: "Design",
    summary: "You see how it will look and work before we build it.",
    we: "Plan the pages or screens, write the content structure and design the key views.",
    you: "Review the designs and send feedback, usually within a few days of each round.",
    output: "Approved designs that you can click through.",
  },
  {
    title: "Development",
    summary: "We build it in stages and show you each one.",
    we: "Build in short stages and share a working preview after each one.",
    you: "Try each preview and tell us what to change. Send content such as text, photos and prices.",
    output: "A working version you have already tested along the way.",
  },
  {
    title: "Testing",
    summary: "We check it on real devices before anyone else sees it.",
    we: "Test every page, form and flow on phones, tablets and computers, check speed and accessibility, and fix what we find.",
    you: "A final review of the finished version.",
    output: "Your sign-off that it is ready to launch.",
  },
  {
    title: "Launch",
    summary: "We put it live and watch it closely.",
    we: "Publish the site or app, connect your domain, set up tracking for enquiries and sales, and monitor for problems in the first weeks.",
    you: "Access to your domain and accounts, or permission for us to set them up in your name.",
    output: "A live product, and logins for everything, in your name.",
  },
  {
    title: "Support",
    summary: "We keep it running and improve it.",
    we: "Updates, security fixes and backups, plus changes you ask for. We review results with you on a regular schedule.",
    you: "Tell us what is working and what is not.",
    output: "A site, app or system that stays current. Support is optional and agreed separately.",
  },
];

export const processQuestions = [
  {
    q: "How long does a project take?",
    a: "It depends on the size of the project. A small website takes weeks, while an app or a custom system takes longer. After Discovery you get a timeline in writing, and we tell you early if anything changes it.",
  },
  {
    q: "How much does it cost?",
    a: "We price each project after Discovery, once we both know what is being built. The proposal lists the cost before any work starts, so there are no surprise invoices.",
  },
  {
    q: "Who owns the work?",
    a: "You do. The code, designs, content, domain and accounts are yours, and we set them up in your name.",
  },
  {
    q: "Can we work together from a different time zone?",
    a: "Yes. We work remotely with clients in any country. We schedule calls at times that suit you and keep everything else in writing, so nothing depends on being online at the same moment.",
  },
];
