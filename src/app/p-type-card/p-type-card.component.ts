import { cartPackage } from './../interface/cartPackage';
import { selePackage } from './../interface/selePackage';
import { packageType } from './../interface/packageType';
import { UserServiceService } from './../user-service.service';
import { Component } from '@angular/core';
import { count, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-p-type-card',
  templateUrl: './p-type-card.component.html',
  styleUrls: ['./p-type-card.component.scss'],
})
export class PTypeCardComponent {
  sectionTrigger = false;
  priceCount = 0;
  display = false;

  packagestyles: packageType[] = [];
  seletedPackage: selePackage[] = [];
  cartPackage: cartPackage[] = [];
  displayData: any[] = [];

  constructor(private UserService: UserServiceService) {}

  ngOnInit(): void {
    this.UserService.getPackageAPI().subscribe((data) => {
      this.packagestyles = data;
      console.log(this.packagestyles);
    });
  }

  selectedType(cardDiv: HTMLElement) {
    this.sectionTrigger = true;
    console.log(cardDiv.id);
    let id = Number(cardDiv.id);
    this.UserService.postSelectPackage(id).subscribe((data: selePackage[]) => {
      this.seletedPackage = data.map((item) => ({
        ...item,
        quantity: 0,
        totalPrice: 0,
      }));
    });
  }

  quantityChange(event: any, item: selePackage) {
    console.log(`${event.target.id}:` + event.target.value);
    // this.priceCount = event.target.value;
    const quantity = event.target.value;
    const packageId = event.target.id;

    const existingIndex = this.cartPackage.findIndex(
      (i) => i.packageId == packageId
    );
    if (existingIndex !== -1) {
      this.cartPackage.splice(existingIndex, 1);
    }
    item.packageId = packageId;
    item.quantity = quantity;
    item.totalPrice = item.price * quantity;
    this.cartPackage.push(item);
  }

  addCart(event: any) {
    const tB = event.target.id;
    const id = tB.replace('bAddCart', '');
    // console.log(id);

    // console.log(this.cartPackage);
    this.cartPackage = this.cartPackage.filter((e) => {
      return e.quantity > 0;
    });

    // sessionStorage.setItem('cartPackage', JSON.stringify(this.cartPackage));

    const matchingItem = this.cartPackage.find((e) => e.packageId === id);
    // if (matchingItem) {
    //   sessionStorage.setItem('cartPackage', JSON.stringify(matchingItem));
    //   console.log('Saved item:', matchingItem);
    // } else {
    //   alert('請先選取數量');
    // }
    if (matchingItem) {
      // 获取当前 sessionStorage 中已有的 cartPackage 数据
      const existingCartPackagesJson = sessionStorage.getItem('cartPackage');
      let existingCartPackages = [];

      if (existingCartPackagesJson) {
        try {
          existingCartPackages = JSON.parse(existingCartPackagesJson);
        } catch (e) {
          console.error('Error parsing JSON:', e);
        }
      }

      // 如果当前数据不是数组，则将其转换为数组
      if (!Array.isArray(existingCartPackages)) {
        existingCartPackages = [existingCartPackages];
      }

      // 添加新的项目到已有的数据中
      existingCartPackages.push(matchingItem);

      // 保存更新后的数据到 sessionStorage
      sessionStorage.setItem(
        'cartPackage',
        JSON.stringify(existingCartPackages)
      );
      console.log('Saved item:', matchingItem);
    } else {
      alert('請先選取數量');
    }

    if (sessionStorage.getItem('cartPackage') != null) {
      this.display = true;
      const chackSession = sessionStorage.getItem('cartPackage');

      this.displayData = JSON.parse(chackSession || '{}');
      this.displayData.forEach((e) => console.log(e));
    }
  }

  async orderList(event: any): Promise<void> {
    const packagesJson = sessionStorage.getItem('cartPackage');
    console.log(packagesJson);
    if (!packagesJson) {
      alert('no package');
      return;
    }
    // const packages = JSON.parse(packagesJson);
    // console.log(packages);

    let packages;
    try {
      packages = JSON.parse(packagesJson);
    } catch (e) {
      console.error('Error parsing JSON:', e);
      return;
    }

    if (!Array.isArray(packages)) {
      console.error('packages is not an array:', packages);
      return;
    }

    console.log(packages);

    const promises = packages.map(async (element: any) => {
      const mid = 2;
      const pid = element.packageId;
      const qty = element.quantity;

      try {
        const response = await lastValueFrom(
          this.UserService.addOrderList(mid, pid, qty)
        );
        console.log(`Response for packageId ${pid}, amount ${qty}:`, response);
      } catch (error) {
        console.error(`Error for packageId ${pid}, amount ${qty}:`, error);
      }
    });

    try {
      await Promise.all(promises);
      console.log('All requests completed.');
      sessionStorage.clear();
    } catch (error) {
      console.error('Error handling requests:', error);
    }

    //********************* */
    // packages.forEach((element: any) => {
    //   let mid = 2;
    //   let pid = element.packageId;
    //   let qty = element.quantity;

    //   this.UserService.addOrderList(mid, pid, qty).subscribe(
    //     (response: string) => {
    //       console.log(
    //         `Response for packageId ${pid}, amount ${qty}:`,
    //         response
    //       );
    //     },
    //     (error: any) => {
    //       console.error(`Error for packageId ${pid}, amount ${qty}:`, error);
    //     }
    //   );

    //   console.log('packageId:' + element.packageId);
    //   console.log('packageQty:' + element.quantity);
    // });
  }
}
