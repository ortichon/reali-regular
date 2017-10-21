import { Component, EventEmitter, Input, Output } from '@angular/core';
//
import { Series } from '../app.component';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent {

  @Input() series: Series[];
  @Output() showIdChanged = new EventEmitter<number>();

  selectedShowId: number;

  showSelected(showId: number) {
    this.selectedShowId = showId;
    this.showIdChanged.emit(showId);
  }
}
