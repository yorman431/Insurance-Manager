import {Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: 'star.component.html',
  styleUrls: ['star.component.css']
})
export class StarComponent implements OnChanges{
  cropWidth = 80;
  @Input() avgQualification = 0;
  constructor() {}

  ngOnChanges() {
    this.cropWidth = this.avgQualification * 80/5;
  }
}
