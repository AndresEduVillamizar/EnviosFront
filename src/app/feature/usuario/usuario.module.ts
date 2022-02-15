import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProductoRoutingModule } from './producto-routing.module';
import { BorrarUsuarioComponent } from './components/borrar-usuario/borrar-usuario.component';
import { CotizarEnvioComponent } from './components/cotizar-envio/cotizar-envio.component';
import { ProductoComponent } from './components/producto/producto.component';
import { SharedModule } from '@shared/shared.module';
import { EnviosService } from './shared/service/producto.service';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    CrearUsuarioComponent,
    CotizarEnvioComponent,
    BorrarUsuarioComponent,
    ProductoComponent
  ],
  imports: [
    ProductoRoutingModule,
    SharedModule,
    NgbModule,
    NgxPaginationModule
  ],
  providers: [EnviosService]
})
export class UsuarioModule { }
