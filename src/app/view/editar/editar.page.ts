import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Contato from 'src/app/model/entities/Contato';
import { ContatoService } from 'src/app/model/services/contato.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  contato: Contato;
  nome: string;
  telefone: string;
  email: string;
  genero: number;
  indice: number;
  edicao: boolean = false;

  constructor(private actRoute: ActivatedRoute, private contatoService: ContatoService, private router: Router, private alertController: AlertController){ }

  ngOnInit() {
    this.actRoute.params.subscribe((parametros) => {
      if (parametros["indice"]){
        this.indice = parametros["indice"];
        this.contato = this.contatoService.obterPorIndice(parametros["indice"]);
      }
    });
    this.nome = this.contato.nome;
    this.telefone = this.contato.telefone;
    this.email = this.contato.email;
    this.genero = this.contato.genero;
  }

  habilitar(){
    if (!this.edicao){
      this.edicao = true;
    }else{
      this.edicao = false;
    }
  }

  excluir(){
    //Confirmação
    this.contatoService.excluir(this.indice);
    this.router.navigate(['/home']);
  }

  salvar(){
    //Implementar Validação
    if (this.nome && this.telefone && this.email && this.genero){
      let novo: Contato = new Contato(this.nome, this.telefone);
      novo.email = this.email;
      novo.genero = this.genero;
      this.contatoService.editar(this.indice, novo);
      this.router.navigate(['/home']);
      this.presentAlert('Sucesso', 'Contato editado com Sucesso');
    }
    else{
      this.presentAlert('Erro', 'Todos os campos são Obrigatórios');
    }
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

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
    },
    {
      text: 'Excluir',
      role: 'confirm',
    },
  ];

  setResult(ev) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

}

