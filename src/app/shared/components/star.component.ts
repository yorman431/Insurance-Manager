import {Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: 'star.component.html',
  styleUrls: ['star.component.css']
})
export class StarComponent implements OnChanges{
  cropWidth = 75;
  @Input() avgQualification = 0;
  constructor() {}

  ngOnChanges() {
    this.cropWidth = this.avgQualification * 75/5;
  }
}
