import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EnviosService } from './producto.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { Usuario } from '../model/usuario';
import { HttpResponse } from '@angular/common/http';

describe('EnviosService', () => {
  let httpMock: HttpTestingController;
  let service: EnviosService;
  const apiEndpointUsuariosConsulta = `${environment.endpoint}`;
  const apiEndpointUsuarios = `${environment.endpoint}/registro`;
  const apiEndpointUsuariosEliminacion = `${environment.endpoint}?id=`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EnviosService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(EnviosService);
  });

  it('should be created', () => {
    const productService: EnviosService = TestBed.inject(EnviosService);
    expect(productService).toBeTruthy();
  });

  it('deberia listar productos', () => {
    const dummyUsuarios = [
      new Usuario('1', 'NombreUsuario 1',true), new Usuario('2', 'NombreUsuario 2',false)
    ];
    service.consultar().subscribe(usuarios => {
      expect(usuarios.length).toBe(2);
      expect(usuarios).toEqual(dummyUsuarios);
    });
    const req = httpMock.expectOne(apiEndpointUsuariosConsulta);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsuarios);
  });

  it('deberia crear un usuario', () => {
    const dummyUsuario = new Usuario('1', 'Nombreusuario',true);
    service.crear(dummyUsuario).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointUsuarios);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia eliminar un producto', () => {
    const dummyUsuario = 1;
    service.eliminar(dummyUsuario).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointUsuariosEliminacion}1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });
});
