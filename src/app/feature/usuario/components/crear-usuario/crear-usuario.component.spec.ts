import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CrearUsuarioComponent } from './crear-usuario.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { EnviosService } from '../../shared/service/producto.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('CrearProductoComponent', () => {
  let component: CrearUsuarioComponent;
  let fixture: ComponentFixture<CrearUsuarioComponent>;
  let enviosService: EnviosService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearUsuarioComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [EnviosService, HttpService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearUsuarioComponent);
    component = fixture.componentInstance;
    enviosService = TestBed.inject(EnviosService);
    spyOn(enviosService, 'crear').and.returnValue(
      of(true)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.usuarioForm.valid).toBeFalsy();
  });

  it('formulario es invalido cuando no tiene clave', () => {
    expect(component.usuarioForm.valid).toBeFalsy();
    component.usuarioForm.controls.nombre.setValue('Nombre');
    expect(component.usuarioForm.valid).toBeFalsy();
  })

  it('formulario es invalido cuando no tiene nombre', () => {
    expect(component.usuarioForm.valid).toBeFalsy();
    component.usuarioForm.controls.clave.setValue('PASSWORD');
    expect(component.usuarioForm.valid).toBeFalsy();
  })

  it('Registrando usuario', () => {
    expect(component.usuarioForm.valid).toBeFalsy();
    component.usuarioForm.controls.nombre.setValue('Prueba');
    component.usuarioForm.controls.clave.setValue('PASSWORD');
    component.usuarioForm.controls.premium.setValue(false);
    expect(component.usuarioForm.valid).toBeTruthy();

    component.crear();

    expect(component.usuario.nombre).toEqual('Prueba');
    expect(component.usuario.clave).toEqual('PASSWORD');
    expect(component.usuario.premium).toBeFalse();
    // Aca validamos el resultado esperado al enviar la petición
    // TODO adicionar expect
  });

  it('Falla registrando usuario', () => {
    expect(component.usuarioForm.valid).toBeFalsy();
    component.usuarioForm.controls.nombre.setValue('Prueba');
    component.usuarioForm.controls.premium.setValue(false);
    expect(component.usuarioForm.valid).toBeFalsy();

    component.crear();

    expect(component.alertaFormulario).toBeFalse();
    // Aca validamos el resultado esperado al enviar la petición
    // TODO adicionar expect
  });

  it('Deberia crear el usuario', () => {
    expect(component.usuarioForm.valid).toBeFalsy();
    component.usuarioForm.controls.nombre.setValue('Prueba');
    component.usuarioForm.controls.clave.setValue('PASSWORD');
    component.usuarioForm.controls.premium.setValue(false);
    expect(component.usuarioForm.valid).toBeTruthy();

    component.consumoCrearUsuario();

    expect(component.alertaTipo).toEqual("success");

  })


});
