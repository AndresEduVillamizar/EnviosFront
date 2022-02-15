import { by, element } from 'protractor';

export class UsuarioPage {
    private linkCrearUsuario = element(by.id('linkCrearUsuario'));
    private linkBorrarUsuario = element(by.id('linkBorrarUsuario'));
    private linkCotizarEnvio = element(by.id('linkCotizarEnvio'));

    private linkGuardarUsuario = element(by.id('linkGuardarUsuario'));
    private inputNombre = element(by.id('nombre'));
    private inputClave = element(by.id('clave'));
    private inputPremium = element(by.id('esPremium'));
    private listaUsuariosBorrar = element.all(by.id('tablaBorrar'));
    private listaUsuariosCotizar = element.all(by.id('tablaCotizar'));

    private botonEliminarUsuario = element(by.id('botonEliminarUsuario'));

    async clickBotonCrearUsuarios() {
        await this.linkCrearUsuario.click();
    }

    async clickBotonBorrarUsuarios() {
        await this.linkBorrarUsuario.click();
    }

    async clickBotonCotizarEnvios() {
        await this.linkCotizarEnvio.click();
    }

    async clickBotonGuardarUsuarios() {
        await this.linkGuardarUsuario.click();
    }

    async clickBotonEliminarUsuarios() {
        await this.botonEliminarUsuario.click();
    }

    async ingresarNombre(nombre) {
        await this.inputNombre.sendKeys(nombre);
    }

    async ingresarClave(clave) {
        await this.inputClave.sendKeys(clave);
    }

    async ingresarPremium(premium) {
        await this.inputPremium.sendKeys(premium);
    }

    async contarUsuariosBorrar() {
        return this.listaUsuariosBorrar.count();
    }

    async contarUsuariosCotizar() {
        return this.listaUsuariosCotizar.count();
    }
}
