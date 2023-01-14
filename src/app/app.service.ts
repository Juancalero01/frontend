import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  EMPLOYEE_API = 'http://localhost:3000/employee/';

  constructor(private readonly httpClient: HttpClient) {}

  // --------------------------------------------
  findAll() {
    return this.httpClient.get(this.EMPLOYEE_API);
  }

  findOne(id: number) {
    return this.httpClient.get(`${this.EMPLOYEE_API}${+id}`);
  }
  // --------------------------------------------

  create(body: any) {
    return this.httpClient.post(this.EMPLOYEE_API, body);
  }

  update(id: string, body: any) {
    return this.httpClient.put(`${this.EMPLOYEE_API}${+id}`, body);
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.EMPLOYEE_API}${+id}`);
  }
}
