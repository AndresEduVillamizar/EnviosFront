import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { EnviosService } from '@usuario/shared/service/producto.service';
import { Usuario } from '@usuario/shared/model/usuario';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';

const ELIMINACION_CORRECTA = 'Se ha eliminado exitosamente';
const ELIMINACION_INCORRECTA = 'No se ha logrado eliminar exitosamente '

@Component({
  selector: 'app-borrar-producto',
  templateUrl: './borrar-usuario.component.html',
  styleUrls: ['./borrar-usuario.component.css']
})
export class BorrarUsuarioComponent implements OnInit {


  public page: number;
  public listaUsuarios: Observable<Usuario[]>;
  public alertaEliminacion: boolean;
  public alertaMensaje: string;

  constructor(
    protected enviosService: EnviosService,
    protected configAlerta:NgbAlertConfig
    ) {
      this.configAlerta.dismissible=false;
      this.configAlerta.type='warning';
     }

  ngOnInit() {
    this.listaUsuarios = this.enviosService.consultar();
    this.inicializarVariables();
  }

  inicializarVariables(){
    this.alertaEliminacion = false;
  }

  eliminarUsuario(idUsuarioEliminar: number) {
    this.enviosService.eliminar(idUsuarioEliminar)
      .subscribe(() => {
        this.alertaMensaje = ELIMINACION_CORRECTA;
        this.listaUsuarios = this.enviosService.consultar();
        this.alertaEliminacion = true;
        this.configAlerta.type= 'success';
      }, error => {
        let errorRespuesta = JSON.parse(JSON.stringify(error));
        this.alertaMensaje = ELIMINACION_INCORRECTA + errorRespuesta.error.mensaje;
        this.configAlerta.type= 'warning';
      }
      );
  }
}
