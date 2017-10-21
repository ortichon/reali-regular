import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//
import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private _episodes: Episode[];

  get episodes(): Episode[]{
    if (!_.isNil(this.selectedSeriesId)) {
      return this.series[this.selectedSeriesId].episodes;
    }
    return [];
  }

  set episodes(value: Episode[]) {
    this._episodes = value;
  }
  videoUrl: string;
  series: Series[];
  selectedSeriesId: number;
  selectedEpisodeId: number;
  previousHttpRequest: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadSeries();
  }

  loadSeries() {
    this.http.get('http://tvdb.reali.com/series')
      .subscribe((res: Series[]) => this.series = res);
  }

  showSelected(showId: number) {
    // cancel previous xhr request if it still on
    if (this.previousHttpRequest && this.previousHttpRequest.closed === false) {
      this.previousHttpRequest.unsubscribe();
    }
    this.selectedEpisodeId = null;  // remove previous episode if exists
    this.videoUrl = null;           // remove previous video if exists
    this.selectedSeriesId = showId;

    if (this.isShowGotEpisodes()) {
      this.previousHttpRequest = this.http.get(`http://tvdb.reali.com/series/${showId}`)
        .subscribe((res: Episode[]) => this.parseEpisodes(res, showId));
    }
  }

  parseEpisodes(episodes: Episode[], showId: number) {
    this.series[showId].episodes = episodes;
  }

  isShowGotEpisodes(): boolean {
    return _.isEmpty(this.series[this.selectedSeriesId].episodes);
  }

  episodeSelected(id: number, url: string) {
    this.selectedEpisodeId = id;
    this.videoUrl = url;
  }
}

export interface Series {
  id: number;
  title: string;
  image: string;
  episodes?: Episode[];
}

export interface Episode {
  id: number;
  title: string;
  url: string;
}
