const program = require('commander');
const pkg = require('./package.json');
const utility = require('./src/utility');

const {fetch_url_list} = require('./index');
const fs = require('fs');


program.version(pkg.version);

program
 .description('A cli wrapper for crawling')
 .option('-d, --debug <number>', '输出调试信息', 0)
 .option('-v, --version', '输出版本信息')
 .requiredOption('-i, --inpath <string>', 'URL输入文件路径')
 .option('-o, --outpath <string>', 'URL输出文件路径')
 .option('-t, --title <string>', 'URL输出文件标题', "")
 .option('-p, --proxy <string>', '请求URL的代理', null)
 ;

program.parse(process.argv);

// 命令行

if (program.debug){
    utility.debugLevel = program.debug;
    console.log(utility.debugLevel)
    console.log(program.opts());
}

if (program.version) console.log(program.version);

if (!program.outpath){
    program.outpath = program.inpath + ".out";
}

utility.debugLogLV(program.inpath, 2);
utility.debugLogLV(program.outpath, 2);
utility.debugLogLV(program.title, 2);

fs.readFile(program.inpath, 'utf8', (err, data) => {
    if (err) throw err;
    const filePath = program.outpath;
    let title = program.title;

    fs.writeFileSync(filePath, title);
    //(node:3900) [DEP0013] DeprecationWarning: Calling an asynchronous function without callback is deprecated.
    //fs.appendFile(filePath, "\n");
    fs.appendFileSync(filePath, "\n");
    fetch_url_list(data.split("\n"), program.proxy, (values) => {
        values.forEach(ele => {
            utility.debugLogLV(`title: ${ele.title} url: ${ele.url}`, 3);
            fs.appendFileSync(filePath, "["+ele.title+"]");
            fs.appendFileSync(filePath, "("+ele.url+")\n");
            //fs.appendFileSync(filePath, ele.url[ele.url.length-1].charCodeAt());
          });
        console.log(title + "校验文件生成完毕: " + program.outpath);
    });
});
