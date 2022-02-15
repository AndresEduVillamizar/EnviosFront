import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CotizarEnvioComponent } from './cotizar-envio.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { EnviosService } from '../../shared/service/producto.service';
import { Usuario } from '../../shared/model/usuario';
import { HttpService } from 'src/app/core/services/http.service';
import { ModalDismissReasons, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

const DISTANCIA_MINIMA = 5;
const DISTANCIA_MAXIMA = 40;
const DISTANCIA_INFERIOR_MINIMA = 4;
const DISTANCIA_SUPERIOR_MAXIMA = 41;
const GET_DISMISS = 'TEST'

describe('CotizarEnvioComponent', () => {
  let component: CotizarEnvioComponent;
  let fixture: ComponentFixture<CotizarEnvioComponent>;
  let enviosService: EnviosService;
  const listaUsuario: Usuario[] = [new Usuario('1', 'Producto 1', true), new Usuario('2', 'Producto 2', false)];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CotizarEnvioComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        NgbModule,
        NgxPaginationModule
      ],
      providers: [EnviosService, HttpService, NgbModal]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizarEnvioComponent);
    component = fixture.componentInstance;
    enviosService = TestBed.inject(EnviosService);
    spyOn(enviosService, 'consultar').and.returnValue(
      of(listaUsuario)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.listaUsuarios.subscribe(resultado => {
      expect(2).toBe(resultado.length);
    });
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.cotizacionForm.valid).toBeFalsy();
  });

  it('formulario es invalido por longitud minima', () => {
    expect(component.cotizacionForm.valid).toBeFalsy();
    component.cotizacionForm.controls.distanciaRecorrido.setValue(DISTANCIA_INFERIOR_MINIMA);
    expect(component.cotizacionForm.valid).toBeFalsy();
  });

  it('formulario es invalido por longitud maxima', () => {
    expect(component.cotizacionForm.valid).toBeFalsy();
    component.cotizacionForm.controls.distanciaRecorrido.setValue(DISTANCIA_SUPERIOR_MAXIMA);
    expect(component.cotizacionForm.valid).toBeFalsy();
  });

  it('formulario es valido por longitud minima', () => {
    expect(component.cotizacionForm.valid).toBeFalsy();
    component.cotizacionForm.controls.distanciaRecorrido.setValue(DISTANCIA_MINIMA);
    expect(component.cotizacionForm.valid).toBeTrue();
  });

  it('formulario es valido por longitud maxima', () => {
    expect(component.cotizacionForm.valid).toBeFalsy();
    component.cotizacionForm.controls.distanciaRecorrido.setValue(DISTANCIA_MAXIMA);
    expect(component.cotizacionForm.valid).toBeTrue();
  });

  it('Genera una cotizacion', () => {
    expect(component.cotizacionForm.valid).toBeFalsy();
    component.cotizacionForm.controls.distanciaRecorrido.setValue(DISTANCIA_MAXIMA);
    expect(component.cotizacionForm.valid).toBeTrue();

    const spy = spyOn(enviosService, 'generarCotizacion').and.returnValue(
      of(true)
    );
    component.cotizar(1);
    expect(spy).toHaveBeenCalled();
    
  });

  it('Generar modal', () => {
    component.triggerModal('prueba');
    expect(component.transaccionCotizacion).toBeFalse();
  });

  it('funcionamiento getDismissReason ESC', () => {
    let respuesta = component.getDismissReason(ModalDismissReasons.ESC);
    expect(respuesta).toEqual('by pressing ESC');
  });

  it('funcionamiento getDismissReason BACKDROP_CLICK', () => {
    let respuesta = component.getDismissReason(ModalDismissReasons.BACKDROP_CLICK);
    expect(respuesta).toEqual('by clicking on a backdrop');
  });

  it('funcionamiento getDismissReason else', () => {
    let respuesta = component.getDismissReason(GET_DISMISS);
    expect(respuesta).toEqual('with: ' + GET_DISMISS);
  });

});
