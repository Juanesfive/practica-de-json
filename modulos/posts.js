import solicitud from "./solicitud.js";

// Esta función obtiene los posts de un usuario específico
export const getPost = async (URL, usuario) => {
  // Filtramos por userId usando el id del usuario
  return await solicitud(`${URL}/posts?userId=${usuario.id}`);
};

