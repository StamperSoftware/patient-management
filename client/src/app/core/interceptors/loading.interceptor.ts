﻿import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoadingService } from "../services/loading.service";
import { inject } from "@angular/core";

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
    const loadingService = inject(LoadingService);
    loadingService.loading();
    return next(req).pipe(finalize(()=>loadingService.idle()));
};
