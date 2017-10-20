import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//
import * as _ from 'lodash';

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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadSeries();
  }

  loadSeries() {
    this.http.get('http://tvdb.reali.com/series')
      .subscribe((res: Series[]) => this.series = res);
  }

  showSelected(showId: number) {
    this.videoUrl = null; // remove previous video if exists
    this.selectedSeriesId = showId;

    if (this.isShowGotEpisodes()) {
      this.http.get(`http://tvdb.reali.com/series/${showId}`)
        .subscribe((res: Episode[]) => this.parseEpisodes(res));
    }
  }

  parseEpisodes(episodes: Episode[]) {
    this.series[this.selectedSeriesId].episodes = episodes;
  }

  isShowGotEpisodes(): boolean {
    return _.isEmpty(this.series[this.selectedSeriesId].episodes);
  }

  episodeSelected(url: string) {
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
