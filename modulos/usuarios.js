import solicitud from "./solicitud.js";

// Esta función obtiene usuarios
export const getUsuarios = async (URL, id) => {
  let ruta = "";
  if (id) {
    // Si nos pasan un id, buscamos solo ese usuario
    ruta = `${URL}/users?id=${id}`;
  } else {
    // Si no, buscamos todos los usuarios
    ruta = `${URL}/users`;
  }
  // Hacemos la petición con la ruta definida
  const usuarios = await solicitud(ruta);
  // Retornamos el resultado
  return usuarios;
};


