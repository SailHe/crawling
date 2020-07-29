# crawling
爬虫项目


# link-validator
校验爬虫: 适用于对大量网站的可用性确认
## 用于检验指定文件中的URL的有效性
- [x] 源文本文件输出为Markdown格式
- [x] 命令行
- [x] 指定http代理
- [x] 无效文件使用`invalid`前缀标识
- [ ] 输出文件查重
- [ ] 自动化测试用例

## 用法
```shell
node ./cli.js -i "源文件路径 一行视为一个链接" -o "输出文件路径 输出格式为markdown格式 无效的链接会直接在标题示意" -t "title 表示markdown文件的标题"
node ./cli.js -i "./res/test/test.txt" -o "./res/test/test.md" -t "【搜索引擎】"
```
