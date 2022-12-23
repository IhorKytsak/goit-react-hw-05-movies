export const getImgUrl = imageUrl => {
  if (imageUrl !== null && imageUrl !== undefined) {
    return `https://image.tmdb.org/t/p/w300${imageUrl}`;
  } else {
    return 'https://img.icons8.com/pastel-glyph/512/film-reel--v2.png';
  }
};
