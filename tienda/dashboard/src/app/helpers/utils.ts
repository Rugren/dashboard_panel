
export const formatToCamelCase = (nombre: string) => {
    // Función Camel Case para que me devuelva la primera letra en mayúscula.
    return nombre.charAt(0).toUpperCase() + nombre.slice(1);
}