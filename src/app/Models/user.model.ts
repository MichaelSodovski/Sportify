export class userModel {

    constructor (
        public userId?: number, 
        public firstName?: string, 
        public lastName?: string, 
        public identificationNumber?: number,
        public userName?: string,
        public dateOfBirth?: Date,
        public gender?: string,
        public email?: string,
        public passWord?: number,
        public image?: File,
        public imageFileName?: string,
        public roleId?: number,
        public role?: string,
        public JwtToken?: string
        ) {}
}