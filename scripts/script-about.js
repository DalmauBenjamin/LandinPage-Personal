// ========== SCRIPT PARA DESCARGAR CV COMO PDF ==========

// Obtener el botón de descarga y agregar evento al hacer clic
document.getElementById("descargar").addEventListener("click", function (event) {
    event.preventDefault(); // Previene que el enlace recargue la página (comportamiento por defecto)

    // Obtener la sección del CV que queremos convertir a PDF
    const cvPage = document.querySelector(".cv-page");

    // PASO 1: Capturar la sección como imagen usando html2canvas
    // scale: 2 significa que la resolución será el doble (más claridad en la imagen)
    html2canvas(cvPage, { scale: 2 }).then((canvas) => {
        
        // PASO 2: Convertir el canvas (imagen) a formato PNG en base64
        const imgData = canvas.toDataURL("image/png");
        
        // PASO 3: Crear un nuevo documento PDF con jsPDF
        // "p" = orientación portrait (vertical)
        // "mm" = unidades en milímetros
        // "a4" = tamaño de hoja A4 estándar
        const pdf = new jspdf.jsPDF("p", "mm", "a4");

        // PASO 4: Calcular las dimensiones de la imagen para que quepa en la hoja A4
        const pageWidth = 210;  // Ancho de hoja A4 en mm
        const pageHeight = 297; // Alto de hoja A4 en mm
        const imgWidth = pageWidth; // La imagen ocupa todo el ancho de la página
        // Calcular el alto manteniendo la proporción (para no deformar la imagen)
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // PASO 5: Controlar si la imagen es más larga que una página
        let position = 0; // Posición inicial en Y
        // Si la imagen es más larga que una página, jsPDF la cortará automáticamente
        // o necesitaremos agregar múltiples páginas (este código agrega una sola página)
        
        // PASO 6: Insertar la imagen en el PDF
        // addImage(imagen, formato, X, Y, ancho, alto)
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        
        // PASO 7: Descargar el PDF con el nombre del archivo
        // save(nombre_archivo) - El navegador descargará el archivo con ese nombre
        pdf.save("CV_Benjamin_Dalmau.pdf");
    });
});

// Nota: Este script requiere dos librerías externas:
// 1. html2canvas: Convierte elementos HTML en imágenes
// 2. jsPDF: Crea documentos PDF desde JavaScript