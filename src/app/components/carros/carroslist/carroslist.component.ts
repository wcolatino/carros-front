import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from "@angular/router";
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

import Swal from 'sweetalert2';
import { CarrosdetailsComponent } from "../carrosdetails/carrosdetails.component";
import { CarroService } from '../../../services/carro.service';

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

  carroService = inject(CarroService);

  constructor() {
    this.listAll();
  }

  listAll() {
    this.carroService.listAll().subscribe({ //Subscribe espera uma resposta
      next: lista => { //Quando back retornar o que se espera
        this.lista = lista; //A lista de carros recebe a lista vinda da services

      }, error: erro => { //Quando retornar qualquer erro
        Swal.fire({
          title: 'Ocoreu um erro',
          icon: "error"
        });
      }
    });
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

        this.carroService.delete(carro.id).subscribe({ //Subscribe espera uma resposta
          next: mensagem => { //Quando back retornar o que se espera com sucesso
            Swal.fire({
              title: mensagem,
              icon: "success"
            });
            this.listAll(); // CHama a listALl pra atualizar a tela
          }, error(err) { //Quando retornar qualquer erro
            Swal.fire({
              title: 'Ocoreu um erro',
              icon: "error"
            });
          }
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
    this.listAll();
    this.modalRef.close(); //fecha a modal
  }

}
