`use strict`
require('child_process').execSync('cls',{stdio:'inherit'})//console.clear(), but it always works!
console.log('Executed at: ',Date(),'\n')

const StartTime=performance.now()
,fs=require('fs')
,CountOccurrences=(s,SA)=>{// Returns the # occurrences of a string '' s in a String '' or Array [] SA
    if(typeof s!=='string')return'Please enter s as a string!'
    if(!Array.isArray(SA)&&typeof SA!=='string')return"Please enter SA as either a String '' or Array []!"

    const L=s.length;if(L===0)return SA.length-1
    let i=SA.indexOf(s),c=0

    while(i!==-1){++c;i=SA.indexOf(s,i+L)} // ,i+L to increase efficiency by decreasing # checks
    return c
}/* e.g. CountOccurrences('s','Princesses') ➜ 3 , CountOccurrences('es','Princesses') ➜ 2

    This function has the same functionality as SA.split(s).length-1,
    but it's faster and predicts the result in the terimnal
*/
,MaxOccurance=(c,A)=>{// largest number of occurances of a character c in any string in array A
    let L=A.length,m=CountOccurrences(c,A[--L])
    while(--L>=0){
        const n=CountOccurrences(c,A[L])
        n>m&&(m=n)
    }
    return m
}// e.g. MaxOccurance('/',['Folder','Folder/inside folder','Folder/inside folder/another nested folder']) ➜ 2
,ListSubFolders=Path=>{
    let ToTest=fs.readdirSync(Path).filter(Item=>fs.lstatSync(Item).isDirectory())
    ,i=ToTest.length,L=i;const SubFolders=[]
    while(--i>=0){
        const Folder=ToTest.at(-1);SubFolders.push(ToTest.pop())//DFS
        /*
            Depth First Search (DFS) is the default method because it uses .at(-1) & .pop() which are faster and more efficient because they check and remove items from the end and don't need to measure the length of an array and reindex each item when one is removed, unlike Breadth First Search (BFS) which uses [0] & .shift().
            Should you still wish to switch between the methods, I made it easy for you: just uncomment the line below and comment the line above
        */
        // const Folder=ToTest[0];SubFolders.push(ToTest.shift())//BFS

        let Contents=fs.readdirSync(Folder).filter(Item=>fs.lstatSync(`${Folder}/${Item}`).isDirectory())
        const j=Contents.length;i+=j;L+=j
        for(let k=-1;++k<j;)
            ToTest.push(`${Folder}/${Contents[k]}`)// Contents[k] = SubFolder
    }
    console.log(L,'folders across',1+MaxOccurance('/',SubFolders),"layers inside the '"+process.cwd()+"' folder:\n",SubFolders,'\n\n'+'Run time:',Number(((performance.now()-StartTime)/1000).toFixed(3)),'s\n')
}
ListSubFolders(process.cwd())