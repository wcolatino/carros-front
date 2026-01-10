import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Marca } from '../models/marca';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  //VARIAVEIS
http = inject(HttpClient);
API = "http://localhost:8080/api/marca"

  constructor() { }

  listAll(): Observable<Marca[]>{
    return this.http.get<Marca[]>(this.API+"/listAll")
  }

  delete (id: number): Observable<string>{ 
      return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'}); //Sempre que o retorno for String, deve-se colcoar o responsetype;
    }
  
    save (marca: Marca): Observable<string>{ // O Carro entra no body da requisição
      return this.http.post<string>(this.API+"/save", marca, {responseType: 'text' as 'json'}); //Sempre que o retorno for String, deve-se colocar o responsetype;
    }
  
     update (marca: Marca, id: number): Observable<string>{ // O Carro e o id entra no body da requisição
      return this.http.put<string>(this.API+"/update/"+id, marca, {responseType: 'text' as 'json'}); //Sempre que o retorno for String, deve-se colocar o responsetype;
    }
  
     findById (id: number): Observable<Marca>{ // O Carro e o id entra no body da requisição
      return this.http.get<Marca>(this.API+"/findById/"+id); //Sempre que o retorno for String, deve-se colocar o responsetype;
    }

}
