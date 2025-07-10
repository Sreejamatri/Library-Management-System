export class member {
    memberId?: number;
    name!: string;
    email!: string;
    phone!: string;
    address!: string;
    password!: string;
    loginDate!: Date;
    lastRenewedDate!: Date;
    membershipStatus!: any;
 
    constructor(name: string, email: string, phone: string, address: string, password: string, loginDate: Date, lastRenewedDate: Date, membershipStatus: any, memberId?: number) {
        this.memberId = memberId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.password = password;
        this.loginDate = loginDate;
        this.lastRenewedDate = lastRenewedDate;
        this.membershipStatus = membershipStatus;
    }
}