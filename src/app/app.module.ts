import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
//
import { AppComponent } from './app.component';
import { SeriesComponent } from './series/series.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { DataSourceService } from './services/data-source.service';

@NgModule({
  declarations: [
    AppComponent,
    SeriesComponent,
    EpisodesComponent,
    VideoPlayerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [DataSourceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
