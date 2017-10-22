import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
//
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//
import { Series } from '../models/series.model';
import { Episode } from '../models/episode.model';


@Injectable()
export class DataSourceService {

  private readonly baseUrl = 'http://tvdb.reali.com/series';

  constructor(private http: Http) { }

  static handleError(error: any) {
    return Observable.throw(new Error(error.status));
  }

  getSeries(): Observable<Series[]> {
    return this.http.get(this.baseUrl)
      .map((res: Response) => res.json())
      .catch((err: any) => DataSourceService.handleError(err));
  }

  getEpisodes(showId: number): Observable<Episode[]> {
    return this.http.get(${this.baseUrl}/${showId})
      .map((res: Response) => res.json())
      .catch((err: any) => DataSourceService.handleError(err));
  }
}
