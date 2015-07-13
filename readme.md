Scratch P2P
====

![scratch2](https://github.com/yokmama/scratchp2p/blob/develop/scratch_sample/editimage.jpg)

##概要

これはScratchでP2P通信によって二人で対戦をするゲームです。

実行するには、Scratch 2 Offlineでないといけません。

また実行環境として、Node.jsが動作するPCが必要です。

ホスト側とクライアント側の両方でNode.jsのサーバーをたてなければなりません。

Node.jsのサーバーアプリは本プロジェクトです。

###サーバーの実行
`$ npm start`

次に下記のURLへアクセスしてください

http://localhost:12345/

![server](https://github.com/yokmama/scratchp2p/blob/develop/scratch_sample/server.jpg)
ServerかClientかを選択するページが表示されます。

これをホスト側のPC、クライアント側のPCでそれぞれ実行してください。

上記画面で、ホスト側はServerを選択してください。

クライアント側はClientを選択し、ホストのIPアドレスあるいはホスト名を入力してください。

###クライアント実行
次に、クライアントアプリですが、本プロジェクトの動作確認のため、ホッケーゲームを準備しました。

http://localhost:12345/scratch_sampleの下に

hockey.sb2というファイルがあります。これがScratch2のファイルです。

これをダウンロードしScratch2Editorで開いてください、

お互いに実行し、ホスト側でStartをするとゲームが開始です。

###操作説明
カーソルキー　移動
Cボタン　色を変更

###勝利判定
ボールを５回相手のゴール（ホスト側は左、クライアント側は右）
にいれると勝利です。

シフトキーで　Say　Hello

Cボタンで　色を変更

矢印キーで移動

正常につながっていればお互いの画面に相手のキャラが動き出します。


###追記
hockey.s2eは本ゲームの通信のプロトコルの定義書です。

counter, connection, hostは本サーバー内部で設定しているデータなので固定ですが、
それ以外はゲーム側で定義されたものです。

[hockey.s2e]

    { "extensionName": "p2p",
    "extensionPort": 12345,
    "blockSpecs": [
    ["r", "update counter", "counter"],
    ["b", "Connection", "connection", false],
    ["b", "Host", "host", false],
    ["r", "cat x", "catX"],
    ["r", "cat y", "catY"],
    ["r", "ball x", "ballX"],
    ["r", "ball y", "ballY"],
    ["r", "score 1", "score1"],
    ["r", "score 2", "score2"],
    ["r", "cat color", "color"],
    ["b", "Start", "start", false],
    [" ", "set cat X position to %n", "setCatX", 0],
    [" ", "set cat Y position to %n", "setCatY", 0],
    [" ", "set ball X position to %n", "setBallX", 0],
    [" ", "set ball Y position to %n", "setBallY", 0],
    [" ", "set score 1 to %n", "setScore1", 0],
    [" ", "set score 2 to %n", "setScore2", 0],
    [" ", "set cat color to %n", "setColor", 0],
    [" ", "start", "setStart"],
     ]
    }