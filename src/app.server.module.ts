import { HttpClient, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApplicationRef, DoBootstrap, Inject, Injectable, NgModule, Optional } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';

import { AppModule } from './app.module';
import { RootComponent } from './root.component';

const storageMock = (): Storage => {
  const storage = {};

  return {
    setItem: (key: string, value: string) => {
      storage[key] = value || '';
    },    
    getItem: (key: string): string | null =>  key in storage ? storage[key] : null,
    removeItem: (key: string) => delete storage[key],
    get length(): number {
      return Object.keys(storage).length;
    },
    key: (i: number): string | null => {
      const keys = Object.keys(storage);
      return keys[i] || null;
    },
    clear: (): void => {
      Object.keys(storage).map(key => delete storage[key])
    },
  };
}

global.localStorage = storageMock();

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {

  constructor(@Optional() @Inject(REQUEST) protected request: Request) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let serverReq: HttpRequest<any> = req;
    if (this.request && req.url.indexOf('http') !== 0) {
      let newUrl = `${this.request.protocol}://${this.request.get('host')}`;
      if (!req.url.startsWith('/')) {
        newUrl += '/';
      }
      newUrl += req.url;
      serverReq = req.clone({url: newUrl});
    }

    return next.handle(serverReq);
  }
}

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
  ],
  bootstrap: [ RootComponent ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptor,
      multi: true,
    },
  ],
})
export class AppServerModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef): void {
    console.log('bootstrap appRef => ', appRef);    
  }
  constructor() {
    console.log('appServerModule:: constructor => ');
  }
}
