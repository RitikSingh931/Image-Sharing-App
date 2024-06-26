import conf from '../conf/conf.js';
import { Client, Account, ID } from 'appwrite';


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject('66788de60018b523f3b4');
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                console.log("account created")
                // call another method
                return this.login({email, password});
            } else {
                console.log("account not created")
               return  userAccount;
            }
        } catch (error) {
            console.log("account not created")
            throw error;
        }
    }

    async login({email, password}) {
        try {
            const session= await this.account.createEmailPasswordSession(email, password);
            return session;
        } catch (error) {
            console.log("Appwrite service :: loginew :: error",error)
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const userr = await this.account.get();
        return userr
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
            return null;
            
        }

       
   }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService

