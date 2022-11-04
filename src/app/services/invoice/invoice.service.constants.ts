import { HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

const devUrl = 'http://localhost:3000/api/v1/invoices';
const prodUrl = 'https://real-tan-rattlesnake-wig.cyclic.app/api/v1/invoices';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

export const baseUrl = environment.production ? prodUrl : devUrl;
