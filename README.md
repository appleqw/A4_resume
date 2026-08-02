# A4 简历网站

这是一个不依赖框架的单页简历模板，可直接在浏览器中编辑并导出 A4 PDF。

## 使用方法

1. 打开 `index.html`，点击页面顶部的“编辑内容”。
2. 直接修改姓名、联系方式、项目、教育经历等文字，内容会自动保存在当前浏览器。
3. 点击“导出 PDF”，在浏览器打印窗口中选择“另存为 PDF”。
4. 推荐设置：纸张 A4、边距“无”、缩放 100%、开启“背景图形”、关闭页眉和页脚。

如果需要永久修改模板，请直接编辑 `index.html`；颜色、字号和间距位于 `styles.css`。

## 本地预览

可以直接双击 `index.html`，也可以在当前目录运行：

```bash
python -m http.server 8000
```

然后访问 `http://localhost:8000`。

## GitHub Pages

仓库包含 Pages 自动发布工作流。首次使用时，在仓库的 **Settings → Pages → Build and deployment** 中将 Source 设为 **GitHub Actions**。之后每次更新 `main` 分支都会自动发布。
