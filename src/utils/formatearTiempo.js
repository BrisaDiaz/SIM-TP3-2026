export function formatearTiempo(segundos) {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = Math.floor(segundos % 60);

    let resultado = '';

    if (horas > 0) {
        resultado += `${horas}h `;
    }
    if (minutos > 0) {
        resultado += `${minutos}m `;
    }
    resultado += `${segundosRestantes}s`;

    return resultado;
}