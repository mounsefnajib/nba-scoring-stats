import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RapidApiHeaderInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = req.headers
            .set('X-RapidAPI-Key', '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX')
            .set('X-RapidAPI-Host', 'free-nba.p.rapidapi.com'
);
        const requestRapidApi = req.clone({ headers });
        return next.handle(requestRapidApi);
    }
}