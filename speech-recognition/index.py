# ループすると、backendに出力されないのでコメント
# ただし、今後の実装で使用するかもしれないので残しておく
# import speech_recognition as sr

# # レコグナイザーの初期化
# r = sr.Recognizer()

# # マイクからの入力をリアルタイムで認識
# with sr.Microphone() as source:
#     print("音声を認識中です...")
#     while True:
#         # マイクの入力を取得
#         audio = r.listen(source)

#         try:
#             # Googleの音声認識APIを使用して音声をテキストに変換
#             text = r.recognize_google(audio, language='ja-JP')
#             print("認識されたテキスト: " + text)
#         except sr.UnknownValueError:
#             # 認識できなかった場合
#             print("音声を認識できませんでした。")
#         except sr.RequestError as e:
#             # APIのリクエストに問題があった場合
#             print(f"Google Speech Recognitionサービスからの応答にエラーが発生しました; {e}")

import speech_recognition as sr
import sys

# レコグナイザーの初期化
r = sr.Recognizer()

# マイクからの入力をリアルタイムで認識
with sr.Microphone() as source:
    print("音声を認識中です...")
    
    # マイクの入力を一定時間取得（例: 5秒）
    audio = r.listen(source, timeout=5)

    try:
        # Googleの音声認識APIを使用して音声をテキストに変換
        text = r.recognize_google(audio, language='ja-JP')
        print("認識されたテキスト: " + text)
        # 結果を標準出力に出力
        print(text, file=sys.stdout)
    except sr.UnknownValueError:
        # 認識できなかった場合
        print("音声を認識できませんでした。")
    except sr.RequestError as e:
        # APIのリクエストに問題があった場合
        print(f"Google Speech Recognitionサービスからの応答にエラーが発生しました; {e}")
