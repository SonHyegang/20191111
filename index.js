const axios = require('axios');
const http = require('http');
const url = require('url');
const query = require('querystring');
const host = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    
    async function getUser() {
        const path = url.parse(req.url).pathname;
        var iquery = query.parse(url.parse(req.url).query);
        var repo = iquery.repo;
        if(!repo){
            repo = 'nodejs.node';
        }
        try {
            if(path != "/"){
                throw new Error("Not Found");
            }
            if(!repo){
                throw new Error("Not correct Query");
            }
            else{
                const response = await axios.get(`https://api.github.com/repos/${repo}`);
                console.dir(`Repo: ${repo}- stargazers_count: ${response.data.stargazers_count}, open_issues_count: ${response.data.open_issues_count}`);
                //console.dir("Repo: " + repo +" - stargazers_count: " + response.data.stargazers_count + ", open_issues_count: " + response.data.open_issues_count);
            }
        }
        catch (err) {
            res.statusCode = 404;
            res.end(err+" ");
        }
    }
    getUser();
});
server.listen(port, host, () => {console.log(`Server ruunning : https://${host}:${port}/`)});