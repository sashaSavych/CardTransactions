import { Injectable } from '@angular/core';

declare var M;

@Injectable({
  providedIn: 'root'
})
export class MaterializeService {
  static showToastMessage(message: string): void {
    M.toast({html: message})
  }
}
