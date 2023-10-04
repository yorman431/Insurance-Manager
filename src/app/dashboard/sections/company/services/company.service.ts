import { Injectable } from '@angular/core';
import {BehaviorSubject, map, mergeMap, Observable, take} from 'rxjs';
import {NotificationService} from '../../../../shared/service/notification.service';
import { Company } from '../company';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private _$company = new BehaviorSubject<Company[]>([]);
  private $company = this._$company.asObservable()
  constructor(private httpClient: HttpClient, private notification: NotificationService) { }

  loadCompany(): void {
    this.httpClient.get<Company[]>(environment.baseApiUrl + '/companies')
      .subscribe({
        next: (companies) => this._$company.next(companies),
        error: () => this.notification.error('There was a problem loading Companies')
      })
  }
  getCompanies(): Observable<Company[]> {
    return this.$company;
  }

  createCompany(newCompany: Company) {
    this.httpClient.post<Company>(environment.baseApiUrl + '/companies', newCompany)
      .pipe(
        mergeMap((company) => this.$company.pipe(
          take(1),
          map(companyArr => [...companyArr, company])
        ))
      )
      .subscribe({
        next: (companies) => {
          this._$company.next(companies);
          this.notification.success('New Company created')
        },
        error: () => this.notification.error('Error creating new company')
      })
  }

  editCompany(id: number, company: Company) {
    this.httpClient.put(environment.baseApiUrl + '/companies/' + id, company)
      .subscribe({
        next: () => {
          this.loadCompany();
          this.notification.success('Company updated');
        },
        error: () => this.notification.error("The company can't be updated")
      })
  }

  deleteCompany(id: number) {
    this.httpClient.delete(environment.baseApiUrl + '/companies/' + id)
      .subscribe({
        next: () => {
          this.loadCompany();
          this.notification.success('Company deleted')
        },
        error: () => this.notification.error('Error deleting the company')
      })
  }
}
