import { TestBed } from '@angular/core/testing';
import { Personajes } from './personajes';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from 'src/environments/firebaseconfig';
import { take } from 'rxjs';

describe('Personajes', () => {
  let service: Personajes;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideFirestore(() => getFirestore()),
        Personajes
      ],
    });

    service = TestBed.inject(Personajes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ==========================================
  //        PRUEBA getPersonajes()
  // ==========================================


it('getPersonajes debe devolver un Observable y emitir datos', (done) => {
  const obs$ = service.getPersonajes().pipe(take(1));

  obs$.subscribe({
    next: (data) => {
      expect(Array.isArray(data)).toBeTrue();
      done(); // ahora solo se llama una vez
    },
    error: (e) => {
      fail('Error en getPersonajes: ' + e);
    }
  });
});

  // ==========================================
  //     PRUEBA getPersonajesDetalle(id)
  // ==========================================
  it('getPersonajesDetalle debe devolver un Observable y emitir un objeto', (done) => {
    const idPrueba = 'lkjBf2M7C8kqRQdpnZA6';

    const obs$ = service.getPersonajesDetalle(idPrueba);
    expect(obs$).toBeTruthy();
    expect(typeof obs$.subscribe).toBe('function');

    obs$.subscribe({
      next: (data) => {
        expect(typeof data).toBe('object'); // Firestore devuelve object
        done();
      },
      error: (e) => {
        fail('Error en getPersonajesDetalle: ' + e);
        done();
      }
    });
  });

});
