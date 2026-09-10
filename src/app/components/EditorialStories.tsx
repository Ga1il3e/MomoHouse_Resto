'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/lib/i18n';

interface Story {
  tag: string;
  tagFr: string;
  title: string;
  titleFr: string;
  caption: string;
  captionFr: string;
  imageUrl: string;
  alt: string;
  span: string; // tailwind col/row span classes
  imagePosition?: string;
}

const stories: Story[] = [
{
  tag: 'NEIGHBOURHOOD GUIDE',
  tagFr: 'GUIDE DU QUARTIER',
  title: 'Montmartre After Dark',
  titleFr: 'Montmartre Après la Nuit',
  caption: 'The 2nd arrondissement at dusk — cobblestones, lantern light, and the smell of steam rising from our kitchen.',
  captionFr: 'Le 2e arrondissement au crépuscule — pavés, lumière des lanternes et l\'odeur de la vapeur de notre cuisine.',
  imageUrl: "https://images.unsplash.com/photo-1570665021226-6bfb18f7c128",
  alt: 'Parisian street at dusk with warm lantern light reflecting on wet cobblestones near Montmartre',
  span: 'md:col-span-7 md:row-span-2',
  imagePosition: 'center'
},
{
  tag: 'DUMPLING ORIGINS',
  tagFr: 'ORIGINES DU MOMO',
  title: 'From Kathmandu to Paris',
  titleFr: 'De Katmandou à Paris',
  caption: 'A recipe that crossed the Himalayas. The momo was born in mountain kitchens — we brought it to the Seine.',
  captionFr: 'Une recette qui a traversé l\'Himalaya. Le momo est né dans les cuisines de montagne — nous l\'avons amené à la Seine.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_16714275f-1772055913403.png",
  alt: 'Hands folding traditional Nepalese momo dumplings on a floured wooden surface',
  span: 'md:col-span-5 md:row-span-1',
  imagePosition: 'center'
},
{
  tag: 'PARIS × NEPAL',
  tagFr: 'PARIS × NÉPAL',
  title: 'Two Cultures, One Table',
  titleFr: 'Deux Cultures, Une Table',
  caption: 'Himalayan spice meets Parisian precision. The chilli achar alongside a carafe of Côtes du Rhône.',
  captionFr: 'L\'épice himalayenne rencontre la précision parisienne. L\'achar pimenté aux côtés d\'une carafe de Côtes du Rhône.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_42f6f9321-1789037069415.png",
  alt: 'Elegant restaurant table setting with Nepalese dumplings and French wine in a warm Parisian interior',
  span: 'md:col-span-5 md:row-span-1',
  imagePosition: 'center top'
},
{
  tag: 'BEHIND THE SCENES',
  tagFr: 'DANS LES COULISSES',
  title: 'The Morning Fold',
  titleFr: 'Le Pliage du Matin',
  caption: 'Every morning, before the doors open, the kitchen fills with the rhythm of folding. Two hundred momos before noon.',
  captionFr: 'Chaque matin, avant l\'ouverture, la cuisine se remplit du rythme du pliage. Deux cents momos avant midi.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_173ff74d5-1770704693777.png",
  alt: 'Chef hands carefully folding dumplings in a professional kitchen during morning prep',
  span: 'md:col-span-5 md:row-span-1',
  imagePosition: 'center'
},
{
  tag: 'NEIGHBOURHOOD GUIDE',
  tagFr: 'GUIDE DU QUARTIER',
  title: 'Poissonnière & the 10th',
  titleFr: 'Poissonnière & le 10e',
  caption: 'Canal Saint-Martin, covered passages, and a neighbourhood that never quite sleeps. Our second house lives here.',
  captionFr: 'Canal Saint-Martin, passages couverts et un quartier qui ne dort jamais vraiment. Notre deuxième maison y vit.',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_4071cf445-1789037071382.png",
  alt: 'Canal Saint-Martin in Paris 10th arrondissement with iron footbridges and tree-lined banks',
  span: 'md:col-span-7 md:row-span-1',
  imagePosition: 'center'
}];


