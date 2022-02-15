import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CotizarEnvioComponent } from './cotizar-envio.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { EnviosService } from '../../shared/service/producto.service';
import { Usuario } from '../../shared/model/usuario';
import { HttpService } from 'src/app/core/services/http.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

describe('ListarProductoComponent', () => {
  let component: CotizarEnvioComponent;
  let fixture: ComponentFixture<CotizarEnvioComponent>;
  let enviosService: EnviosService;
  const listaProductos: Usuario[] = [new Usuario('1', 'Producto 1',true), new Usuario('2', 'Producto 2',false)];

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
      of(listaProductos)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.listaUsuarios.subscribe(resultado => {
      expect(2).toBe(resultado.length);
  });
});

});
