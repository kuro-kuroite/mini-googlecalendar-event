# mini-googlecalendar-event

google calendar の予定を操作するためのミニライブラリ

## インストール方法

```bash
$ yarn add https://github.com/kuro-kuroite/mini-googlecalendar-event.git
```

## 最低動作例

- 本サンプルで使用するGoogle Calendarのイベントを取得する．(def= GoogleCalendarEvent[])
  - 今回は，以下のものを使用する．これは，Google Calendar APIから取得した予定のJSON データをjs形式に変換したものである．

```js
const events = [
  {
    kind: 'calendar#event',
    etag: '"3063785192938000"',
    id: 'btveawnrsumn',
    status: 'confirmed',
    htmlLink: 'https://www.google.com/calendar/event?eid=eifhiofelf',
    created: '2018-07-18T05:43:16.000Z',
    updated: '2018-07-18T05:43:16.469Z',
    summary: 'test3',
    creator: { email: 'sample.address@gmail.com', self: true },
    organizer: { email: 'sample.address@gmail.com', self: true },
    start: { dateTime: '2018-07-17T01:00:00+09:00' },
    end: { dateTime: '2018-07-17T09:00:00+09:00' },
    iCalUID: 'btveawnrsumn@google.com',
    sequence: 0,
    extendedProperties: { private: [Object] },
    reminders: { useDefault: true },
  },
  {
    kind: 'calendar#event',
    etag: '"3063785167498000"',
    id: 'werthfsgadsfa',
    status: 'confirmed',
    htmlLink: 'https://www.google.com/calendar/event?eid=eifhiofelf',
    created: '2018-07-18T05:43:03.000Z',
    updated: '2018-07-18T05:43:03.749Z',
    summary: 'test1',
    creator: { email: 'sample.address@gmail.com', self: true },
    organizer: { email: 'sample.address@gmail.com', self: true },
    start: { dateTime: '2018-07-18T13:00:00+09:00' },
    end: { dateTime: '2018-07-18T14:00:00+09:00' },
    iCalUID: 'werthfsgadsfa@google.com',
    sequence: 0,
    extendedProperties: { private: [Object] },
    reminders: { useDefault: true },
  },
  {
    kind: 'calendar#event',
    etag: '"3063785179276000"',
    id: 'fewavdsavabt,yu',
    status: 'confirmed',
    htmlLink: 'https://www.google.com/calendar/event?eid=eifhiofelf',
    created: '2018-07-18T05:43:09.000Z',
    updated: '2018-07-18T05:43:09.638Z',
    summary: 'test2',
    creator: { email: 'sample.address@gmail.com', self: true },
    organizer: { email: 'sample.address@gmail.com', self: true },
    start: { dateTime: '2018-07-18T23:00:00+09:00' },
    end: { dateTime: '2018-07-18T16:00:00+09:00' },
    iCalUID: 'fewavdsavabt@google.com',
    sequence: 0,
    extendedProperties: { private: [Object] },
    reminders: { useDefault: true },
  },
];
```

- 以下(index.js)を `node --require @babel/register index.js`で実行
  - events の部分は書き換える必要がある

```js
import '@babel/polyfill';
import { CalendarEventList } from '@kuro-kuroite/mini-googlecalendar-event';

const REGION = 'JP';
// TODO: 上述のものまたは，自分で取得したGoogle Calendar の予定をeventsに定義．
const events = [];

(async () => {
  try {
    const eventList = new CalendarEventList(events, { region: REGION });
    
    // 予定の名前・場所・時間から文字列を生成し，結合する
    const eventsContent = eventList.concatEvents(
      events,
      (name, place, startTimesOfDay) => {
        const startTimeOfDayPhrase = startTimesOfDay
          ? `${startTimesOfDay}から，`
          : '';
        const placePhrase = place !== '' ? `${place}で` : '';
    
        return `${startTimeOfDayPhrase}${placePhrase}${name}\n`;
      },
    );
    
    // eslint-disable-next-line no-console
    console.log(eventsContent);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
})();
```

## 公開APIの詳細

基本的には，`CalendarEventList`クラスを知っていればよい．

### new CalendarEventList(events: GoogleCalendarEvent[], { region: string = 'US' }): CalendarEventList

このクラスは，Google Calendar API から取得した情報について，様々な操作や整形をするクラス．
コンストラクタでは，Google Calendar APIで取得した予定の配列と，地域の情報を引数にとる．

#### .events: Array of GoogleCalendarEvent Object (=== GoogleCalendarEvent[])

Google Calendar APIから取得した予定のオブジェクトの配列であるインスタンス変数．

