const fs = require('fs');

const details = (req, res) => {
    var allDetails = fs.readFileSync('./user/record.txt').toString().split('\n');
    var detailsInFormat = getDetailsInFormat(allDetails);
    res.render('details', {info:detailsInFormat});
}

function getDetailsInFormat(allDetails){
     arr = [];
    allDetails.forEach(element => {
         temp = element.split('|');
         obj = {
            name : temp[0],
            email : temp[1],
            age : temp[3],
            phone : temp[4],
            city : temp[5]
        }
        arr.push(obj);
    });
    return arr;
}

const register = (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let pass = req.body.pass;
    let age = req.body.age;
    let phone = req.body.phone;
    let city = req.body.city;
    var name1 = /^[a-z A-Z]+$/;
    var email1 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var pass1 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,24}$/;
    var age1 = /^[0-9]{2}$/;
    var city1 = /^[a-z A-Z]+$/;
    var phone1= /^[0-9]+$/;
    let nameErr;
    let emailErr;
    let passErr;    
    let ageErr;
    let cityErr;
    let phoneErr; 
    if(name1.test(name) && email1.test(email) && pass1.test(pass) && age1.test(age) && city1.test(city) && phone1.test(phone) ) {
        
    const getEmailRecord = fs.readFileSync('./user/record.txt').toString().split('\n');
    const getAllEmails = getEmails(getEmailRecord);

        if (emailExists(getAllEmails,email)){
            res.render('register',{status:true,msg:'Sorry. Email Already Exists!!'})
        }
        else
        {
            console.log(email);
            let data = name +'|' + email + '|' + pass +'|'+ age +'|'+ phone +'|'+ city;
            fs.appendFile('./user/record.txt', data + '\n', err =>{
                if(err) throw err;
            })
            res.render('register',{status: true,msg:'Registered Successfully!!'});
        }
    }
    else {
        if(!name1.test(name)) {
            nameErr = 'Only letter and white spaces allow ';
        }
        if(!email1.test(email)) {
            emailErr = 'Email address is not valid';
        }
        if(!pass1.test(pass)) {
            passErr = 'Password between 8 to 24 characters which contain at least one  uppercase,lowercase'
        }
        if(!age1.test(age)) {
            ageErr = 'Only two digit number is allowed'
        }
        if(!phone1.test(phone)) {
            phoneErr = 'Only number is allowed'
        }
        if(!city1.test(city)) {
            cityErr = 'Only letter and white spaces allow';
        }
        res.render('register', { nameErr: nameErr, passErr: passErr, emailErr: emailErr, cityErr: cityErr, ageErr: ageErr, phoneErr:phoneErr})
    }
}


const login = (req, res) => {
    let email = req.body.email; 
    let pass = req.body.pass;
    const completeFileData = fs.readFileSync('./user/record.txt').toString().split('\n');
    const email_password = getEmailAndPassword(completeFileData);
    const value = checkEmailAndPassword(email_password,email,pass);
    if(value.status)
        {
            res.render("home");
        }
        res.render('login',{loginflag:true, msg: "Invalid Email and Password!!"});
}

function checkEmailAndPassword(email_password,userEmail,userPass)
{
   for(let obj in email_password)
   {
       let email = email_password[obj].email;
       let pass = email_password[obj].pass;
       if(email == userEmail && pass == userPass)
       {
           let name = email_password[obj].name;
           return {
               status:true,
               name: name,
           };
       }
   }
   return {status:false};
}
function getEmailAndPassword(emailRecord)
{
   const ENP = [];
   for(let i of emailRecord){
       let data = i.split('|');
       let name = data[0];
       let email = data[1];
       let pass = data[2];
       let obj = {
           name: name,
           email:email,
           pass:pass,
       }
       ENP.push(obj);
   }
   return ENP;
}
function emailExists(allEmails,email){
   for(let i of allEmails){
       if(i === email) return true;
   }
   return false;
}

function getEmails(emailRecord){
   const email = [];
   for(let i of emailRecord)
   {
       let emailInString = i.split('|');
       email.push(emailInString[1]);
   }
   return email;
}


module.exports = {
    register, login, details
};