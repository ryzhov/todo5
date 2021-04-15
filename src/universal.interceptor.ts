import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable, Optional, Inject } from "@angular/core";
import { REQUEST } from "@nguniversal/express-engine/tokens";
import { Request } from 'express';

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {

    constructor(@Optional() @Inject(REQUEST) protected request: Request) { }

    upgradeUrl(url: string): string {
        return `${this.request.protocol}://${this.request.get('host')}${url.startsWith('/') ? url : '/' + url}`;
    }

    isUrlRelative(url: string): boolean {
        return url.indexOf('http') !== 0;
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const forwardReq: HttpRequest<any> = this.request && this.isUrlRelative(req.url) ?
            req.clone({url: this.upgradeUrl(req.url)}) : req;

        return next.handle(forwardReq);
    }
}
