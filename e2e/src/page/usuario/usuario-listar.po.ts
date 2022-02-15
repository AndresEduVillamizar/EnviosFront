import { by, element } from 'protractor';

export class UsuarioPage {
    private linkCotizarEnvio = element(by.id('linkCotizarEnvio'));
    private linkGuardarUsuario = element(by.id('linkGuardarUsuario'));
    private inputNombre = element(by.id('nombre'));
    private inputClave = element(by.id('clave'));
    private inputPremium = element(by.id('esPremium'));

    async clickBotonCotizarEnvio() {
        await this.linkCotizarEnvio.click();
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
