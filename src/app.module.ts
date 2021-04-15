import { BrowserModule } from '@angular/platform-browser';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { NgModule } from '@angular/core';
import { RootComponent } from './root.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { SearchComponent } from './app/search/search.component';
import { CreateComponent } from './app/create/create.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducers } from './app/reducers';
import { NotesEffects } from './app/notes.effects';
import { ListComponent } from './app/list/list.component';
import { NoteComponent } from './app/note/note.component';
import { TagsComponent } from './app/tags/tags.component';
import { NotesService } from './app/notes.service';
import { metaReducers } from './app/meta.reducers';

@NgModule({
    declarations: [
        RootComponent,
        SearchComponent,
        CreateComponent,
        ListComponent,
        NoteComponent,
        TagsComponent,
    ],
    imports: [
        StoreModule.forRoot(appReducers, { metaReducers }),
        EffectsModule.forRoot([NotesEffects]),
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        TransferHttpCacheModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatChipsModule,
    ],
    providers: [ NotesService ],
    bootstrap: [ RootComponent ],
})
export class AppModule {
    constructor(private readonly httpClient: HttpClient) {
        httpClient.get('/api/env').subscribe({
            next: res => console.log('appModule:: env => ', res),
            error: err => console.error(err),
        });
    }
}
