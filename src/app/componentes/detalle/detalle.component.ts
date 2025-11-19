import { Component, Input, OnInit } from '@angular/core';
import { Personajes } from 'src/app/services/personajes';
//import { Detalle, InfGeneral } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { personajesFirebase } from 'src/app/interfaces/interfaces';

@Component({
  standalone:false,
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  detallePersonaje={} as personajesFirebase;
  @Input() id!: string;

  // @Input() id!: number;  
  // personaje: Detalle | null = null;  
  // infoGeneral: InfGeneral | null = null;
  // cargando: boolean = true;

  constructor(private personajesService: Personajes, private modalCtrl:ModalController) {}

  regresar(){
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    // if (!this.id || this.id < 1 || this.id > 12) {
    //   console.warn('ID inválido');
    //   this.cargando = false;
    //   return;
    // }

    // this.personajesService.getPersonajeById(this.id).subscribe({
    //   next: (resp) => {
    //     this.personaje = resp;
    //     this.infoGeneral = null;
    //     this.cargando = false;
    //   },
    //   error: (err) => {
    //     console.error('Error al cargar el personaje:', err);
    //     this.personaje = null;
    //     this.cargando = false;
    //   }
    // });
    this.personajesService.getPersonajesDetalle(this.id).subscribe(respuesta=>{
      this.detallePersonaje=<personajesFirebase>respuesta;
    });
  }
}