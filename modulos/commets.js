import solicitud from "./solicitud.js";

// Esta función obtiene los comentarios de un post
export const getCommets = async (URL, post) => {
  // Filtramos por postId usando el id del post
  return await solicitud(`${URL}/comments?postId=${post.id}`);
};

