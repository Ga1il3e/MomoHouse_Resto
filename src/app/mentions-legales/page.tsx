import { SiteShell } from "@/components/SiteChrome";
import { site } from "@/lib/content";

export default function MentionsLegalesPage() {
  return (
    <SiteShell variant="inner">
      <section className="mx-auto max-w-[800px] px-6 py-20 md:px-16">
        <h1 className="font-serif text-[40px] font-bold text-red md:text-[48px]">
          Mentions légales
        </h1>
        <div className="mt-10 space-y-8 text-[16px] leading-7 text-muted">
          <div>
            <h2 className="font-serif text-[24px] font-semibold text-ink">
              Éditeur du site
            </h2>
            <p className="mt-2">
              {site.name}
              <br />
              85 Rue Montmartre, 75002 Paris
              <br />
              46 Rue Poissonnière, 75009 Paris
              <br />
              Email :{" "}
              <a className="text-red underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              <br />
              Téléphone : {site.phone}
            </p>
          </div>
          <div>
            <h2 className="font-serif text-[24px] font-semibold text-ink">
              Hébergement
            </h2>
            <p className="mt-2">
              Ce site est destiné à une démonstration locale. L&apos;hébergeur
              sera indiqué lors de la mise en production.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-[24px] font-semibold text-ink">
              Propriété intellectuelle
            </h2>
            <p className="mt-2">
              L&apos;ensemble des contenus présents sur ce site (textes, images,
              illustrations, marques) est protégé. Toute reproduction non
              autorisée est interdite.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-[24px] font-semibold text-ink">
              Données personnelles
            </h2>
            <p className="mt-2">
              Le formulaire de réservation de cette version stocke les
              informations uniquement dans votre navigateur pour afficher une
              confirmation. Aucune donnée n&apos;est transmise à un serveur.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
