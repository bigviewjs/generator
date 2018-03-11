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
$ paas-init someproject
```

启动

```
$ paas start
```
构建  ykit打包压缩上传cdn

```
$ paas build
```

## TODO

- [x] paas-init
- [ ] paas start
- [ ] paas build
