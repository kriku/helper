# helper
дополнение к браузеру firefox

плагин билдится с помощью jpm,
[инструкция](https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/jpm#Installation)

но принцип работы прост:

1. выделить часть вопроса (любое место, просто для ориентирования скрипта)
2. нажать хоткей `shift + A` 
3. вопрос с вариантами ответа высылается на сервер, ожидается ответ
4. если ответ на вопрос есть, фокус перейдет на input с текстом ответа
5. если ответа нет (или пустой), вопрос добавиться в базу на бэкенде
6. вернуться к пункту 1.

*смена фокуса на checkbox (radio) может быть неразличима, но выделение текста пропадёт, а по нажатию на пробел ответ выбереться правильным* 

на бэкенде должны обрабатываться запросы по добавлению вопроса или ответа на него, [например](https://github.com/iplus/quiz-helper)

скрипт хранится во внешнем файле `data/helper.js`

адрес сервера бэкенда нужно поменять в файле скрипта
```javascript
var url = "http(s)://your.backend.to";
````


для билда плагина использовать `jpm xpi -o`
затем в дополнениях (справа вверху, около поиска) выбрать установить дополнение из файла 

также в настройках браузера `about:config` поменять `security.mixed_content.block_active_content` на **false**
