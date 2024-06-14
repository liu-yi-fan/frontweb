import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { packageType } from './interface/packageType';
import { selePackage } from './interface/selePackage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private client: HttpClient) {}

  getPackageAPI() {
    return this.client.get<packageType[]>(
      'https://localhost:7160/api/TPackageStyles'
    );
  }

  postSelectPackage(typeID: number) {
    return this.client.post<selePackage[]>(
      `https://localhost:7160/api/TAllPackages/selectID?seletId=${typeID}`,
      typeID
    );
  }

  // addOrderList(mid: number, pid: number){
  //   return this.client.post<addOrder[]>(
  //     `https://localhost:7066/p/addPackageCartAPI/${mid}/?pid=${pid}`,
  //     mid
  //   )
  // }

  addOrderList(mid: number, pid: number, qty: number): Observable<string> {
    const url = `https://localhost:7066/p/addPackageCartAPI/${mid}/?pid=${pid}&&qty=${qty}`;

    return this.client.get(url, { responseType: 'text' });
  }
}
