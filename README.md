# links

よく使うWebサイトへのリンク集。GitHub Pagesで公開。

## リンクの追加

`links.json` に項目を追加する。

```json
{
  "name": "サイト名",
  "url": "https://example.com/",
  "description": "一言説明（任意）",
  "tags": ["タグ1", "タグ2"],
  "thumbnail": "thumbnails/example.svg"
}
```

サムネイルは `thumbnails/` に置く（16:9、SVG推奨）。

## ローカルで確認

`links.json` を `fetch` で読むため、ファイルを直接開くのではなくローカルサーバー経由で確認する。

```sh
python3 -m http.server 8000
```
