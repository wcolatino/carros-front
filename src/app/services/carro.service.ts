import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Carro } from '../models/carro';
import { Observable } from 'rxjs';

@Injectable({ //Pode injetar em outros componentes
  providedIn: 'root'
})
export class CarroService {

  http = inject(HttpClient); //Injeta o HTTpCLient

  API = "http://localhost:8080/api/carro";

  constructor() { }

  listAll(): Observable<Carro[]>{ //Retornará uma lista de carro. Observable serve para observar e agaurdar um retorno
    return this.http.get<Carro[]>(this.API+"/listAll");
  }

  delete (id: number): Observable<string>{ 
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'}); //Sempre que o retorno for String, deve-se colcoar o responsetype;
  }
}
