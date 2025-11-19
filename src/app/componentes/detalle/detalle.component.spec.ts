import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { DetalleComponent } from './detalle.component';
import { Personajes } from 'src/app/services/personajes';
import { of } from 'rxjs';
import { personajesFirebase } from 'src/app/interfaces/interfaces';

describe('DetalleComponent', () => {
  let component: DetalleComponent;
  let fixture: ComponentFixture<DetalleComponent>;
  let personajesServiceSpy: jasmine.SpyObj<Personajes>;
  let modalCtrlSpy: jasmine.SpyObj<ModalController>;

  beforeEach(waitForAsync(() => {
    personajesServiceSpy = jasmine.createSpyObj('Personajes', ['getPersonajesDetalle']);
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);

    TestBed.configureTestingModule({
      declarations: [DetalleComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: Personajes, useValue: personajesServiceSpy },
        { provide: ModalController, useValue: modalCtrlSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleComponent);
    component = fixture.componentInstance;
    component.id = 'V123';
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dismiss when regresar() is executed', () => {
    component.regresar();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });

  it('should assign detallePersonaje correctly from service', fakeAsync(() => {
    const mockPersonaje: personajesFirebase = {
      nombre: 'Vegeta',
      apellido: 'Prince',
      armas: 2,
      dano: 8500,
      descripcion: 'Guerrero Saiyajin orgulloso',
      id: 'V123',
      imagen: 'vegeta.jpg',
      salud: 7800,
      velocidad: 8200
    };

    personajesServiceSpy.getPersonajesDetalle.and.returnValue(of(mockPersonaje));

    component.ngOnInit(); // Llama la suscripción
    tick(); // Simula respuesta de Observable

    expect(personajesServiceSpy.getPersonajesDetalle).toHaveBeenCalledWith('V123');
    expect(component.detallePersonaje).toEqual(mockPersonaje);
  }));

});
