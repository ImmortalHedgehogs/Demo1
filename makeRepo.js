import { Octokit } from 'octokit';

const octokit = new Octokit({
    auth: process.argv[3]
});

const org = 'ImmortalHedgehogs';
const userlogin = process.argv[2];

async function createRepo(){
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
            owner: 'ImmortalHedgehogs',
            repo: userlogin,
            username: userlogin,
            permission: 'admin'
        })
    }catch(e){
        console.log(e);
    }

    try{
        await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: org,
            repo: userlogin,
            path: 'README.md',
            message: 'initial commit',
            committer: {
              name: 'ImmortalHedgehogs',
              email: 'mikayla.billings-alston@liatrio.com'
            },
            content: 'UmVwbyBjcmVhdGVkIHVzaW5nIEdpdGh1YiBBUEkKCldlbGNvbWUgdG8geW91ciBuZXcgcmVwbyEg',
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: org,
            repo: userlogin,
            path: '.github/workflows/blank.yml',
            message: 'initial commit',
            committer: {
              name: 'ImmortalHedgehogs',
              email: 'mikayla.billings-alston@liatrio.com'
            },
            content: 'IyBUaGlzIGlzIGEgYmFzaWMgd29ya2Zsb3cgdG8gaGVscCB5b3UgZ2V0IHN0YXJ0ZWQgd2l0aCBBY3Rpb25zCgpuYW1lOiBDSQoKIyBDb250cm9scyB3aGVuIHRoZSB3b3JrZmxvdyB3aWxsIHJ1bgpvbjoKICAjIFRyaWdnZXJzIHRoZSB3b3JrZmxvdyBvbiBwdXNoIG9yIHB1bGwgcmVxdWVzdCBldmVudHMgYnV0IG9ubHkgZm9yIHRoZSAibWFpbiIgYnJhbmNoCiAgcHVzaDoKICAgIGJyYW5jaGVzOiBbICJtYWluIiBdCiAgcHVsbF9yZXF1ZXN0OgogICAgYnJhbmNoZXM6IFsgIm1haW4iIF0KCiAgIyBBbGxvd3MgeW91IHRvIHJ1biB0aGlzIHdvcmtmbG93IG1hbnVhbGx5IGZyb20gdGhlIEFjdGlvbnMgdGFiCiAgd29ya2Zsb3dfZGlzcGF0Y2g6CgojIEEgd29ya2Zsb3cgcnVuIGlzIG1hZGUgdXAgb2Ygb25lIG9yIG1vcmUgam9icyB0aGF0IGNhbiBydW4gc2VxdWVudGlhbGx5IG9yIGluIHBhcmFsbGVsCmpvYnM6CiAgIyBUaGlzIHdvcmtmbG93IGNvbnRhaW5zIGEgc2luZ2xlIGpvYiBjYWxsZWQgImJ1aWxkIgogIGJ1aWxkOgogICAgIyBUaGUgdHlwZSBvZiBydW5uZXIgdGhhdCB0aGUgam9iIHdpbGwgcnVuIG9uCiAgICBydW5zLW9uOiB1YnVudHUtbGF0ZXN0CgogICAgIyBTdGVwcyByZXByZXNlbnQgYSBzZXF1ZW5jZSBvZiB0YXNrcyB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgYXMgcGFydCBvZiB0aGUgam9iCiAgICBzdGVwczoKICAgICAgIyBDaGVja3Mtb3V0IHlvdXIgcmVwb3NpdG9yeSB1bmRlciAkR0lUSFVCX1dPUktTUEFDRSwgc28geW91ciBqb2IgY2FuIGFjY2VzcyBpdAogICAgICAtIHVzZXM6IGFjdGlvbnMvY2hlY2tvdXRAdjMKCiAgICAgICMgUnVucyBhIHNpbmdsZSBjb21tYW5kIHVzaW5nIHRoZSBydW5uZXJzIHNoZWxsCiAgICAgIC0gbmFtZTogUnVuIGEgb25lLWxpbmUgc2NyaXB0CiAgICAgICAgcnVuOiBlY2hvIEhlbGxvLCB3b3JsZCEKCiAgICAgICMgUnVucyBhIHNldCBvZiBjb21tYW5kcyB1c2luZyB0aGUgcnVubmVycyBzaGVsbAogICAgICAtIG5hbWU6IFJ1biBhIG11bHRpLWxpbmUgc2NyaXB0CiAgICAgICAgcnVuOiB8CiAgICAgICAgICBlY2hvIEFkZCBvdGhlciBhY3Rpb25zIHRvIGJ1aWxkLAogICAgICAgICAgZWNobyB0ZXN0LCBhbmQgZGVwbG95IHlvdXIgcHJvamVjdC4=',
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
        });
    }catch(e){
        console.log(e);
    }
}

createRepo();
