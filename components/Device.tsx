/**
 * An illustrated laptop with one of the page's live app demos running on
 * its screen (2026-11-25). The screen's position inside each illustration
 * is set per variant in globals.css (.device--training and so on), as
 * percentages of the image, so it scales with it. The demo lays out at
 * three times the screen's width and is scaled down to fit, so it runs
 * exactly as it does full size.
 */
export type Art = { src: string; width: number; height: number; alt: string };

export function Device({ art, variant, children }: { art: Art; variant: string; children: React.ReactNode }) {
  return (
    <figure className={`device device--${variant}`}>
      <img src={art.src} width={art.width} height={art.height} alt={art.alt} loading="lazy" />
      <div className="device__screen">
        <div className="device__scaler">{children}</div>
      </div>
    </figure>
  );
}
