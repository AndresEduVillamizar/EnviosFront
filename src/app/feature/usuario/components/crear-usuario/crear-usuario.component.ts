import { Component, OnInit } from '@angular/core';
import { EnviosService } from '../../shared/service/producto.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '@usuario/shared/model/usuario';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 20;
const CREACION_EXITOSA = 'success';
const CREACION_FALLIDA = 'danger';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  usuarioForm: FormGroup;
  usuario: Usuario;
  alertaFormulario: boolean;
  alertaCreacion: boolean;
  alertaMensaje: string;
  alertaTipo: string;


  constructor(protected enviosServices: EnviosService) { }

  ngOnInit() {
    this.construirFormularioUsuario();
    this.inicializarVariables();
  }

  inicializarVariables() {
    this.alertaCreacion = false;
    this.alertaFormulario = false;
  }

  crear() {
    if (this.usuarioForm.valid) {
      this.usuario = new Usuario(this.usuarioForm.get('nombre').value,
        this.usuarioForm.get('clave').value,
        this.usuarioForm.get('premium').value);
      this.alertaFormulario = true;
      this.consumoCrearUsuario();
    } else {
      this.alertaFormulario = false;
    }
  }

  private construirFormularioUsuario() {
    this.usuarioForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      clave: new FormControl('', [
        Validators.required,
        Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
        Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)
      ]),
      premium: new FormControl(false, [Validators.required])
    });
  }

  consumoCrearUsuario() {
    this.enviosServices.crear(this.usuario)
      .subscribe(success => {
        this.alertaTipo = CREACION_EXITOSA;
        let respuestaSuccess = JSON.parse(JSON.stringify(success));
        this.alertaMensaje = respuestaSuccess.valor;
        this.usuarioForm.reset();
        this.alertaCreacion = true;
      },
        error => {
          this.alertaTipo = CREACION_FALLIDA;
          let respuestaError = JSON.parse(JSON.stringify(error));
          this.alertaMensaje = respuestaError.error.mensaje;
          this.alertaCreacion = true;
        }
      );
  }
}
