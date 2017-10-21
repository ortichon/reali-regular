import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//
import { Observable } from 'rxjs/Observable';
//
import { Series } from '../models/series.model';
import { Episode } from '../models/episode.model';


@Injectable()
export class DataSourceService {

  private readonly baseUrl = 'http://tvdb.reali.com/series';

  constructor(private http: HttpClient) { }

  getSeries(): Observable<Series[]> {
    return this.http.get(this.baseUrl);
  }

  getEpisodes(showId: number): Observable<Episode[]> {
    return this.http.get(`${this.baseUrl}/${showId}`);
  }
}
