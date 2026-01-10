import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Marca } from '../../../models/marca';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcaService } from '../../../services/marca.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-marcadetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './marcadetails.component.html',
  styleUrl: './marcadetails.component.scss'
})
export class MarcasdetailsComponent {

  @Input("marca")
  marca: Marca = new Marca(null, "");

  @Output("retorno")
  retorno = new EventEmitter<any>();

  marcaService = inject(MarcaService); //Injeta a Service de Marca
  router = inject(ActivatedRoute); //Para pegar parâmetro de rota
  router2 = inject(Router);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id != null) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.marcaService.findById(id).subscribe({
      next: retorno => {
        this.marca = retorno;
      }, error: erro => {
        Swal.fire({
          title: 'Ocoreu um erro',
          icon: "error"
        });
      }
    })
  }

  save() {
    if (this.marca.id > 0) { //Se o Id foi maior que zero, é atualização

      this.marcaService.update(this.marca, this.marca.id).subscribe({
        next: mensagem => {
          Swal.fire({
            text: mensagem,
            icon: "success",
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(['admin/marcas'], { state: { marcaEditado: this.marca } }); //Após salvar com sucesso, redireciona para a rota de marcas e envia o carroNovo salvo
          this.retorno.emit(this.marca); //Emitter devolve o carro após salva rou editar - serve para fechar a modal após finalizar
        }, error: erro => {
          Swal.fire({
            title: 'Ocoreu um erro',
            icon: "error"
          });
        }
      });



    } else { //SALVAR
      this.marcaService.save(this.marca).subscribe({
        next: mensagem => {
          Swal.fire({
            text: mensagem,
            icon: "success",
            confirmButtonText: 'Ok'
          });
        }, error: erro => {
          Swal.fire({
            title: 'Ocoreu um erro ao salvar a marca',
            icon: "error"
          });
        }
      });


      this.router2.navigate(['admin/marcas'], { state: { marcaNova: this.marca } }); //Após salvar com sucesso, redireciona para a rota de carros e envia o carroNovo salvo
      this.retorno.emit(this.marca); //Emitter devolve o carro após salva rou editar
    }

  }
}
