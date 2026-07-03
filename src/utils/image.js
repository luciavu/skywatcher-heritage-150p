const imageModules = import.meta.glob('../assets/images/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

export const images = Object.entries(imageModules)
  .map(([path, src]) => {
    const [, year, month, day, filename] = path.match(/images\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)$/);

    return {
      src,
      year,
      month,
      day,
      filename,
    };
  })
  .reverse();
