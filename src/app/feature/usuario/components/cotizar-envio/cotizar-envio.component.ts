import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EnviosService } from '@usuario/shared/service/producto.service';
import { Usuario } from '@usuario/shared/model/usuario';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cotizacion } from '@usuario/shared/model/cotizacion';

const DISTANCIA_MINIMA = 5;
const DISTANCIA_MAXIMA = 40;

@Component({
  selector: 'app-listar-producto',
  templateUrl: './cotizar-envio.component.html',
  styleUrls: ['./cotizar-envio.component.css']
})
export class CotizarEnvioComponent implements OnInit {

  public listaUsuarios: Observable<Usuario[]>;
  public page: number;
  closeModal: string;
  cotizacionForm: FormGroup;
  cotizacion: Cotizacion;
  transaccionCotizacion: boolean;
  valorCotizacion: number;
  mensajeError: String;

  constructor(protected enviosServices: EnviosService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.inicializarVariables();
    this.listaUsuarios = this.enviosServices.consultar();
    this.construirFormularioCotizacion();
  }

  inicializarVariables() {
    this.transaccionCotizacion = false;
  }

  construirFormularioCotizacion() {
    this.cotizacionForm = new FormGroup({
      distanciaRecorrido: new FormControl('', [
        Validators.required,
        Validators.min(DISTANCIA_MINIMA),
        Validators.max(DISTANCIA_MAXIMA)
      ])
    })
  }

  cotizar(idUsuario: number) {
    if (this.cotizacionForm.valid) {
      this.cotizacion = new Cotizacion(idUsuario,
        this.cotizacionForm.get('distanciaRecorrido').value);
      this.consumoCotizarSolicitud();
    }
  }

  consumoCotizarSolicitud() {
    this.enviosServices.generarCotizacion(this.cotizacion)
      .subscribe(success => {
        this.valorCotizacion = JSON.parse(JSON.stringify(success)).valor;
        this.transaccionCotizacion = true;
        this.cotizacionForm.reset();
      },
        error => {
          this.mensajeError = JSON.parse(JSON.stringify(error.error.mensaje));
        }
      );
  }

  triggerModal(content) {
    this.inicializarVariables();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
