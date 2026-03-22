import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CarroService } from '../../../services/carro.service';
import { MarcaslistComponent } from "../../marcas/marcaslist/marcaslist.component";
import { Marca } from '../../../models/marca';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-carrosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, MarcaslistComponent],
  templateUrl: './carrosdetails.component.html',
  styleUrl: './carrosdetails.component.scss'
})
export class CarrosdetailsComponent {

  @Output("retorno")
  retorno = new EventEmitter<any>();


   //ELEMENTOS DE MODAL
    modalService = inject(MdbModalService); // para conseguir abrir a modal
    @ViewChild('modalCaroDetalhe') modalCaroDetalhe!: TemplateRef<any>; //Referencia do template da modal no HTML
    modalRef!: MdbModalRef<any>; //Referência da modal para conseguirmos fechar depois

  @Input("carro")
  carro: Carro = new Carro(0, "");

  router = inject(ActivatedRoute); // Router para pegar parâmetro de rota
  
  //@Output("retorno") retorno = new EventEmitter<any>();
  router2 = inject(Router); // Router de redirecionamento

  carroService = inject(CarroService);

  constructor() {
    //Analisar na rota se há ID, se houver faz findById
    let id = this.router.snapshot.params['id'];
    if (id != null) {
      this.findById(id);
    }
  }

  findById(id: number) {

    this.carroService.findById(id).subscribe({ //subscribe - estuta a requisição em tempo real
      next: retorno => {
        this.carro = retorno; //Pega o dado retornado do findById e joga pra variavel Carro
      }, error: erro => {
        Swal.fire({
          title: 'Ocoreu um erro',
          icon: "error"
        });
      }
    });
  }

  save() {
    if (this.carro.id > 0) { //Se o Id foi maior que zero, é atualização
        this.carroService.update(this.carro, this.carro.id).subscribe({
          next: mensagem => {
            Swal.fire({
              text: mensagem,
              icon: "success",
              confirmButtonText: 'Ok'
            });
            this.router2.navigate(['admin/carros'], { state: { carroEditado: this.carro } }); //Após salvar com sucesso, redireciona para a rota de carros e envia o carroNovo salvo
            this.retorno.emit(this.carro); //Emitter devolve o carro após salva rou editar - serve para fechar a modal após finalizar
          }, error: erro => {
            Swal.fire({
              title: 'Ocoreu um erro',
              icon: "error"
            });
          }
        });
    } else { //SALVAR
      this.carroService.save(this.carro).subscribe({
        next: mensagem => {
          Swal.fire({
            text: mensagem,
            icon: "success",
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(['admin/carros'], { state: { carroEditado: this.carro } }); //Após salvar com sucesso, redireciona para a rota de carros e envia o carroNovo salvo
        }, error: erro => {
          Swal.fire({
            title: 'Ocoreu um erro ao salvar o carro',
            icon: "error"
          });
        }
      });
      this.carroService.listAll();    

      this.router2.navigate(['admin/carros'], { state: { carroNovo: this.carro } }); //Após salvar com sucesso, redireciona para a rota de carros e envia o carroNovo salvo
      this.retorno.emit(this.carro); //Emitter devolve o carro após salva rou editar
    }

  }

  buscarMarca(){
    
  }

  retornoMarca(marca: Marca){}



}
