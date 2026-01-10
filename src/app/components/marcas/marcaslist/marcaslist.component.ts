import { Component, inject, ViewChild, TemplateRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MdbModalModule,MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Marca } from '../../../models/marca';
import { MarcaService } from '../../../services/marca.service';
import Swal from 'sweetalert2';
import { MarcasdetailsComponent } from "../marcadetails/marcadetails.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-marcaslist',
  standalone: true,
  imports: [RouterLink, MarcasdetailsComponent, MdbModalModule, FormsModule],
  templateUrl: './marcaslist.component.html',
  styleUrl: './marcaslist.component.scss'
})
export class MarcaslistComponent {

  lista: Marca[] = [];
  marcaEdit: Marca = new Marca(0, "");
 

  //ELEMENTOS DE MODAL
    modalService = inject(MdbModalService); // para conseguir abrir a modal
    @ViewChild('modalMarcaDetalhe') modalMarcaDetalhe!: TemplateRef<any>; //Referencia do template da modal no HTML
    modalRef!: MdbModalRef<any>; //Referência da modal para conseguirmos fechar depois

 marcaService = inject(MarcaService);

  constructor() {
    this.listAll();
  }

  listAll() {
    this.marcaService.listAll().subscribe({
      next: lista => {
        this.lista = lista;
      }, error: erro => {
        Swal.fire({
          title: 'Ocoreu um erro',
          icon: "error"
        });
      }
    });

  }

  deleteById(marca: Marca) {
    Swal.fire({
      title: "Tem certeza que deseja deletar o registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim"
    }).then((result) => {
      if (result.isConfirmed) {

        this.marcaService.delete(marca.id).subscribe({ //Subscribe espera uma resposta
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
      this.marcaEdit = new Marca(0, "");
      this.modalRef = this.modalService.open(this.modalMarcaDetalhe); //abre a janela e guarda a referência no modalRef para poder tabalhar com ela
    }

  edit(marca: Marca) {
    this.marcaEdit = Object.assign({}, marca); //Evita que seja alterado por referência (ao mesmo tempo que se digita)
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe); //abre a janela e guarda a referência no modalRef para poder tabalhar com ela
  }

  retornoDetalhe(marca: Marca) {
      this.listAll();
      this.modalRef.close(); //fecha a modal
    }

}
