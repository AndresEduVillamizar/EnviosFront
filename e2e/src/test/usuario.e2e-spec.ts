//import { browser, logging } from 'protractor';
import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { UsuarioPage } from '../page/usuario/usuario.po';

describe('workspace-project Usuario', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let usuario: UsuarioPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        usuario = new UsuarioPage();
    });

    it('Deberia crear usuario', async () => {
        const NOMBRE_USUARIO = (Math.random() + 1).toString(36).substring(7);
        const CLAVE_USUARIO = 'PASSWORD';
        const ES_PREMIUM = '';

        page.navigateTo();
        navBar.clickBotonUsuarios();
        usuario.clickBotonCrearUsuarios();
        usuario.ingresarNombre(NOMBRE_USUARIO);
        usuario.ingresarClave(CLAVE_USUARIO);
        usuario.ingresarPremium(ES_PREMIUM);

        usuario.clickBotonGuardarUsuarios();
        
        // Adicionamos las validaciones despues de la creación
        // expect(<>).toEqual(<>);
    });

    it('Deberia listar usuarios en pagina de borrar usuarios', async () => {
        page.navigateTo();
        navBar.clickBotonUsuarios();
        usuario.clickBotonBorrarUsuarios();

        expect(0).toBe(usuario.contarUsuariosBorrar());
    });

    it('Deberia listar usuarios en pagina de cotizar usuarios', async () => {
        page.navigateTo();
        navBar.clickBotonUsuarios();
        usuario.clickBotonCotizarEnvios();

        expect(0).toBe(usuario.contarUsuariosCotizar());
    });
/*
    it('Deberia listar productos', () => {
        page.navigateTo(); 
        navBar.clickBotonProductos();
        producto.clickBotonListarProductos();

        expect(4).toBe(producto.contarProductos());
    });
    */
});
