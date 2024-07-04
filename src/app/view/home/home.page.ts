import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import Contato from 'src/app/model/Contato';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  contatos: Contato[] = [];
  nome: string = "";
  telefone: string = "";
  
  constructor(private alertController: AlertController) {
    let c1: Contato = new Contato("Jotinha", "42999887766");
    let c2: Contato = new Contato("Carlão", "42999881122");
    let c3: Contato = new Contato("Gigi", "42999883344");
    this.contatos.push(c1);
    this.contatos.push(c2);
    this.contatos.push(c3);
  }
  
  cadastrar() {
    if (this.nome && this.telefone){
      let c: Contato = new Contato(this.nome, this.telefone);
      this.contatos.push(c);
      this.presentAlert('Sucesso', 'Contato cadastrado com Sucesso');
    }
    else{
      this.presentAlert('Erro', 'Todos os campos são Obrigatórios');
    }
    this.nome = "";
    this.telefone = "";
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Agenda de Contatos',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
