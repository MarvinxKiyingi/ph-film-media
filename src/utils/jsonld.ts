// Helper for Organization JSON-LD
export function getOrganizationJsonLd({
  name,
  url,
}: {
  name: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
  };
}

// Helper for Movie JSON-LD
export function getMovieJsonLd({
  title,
  description,
  datePublished,
  duration,
  actors,
  directors,
  image,
}: {
  title: string;
  description?: string;
  datePublished?: string;
  duration?: string;
  actors?: { name: string | null }[];
  directors?: { name: string | null }[];
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: title,
    description,
    datePublished,
    duration: duration ? `PT${duration}M` : undefined,
    actor: actors?.map((a) => ({ '@type': 'Person', name: a.name })),
    director: directors?.map((d) => ({ '@type': 'Person', name: d.name })),
    image,
  };
}
