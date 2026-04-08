<!--
 * @Author: zhengbooleen zhengbooleen@gmail.com
 * @Date: 2026-04-08 21:53:44
 * @LastEditors: zhengbooleen zhengbooleen@gmail.com
 * @LastEditTime: 2026-04-08 21:55:25
 * @FilePath: \20260410-vant\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# 20260410

 Vue 2.7 + Vite 移动端 H5，配套一个 Node.js mock 服务。

## 目录结构

```
.
├── front/         # 前端工程（Vue 2.7 + Vite + TS）
└── node-server/   # Node.js mock 服务，提供本地接口
```

## 子项目

- [front](./front/README.md) — 前端工程
- [node-server](./node-server/README.md) — 本地 mock 服务

## 快速开始

```bash
# 1. 启动 mock 服务（默认 3000 端口）
cd node-server
npm start

# 2. 启动前端（默认 8080 端口）
cd front
pnpm install
pnpm dev
```

前端通过 vite 代理 `/api` 到 `http://127.0.0.1:3000`，由 `node-server` 返回 `data.json` 中的数据。
