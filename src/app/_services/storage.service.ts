import {Injectable} from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const CONTRACT_KEY = 'AuthContractNumber';
const ADDRESS_KEY = 'AuthAddress';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    // @ts-ignore
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    // @ts-ignore
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveContractNumber(contractNumber: string) {
    window.sessionStorage.removeItem(CONTRACT_KEY);
    window.sessionStorage.setItem(CONTRACT_KEY, contractNumber);
  }

  public saveAddress(address: string) {
    window.sessionStorage.removeItem(ADDRESS_KEY);
    window.sessionStorage.setItem(ADDRESS_KEY, address);
  }

  public getContractNumber(): string {
    // @ts-ignore
    return sessionStorage.getItem(CONTRACT_KEY);
  }

  public getAddress(): string {
    // @ts-ignore
    return sessionStorage.getItem(ADDRESS_KEY);
  }

  public saveAuthorities(roles: string[]) {
    console.log('saveAuthorities');
    console.log(roles);
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(roles));
  }
  public getAuthorities(): string {
    // @ts-ignore
    return sessionStorage.getItem(AUTHORITIES_KEY);
  }

  clean(): void {
    window.sessionStorage.clear();
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USERNAME_KEY);
    if (user) {
      return true;
    }
    return false;
  }
}
