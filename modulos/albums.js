import solicitud from "./solicitud.js";

// Esta función obtiene los álbumes de un usuario
export const getAlbums = async (URL, user) => {
  let ruta = "";
  if (user) {
    // Si nos pasan un objeto user, usamos su id para filtrar
    ruta = `${URL}/albums?userId=${user.id}`;
  } else {
    // Si no nos pasan user, obtenemos todos los álbumes
    ruta = `${URL}/albums`;
  }
  // Hacemos la petición y retornamos los álbumes
  const albums = await solicitud(ruta);
  return albums;
};


