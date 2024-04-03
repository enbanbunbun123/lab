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
