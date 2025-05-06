const {zokou}=require("../framework/zokou")







zokou({nomCom:"restart",categorie:"Mods",reaction:"📴"},async(dest,z,com)=>{


  
const{repondre,ms,dev,superUser}=com;

  if(!superUser)
  {
    return repondre("This command is for owner only");
  }

  const {exec}=require("child_process")

    repondre("𝐀𝐧𝐝𝐚𝐥𝐚𝐓𝐡𝐞𝐌𝐫 𝐃𝐞𝐬𝐭𝐫𝐨𝐲𝐞𝐫 𝐁𝐨𝐭  Restarting ⏳");

  exec("pm2 restart all");
  

  



})
