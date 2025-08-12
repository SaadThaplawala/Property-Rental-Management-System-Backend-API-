const nodemailer = require("nodemailer");

async function createEtherealAccount() {
  let testAccount = await nodemailer.createTestAccount();
  console.log("Ethereal account created:");
  console.log(testAccount);
}

createEtherealAccount();