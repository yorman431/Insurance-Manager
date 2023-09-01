import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environment/environment';
import {Inscription, InscriptionRelation} from '../inscription';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  loadInscription(): Observable<InscriptionRelation[]> {
    return this.httpClient.get<InscriptionRelation[]>(environment.baseApiUrl + '/inscription?_expand=student&_expand=curse')
  }
  createInscription(newInscription: Inscription): Observable<Inscription> {
    return this.httpClient.post<Inscription>(environment.baseApiUrl + '/inscription', {...newInscription})
  }

  editInscription(id: number, inscription: Inscription): Observable<Inscription> {
    return this.httpClient.put<Inscription>(environment.baseApiUrl + '/inscription/' + id, inscription)
  }

  deleteInscription(id: number): Observable<any> {
    return this.httpClient.delete(environment.baseApiUrl + '/inscription/' + id)
  }
}
