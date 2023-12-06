import helper from "./helper";
import QueryStream from "../src";
import pg from "pg";


describe("Pool Query-Stream",  function() {
    
    it('releases pool connection after end of query stream', async function() {
        const pool = new pg.Pool();
        // const client  = await pool.connect();
        const query = new QueryStream('SELECT NOW()');
        const stream = pool.query(query);
        
        query.on('end',async(res)=>{
            console.log('query stream ended');
        });
        
        // bellow code raising error as stream .on is not a function
        console.log(await stream); // this never gets resolved;
        stream.on('end',async (res)=>{
            console.log(res);
            await pool.end();
            console.log('stream ended');
            await Promise.resolve();
        })
                
    })
    
})
