import { Resend } from "resend";


const resnd = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationToken = async (email : string , token:string)=>{
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`
}