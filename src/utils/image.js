const imageModules = import.meta.glob('../assets/images/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

const metadataModules = import.meta.glob('../assets/images/**/metadata.json', {
  eager: true,
  import: 'default',
});

export const metadataByFile = Object.fromEntries(
  Object.entries(metadataModules).flatMap(([path, metadata]) => {
    const [, year, month, day] = path.match(/images\/([^/]+)\/([^/]+)\/([^/]+)\/metadata\.json$/);

    return metadata.map((item) => [`${year}/${month}/${day}/${item.file}`, item]);
  }),
);

export const images = Object.entries(imageModules).map(([path, src]) => {
  const [, year, month, day, filename] = path.match(/images\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)$/);

  const metadata = metadataByFile[`${year}/${month}/${day}/${filename}`];

  return {
    src,
    year,
    month,
    day,
    filename,
    metadata,
  };
});
