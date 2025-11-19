import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { InicioPage } from './inicio.page';
import { of } from 'rxjs';
import { Personajes } from 'src/app/services/personajes';
import { ModalController } from '@ionic/angular';
import { personajesFirebase } from 'src/app/interfaces/interfaces';

describe('InicioPage', () => {
  let component: InicioPage;
  let fixture: ComponentFixture<InicioPage>;
  let personajesServiceSpy: jasmine.SpyObj<Personajes>;
  let modalCtrlSpy: jasmine.SpyObj<ModalController>;

  beforeEach(async () => {

    const modalSpy = jasmine.createSpyObj('ModalController', ['create']);
    const modalElementSpy = jasmine.createSpyObj('HTMLIonModalElement', ['present']);
    modalSpy.create.and.returnValue(Promise.resolve(modalElementSpy));

    const personajesSpy = jasmine.createSpyObj('Personajes', ['getPersonajes']);

    await TestBed.configureTestingModule({
      declarations: [InicioPage],
      providers: [
        { provide: Personajes, useValue: personajesSpy },
        { provide: ModalController, useValue: modalSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InicioPage);
    component = fixture.componentInstance;
    personajesServiceSpy = TestBed.inject(Personajes) as jasmine.SpyObj<Personajes>;
    modalCtrlSpy = TestBed.inject(ModalController) as jasmine.SpyObj<ModalController>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load personajes on init', fakeAsync(() => {
    const mockData: personajesFirebase[] = [
      { nombre: 'Juan', apellido: 'Pérez', armas: 2, dano: 50, descripcion: 'Fuerte', id: '1', imagen: 'img1', salud: 100, velocidad: 20 },
      { nombre: 'Ana', apellido: 'López', armas: 1, dano: 30, descripcion: 'Ágil', id: '2', imagen: 'img2', salud: 80, velocidad: 40 }
    ];
    
    personajesServiceSpy.getPersonajes.and.returnValue(of(mockData));

    component.ngOnInit();
    tick();

    expect(personajesServiceSpy.getPersonajes).toHaveBeenCalled();
    expect(component.personajesRecientes.length).toBe(2);
    expect(component.personajesRecientes).toEqual(mockData);
  }));

  it('should call present on modal when verDetalle is executed', async () => {
    const modalElementSpy = jasmine.createSpyObj('HTMLIonModalElement', ['present']);
    modalCtrlSpy.create.and.returnValue(Promise.resolve(modalElementSpy));

    await component.verDetalle('123');

    expect(modalCtrlSpy.create).toHaveBeenCalled();
    expect(modalElementSpy.present).toHaveBeenCalled();
  });

});
