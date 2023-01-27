export class JwtResponse{
  token: string;
  username: string;
  contractNumber: string;
  address: string;
  roles: string[];

  constructor(token: string, username: string, contractNumber: string, address: string, roles: string[]) {
    this.token = token;
    this.username = username;
    this.contractNumber = contractNumber;
    this.address = address;
    this.roles = roles;
  }
}
