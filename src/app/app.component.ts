import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//
import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription';
//
import { Episode } from './models/episode.model';
import { Series } from './models/series.model';
import { DataSourceService } from './services/data-source.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('appContainer') appContainer: ElementRef;

  get episodes(): Episode[]{
    if (!_.isNil(this.selectedSeriesId)) { // could be 0 so we check for null/undefined
      return this.series[this.selectedSeriesId].episodes;
    }
    return [];
  }

  series: Series[];
  videoUrl: string;
  scrollInterval: any;
  selectedSeriesId: number;
  previousHttpRequest: Subscription;

  constructor(private dataSource: DataSourceService) {}

  ngOnInit() {
    this.loadSeries();
  }

  loadSeries(): void {
    this.dataSource.getSeries()
      .subscribe((res: Series[]) => this.series = res);
  }

  showSelected(showId: number): void {
    this.handlePreviousHttpRequest();
    this.videoUrl = null; // remove previous video if exists
    this.selectedSeriesId = showId;

    if (this.isShowGotNoEpisodes()) {
      this.previousHttpRequest = this.dataSource.getEpisodes(showId)
        .subscribe((res: Episode[]) => this.parseEpisodes(res, showId));
    }
  }

  handlePreviousHttpRequest(): void {
    // cancel previous xhr request if it still on
    if (this.previousHttpRequest && this.previousHttpRequest.closed === false) {
      this.previousHttpRequest.unsubscribe();
    }
  }

  parseEpisodes(episodes: Episode[], showId: number): void {
    this.series[showId].episodes = episodes;
  }

  isShowGotNoEpisodes(): boolean {
    return _.isEmpty(this.series[this.selectedSeriesId].episodes);
  }

  episodeSelected(episode: Episode): void {
    this.videoUrl = episode.url;
  }

  scrollToBottom(): void {
    this.scrollInterval = setInterval(this.smoothScrollToBottom.bind(this), 10);
  }

  smoothScrollToBottom(): void {
    this.appContainer.nativeElement.scrollTop += 20;
    if (this.appContainer.nativeElement.scrollTop >= this.appContainer.nativeElement.scrollHeight / 2) {
      clearInterval(this.scrollInterval);
    }
  }
}
