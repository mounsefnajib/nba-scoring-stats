import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { RapidApiHeaderInterceptor } from "./rapid-api-header.interceptor";

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: RapidApiHeaderInterceptor, multi: true}
]