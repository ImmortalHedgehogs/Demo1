// const  Octokit  = require("octokit");
import { Octokit } from 'octokit';
const octokit = new Octokit({
    auth: process.argv[3],
});


async function createRepo(){
    let userlogin = process.argv[2];
    
    //make repo
    try{
        
        var data = await octokit.graphql({
            query: `query{
                organization(login: "ImmortalHedgehogs"){
                    id
                }
            }`
        });
   
       let res = await octokit.graphql({
            query: `mutation{
                createRepository(input:{ownerId: "${data.organization.id}" ,name: "${userlogin}", visibility: PRIVATE}){
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

    //inv collabs
    try{
        await octokit.request('PUT /repos/{owner}/{repo}/collaborators/{username}', {
            owner: '${data.organization.id}',
            repo: 'ImmortalHedgehogs',
            user: '${userlogin}',
            permission: 'admin'
        })
    }catch(e){
        console.log(e);
    }

}


createRepo();

