async function descargarPDF() {

    const boton = document.getElementById(
        "btnDescargar"
    );


    try {


        // CAMBIAR TEXTO DEL BOTÓN

        const textoOriginal =
            boton.innerHTML;


        boton.innerHTML =
            "⏳ GENERANDO PDF...";


        boton.disabled =
            true;


        // ESPERAR A QUE SE RENDERICE

        await new Promise(

            resolve =>

                setTimeout(
                    resolve,
                    500
                )

        );


        // OBTENER EL CV

        const elemento =
            document.getElementById(
                "cv"
            );


        // CREAR CANVAS

        const canvas =
            await html2canvas(

                elemento,

                {

                    scale: 2,

                    backgroundColor:
                        "#ffffff",

                    useCORS:
                        true,

                    logging:
                        false

                }

            );


        // CREAR IMAGEN

        const imagen =
            canvas.toDataURL(

                "image/jpeg",

                0.95

            );


        // OBTENER JSPDF

        const {

            jsPDF

        } =

            window.jspdf;


        // CREAR PDF

        const pdf =

            new jsPDF(

                "p",

                "mm",

                "a4"

            );


        // MEDIDAS A4

        const anchoPDF =
            210;


        const altoPDF =
            297;


        // MEDIDAS DE LA IMAGEN

        const anchoImagen =
            210;


        const altoImagen =

            (
                canvas.height *
                anchoImagen
            )

            /
            canvas.width;


        // POSICIÓN

        let alturaRestante =
            altoImagen;


        let posicion =
            0;


        // PRIMERA PÁGINA

        pdf.addImage(

            imagen,

            "JPEG",

            0,

            posicion,

            anchoImagen,

            altoImagen

        );


        // RESTAR UNA PÁGINA

        alturaRestante =
            altoImagen -
            altoPDF;


        // CREAR MÁS PÁGINAS SI ES NECESARIO

        while (

            alturaRestante > 0

        ) {


            posicion =

                alturaRestante -
                altoImagen;


            pdf.addPage();


            pdf.addImage(

                imagen,

                "JPEG",

                0,

                posicion,

                anchoImagen,

                altoImagen

            );


            alturaRestante -=
                altoPDF;

        }


        // DESCARGAR

        pdf.save(

            "CV_Hubert_Ortiz_Villegas.pdf"

        );


        // RESTAURAR BOTÓN

        boton.innerHTML =
            textoOriginal;


        boton.disabled =
            false;


    }


    catch (error) {


        console.error(

            "Error al generar PDF:",

            error

        );


        alert(

            "Hubo un problema al generar el PDF. Verifica que las librerías estén cargando correctamente y vuelve a intentarlo."

        );


        boton.innerHTML =

            "📥 DESCARGAR CV EN PDF";


        boton.disabled =
            false;

    }

}