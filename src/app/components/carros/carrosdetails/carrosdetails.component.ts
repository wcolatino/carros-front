import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './carrosdetails.component.html',
  styleUrl: './carrosdetails.component.scss'
})
export class CarrosdetailsComponent {

  carro: Carro = new Carro(0, "");
  router = inject(ActivatedRoute); // Router para pegar parâmetro de rota
  router2 = inject(Router); // Router de redirecionamento

  constructor() { // NO construtor - acessar a variável de rota
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  save() {
    if (this.carro.id > 0) { //Se o Id foi maior que zero, é atualização
      Swal.fire({
        text: "Editado com sucesso!",
        icon: "success",
        confirmButtonText: 'Ok'
      });
      this.router2.navigate(['admin/carros'], { state: { carroEditado: this.carro } }); //Após salvar com sucesso, redireciona para a rota de carros e envia o carroNovo salvo
    } else {
      Swal.fire({
        text: "Salvo com sucesso!",
        icon: "success",
        confirmButtonText: 'Ok'
      });
      this.router2.navigate(['admin/carros'], { state: { carroNovo: this.carro } }); //Após salvar com sucesso, redireciona para a rota de carros e envia o carroNovo salvo
    }
  }

  findById(id: number) {
    //Busca no back-end
    let carroRetornado: Carro = new Carro(id, "Fiesta");
    this.carro = carroRetornado;
  }

}
