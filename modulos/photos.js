import solicitud from "./solicitud.js";

// Esta función obtiene las fotos de un álbum (filtrando por albumId)
export const getPhotos = async (URL, album) => {
  return await solicitud(`${URL}/photos?albumId=${album.id}`);
};

// Esta función obtiene TODAS las fotos y las limita a 50
export const getLimitedPhotos = async (URL, limit = 50) => {
  // Obtenemos todas las fotos
  const photos = await solicitud(`${URL}/photos`);
  // Retornamos solo las primeras 50
  return photos.slice(0, limit);
};


