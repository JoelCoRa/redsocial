//Chatbot.component.ts
import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotService } from '../../services/chatbot.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserPerfil } from '../../interfaces/user';

interface Mensaje {
    texto: string;
    esUsuario: boolean;
}

interface Pregunta {
    texto: string;
    opciones: string[];
}

@Component({
    selector: 'app-chatbot',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './chatbot.component.html',
    styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
    @ViewChild('chatContainer') chatContainer: ElementRef | undefined;

    mostrarChat = false;
    mensajeInicial: string = 'Hola, mi nombre es Koba y estoy a tu servicio.';
    mensajes: Mensaje[] = [];
    saludos: string[] = ['Hola', 'Hola!', 'Buenos días', 'Buenas tardes', 'Buenas noches', '¿Cómo estás?', 'Hola, ¿cómo estás?'];
    inputTexto: string = '';
    estaAbiertoElChat: boolean = true;
    mostrarSugerencias: boolean = true;
    usuario!: UserPerfil;
    nombreUsuario!: string;
    respuestas: string[] = [];
    enInicio: boolean = true;
    ayudaPara: string | null = null;
    necesidadInmediata: boolean | null = null;
    enPeligro: boolean | null = null;
    mostrarEntradaTextoLibre: boolean = false;

      // Nuevas propiedades para manejar el cuestionario
    enDiagnostico: boolean = false;
    indicePregunta: number = 0;
    respuestasCuestionario: string[] = [];

  // Definir preguntas
    preguntasCuestionario: Pregunta[] = [
    { texto: '¿Te has sentido alguna vez o te sientes constantemente controlado/a por tu pareja?', opciones: ['Sí', 'No'] },
    { texto: '¿Te ha acusado o te acusa de infidelidad o de actuar de forma sospechosa?', opciones: ['Sí', 'No'] },
    { texto: '¿Has perdido contacto con amigos/as, familiares, compañeros/as de trabajo para evitar que tu pareja se moleste?', opciones: ['Sí', 'No'] },
    { texto: '¿Te critica y humilla en público o en privado sobre tu apariencia, tu forma de ser, el modo en que haces algunas tareas?', opciones: ['Sí', 'No'] },
    { texto: '¿Ha ejercido algún tipo de control sobre el dinero que gastas en la casa o en aspectos necesarios para tu vida, sea de tu ingreso o no?', opciones: ['Sí', 'No'] },
    { texto: 'Cuando quiere que cambies de comportamiento, ¿te presiona con el silencio, con la indiferencia o te priva de dinero?', opciones: ['Sí', 'No'] },
    { texto: '¿Te ha golpeado con sus manos, con un objeto o te ha lanzado cosas cuando se enoja o discuten?', opciones: ['Sí', 'No'] },
    { texto: '¿Sientes que cedes a sus requerimientos sexuales por temor o te ha forzado a tener relaciones sexuales?', opciones: ['Sí', 'No'] },
    { texto: '¿Te obliga o te ha obligado a participar en actos sexuales que te son dolorosos o te sean desagradables?', opciones: ['Sí', 'No'] },
    { texto: '¿Sientes que estás en tensión y que, hagas lo que hagas, tu pareja se irrita o te culpabiliza?', opciones: ['Sí', 'No'] },
    { texto: 'Después de un episodio violento, ¿se muestra cariñoso/a y atento/a, te regala cosas y/o te promete que nunca más volverá a golpearte o a insultarte y que "todo cambiará"?', opciones: ['Sí', 'No'] },
    { texto: '¿Ha empleado la violencia alguna vez con los hijos o con otras personas?', opciones: ['Sí', 'No'] },
    { texto: '¿Ha sido necesario, por los actos de tu pareja, llamar alguna vez a la policía o lo has intentado al sentir que tu vida y la de los tuyos han sido puestos en peligro?', opciones: ['Sí', 'No'] }
    ];

    preguntasCuestionarioOtro: Pregunta[] = [
        { texto: '¿Sientes que la persona ha mencionado sentirse controlada por su pareja?', opciones: ['Sí', 'No'] },
        { texto: '¿La persona ha sido acusada por su pareja de infidelidad o de actuar de forma sospechosa?', opciones: ['Sí', 'No'] },
        { texto: '¿Ha perdido la persona contacto con amigos/as, familiares, compañeros/as de trabajo para evitar que su pareja se moleste?', opciones: ['Sí', 'No'] },
        { texto: '¿La persona ha mencionado que su pareja la critica y humilla en público o en privado sobre su apariencia, forma de ser o tareas?', opciones: ['Sí', 'No'] },
        { texto: '¿La persona ha mencionado que su pareja ejerce control sobre el dinero que gasta, ya sea su ingreso o no?', opciones: ['Sí', 'No'] },
        { texto: '¿La persona ha mencionado que su pareja utiliza el silencio, la indiferencia o la privación de dinero para presionarla a cambiar su comportamiento?', opciones: ['Sí', 'No'] },
        { texto: '¿La persona ha mencionado que su pareja la ha golpeado con sus manos, con un objeto o le ha lanzado cosas durante discusiones?', opciones: ['Sí', 'No'] },
        { texto: '¿La persona ha mencionado que siente que cede a los requerimientos sexuales de su pareja por temor o que ha sido forzada a tener relaciones sexuales?', opciones: ['Sí', 'No'] },
        { texto: '¿La persona ha mencionado que su pareja la ha obligado a participar en actos sexuales dolorosos o desagradables?', opciones: ['Sí', 'No'] },
        { texto: '¿La persona ha mencionado sentirse en tensión y percibir que su pareja se irrita o la culpa independientemente de lo que haga?', opciones: ['Sí', 'No'] },
        { texto: '¿La persona ha mencionado que su pareja muestra cariño y atención después de episodios violentos, regalando cosas o prometiendo que cambiará?', opciones: ['Sí', 'No'] },
        { texto: '¿La persona ha mencionado que su pareja ha empleado violencia con hijos/as u otras personas?', opciones: ['Sí', 'No'] },
        { texto: '¿La persona ha mencionado haber llamado a la policía o intentado hacerlo debido a sentir que su vida y la de otros estaban en peligro por las acciones de su pareja?', opciones: ['Sí', 'No'] }    
    ]



    constructor(private chatbotService: ChatbotService, private user: UserService) {}

    toggleChat() {
    this.mostrarChat = !this.mostrarChat;
    }

    ngOnInit(){ 
    this.getUser();
    }

    getUser(){
    const userId = Number(this.user.getUserId());    
    this.user.getUser(userId).subscribe(data => {
        this.usuario = data;
        this.nombreUsuario = this.usuario.nombreUsuario;
    });
    }

    toggleChatBot() {
    this.estaAbiertoElChat = !this.estaAbiertoElChat;
    }

    enviarMensaje() {
        if (this.inputTexto.trim()) {
            const mensajeUsuario = `${this.nombreUsuario}: ${this.inputTexto}`;
            this.mensajes.push({ texto: mensajeUsuario, esUsuario: true });
    
            const inputTextoLower = this.inputTexto.toLowerCase().trim();
    
            if (this.esSaludo(inputTextoLower)) {
                const mensajeSaludo = 'Koba: ' + this.mensajeInicial;
                this.mensajes.push({ texto: mensajeSaludo, esUsuario: false });
                this.mostrarSugerencias = false;
            } else if (inputTextoLower.length <= 3 && inputTextoLower !== 'si' && inputTextoLower !== 'no' && inputTextoLower !== 'sí') {
                this.mensajes.push({ texto: 'El texto ingresado es muy corto, por favor ingresa una frase con al menos 3 palabras', esUsuario: false });
            } else {
                if (this.enInicio) {
                    if (inputTextoLower === 'para mi' || inputTextoLower === 'otra persona') {
                        this.procesarInicio(inputTextoLower);
                    } else {
                        this.mensajes.push({ texto: 'Koba: Por favor, escribe "Para mi" u "Otra persona" según sea el caso', esUsuario: false });
                    }
                } else if (this.ayudaPara === 'mí mismo/a' && this.necesidadInmediata === null) {
                    if (inputTextoLower === 'si' || inputTextoLower === 'no' || inputTextoLower === 'sí') {
                        this.procesarAyudaPropia(inputTextoLower);
                    } else {
                        this.mensajes.push({ texto: 'Koba: Por favor responde "Sí" o "No"', esUsuario: false });
                    }
                } else if (this.ayudaPara === 'otra persona' && this.necesidadInmediata === null) {
                    if (inputTextoLower === 'si' || inputTextoLower === 'no' || inputTextoLower === 'sí') {
                        this.procesarAyudaPropia(inputTextoLower);
                    } else {
                        this.mensajes.push({ texto: 'Koba: Por favor responde "Sí" o "No"', esUsuario: false });
                    }
                } else if (this.necesidadInmediata === true && this.enPeligro === null) {
                    if (inputTextoLower === 'si' || inputTextoLower === 'no' || inputTextoLower === 'sí') {
                        this.procesarPeligro(inputTextoLower);
                    } else {
                        this.mensajes.push({ texto: 'Koba: Por favor responde "Sí" o "No"', esUsuario: false });
                    }
                } else if (this.enDiagnostico) {
                    // Si estamos en diagnóstico, esperamos la respuesta a la pregunta actual del cuestionario
                    this.evaluarPregunta(inputTextoLower); // Cambio aquí: Llamar a la función evaluarPregunta
                } else {
                    // Otro tipo de respuestas, se analizan directamente
                    this.analizarTexto(this.inputTexto);
                }
            }
    
            this.inputTexto = '';
            this.scrollDown();
        }
    }


    enviarSaludo(saludo: string) {
        const mensajeSaludo = `${this.nombreUsuario}: ${saludo}`;
        this.mensajes.push({ texto: mensajeSaludo, esUsuario: true });
    
        const mensajeRespuesta = 'Koba: ' + this.mensajeInicial;
        this.mensajes.push({ texto: mensajeRespuesta, esUsuario: false });
    
        // Ocultamos las sugerencias de saludo
        this.mostrarSugerencias = false;

        this.mensajes.push({ texto: 'Koba: Soy un chatbot diseñado para ayudar a identificar si alguien podría estar experimentando violencia en una relación. Antes de comenzar, quisiera saber si estás buscando ayuda para ti o para alguien más.', esUsuario: false });
        this.mensajes.push({ texto: 'Koba: Por favor, escribe "Para mí" u "Otra persona" según sea el caso', esUsuario: false }); // Ajuste aquí

    
        // Mostramos el input para enviar mensajes
        this.mostrarChat = true;

        this.enInicio = true;
    
        this.scrollDown();
    }
    

    procesarInicio(texto: string) {
    const entradaNormalizada = texto.toLowerCase().trim(); // Normalizar la entrada del usuario
    
    switch (entradaNormalizada) {
        case 'para mi':
        case 'para mí':
        this.ayudaPara = 'mí mismo/a';
        this.mensajes.push({ texto: 'Koba: Lamento que estés pasando por esto. Estoy aquí para ayudarte.', esUsuario: false });
        this.mensajes.push({ texto: 'Koba: ¿Sientes que necesitas ayuda de inmediato?', esUsuario: false });
        this.mensajes.push({ texto: 'Koba: Por favor, escribe "si" o "no"', esUsuario: false });
        break;
        case 'otra persona':
        this.ayudaPara = 'otra persona';
        this.mensajes.push({ texto: 'Koba: Entiendo. Gracias por preocuparte por alguien más. Estoy aquí para ayudarte a ayudar.', esUsuario: false });
        this.mensajes.push({ texto: 'Koba: ¿Consideras que esta persona necesita ayuda de inmediato?', esUsuario: false });
        this.mensajes.push({ texto: 'Koba: Por favor, escribe "si" o "no"', esUsuario: false });
        break;
        default:
        this.mensajes.push({ texto: 'Koba: Por favor selecciona "Para mí" o "Otra persona"', esUsuario: false });
    }
    if (this.ayudaPara !== null) {
        this.enInicio = false;
    }
    }

    procesarAyudaPropia(respuesta: string) {
        const respuestaNormalizada = respuesta.toLowerCase().trim();
        
        switch (respuestaNormalizada) {
            case 'sí':
            case 'si':
                this.necesidadInmediata = true;
                if (this.ayudaPara === 'mí mismo/a') {
                    this.mensajes.push({ texto: 'Koba: Entiendo, ¿Estás en peligro en este momento?', esUsuario: false });
                } else {
                    this.mensajes.push({ texto: 'Koba: ¿Se encuentra en peligro?', esUsuario: false });
                }
                this.mensajes.push({ texto: 'Koba: Por favor, escribe "si" o "no"', esUsuario: false });
                break;
            case 'no':
                this.necesidadInmediata = false;
                if (this.ayudaPara === 'mí mismo/a') {
                    this.mensajes.push({ texto: 'Koba: Por favor, no dudes en contactar con servicios de emergencia o ayuda cercana si la situación lo requiere. Me gustaría hacerte algunas preguntas para entender mejor la situación.', esUsuario: false });
                    this.mensajes.push({ texto: 'Koba: ' + this.preguntasCuestionario[this.indicePregunta].texto, esUsuario: false });
                } else {
                    this.mensajes.push({ texto: 'Koba: Por favor, no dudes en contactar con servicios de emergencia o ayuda cercana si la situación lo requiere. Me gustaría hacerte algunas preguntas para entender mejor la situación.', esUsuario: false });
                    this.mensajes.push({ texto: 'Koba: ' + this.preguntasCuestionarioOtro[this.indicePregunta].texto, esUsuario: false });
                }
                this.enDiagnostico = true;
                this.mensajes.push({ texto: 'Koba: Por favor, escribe "si" o "no"', esUsuario: false });
                break;
            default:
                this.mensajes.push({ texto: 'Koba: Por favor responde "Sí" o "No"', esUsuario: false });
                break;
        }
    }
    
    procesarPeligro(respuesta: string) {
        const respuestaNormalizada = respuesta.toLowerCase().trim();
    
        switch (respuestaNormalizada) {
                case 'sí':
                case 'si':
                this.enPeligro = true;
                if (this.ayudaPara === 'mí mismo/a') {
                    this.mensajes.push({ texto: 'Koba: ¿Puedes proporcionar información adicional sobre la situación de peligro en la que te encuentras? Esto nos ayudará a brindarte la mejor asistencia posible.', esUsuario: false });
                } else {
                    this.mensajes.push({ texto: 'Koba: ¿Puedes proporcionar información adicional sobre la situación de peligro en la que se encuentra la persona? Esto nos ayudará a brindar la mejor asistencia posible.', esUsuario: false });
                }
                break;
                case 'no':
                this.enPeligro = false;
                if (this.ayudaPara === 'mí mismo/a') {
                    this.mensajes.push({ texto: 'Koba: Por favor, no dudes en contactar con servicios de emergencia o ayuda cercana si la situación lo requiere. Entendido. Me gustaría hacerte algunas preguntas para entender mejor la situación.', esUsuario: false });
                    this.mensajes.push({ texto: 'Koba: ' + this.preguntasCuestionario[this.indicePregunta].texto, esUsuario: false });
                } else {
                    this.mensajes.push({ texto: 'Koba: Por favor, no dudes en contactar con servicios de emergencia o ayuda cercana si la situación lo requiere. ¿Me gustaría hacerte algunas preguntas para entender mejor la situación.', esUsuario: false });
                    this.mensajes.push({ texto: 'Koba: ' + this.preguntasCuestionarioOtro[this.indicePregunta].texto, esUsuario: false });
                }
                this.mensajes.push({ texto: 'Koba: Por favor, escribe "si" o "no"', esUsuario: false });
                break;
            default:
                this.mensajes.push({ texto: 'Koba: Por favor responde "Sí" o "No"', esUsuario: false });
                break;
        }
    }
    

    evaluarPregunta(respuesta: string) {
        const respuestaNormalizada = respuesta.toLowerCase().trim();
        if (respuestaNormalizada === 'si' || respuestaNormalizada === 'no' || respuestaNormalizada === 'sí') {
            this.respuestasCuestionario.push(respuestaNormalizada);
            this.indicePregunta++;
            if (this.ayudaPara === 'mí mismo/a') {
                if (this.indicePregunta < this.preguntasCuestionario.length) {
                    this.mensajes.push({ texto: 'Koba: ' + this.preguntasCuestionario[this.indicePregunta].texto, esUsuario: false });
                } else {
                    this.finalizarCuestionario();
                }
            } else if (this.ayudaPara === 'otra persona') {
                if (this.indicePregunta < this.preguntasCuestionarioOtro.length) {
                    this.mensajes.push({ texto: 'Koba: ' + this.preguntasCuestionarioOtro[this.indicePregunta].texto, esUsuario: false });
                } else {
                    this.finalizarCuestionario(); // Aquí podrías llamar a una función diferente si necesitas un finalizado específico para "otra persona"
                }
            }
        } else {
            console.log('El mensaje es muy corto');
            this.mensajes.push({ texto: 'Koba: Por favor, responde "Sí" o "No"', esUsuario: false });
        }
    }
    
    
    finalizarCuestionario() {
        const respuestasSi = this.respuestasCuestionario.filter(respuesta => respuesta === 'sí' || respuesta === 'si').length;
        let mensajeFinal: string;
    
        if (respuestasSi === 0) {
            mensajeFinal = 'Koba: Gracias por responder las preguntas. No parece haber señales claras de violencia en esta relación.';
            this.mensajes.push({ texto: mensajeFinal, esUsuario: false });
            this.resetCuestionario();
        } else if (respuestasSi <= 3) {
            mensajeFinal = 'Koba: Gracias por responder las preguntas. Algunas respuestas podrían indicar signos preocupantes de violencia. Te recomendaría buscar asesoramiento adicional.';
            this.mensajes.push({ texto: mensajeFinal, esUsuario: false });
            this.solicitarNarracion();
        } else {
            mensajeFinal = 'Koba: Gracias por responder las preguntas. Tus respuestas indican varias señales de alerta de violencia. Es crucial buscar ayuda profesional.';
            this.mensajes.push({ texto: mensajeFinal, esUsuario: false });
            this.solicitarNarracion();
        }
    }

    resetCuestionario() {
        this.respuestasCuestionario = [];
        this.indicePregunta = 0;
        this.enDiagnostico = false;
    }
    
    solicitarNarracion() {
        this.mensajes.push({
            texto: 'Koba: "Entiendo que esto puede ser difícil de hablar, pero estoy aquí para apoyarte de la mejor manera posible. Si te sientes cómodo, podrías compartir algunos detalles específicos sobre lo que estás pasando. Por ejemplo, podrías mencionar situaciones como "sentirte amenazado/a", "experimentar violencia física", "sentirte intimidado/a", o cualquier otra cosa que te preocupe. Tu bienestar es importante y queremos asegurarnos de proporcionarte el apoyo adecuado."',
            esUsuario: false
        });
        this.mostrarEntradaTextoLibre = true; // Mostrar la entrada de texto libre
    }
    
    enviarNarracion() {
        if (this.inputTexto) {
            this.mensajes.push({ texto: this.inputTexto, esUsuario: true });
            this.analizarTexto(this.inputTexto); // Analizar el texto ingresado
            this.inputTexto = ''; // Limpiar el campo de texto
            this.mostrarEntradaTextoLibre = false; // Ocultar la entrada de texto libre después de enviar
        }
    }


    analizarTexto(texto: string) {
    this.chatbotService.analizarTexto(texto).subscribe(
        (response: any) => {
        console.log(response);
        const recomendaciones = response.recomendaciones.join('\n');
        this.mensajes.push({ texto: 'Koba: ' + recomendaciones, esUsuario: false });
        this.scrollDown();
        },
        (error: any) => {
        console.error('Error al analizar detalles del problema:', error);
        this.mensajes.push({ texto: 'Koba: Ocurrió un error al procesar los detalles de tu problema. Por favor, inténtalo de nuevo más tarde.', esUsuario: false });
        this.scrollDown();
        }
    );
    }

    esSaludo(texto: string): boolean {
    return this.saludos.some(saludo => texto.toLowerCase().includes(saludo.toLowerCase()));
    }

    scrollDown() {
    setTimeout(() => {
        if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
        }
    }, 100);
    }
}