今後紹介する多くのメソッドは，このevents(今後は，GoogleCalendarEvent[])を引数として利用するため，本インスタンス変数を紹介した．

#### .concatEvents(events: GoogleCalendarEvent[] = this.events, createEventStringCallback: (name: string, place: string, startTimesOfDay: TimeString)): String

GoogleCalendarEventの名前・場所・時間の情報から文字列を作成する操作を，全てのGoogleCalendarEvent[]に適用したメソッド．
比喩としては，`const f = (name, place, time) => name.concat('を', place, 'で,\n'); concatEvents([{ name: '会議', place: '309室' }, { name: '昼食', place: '410室' }], f)` ならば，`会議を309室で,\n昼食を410室で,\n` になる．

MDNの[Array.prototype.reduceRight()
](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight) の畳み込み処理を応用．

### .filterEventList(events: GoogleCalendarEvent[] = this.events, filterConditionCallback: (event: GoogleCalendarEvent) => Boolean): GoogleCalendarEvent[]

eventsについて，filterConditionCallbackの条件に一致するものに制限をするメソッド．

MDNの[Array.prototype.filter()
](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)に準じる．

#### .dropEventList(events: GoogleCalendarEvent[] = this.events, filterConditionCallback: (event: GoogleCalendarEvent) => Boolean): GoogleCalendarEvent[]

eventsについて，filterConditionCallbackの条件で一致するものを除外するメソッド．

MDNの[Array.prototype.filter()
](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)に準じる．

## 本ライブラリの開発者向け

### 開発

このライブラリは，src/js/index.js(理由: `yarn deploy`)がメインプログラムの記述箇所である．
ライブラリとして公開されている関数，クラスはこのファイルの`export`のみである．
もちろん，ダーティーハックで非公開部分の変更は可能である．

基本的なディレクトリ構成は，[Atomic Design](https://design.dena.com/design/atomic-design-%E3%82%92%E5%88%86%E3%81%8B%E3%81%A3%E3%81%9F%E3%81%A4%E3%82%82%E3%82%8A%E3%81%AB%E3%81%AA%E3%82%8B/) を採用した．
すなわち，原子(atom) -> 分子(molecule) -> 有機体(organism) の多重階層となっている．
これは，Promise化といった単純な関数をatomsに，公開する関数やクラスを organisms に，このorganismsが使用する子関数，子クラスをmolecules に分類するためだ．

この階層の中身は，`ライブラリ・種類名/機能名 or index.js` とした．
特別な意味はないが，ファイルよりはディレクトリとして小分類したかったためである．
内部実装が気になる場合は，この部分のjsファイルを参照するとよい．

もし，本ライブラリを変更した場合は，`yarn deploy`をすると，`dist/` ディレクトリに [Babel](https://babeljs.io/) される．
簡単な実行であれば，`yarn babel-node path/to/file.js` するとよい．
念のために，`sandbox/`は自由に使える場所としており，`yarn deploy:sandbox && node tmp/file.js` でテストも可能だ．

### 整形

もし，jsファイルを整形したい場合は，`yarn .lint` または，`yarn .prettier:all` を試してほしい．
この部分は特にこだわって，作成した．
`scripts/` 以下が，npm-scripts 用のコマンドの実装となっている．

もし，この部分の.babel.jsファイルを変更した場合，`yarn .babel:all`をすると，.js も変更される．

## 最後に

本ライブラリは，出来るだけ美しい開発が出来るように，ディレクトリの階層と整形処理に時間をかけた．
プロジェクトルートにある他のドットファイルについて説明しきれなかったが，もし気になる場合は調べたうえで是非とも試してみてほしい．

補足であるが，JavaScript(Node.js) を使用する場合は，絶対にBabelとPromise(async, await or callback)の理解が必須である．
Babelで最新の書き方を覚え，Node.jsの非同期処理に慣れた後に，自分なりに新しいライブラリを作成してほしい．
ただ，最近はTypeScript が主流みたいなので，挑戦したい方はそちらがいいかもしれない．JS の上位互換でBabelは勝手にやってくれるみたいだし．

その際に，本ライブラリのディレクトリの階層と設定ファイルを参考にしてくれると幸いである．

あぁ，あと強者はWebpackをやるのがよい時間つぶしになるだろう．かといって，Parcelが良いというわけでもない．
私は「Webpack疲れ」をしたのでお勧めはしないが...．あれは，大量の素晴らしいエラーを吐いてくれたので最高？のツールだから．

### License

- [MIT](https://github.com/kuro-kuroite/LICENSE/blob/master/LICENSE.md)
