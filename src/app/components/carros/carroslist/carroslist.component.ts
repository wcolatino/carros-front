import { Component } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from "@angular/router";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './carroslist.component.html',
  styleUrl: './carroslist.component.scss'
})
export class CarroslistComponent {

  lista: Carro[] = []

  constructor() {

    //Pega o carro editado ou cadastrado


    //Cria a lista
    this.lista.push(new Carro(1, 'Fiesta'));
    this.lista.push(new Carro(2, 'Monza'));
    this.lista.push(new Carro(3, 'Ka'));

    //Verifica no estado se é novo ou editado
    let carroNovo = history.state.carroNovo;
    let carroEditado = history.state.carroEditado;

    //Se for novo, acidiona na lista com novo Id
    if (carroNovo) {
      carroNovo.id = 555
      this.lista.push(carroNovo) //Insere novo na lista e pronto
    }

    //Se for editado, pega o indice do carro editado e devolte com os dados editatos
    if (carroEditado) {
      let indice = this.lista.findIndex(x => { return x.id == carroEditado.id }); //pega o indice do caro editado - Altera o objeto mas permanece no index da lista
      this.lista[indice] = carroEditado; //Devolve o carro editado
    }



  }

  deleteById(carro: Carro) {

    Swal.fire({
      title: "Tem certeza que deseja deletar o registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim"
    }).then((result) => {
      if (result.isConfirmed) {

        let indice = this.lista.findIndex(x => { return x.id == carro.id }); //pega o indice do caro editado
        this.lista.splice(indice, 1);

        Swal.fire({
          title: "Registro apagado!",
          icon: "success"
        });
      }
    });
  }

}
