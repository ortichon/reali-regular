import { Component, EventEmitter, Input, Output } from '@angular/core';
//
import { Episode } from '../models/episode.model';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent {

  @Input() set episodes(value: Episode[]) {
    this.selectedEpisodeId = null;
    this._episodes = value;
  }

  get episodes() {
    return this._episodes;
  }

  @Output() episodeChanged = new EventEmitter<Episode>();

  private _episodes: Episode[];
  selectedEpisodeId: number;

  episodeSelected(episode: Episode) {
    this.selectedEpisodeId = episode.id;
    this.episodeChanged.emit(episode);
  }
}
