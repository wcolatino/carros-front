import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from "@angular/router";
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

import Swal from 'sweetalert2';
import { CarrosdetailsComponent } from "../carrosdetails/carrosdetails.component";

@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, CarrosdetailsComponent],
  templateUrl: './carroslist.component.html',
  styleUrl: './carroslist.component.scss'
})
export class CarroslistComponent {

  lista: Carro[] = []
  carroEdit: Carro = new Carro(0, "");

  //ELEMENTOS DE MODAL
  modalService = inject(MdbModalService); // para conseguir abrir a modal
  @ViewChild('modalCaroDetalhe') modalCaroDetalhe!: TemplateRef<any>; //Referencia do template da modal no HTML
  modalRef!: MdbModalRef<any>; //Referência da modal para conseguirmos fechar depois

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

  new() {
    this.carroEdit = new Carro(0, "");
    this.modalRef = this.modalService.open(this.modalCaroDetalhe); //abre a janela e guarda a referência no modalRef para poder tabalhar com ela
  }

  edit(carro: Carro) {
    this.carroEdit = Object.assign({}, carro); //CLona o objeto, evitando que o dado seja alterado po referencia (ao mesmo tempo que se edita)
    this.modalRef = this.modalService.open(this.modalCaroDetalhe); //abre a janela e guarda a referência no modalRef para poder tabalhar com ela
  }

  retornoDetalhe(carro: Carro) {

    if(carro.id>0){ //Retorna o objeto par ao indice da lista, em caso de edição
      let indice = this.lista.findIndex(x => { return x.id == carro.id }); //pega o indice do caro editado
      this.lista[indice] = carro;
    }else{ // Se for car novo , somene posta na lsita
      carro.id =55;
      this.lista.push(carro);
    }

    this.modalRef.close(); //fecha a modal
  }

}
