import Link from "next/link";
import { siteConfig } from "@/config/site";
import { WindowFrame } from "@/components/desktop/Window";
import { Desktop } from "@/components/desktop/WindowManager";
import { ManagedWindow } from "@/components/desktop/ManagedWindow";
import { MobileAppDemo } from "@/components/services/demos/MobileAppDemo";
import { CustomSoftwareDemo } from "@/components/services/demos/CustomSoftwareDemo";
import { AiAutomationDemo } from "@/components/services/demos/AiAutomationDemo";
import { BrandingDemo } from "@/components/services/demos/BrandingDemo";
import { WebsitesDemo } from "@/components/services/demos/WebsitesDemo";
import { AppIcon, Folder, Kaomoji, MiniDashboard, MiniDesign, MiniFlow, MiniPhoneApp, MiniSite, NameTag, Palette, PhoneObject, Sticker, StickyNote } from "./Minis";
import { SiteBuilder } from "./SiteBuilder";
import { ZoomWindow } from "./ZoomWindow";

/** Desk decor: placed on the canvas and entering one after another, like the windows. */
function Decor({ x, y, d, rotate = 0, children }: { x: number; y: number; d: number; rotate?: number; children: React.ReactNode }) {
  return (
    <div className="rise-in absolute" style={{ left: x, top: y, ["--d" as string]: `${d}ms`, rotate: `${rotate}deg` }}>
      {children}
    </div>
  );
}

