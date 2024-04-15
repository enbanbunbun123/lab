# ローカルの環境から画像フォルダを読み込み、音声認識によって画像を分類するアプリ

## 技術構成
<img width="1148" alt="スクリーンショット 2024-04-15 18 03 33" src="https://github.com/enbanbunbun123/lab/assets/130529456/ae3c5059-d14e-4be6-8b16-7887bbe310bd">

## ローカル環境立ち上げ
・backendでローカルの環境から画像を取得してくるので、backend->frontendでrunする

・動作環境によってファイルのパスを変更する必要あり

### backend
・backendでは、expressを使用して、ローカルのファイルを取得してくる

``` cd backend ```

``` node server.js ```

### frontend
``` cd frontend ```

``` npm start ```

### speech-recognition
・speech recognitionライブラリを使用して、音声を認識する

```cd speech-recognition ```

``` python index.py ```


### 環境変更による修正
・backend/server.jsの/move-imageエンドポイントのフォルダパスを変更する
