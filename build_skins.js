const fs = require('fs');
const path = require('path');

// 設定: ディレクトリの場所
// wwwフォルダの中のskinsを見に行きます
const skinsDir = path.join(__dirname, 'www', 'skins');
// wwwフォルダの中にskins.jsonを書き出します
const outputFile = path.join(__dirname, 'www', 'skins.json');

console.log(`スキャン中: ${skinsDir}`);

try {
    // フォルダが存在するか確認
    if (!fs.existsSync(skinsDir)) {
        console.error('エラー: skinsフォルダが見つかりません。');
        process.exit(1);
    }

    // ファイル一覧を取得
    const files = fs.readdirSync(skinsDir);
    
    // .pngのみをフィルタリングし、拡張子を削除 (.png)
    const skinNames = files
        .filter(file => path.extname(file).toLowerCase() === '.png')
        .map(file => path.basename(file, '.png')); // 拡張子を削除

    // データを作成
    // PHP版では data.names が「文字列」でしたが、
    // ここでは最初から扱いやすい「配列」として保存します。
    const data = { names: skinNames };

    // JSONファイルとして書き出し
    fs.writeFileSync(outputFile, JSON.stringify(data));
    
    console.log(`成功: ${outputFile} を生成しました。`);
    console.log(`検出数: ${skinNames.length} 個`);

} catch (err) {
    console.error('ビルド中にエラーが発生しました:', err);
    process.exit(1);
}