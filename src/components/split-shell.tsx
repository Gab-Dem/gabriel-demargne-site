import Image from "next/image";
import Link from "next/link";
import { navigation, site } from "@/data/site";

export function SplitShell({
  activePath,
  rightTitle,
  rightPanelClassName,
  children,
}: {
  activePath: string;
  rightTitle: string;
  rightPanelClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="split-page">
      <section className="split-page__left">
        <div className="left-image-wrap">
          <Image
            src="/df5.png"
            alt=""
            width={1913}
            height={899}
            className="left-image"
            priority
          />
          <p className="image-caption">{site.name}</p>
        </div>

        <div className="left-lower">
          <h1 className="left-title">{site.sectionTitle}</h1>
          <nav className="left-nav" aria-label="Primary">
            {navigation.map((item) => {
              const isActive = item.href === activePath;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="left-nav__item"
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="left-nav__arrow" aria-hidden="true">
                    {isActive ? "◍" : ""}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </section>

      <section
        className={rightPanelClassName ? `split-page__right ${rightPanelClassName}` : "split-page__right"}
      >
        <h1 className="right-title">{rightTitle}</h1>
        {children}
      </section>
    </main>
  );
}
