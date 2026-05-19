import Image from "next/image";
import Link from "next/link";
import { ServiceDetailHeader } from "@/components/service-detail-header";

type PhotographyService = {
  detailTitle: string;
  detailServices: readonly string[];
  intro: string;
};

type GallerySection = {
  title: string;
  copy: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

const gallerySections: readonly GallerySection[] = [
  {
    title: "Outdoors Editorial",
    copy:
      "Editorial outdoor photography focused on place, atmosphere, landscape, travel, and the quiet traces of human presence.",
    image: {
      src: "/photography-page/outdoors/selected.JPG",
      alt: "Mountain road landscape",
      width: 6000,
      height: 4000,
    },
  },
  {
    title: "Sports Editorial",
    copy:
      "Editorial sport photography focused on movement, competition, live events, cycling culture, and event atmosphere.",
    image: {
      src: "/photography-page/sports/selected.png",
      alt: "Portrait-oriented sports editorial image",
      width: 1688,
      height: 2530,
    },
  },
  {
    title: "Wedding Photography",
    copy:
      "Outdoor, natural-light wedding photography focused on candid moments, documentary atmosphere, and the feeling of the day.",
    image: {
      src: "/photography-page/wedding/selected.jpeg",
      alt: "Wedding celebration with confetti",
      width: 6000,
      height: 4000,
    },
  },
  {
    title: "Studio Editorial",
    copy:
      "Studio photography focused on controlled light, composition, styling, portraiture, performance, and image-led storytelling.",
    image: {
      src: "/photography-page/studio/selected.png",
      alt: "Studio editorial portrait standing pose",
      width: 724,
      height: 1086,
    },
  },
] as const;

const offeredServices = [
  "Editorial photography for places, projects, and publications",
  "Sports and live event photography",
  "Wedding photography with a documentary focus",
  "Studio editorial portraiture and movement-based image work",
  "Commissioned photography for creative businesses and service-led brands",
  "Passport and ID photos in Kew",
] as const;

export function PhotographyServicePage({
  service,
}: {
  service: PhotographyService;
}) {
  return (
    <div className="right-content right-content--detail-topless">
      <div className="photography-service-page">
        <ServiceDetailHeader
          title={service.detailTitle}
          services={service.detailServices}
          intro={service.intro}
          ariaLabel="Photography services"
        />

        <div className="photography-service-list">
          {gallerySections.map((section) => (
            <PhotographyFeature key={section.title} section={section} />
          ))}
        </div>

        <section className="photography-offers">
          <div className="photography-offers__header">
            <h2>Photography services</h2>
          </div>
          <ul className="photography-offers__list">
            {offeredServices.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
          <Link href="/contact" className="ux-research-cta photography-offers__cta">
            <span className="ux-research-cta__content">
              <span className="ux-research-cta__label">Get in touch</span>
            </span>
          </Link>
        </section>
      </div>
    </div>
  );
}

function PhotographyFeature({ section }: { section: GallerySection }) {
  return (
    <section className="photography-feature">
      <div className="photography-feature__image-column">
        <Image
          src={section.image.src}
          alt={section.image.alt}
          width={section.image.width}
          height={section.image.height}
          className="photography-feature__image"
        />
      </div>

      <div className="photography-feature__copy">
        <div className="photography-feature__copy-inner">
          <h2 className="photography-feature__title">{section.title}</h2>
          <p className="photography-feature__text">{section.copy}</p>
        </div>
      </div>
    </section>
  );
}
