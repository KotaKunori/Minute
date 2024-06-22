# 概要
プレゼン発表と発表に対する質疑応答の議事録を取るためのシステムです．
議論中の発言の内容とその発言者を記録することを目的としています．

# 使い方
## 事前準備
1. `index.html`のリンクを踏むと画面が表示
<img width="800" alt="スクリーンショット 2024-06-22 23 56 05" src="https://github.com/KotaKunori/MinuteApp/assets/99805829/412464d0-b7bd-4752-a586-4de54aa07d2f">

2. タイトルを入力
3. 「議事録の編集」エリアの「発表者を追加」欄に発表者の名前を入力すると，画面中央に議事録が表示
<img width="800" alt="スクリーンショット 2024-06-23 0 05 45" src="https://github.com/KotaKunori/MinuteApp/assets/99805829/392822db-9905-4157-9b41-89eb83ddb1bd">

4. 「聴衆の編集」エリアの「聴衆を選択」テーブルで参加する聴衆の名前を選択すると，画面左下に聴衆が表示(「聴衆を選択」テーブルの聴衆名は`members.csv`に記述)
<img width="800" alt="スクリーンショット 2024-06-23 0 12 38" src="https://github.com/KotaKunori/MinuteApp/assets/99805829/7b486e50-115d-46a5-b035-a7ead9e9cde8">

## 議事録の取り方
1. ある話題が始まったとき<br>→現在の発表者を選択し，吹き出し内の「話題の追加」ボックスにチェックを入れ，テキストボックスに話題を入力
<img width="800" alt="スクリーンショット 2024-06-23 0 15 22" src="https://github.com/KotaKunori/MinuteApp/assets/99805829/23270513-4efc-41f6-b990-73c58bfa343f">

<img width="800" alt="スクリーンショット 2024-06-23 0 16 00" src="https://github.com/KotaKunori/MinuteApp/assets/99805829/a4c2c987-cc34-40ce-abf7-073408257411">

2. ある話題の中で誰かが発言したとき→<br>→画面中央の議事録から現在の話題を選択し，画面左下から発言者を選択したのち，吹き出し内のテキストボックスに発言を入力
<img width="800" alt="スクリーンショット 2024-06-23 0 21 51" src="https://github.com/KotaKunori/MinuteApp/assets/99805829/bf0fe8df-57ae-4b03-a671-2c9450fdf833">

<img width="800" alt="スクリーンショット 2024-06-23 0 22 18" src="https://github.com/KotaKunori/MinuteApp/assets/99805829/c81f45b9-95d0-44a1-a01a-a1f8468da05c">

3. 誰かの発言に対して，他の人が発言したとき<br>→吹き出し内の「矢印の追加」を選択し，2と同様の方法で発言を入力
<img width="800" alt="スクリーンショット 2024-06-23 0 25 04" src="https://github.com/KotaKunori/MinuteApp/assets/99805829/15104eb0-3f36-4274-96c7-241df3e20505">

* 補足：議事録の内容を編集したい場合は，「議事録の編集」エリアの「議事録の編集を有効化」ボックスにチェックを入れることで画面中央の議事録を直接編集可能
## 発表終了後
* 「ファイル」欄の「txt形式で書き出し」ボタンを押すことで議事録を書き出し可能(議事録はWord Pressで管理することを想定していたのでHTMLのタグが付加されて出力)
