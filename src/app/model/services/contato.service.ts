import { Injectable } from '@angular/core';
import Contato from '../entities/Contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  contatos: Contato[] = [];

  constructor() {
    let c1: Contato = new Contato("Jotinha", "42999887766");
    let c2: Contato = new Contato("Carlão", "42999881122");
    let c3: Contato = new Contato("Gigi", "42999883344");
    this.contatos.push(c1);
    this.contatos.push(c2);
    this.contatos.push(c3);
  }

  obterTodos(): Contato[]{
    return this.contatos;
  }

  obterPorIndice(indice: number): Contato{
    return this.contatos[indice];
  }

  cadastrar(contato: Contato){
    this.contatos.push(contato);
  }
}
