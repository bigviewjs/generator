# generator

## 技术栈

- egg（node web框架，基于koa）
- bigview（node bigpipe实现）
- ykit（前端构建，基于webpack）

## 目录规划

- app（egg）
- bpm（bigview模块）
- public（ykit处理的）

## 用法

安装

```
$ npm i -g paas-init
```

初始化

```
$ paas init [someproject]
```

启动

```
$ paas start

选项：
  --ykitENV    ykit env                                                [字符串]
  --eggPort    egg port                                                  [数字]
  --baseDir    target directory                                         [字符串]
  --publicDir  ykit public directory                                    [字符串]
  --workers    egg workers count                                          [数字]
  --version    显示版本号                                                 [字符串]
  -h, --help   显示帮助信息                                                [字符串]
```
构建  ykit打包压缩上传cdn

```
$ paas build
```

## TODO

- [x] paas-init
- [ ] paas start
- [ ] paas build
