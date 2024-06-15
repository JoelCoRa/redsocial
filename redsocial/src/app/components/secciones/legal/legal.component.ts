import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { TituloSeccionComponent } from "../../titulo-seccion/titulo-seccion.component";
import { MsgRecursosComponent } from "../../compRecursos/msg-recursos/msg-recursos.component";
import { MenurecursosComponent } from "../../compRecursos/menurecursos/menurecursos.component";
import { FooterComponent } from "../../footer/footer.component";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-legal',
    standalone: true,
    templateUrl: './legal.component.html',
    styleUrl: './legal.component.css',
    imports: [NavbarComponent, SidebarComponent, TituloSeccionComponent, MsgRecursosComponent, MenurecursosComponent, FooterComponent, MatTableModule, MatPaginatorModule, MatCardModule, CommonModule]
})
export class LegalComponent {
  link: string = 'Saber más';
  constructor(private dialog: MatDialog){}



  definiciones = [
    {nombreDefinicion: 'Violencia Física', descDefinicion: 'Es el uso intencional de la fuerza física con el objetivo de causar daño o lesión al otro. Incluye golpes, empujones, patadas, estrangulamiento y cualquier otro tipo de agresión corporal.'},
    {nombreDefinicion: 'Violencia Psicológica o Emocional', descDefinicion: 'Implica el uso de palabras, actitudes y comportamientos destinados a controlar, intimidar, humillar o manipular a la pareja. Puede incluir insultos, amenazas, aislamiento social, desvalorización constante y manipulación emocional.'},
    {nombreDefinicion: 'Violencia Sexual', descDefinicion: 'Es cualquier acto sexual no consensuado o la imposición de prácticas sexuales mediante coerción, manipulación o fuerza. Incluye violación, tocamientos no deseados y forzar a la pareja a ver pornografía o a participar en actividades sexuales no deseadas.'},
    {nombreDefinicion: 'Violencia Económica', descDefinicion: 'Se refiere al control y manipulación de los recursos económicos de la pareja para limitar su independencia y capacidad de decisión. '},
    {nombreDefinicion: 'Violencia Patrimonial', descDefinicion: 'Involucra la destrucción, ocultamiento o sustracción de los bienes y propiedades de la pareja, así como impedirle el acceso a los mismos. También incluye actos de despojo y deterioro de objetos personales.'},
    {nombreDefinicion: 'Violencia Digital', descDefinicion: 'Es el uso de tecnologías de la información y comunicación para acosar, amenazar, difamar o controlar a la pareja. Incluye el ciberacoso, la difusión de imágenes íntimas sin consentimiento y la vigilancia a través de dispositivos electrónicos.'},
    {nombreDefinicion: 'Gaslighting', descDefinicion: 'Es una forma de manipulación psicológica en la que el abusador hace que la víctima dude de su memoria, percepción o cordura, creando confusión y dependencia emocional.'},
    {nombreDefinicion: 'Codependencia', descDefinicion: 'Es una dinámica en la que una persona se define a sí misma en función de su relación con su pareja, frecuentemente sacrificando su bienestar personal para mantener la relación. La codependencia puede perpetuar ciclos de abuso y dependencia emocional.'},
    {nombreDefinicion: 'Acoso', descDefinicion: 'Es una conducta persistente e indeseada que genera temor, humillación o intimidación en la víctima. En el contexto de la violencia en pareja, puede incluir el seguimiento, el envío de mensajes amenazantes y la vigilancia constante.'},
    {nombreDefinicion: 'Violencia Simbólica', descDefinicion: 'Son las actitudes, valores, normas y símbolos que perpetúan la subordinación y discriminación de una persona. En el contexto de la pareja, puede incluir el uso de estereotipos de género y expectativas tradicionales para justificar el abuso.'},
  ] 


  leyes = [
    {nombreLey: 'Ley General de Acceso de las Mujeres a una Vida Libre de Violencia',descLey: 'Establece los principios y criterios para garantizar una vida libre de violencia para las mujeres y las niñas. Define los tipos de violencia y establece mecanismos de coordinación entre las autoridades federales, estatales y municipales para la prevención, atención, sanción y erradicación de la violencia contra las mujeres', linkLey: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LGAMVLV.pdf'},
    {nombreLey: 'Código Penal Federal',descLey: 'Contiene diversas disposiciones que tipifican y sancionan distintos tipos de violencia, como la violencia familiar, el feminicidio, la violación, el acoso sexual y otras formas de violencia de género.', linkLey: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/CPF.pdf'},
    {nombreLey: 'Ley General para la Igualdad entre Mujeres y Hombres',descLey: 'Busca promover la igualdad de oportunidades y de trato entre mujeres y hombres y garantizar el derecho de ambos a una vida libre de discriminación.', linkLey: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LGIMH.pdf'},
    {nombreLey: 'Ley General de Víctimas',descLey: 'Esta ley establece los derechos de las víctimas de delitos y de violaciones a derechos humanos, incluyendo la violencia de género, y crea mecanismos para su protección y asistencia.', linkLey: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LGV.pdf'},
    {nombreLey: 'Ley Olimpia',descLey: 'Conjunto de reformas legislativas que se han adoptado en diversos estados de México para penalizar la violencia digital y el ciberacoso, incluyendo la difusión de contenido sexual sin consentimiento.', linkLey: 'http://ordenjuridico.gob.mx/violenciagenero/LEY%20OLIMPIA.pdf'},
    {nombreLey: 'Ley de Acceso de las Mujeres a una Vida Libre de Violencia de cada entidad federativa',descLey: 'Cada estado de México ha adaptado y promulgado su propia versión de esta ley, ajustada a su contexto local, para implementar las medidas de prevención y atención a la violencia contra las mujeres.', linkLey: 'https://congresocdmx.gob.mx/archivos/transparencia/LEY_DE_ACCESO_DE_LAS_MUJERES_A_UNA_VIDA_LIBRE_DE_VIOLENCIA_DEL_DISTRITO_FEDERAL.pdf'},
  ]
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog, {
      width: '800px',
    });
  }
}

@Component({
  selector: 'dialogLegal',
  templateUrl: 'dialogLegal.html',
  styleUrls: ['./legal.component.css'],
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, CommonModule],
})
export class DialogElementsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogElementsExampleDialog>) {}
}