function HeroCopy({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-8 text-center ${className}`}>
      <div className="flex flex-col items-center gap-2">
        <h1 id="hero-heading" className="text-[56px] font-medium leading-[1.1] tracking-[-0.03em] lg:text-[88px] lg:tracking-[-2.64px]">
          {siteConfig.name.toLowerCase()}
        </h1>
        <p className="max-w-[340px] text-[18px] leading-normal tracking-[-0.54px] text-black lg:w-[520px] lg:max-w-none lg:text-[20px] lg:tracking-[-0.6px]">
          websites, apps and software for any business
        </p>
      </div>
      <div className="flex w-full flex-col items-center gap-2 lg:w-auto">
        <div className="flex w-full max-w-[280px] flex-col gap-3 lg:max-w-none lg:flex-row">
          <Link href={siteConfig.cta.href} className="pill-blue lg:w-auto">
            <svg viewBox="0 0 20 20" className="relative z-[2] h-5 w-5" aria-hidden="true">
              <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h11A1.5 1.5 0 0 1 17 5.5v9a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5z" fill="#fff" stroke="#000" strokeWidth="1.3" />
              <path d="M3.5 5l6.5 5 6.5-5" fill="none" stroke="#000" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
            <span className="relative z-[2]">start a project</span>
          </Link>
          <Link href="#services" className="pill-grey lg:w-auto">
            <svg viewBox="0 0 20 20" className="relative z-[2] h-5 w-5" aria-hidden="true">
              <rect x="3" y="3" width="6" height="6" rx="1.5" fill="#000" />
              <rect x="11" y="3" width="6" height="6" rx="1.5" fill="#000" />
              <rect x="3" y="11" width="6" height="6" rx="1.5" fill="#000" />
              <rect x="11" y="11" width="6" height="6" rx="1.5" fill="#000" />
            </svg>
            <span className="relative z-[2]">see what we build</span>
          </Link>
        </div>
        <p className="text-[12px] leading-[18px] tracking-[-0.36px] text-black/60">we reply to every enquiry within {siteConfig.replyTime}</p>
      </div>
    </div>
  );
}

/**
 * The first screen: a desk with the name in the middle and small windows around it. Each small window is a
 * service: drag it around, or click it to open a working version. On phones it becomes a simple stack.
 */
export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="desk-dots relative overflow-hidden">
      {/* Large screens: the full desk on the 1440px canvas. */}
      <Desktop initiallyOpen={["flow", "site", "app", "dash", "design", "big"]} className="hidden h-[1010px] lg:block" label="Desktop">
        <Decor x={20} y={22} d={110} rotate={-4}><Palette /></Decor>
        <Decor x={316} y={22} d={126} rotate={6}><NameTag /></Decor>
        <Decor x={383} y={118} d={142}><Kaomoji>^ ‿ ^</Kaomoji></Decor>
        <Decor x={311} y={226} d={158}><Folder /></Decor>
        <Decor x={48} y={272} d={174} rotate={-3}><StickyNote /></Decor>
        <Decor x={862} y={78} d={190}><Kaomoji>¯\_(ツ)_/¯</Kaomoji></Decor>
        <Decor x={861} y={113} d={206}><AppIcon /></Decor>
        <Decor x={800} y={190} d={222}><span className="block h-4 w-4 rounded-full bg-[conic-gradient(#ff5f57,#febc2e,#28c840,#4fd8c6,#5b8cff,#ff7ab8,#ff5f57)] shadow-[0_2px_4px_rgb(0_0_0/.25)]" aria-hidden="true" /></Decor>
        <Decor x={1243} y={150} d={238} rotate={-8}><NameTag color="#e5322d" lines={["built to", "last"]} /></Decor>
        <Decor x={1322} y={38} d={254}><span className="block h-10 w-[104px] rounded-[4px] bg-[linear-gradient(180deg,#8ec5ff,#d6e7ff_60%,#bfe8b0_61%,#7cc46a)] shadow-[0_4px_8px_rgb(0_0_0/.15)]" aria-hidden="true" /></Decor>
        <Decor x={288} y={458} d={270}><Kaomoji>(¬‿¬)</Kaomoji></Decor>
        <Decor x={200} y={600} d={286} rotate={14}><PhoneObject /></Decor>
        <Decor x={1180} y={388} d={302}><Kaomoji>{"{ •‿• }"}</Kaomoji></Decor>
        <Decor x={1155} y={478} d={318}><Folder /></Decor>
        <Decor x={1170} y={560} d={334} rotate={-6}><Sticker>no templates!</Sticker></Decor>

        <ManagedWindow id="app" title="booking-app" caption="booking-app.mov" left="125px" top="72px" width="124px" dragWhole titleHidden enterDelay={350} bodyClassName="h-[200px]">
          <ZoomWindow title="booking-app" serviceSlug="mobile-apps" Demo={MobileAppDemo}>
            <MiniPhoneApp />
          </ZoomWindow>
        </ManagedWindow>
        <ManagedWindow id="site" title="landing-page" caption="landing-page.html" left="527px" top="22px" width="182px" dragWhole titleHidden enterDelay={380} bodyClassName="h-[97px]">
          <ZoomWindow title="landing-page" serviceSlug="websites" Demo={WebsitesDemo}>
            <MiniSite />
          </ZoomWindow>
        </ManagedWindow>
        <ManagedWindow id="dash" title="job-tracker" caption="job-tracker.app" left="996px" top="58px" width="250px" dragWhole titleHidden enterDelay={410} bodyClassName="h-[135px]">
          <ZoomWindow title="job-tracker" serviceSlug="custom-software" Demo={CustomSoftwareDemo}>
            <MiniDashboard />
          </ZoomWindow>
        </ManagedWindow>
        <ManagedWindow id="flow" title="booking-assistant" caption="booking-assistant.flow" left="38px" top="402px" width="222px" dragWhole titleHidden enterDelay={440} bodyClassName="h-[120px]">
          <ZoomWindow title="booking-assistant" serviceSlug="ai-automation" Demo={AiAutomationDemo}>
            <MiniFlow />
          </ZoomWindow>
        </ManagedWindow>
        <ManagedWindow id="design" title="brand-kit" caption="brand-kit.fig" left="1262px" top="376px" width="147px" dragWhole titleHidden enterDelay={470} bodyClassName="h-[245px]">
          <ZoomWindow title="brand-kit" serviceSlug="branding" Demo={BrandingDemo}>
            <MiniDesign />
          </ZoomWindow>
        </ManagedWindow>
        <ManagedWindow id="big" title="sample-site.html" caption="a sample site. try the buttons." left="320px" top="525px" width="800px" bodyClassName="h-[440px]">
          <SiteBuilder />
        </ManagedWindow>

        <div className="rise-in pointer-events-none absolute left-1/2 top-[236px] z-[1] -translate-x-1/2" style={{ ["--d" as string]: "50ms" }}>
          <HeroCopy className="pointer-events-auto" />
        </div>
      </Desktop>

      {/* Phones and tablets: the same pieces, stacked. */}
      <div className="relative px-5 pb-14 pt-6 lg:hidden">
        <div className="relative mx-auto h-24 max-w-md" aria-hidden="true">
          <span className="absolute left-0 top-2 rotate-[-6deg]"><Palette /></span>
          <span className="absolute left-[34%] top-0 rotate-[6deg]"><NameTag /></span>
          <span className="absolute right-[18%] top-8"><Folder /></span>
          <span className="absolute right-0 top-1"><AppIcon /></span>
        </div>
        <HeroCopy className="mt-8" />
        <div className="mx-auto mt-12 max-w-2xl">
          <WindowFrame title="sample-site.html" bodyClassName="h-[340px] sm:h-[440px]">
            <SiteBuilder />
          </WindowFrame>
          <p className="win-caption">a sample site. try the buttons.</p>
        </div>
      </div>
    </section>
  );
}
