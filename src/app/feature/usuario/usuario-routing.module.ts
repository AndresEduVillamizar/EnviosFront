import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CotizarEnvioComponent } from './components/cotizar-envio/cotizar-envio.component';
import { BorrarUsuarioComponent } from './components/borrar-usuario/borrar-usuario.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';


const routes: Routes = [
  {
    path: '',
    component: ProductoComponent,
    children: [
      {
        path: 'crear',
        component: CrearUsuarioComponent
      },
      {
        path: 'listar',
        component: CotizarEnvioComponent
      },
      {
        path: 'borrar',
        component: BorrarUsuarioComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
