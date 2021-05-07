class Camara {

    constructor(videoNode){
        this.videoNode = videoNode;
    }

    encender(){
        if (navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({
                audio: false,
                video: { 
                    width:300,
                    height: 300,
                }
            }).then( stream => {
                this.videoNode.srcObject = stream;
                this.stream = stream;
            }).catch(console.log);
        }else {
            console.log('No soportado acceso a los dispositivos multimedia por el browser/os');
        }
    }

    apagar(){
        //pausar el video
        this.videoNode.pause();

        if (this.stream) {   
            //tomar del stream: MediaStream (declarada al inciar la camara), la lista de objetos almacenados 
            //en el MediaStream y en su primera posicion que es el video y pararlo
            this.stream.getTracks()[0].stop();
        }

    }

    tomarFoto() {
        //crear un elemento canvas para renderizar ahi la foto 
        let canvas = document.createElement('canvas');

        //configurarle las propiedades iguales a las del video
        canvas.setAttribute('width', 300);
        canvas.setAttribute('height', 300);

        //obtener contexto del canvas
        let context = canvas.getContext('2d'); // simple imagen
        
        //renderizar imagen dentro del canvas
        context.drawImage(this.videoNode, 0, 0, canvas.width, canvas.height);

        //extraer la imagen
        this.foto = context.canvas.toDataURL(); //genera string base64 que puede ser utilizado en el src de un tag <img>

        //limpieza
        canvas = null;
        context = null;

        return this.foto;

    }

}