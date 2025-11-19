import { Component, OnInit } from '@angular/core';
import { Personajes } from 'src/app/services/personajes';
// import { Personajes as PersonajesApi } from '../../interfaces/interfaces';
// import { RespuestaBD, RespuestaDetalle } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from 'src/app/componentes/detalle/detalle.component';
import { personajesFirebase } from '../../interfaces/interfaces';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: false,
})
export class InicioPage implements OnInit {

  personajesRecientes: personajesFirebase[] = [];

  constructor(
    private servicioPersonajes: Personajes,
    private modalCtrl: ModalController
  ) { }

  async verDetalle(id: string) {
    // this.servicioPersonajes.getPersonajeById(id).subscribe(
    //   (resp: RespuestaDetalle) => {
    //     console.log('Detalle del personaje seleccionado:', resp);
    //   },
    //   (error) => {
    //     console.error('Error al obtener el personaje:', error);
    //   }
    // );

    const modal = await this.modalCtrl.create({
    component: DetalleComponent,
    componentProps: { id }
    });
    await modal.present();
    
  }
  ngOnInit() {
    // this.servicioPersonajes.getDatos()
    //   .subscribe((resp: RespuestaBD) => {
    //     console.log('Lista de personajes:', resp);
    //     this.personajesRecientes = resp.data;
    //   }, (error) => {
    //     console.error( Error al obtener personajes:', error);
    //   });

    this.servicioPersonajes.getPersonajes().subscribe((respuesta)=>{
      respuesta.forEach(personaje=>{
        this.personajesRecientes.push(<personajesFirebase>personaje);
      })
    });
  }
}
