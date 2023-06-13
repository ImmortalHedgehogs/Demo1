// const  Octokit  = require("octokit");
import { Octokit } from 'octokit';
import 'dotenv/config';

// console.log(process.env.MY_TOKEN);
// const token = process.env.MY_TOKEN;
const octokit = new Octokit({
    auth: process.env.API_KEY,
});

// function getFile(){
//     console.log("grabbing json file");
//     try {
//         fs.readFile(core.getInput('users'), (err, data) =>{
//             if(err) throw err;
//             const userDat = JSON.parse(data);
//             console.log(userDat);
//         })
//         console.log('json object from prev job: ', userDat);
//     }catch(e){
//         core.setFailed(e.message);
//     }

//     return userDat;
// }

async function createRepo(){
    let userlogin = process.argv[2];
    console.log(userlogin);
    try{
       let res = await octokit.graphql({
            query: `mutation{
                createRepository(input:{name: "${userlogin}", visibility: public}){
                    repository{
                        url
                        id
                    }
                }
            }`
        })
        console.log(res.repository);
    }catch(e){
        console.log(e);
    }

    console.log("repo created");
}
// function driver(){
//     let data = getFile(); 
//     createRepo(data);
// }
// createRepo();

