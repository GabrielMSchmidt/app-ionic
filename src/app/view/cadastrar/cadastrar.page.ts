import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Contato from 'src/app/model/entities/Contato';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  nome: string;
  telefone: string;
  email: string;
  genero: number;

  constructor(private alertController: AlertController,
    private firebaseService: FirebaseService,
    private router: Router){ }

  cadastrar() {
    if (this.nome && this.telefone){
      let c: Contato = new Contato(this.nome, this.telefone);
      if (this.email){
        c.email = this.email;
      }
      if (this.genero){
        c.genero = this.genero;
      }else{
        c.genero = 0;
      }
      this.firebaseService.cadastrar(c)
      .then(()=>{this.router.navigate(['\home'])}).catch((error)=>{console.log(error)});
      
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

  ngOnInit() {
  }

}
