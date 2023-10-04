import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {Company} from '../../company';
import {CompanyService} from '../../services/company.service';
import {CompanyFormComponent} from '../company-form/company-form.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {
  companies: Observable<Company[]>
  constructor(private dialog: MatDialog, private companyService: CompanyService) {
    this.companyService.loadCompany();
    this.companies = this.companyService.getCompanies();
  }

  deleteCompany(company: Company): void {
    const text = `Are you sure you want to delete ${company?.name}?`;
    if (confirm(text))
      this.companyService.deleteCompany(company.id)
  }
  addCompany() {
    this.dialog
      .open(CompanyFormComponent, {maxWidth: '500px'})
      .afterClosed()
      .subscribe({
        next: (v: Company) => {
          if (v) {
            this.companyService.createCompany(v);
          }
        }
      });
  }

  editCompany(company: Company) {
    this.dialog
      .open(CompanyFormComponent, {data: company, maxWidth: '500px'})
      .afterClosed()
      .subscribe({
        next: (v: Company) => {
          if (v) {
            this.companyService.editCompany(company.id, v);
          }
        }
      });
  }
}
