// Importamos las funciones necesarias desde "index.js" dentro de la carpeta "modulos"
import {
    getUsuarios,
    getPost,
    getCommets,
    getAlbums,
    getLimitedPhotos
  } from "./modulos/index.js";
  
  // URL base de la API
  const URL = "https://jsonplaceholder.typicode.com";
  
  // Variable para guardar un ID de usuario en particular (aquí 3)
  const usuarioId = 3;
  
  
  // Esta función obtiene un usuario específico y sus posts
  
  const getusuarioId = async (usuarioId) => {
    // Llamamos a getUsuarios pasando el ID para obtener un usuario filtrado
    let usuario = await getUsuarios(URL, usuarioId);
    // De ese usuario, sacamos el primer elemento para obtener sus posts
    let post = await getPost(URL, usuario[0]);
  };
  // Ejecutamos la función con el usuarioId = 3
  getusuarioId(usuarioId);
  
  // Esta función obtiene TODOS los usuarios con:
  //    Sus posts y comentarios
  //    Sus álbumes y sus fotos y la limito a 50)
  const manejardatos = async () => {
    // Primero obtenemos la lista de todos los usuarios
    const usuarios = await getUsuarios(URL);
  
    // Promise.all nos ayuda a manejar varias promesas en paralelo
    return await Promise.all(
      usuarios.map(async (usuario) => {
        // Obtenemos todos los posts de este usuario
        const posts = await getPost(URL, usuario);
  
        // Para cada post, obtenemos sus comentarios
        const comentPost = await Promise.all(
          posts.map(async (post) => {
            const coments = await getCommets(URL, post);
            // Retornamos el post con la propiedad "coments"
            return { ...post, coments };
          })
        );
  
       // Aquí añadimos la parte de los álbumes y las fotos
        // Obtenemos los álbumes del usuario filtrando por userId
        const albums = await getAlbums(URL, usuario);
  
        // Subimos el límite a 1550 para ver fotos de más álbumes, no solo las primeras 50,
        // porque si lo dejamos en 50, solo se muestran las fotos del álbum 1.   
        // y actualmente en consola no me muestra ninguna foto si lo coloco en 50.   

        const limitedPhotos = await getLimitedPhotos(URL, 1550);
  
        // Creamos un objeto para agrupar las fotos por su albumId
        const photosPorAlbum = {};
        limitedPhotos.forEach((photo) => {
          if (!photosPorAlbum[photo.albumId]) {
            photosPorAlbum[photo.albumId] = [];
          }
          photosPorAlbum[photo.albumId].push(photo);
        });
  
        // Para cada álbum, añadimos la propiedad "photos" con sus fotos correspondientes
        const albumsConPhotos = albums.map((album) => {
          return { ...album, photos: photosPorAlbum[album.id] || [] };
        });
  
        // Retornamos el usuario con:
        //    comentPost: sus posts + comentarios
        //    albumsConPhotos: sus álbumes + fotos
        return { ...usuario, comentPost, albumsConPhotos };
      })
    );
  };
  
  // Ejecutamos la función que maneja todos los datos
  manejardatos().then((data) => {
    // Mostramos en la consola el primer usuario con:
    //  Sus datos
    //  Sus posts y comentarios
    //  Sus álbumes con fotos limitadas
    console.log("Object", data[0]);
  });
  


  // Maneja álbumes y fotos, pero NO los mete en el usuario
  
  const manejadorAlbums = async () => {
    // Obtenemos los álbumes del usuario con id = 1
    const albums = await getAlbums(URL, { id: 1 });
    // Obtenemos todas las fotos y las limitamos a 50
    const limitedPhotos = await getLimitedPhotos(URL, 50);
  
    // Agrupamos las fotos por albumId
    const photosPorAlbum = {};
    limitedPhotos.forEach((photo) => {
      if (!photosPorAlbum[photo.albumId]) {
        photosPorAlbum[photo.albumId] = [];
      }
      photosPorAlbum[photo.albumId].push(photo);
    });
  
    // Añadimos la propiedad "photos" a cada álbum
    const albumsConPhotos = albums.map((album) => {
      return { ...album, photos: photosPorAlbum[album.id] || [] };
    });
  
    // Retornamos los álbumes con sus fotos
    return albumsConPhotos;
  };
  
  // Llamamos a la función anterior solo para mostrar su resultado en consola
//   manejadorAlbums().then((albumsData) => {
//     console.log("Álbumes con fotos limitadas:", albumsData);
//   });
  



