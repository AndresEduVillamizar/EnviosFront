import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  RouterTestingModule
} from '@angular/router/testing';
import { BorrarUsuarioComponent } from './borrar-usuario.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpHandler } from '@angular/common/http';
import { EnviosService } from '@usuario/shared/service/producto.service';
import { HttpService } from '@core/services/http.service';
import { Usuario } from '@usuario/shared/model/usuario';
import { of, throwError } from 'rxjs';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

describe('BorrarUsuarioComponent', () => {
  let component: BorrarUsuarioComponent;
  let fixture: ComponentFixture<BorrarUsuarioComponent>;
  let service: EnviosService;
  const respuesta : [Usuario] = [ new Usuario ('NombreUsuario','PASSWORD',true)];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarUsuarioComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        NgbModule,
        NgxPaginationModule,
        RouterTestingModule
      ],
      providers:[
        EnviosService,
        NgbModal,
        HttpService,
        HttpHandler
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarUsuarioComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(EnviosService);
    spyOn(service, 'consultar').and.returnValue(
      of(respuesta)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia fallar al eliminar un usuario',() =>{    
    const spy = spyOn(service, 'eliminar').and.returnValue(
      throwError({error:{mensaje:''}}),
    );
    component.eliminarUsuario(1);
    expect(spy).toHaveBeenCalled();
    expect(component.alertaEliminacion).toBeFalse();
    expect(component.configAlerta.type).toEqual('warning');
  });

  it('Deberia eliminar un usuario',() =>{    
    const spy = spyOn(service, 'eliminar').and.returnValue(
      of(true)
    );
    component.eliminarUsuario(1);
    expect(spy).toHaveBeenCalled();
    expect(component.alertaEliminacion).toBeTrue();
    expect(component.configAlerta.type).toEqual('success');

  });


});
