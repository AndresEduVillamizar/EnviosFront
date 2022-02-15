import { by, element } from 'protractor';

export class UsuarioPage {
    private linkCrearUsuario = element(by.id('linkCrearUsuario'));
    private linkGuardarUsuario = element(by.id('linkGuardarUsuario'));
    private inputNombre = element(by.id('nombre'));
    private inputClave = element(by.id('clave'));
    private inputPremium = element(by.id('esPremium'));

    async clickBotonCrearUsuarios() {
        await this.linkCrearUsuario.click();
    }

    async clickBotonGuardarUsuarios() {
        await this.linkGuardarUsuario.click();
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
}
