import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Cotizacion } from '../model/cotizacion';
import {  Usuario } from '../model/usuario';


@Injectable()
export class EnviosService {

  constructor(protected http: HttpService) {}

  public consultar() {
    return this.http.doGet<Usuario[]>(`${environment.endpoint}`, this.http.optsName('Listar Usuarios'));
  }

  public crear(usuario: Usuario) {
    return this.http.doPost<Usuario, boolean>(`${environment.endpoint}/registro`, usuario,
                                                this.http.optsName('Crear Usuario'));
  }

  public generarCotizacion(cotizacion: Cotizacion) {
    return this.http.doPost<Cotizacion, boolean>(`${environment.endpoint}`, cotizacion,
                                                this.http.optsName('Crear Mensajeria'));
  }

  public eliminar(idUsuarioEliminar: number) {
    return this.http.doDelete<any>(`${environment.endpoint}?id=${idUsuarioEliminar}`,
                                                 this.http.optsName('Eliminar Usuario Envio'));
  }
}
