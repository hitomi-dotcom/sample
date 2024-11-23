$(function () {
  /*=================================================
  ハンバーガ―メニュー
  ===================================================*/
  // ハンバーガーメニューをクリックした時
  $(".hamburger").on("click", function () {
    // toggleClassを使用することで、hamburgerクラスにactiveクラスが存在する場合は削除、
    // 存在しない場合を追加する処理を自動で行ってくれる
    $("header").toggleClass("open");
  });
  // メニューのリンクをクリックした時
  $("#navi a").on("click", function () {
    $("header").toggleClass("open");
  });

  /*=================================================
  スクロール時の画像フェード表示
  ===================================================*/
  // スクロール時のイベント
  $(window).scroll(function () {
    // 画面がスクロールされた時に実行する

    $(".fadein").each(function () {
      // fadeinクラスに対して順に処理を行う
      // .each()：個別に処理を行うためのメソッド。繰り返し処理を行いながら各要素に対して操作を実行することができる。

      // スクロールした距離
      let scroll = $(window).scrollTop();
      // 現在のスクロール位置を取得する。
      // scrollTop()：要素のスクロール位置を取得

      // fadeinクラスの要素までの距離
      let target = $(this).offset().top;

      // 画面の高さ
      let windowHeight = $(window).height();

      // fadeinクラスの要素が画面内にきたタイミングで要素を表示
      if (scroll > target - windowHeight + 150) {
        // 条件が満たされた場合、要素の不透明度（opacity）を1に設定し、Y軸方向に移動（translateY）させます。
        $(this).css("opacity", "1");
        $(this).css("transform", "translateY(0)");
      }
    });
  });

  /*=================================================
  トップに戻る
  ===================================================*/
  let pagetop = $(".to-top");
  // 最初に画面が表示された時は、トップに戻るボタンを非表示に設定
  pagetop.hide();

  // スクロールイベント（スクロールされた際に実行）
  $(window).scroll(function () {
    // スクロール位置が700pxを超えた場合
    if ($(this).scrollTop() > 900) {
      // トップに戻るボタンを表示する
      pagetop.fadeIn();

      // スクロール位置が700px未満の場合
    } else {
      // トップに戻るボタンを非表示にする
      pagetop.fadeOut();
    }
  });

  // クリックイベント（ボタンがクリックされた際に実行）
  pagetop.click(function () {
    // 0.5秒かけてページトップへ移動
    $("body,html").animate({ scrollTop: 0 }, 500);

    // イベントが親要素へ伝播しないための記述
    // ※詳しく知りたい方は「イベント　バブリング」または「jQuery バブリング」で調べてみてください
    return false;
  });

/*=================================================
  スムーススクロール
  ===================================================*/
  // ページ内リンクのイベント
  // $('a[href^="#"]').click(function () {
  //   // aタグのhref属性の値が#で始まる要素をクリックした時に実行する
  //   // 'a[href^=#]'：「aタグのhref属性で値が#で始まる要素だったとき」

  //   // リンクを取得 クリックされたaタグのhref属性の中身をhrefという変数に代入する （#menuなど）をhrefという変数に代入する
  //   let href = $(this).attr("href");
  //   // this: クリックされたaタグ $('a[href^=#]')
  //   // .attr()は、要素の属性の値を取得する

  //   // ジャンプ先のid名をセット href == "#" 】 変数hrefの値が"#"【 || 】 または【href == ""】  であれば（【？】）
  //   // 【 $('html'); 】 へのリンク（≒ページトップ）,そうでなければ（【:】）【 $(href); 】 変数hrefの中身が到着地点になる
  //   let target = $(href == "#" || href == "" ? "html" : href);

  //   // トップからジャンプ先の要素までの距離を取得 （id=menuなどがページの一番上から何pxかを取得）
  //   let position = target.offset().top;
  //   // offset()は表示位置を取得する offset().topでページの一番上から何pxかを取得

  //   // animateでスムーススクロールを行う ページトップからpositionだけスクロールする
  //   // 600はスクロール速度で単位はミリ秒 swingはイージングのひとつ
  //   $("html, body").animate({ scrollTop: position }, 600, "swing");
  //   return false;
  // });
  // {scrollTop:position}で、ページトップからposition分だけスクロールするという指定をしているいる。
  // linear：常に同じ速さで動く swing：始めはゆっくり動いて、途中はちょっと速め、最後はゆっくりと動く
  // 出発地点をクリックすると、URLの末尾にIDタグ(例.https://coffee.com#menu)が付与されてしまう。
  // これを防ぐために、最後に１文return falseを追加します。



  $(function(){
    var headerHeight = $('header').outerHeight(); // ヘッダーについているID、クラス名など、余白を開けたい場合は + 10を追記する。
    var urlHash = location.hash; // ハッシュ値があればページ内スクロール
    if(urlHash) { // 外部リンクからのクリック時
      $('body,html').stop().scrollTop(0); // スクロールを0に戻す
      setTimeout(function(){ // ロード時の処理を待ち、時間差でスクロール実行
        var target = $(urlHash);
        var position = target.offset().top - headerHeight;
        $('body,html').stop().animate({scrollTop:position}, 500); // スクロール速度ミリ秒
      }, 100);
    }
    $('a[href^="#"]').click(function(){ // 通常のクリック時
      var href= $(this).attr("href"); // ページ内リンク先を取得
      var target = $(href);
      var position = target.offset().top - headerHeight;
      $('body,html').stop().animate({scrollTop:position}, 500); // スクロール速度ミリ秒
      return false; // #付与なし、付与したい場合は、true
    });
  });
  
  // ヘッダー固定（IEではPolyfillを使う）
  $(function() {
    var elements = document.querySelectorAll('header');
    Stickyfill.add(elements);
  });

  

});
