import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Company} from '../../company';

@Component({
  selector: 'app-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.css']
})
export class CompanyTableComponent {
  @Input() companies: Company[] = [];
  @Output() delete = new EventEmitter<Company>();
  @Output() edit = new EventEmitter<Company>();
  columns = ['code', 'name', 'country', 'active', 'actions'];

  deleteCompany(company: Company) {
    this.delete.emit(company);
  }

  editCompany(company: Company) {
    this.edit.emit(company);
  }
}
