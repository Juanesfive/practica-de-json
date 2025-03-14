// Esta función se encarga de hacer la petición HTTP usando fetch
const solicitud = async (url) => {
    // Hacemos la petición a la URL que nos pasen
    const peticion = await fetch(url);
    // Convertimos la respuesta a JSON
    const data = await peticion.json();
    // Retornamos los datos
    return data;
  };
  
  export default solicitud;
  