export default function EditorialStories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeStory, setActiveStory] = useState<number | null>(null);
  const { language } = useLanguage();
  const t = getTranslations(language);
  const isFr = language === 'fr';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) setVisible(true);},
      { threshold: 0.08 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
      aria-label={isFr ? 'Histoires éditoriales' : 'Editorial stories'}>
      
      {/* Ghost watermark */}
      <div
        className="absolute inset-0 flex items-start justify-start pointer-events-none select-none overflow-hidden"
        aria-hidden="true">
        
        <span
          className="font-display uppercase"
          style={{
            fontSize: 'clamp(6rem, 22vw, 20rem)',
            lineHeight: 0.85,
            color: 'var(--foreground)',
            opacity: 0.025,
            letterSpacing: '-0.06em',
            whiteSpace: 'nowrap',
            paddingLeft: '2vw',
            paddingTop: '0'
          }}>
          
          STORIES
        </span>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
          
          <div>
            <span
              className="text-annotation block mb-4"
              style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}>
              
              {isFr ? 'NOS HISTOIRES' : 'OUR STORIES'}
            </span>
            <h2
              className="font-display uppercase"
              style={{
                fontSize: 'clamp(2.8rem, 8vw, 8rem)',
                color: 'var(--foreground)',
                lineHeight: 0.85,
                letterSpacing: '-0.04em'
              }}>
              
              {isFr ? 'LE MONDE' : 'THE WORLD'}
              <br />
              <span style={{ color: 'var(--primary)' }}>{isFr ? 'DERRIÈRE.' : 'BEHIND.'}</span>
            </h2>
          </div>

          <p
            className="max-w-xs"
            style={{
              fontSize: '0.8rem',
              lineHeight: 1.7,
              color: 'var(--muted-foreground)',
              letterSpacing: '0.02em',
              opacity: visible ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s'
            }}>
            
            {isFr ?
            'Guides de quartier, origines du momo, culture Paris×Népal et coulisses — les histoires qui font Momo House.' : 'Neighbourhood guides, dumpling origins, Paris×Nepal culture, and behind-the-scenes — the stories that make Momo House.'}
          </p>
        </div>

        {/* Bento grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-3"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
          }}>
          
          {stories.map((story, i) =>
          <div
            key={i}
            className={`${story.span} relative group overflow-hidden cursor-pointer`}
            style={{
              minHeight: i === 0 ? 'clamp(320px, 50vh, 600px)' : 'clamp(200px, 28vh, 340px)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.07}s`
            }}
            onMouseEnter={() => setActiveStory(i)}
            onMouseLeave={() => setActiveStory(null)}
            role="article"
            aria-label={isFr ? story.titleFr : story.title}>
            
              {/* Background image */}
              <div
              className="absolute inset-0 transition-transform duration-700 ease-out"
              style={{
                transform: activeStory === i ? 'scale(1.04)' : 'scale(1)'
              }}>
              
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                src={story.imageUrl}
                alt={story.alt}
                className="w-full h-full object-cover"
                style={{ objectPosition: story.imagePosition ?? 'center' }}
                loading="lazy" />
              
              </div>

              {/* Gradient overlay */}
              <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.45) 45%, rgba(10,10,10,0.1) 100%)',
                opacity: activeStory === i ? 1 : 0.82
              }}
              aria-hidden="true" />
            

              {/* Top accent line on hover */}
              <div
              className="absolute top-0 left-0 h-px"
              style={{
                width: activeStory === i ? '100%' : '0%',
                backgroundColor: 'var(--primary)',
                transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              aria-hidden="true" />
            

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                {/* Tag */}
                <span
                className="text-annotation block mb-3"
                style={{
                  color: 'var(--primary)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.3em',
                  opacity: 0.9
                }}>
                
                  {isFr ? story.tagFr : story.tag}
                </span>

                {/* Title */}
                <h3
                className="font-display uppercase mb-3"
                style={{
                  fontSize: i === 0 ? 'clamp(1.4rem, 3vw, 2.8rem)' : 'clamp(1.1rem, 2.2vw, 1.9rem)',
                  color: 'var(--primary-foreground)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.03em'
                }}>
                
                  {isFr ? story.titleFr : story.title}
                </h3>

                {/* Bilingual caption — slides up on hover */}
                <div
                style={{
                  maxHeight: activeStory === i ? '120px' : '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                }}>
                
                  <p
                  style={{
                    fontSize: '0.72rem',
                    lineHeight: 1.65,
                    color: 'rgba(245,240,232,0.65)',
                    letterSpacing: '0.01em',
                    fontWeight: 300,
                    paddingTop: '4px'
                  }}>
                  
                    {isFr ? story.captionFr : story.caption}
                  </p>
                  {/* Bilingual secondary line */}
                  <p
                  style={{
                    fontSize: '0.6rem',
                    lineHeight: 1.5,
                    color: 'rgba(245,240,232,0.3)',
                    letterSpacing: '0.01em',
                    fontWeight: 300,
                    marginTop: '6px',
                    fontStyle: 'italic'
                  }}>
                  
                    {isFr ? story.caption : story.captionFr}
                  </p>
                </div>

                {/* Divider line */}
                <div
                className="mt-4 h-px"
                style={{
                  width: activeStory === i ? '40px' : '20px',
                  backgroundColor: 'var(--primary)',
                  transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: 0.7
                }}
                aria-hidden="true" />
              
              </div>
            </div>
          )}
        </div>

        {/* Footer note */}
        <div
          className="mt-10 flex items-center gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s'
          }}>
          
          <div className="h-px w-8" style={{ backgroundColor: 'var(--primary)', opacity: 0.5 }} aria-hidden="true" />
          <span
            className="text-annotation"
            style={{ color: 'var(--muted-foreground)', fontSize: '0.5rem', letterSpacing: '0.2em' }}>
            
            {isFr ? 'HISTOIRES DES DEUX MAISONS · PARIS' : 'STORIES FROM BOTH HOUSES · PARIS'}
          </span>
        </div>
      </div>
    </section>);

}