/* AizuOrigin v0.5 | A bilingual, static concept marketplace.
 * Everything is sample data. No orders, payment, wallet calls or NFT minting.
 * Certificates demonstrate local record integrity ONLY, not authenticity.
 */
(function () {
  "use strict";

  var PRODUCTS = [
    {
      id:"lacquer-bowl",code:"AO-DEMO-001",kind:"lacquer",maker:"Demo Workshop A",
      material:"Lacquerware",expectedHash:"506bff1f69ec7f8093966ead24cb220adb41db67f1266aa20e8cf689851fc510",price:18000,
      name:{ja:"朱と黒の漆椀",en:"Vermilion Lacquer Bowl"},
      short:{ja:"艶と静けさを重ねた、会津塗をイメージした一点。",en:"A study in light, lacquer and quiet presence."},
      story:{ja:"会津に伝わる漆の重なりと朱の色彩から着想したコンセプト作品。職人や工房と正式な提携を結んだ販売商品ではありません。",en:"A fictional concept piece inspired by layered lacquer and Aizu's vermilion palette. It is not a product offered by a real partner workshop."},
      craft:{ja:"漆器の意匠（展示用イメージ）",en:"Lacquerware design (illustrative)"},
      origin:{ja:"福島県会津若松市（参考設定）",en:"Aizuwakamatsu, Fukushima (sample)"}
    },
    {
      id:"cotton-runner",code:"AO-DEMO-002",kind:"fabric",maker:"Demo Studio B",
      material:"Aizu cotton",expectedHash:"6ce24be21a6b163e85086f8cbc303dd2cded392e788b94107a040253e36d9910",price:12000,
      name:{ja:"会津木綿のテーブルランナー",en:"Aizu Cotton Table Runner"},
      short:{ja:"縞のリズムを、これからの暮らしへ。",en:"Traditional stripes, reimagined for everyday life."},
      story:{ja:"会津木綿の縞模様をモチーフにしたサンプル。実在する製品写真や製造元の来歴を表すものではありません。",en:"A fictional textile concept inspired by Aizu cotton stripes. No real maker, production history or item photograph is represented."},
      craft:{ja:"会津木綿の意匠（展示用イメージ）",en:"Aizu cotton design (illustrative)"},
      origin:{ja:"福島県会津若松市（参考設定）",en:"Aizuwakamatsu, Fukushima (sample)"}
    },
    {
      id:"akabeko",code:"AO-DEMO-003",kind:"folk",maker:"Demo Maker C",
      material:"Papier-mache",expectedHash:"6d1579a0a01eb7cbbeb44bd20b9422b226c082194fbfa8aed63234df59250294",price:6900,
      name:{ja:"赤べこの記憶",en:"A Little Red Beko"},
      short:{ja:"会津の願いを、世界の机の片隅へ。",en:"A small symbol of Aizu to carry across borders."},
      story:{ja:"会津の郷土玩具である赤べこをモチーフにしたコンセプト展示。実際の作り手による作品・販売商品ではありません。",en:"A fictional showcase inspired by the Aizu folk toy akabeko. It is not a physical item for sale or an actual artisan's work."},
      craft:{ja:"張り子の意匠（展示用イメージ）",en:"Papier-mache folk-art design (illustrative)"},
      origin:{ja:"福島県会津若松市（参考設定）",en:"Aizuwakamatsu, Fukushima (sample)"}
    }
  ];

  var LANG_KEY = "aizuorigin-lang-v05";
  var BAG_KEY = "aizuorigin-inquiry-v05";
  function readStore(key,fallback){try{var v=localStorage.getItem(key);return v===null?fallback:JSON.parse(v)}catch(e){return fallback}}
  function store(key,value){try{localStorage.setItem(key,JSON.stringify(value))}catch(e){}}
  var lang = readStore(LANG_KEY,"ja")==="en"?"en":"ja";
  var saved = readStore(BAG_KEY,[]);
  var bag = Array.isArray(saved)?saved.filter(function(id,i){return PRODUCTS.some(function(p){return p.id===id})&&saved.indexOf(id)===i}):[];
  var filter = "all", searchTerm = "", toastTimer;
  var app = document.getElementById("app");

  function tx(ja,en){return lang==="ja"?ja:en}
  function esc(value){return String(value).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
  function txt(obj){return esc(obj[lang])}
  function findProduct(id){return PRODUCTS.find(function(p){return p.id===id})}
  function money(n){return "¥"+Number(n).toLocaleString("ja-JP")}
  function route(){var raw=(location.hash||"#/").replace(/^#\/?/,"");try{raw=decodeURIComponent(raw)}catch(e){return ["invalid"]}return raw.split("/").filter(Boolean)}
  function notify(message){var el=document.getElementById("toast");clearTimeout(toastTimer);el.textContent=message;el.classList.add("show");toastTimer=setTimeout(function(){el.classList.remove("show")},3200)}
  function artwork(kind,label){
    var head='<div class="product-art '+kind+'" role="img" aria-label="'+esc(label)+'">';
    if(kind==="fabric")return head+
      '<svg viewBox="0 0 500 430" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="weave" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M0 0h30" stroke="#e5ddcc" stroke-width="1"/><path d="M0 0v30" stroke="#aeb4a5" stroke-width="1"/><path d="M7 0v30" stroke="#e9e1cd" stroke-width="6"/><path d="M20 0v30" stroke="#b75d48" stroke-width="5"/><path d="M27 0v30" stroke="#d9d7c4" stroke-width="2"/></pattern><filter id="clothShade"><feDropShadow dx="0" dy="20" stdDeviation="15" flood-opacity=".23"/></filter></defs><g transform="translate(250 215) rotate(-16)" filter="url(#clothShade)"><rect x="-150" y="-174" width="300" height="348" rx="3" fill="#274650"/><rect x="-142" y="-170" width="284" height="340" fill="url(#weave)"/><path d="M-143-170h285v340h-285z" fill="#1c4857" opacity=".12"/><rect x="-105" y="-171" width="21" height="342" fill="#f0e7d6" opacity=".85"/><rect x="80" y="-171" width="18" height="342" fill="#f0e7d6" opacity=".85"/><path d="M-145 168v30m10-30v30m10-30v30m10-30v30m10-30v30m10-30v30m10-30v30m10-30v30m10-30v30m10-30v30m10-30v30m10-30v30m10-30v30m10-30v30m10-30v30m10-30v30m10-30v30m10-30v30m10-30v30m10-30v30m10-30v30m10-30v30m10-30v30m10-30v30m10-30v30m10-30v30m10-30v30m10-30v30" stroke="#c5beae" stroke-width="2"/></g></svg></div>';
    if(kind==="folk")return head+
      '<svg viewBox="0 0 500 430" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="redBody" x1="0" y1="0" x2=".9" y2="1"><stop stop-color="#e46a4e"/><stop offset=".55" stop-color="#ad3b32"/><stop offset="1" stop-color="#7b2c2a"/></linearGradient><filter id="redShadow"><feDropShadow dx="0" dy="18" stdDeviation="15" flood-opacity=".20"/></filter></defs><g filter="url(#redShadow)"><path d="M166 157c26-38 112-51 177-15 37 20 53 67 43 119-6 29-26 53-56 55l-145 1c-38 0-69-28-77-73-6-33 16-67 58-87Z" fill="url(#redBody)"/><path d="M182 295v35h35l12-27M310 298l8 32h36l-2-37" fill="#782d2a"/><path d="M296 151c-7 53 6 120 30 139" fill="none" stroke="#f4d0a7" stroke-width="6"/><path d="M177 183c24-3 34-29 53-23" fill="none" stroke="#f1d1a9" stroke-width="7"/><path d="M226 207c28 0 34 18 59 15" fill="none" stroke="#f1d1a9" stroke-width="5"/><path d="M163 168c-17-35-35-59-63-66-29-7-51 6-58 31-6 23 8 44 31 51 18 6 28 19 34 37l57-9Z" fill="#b93f31"/><path d="M83 108l-13-35 39 17M125 111l20-35 6 46" fill="#95372e"/><ellipse cx="72" cy="145" rx="16" ry="12" fill="#e7b99a"/><circle cx="109" cy="130" r="7" fill="#1f2c2b"/><path d="M94 161q19 17 38-2" fill="none" stroke="#edc3a3" stroke-width="7"/><path d="M122 206q-8 43-24 66" fill="none" stroke="#7d2c26" stroke-width="12"/><path d="M353 167c22-19 49-22 62-8" stroke="#8d332b" stroke-width="14" stroke-linecap="round" fill="none"/></g></svg></div>';
    return head+
      '<svg viewBox="0 0 500 430" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="bowlTop" cx=".44" cy=".34" r=".68"><stop stop-color="#b85f48"/><stop offset=".58" stop-color="#87352d"/><stop offset="1" stop-color="#452425"/></radialGradient><linearGradient id="bowlSide" x1=".2" y1="0" x2=".8" y2="1"><stop stop-color="#6d2b26"/><stop offset=".5" stop-color="#b44b35"/><stop offset="1" stop-color="#361e22"/></linearGradient><filter id="bowlShadow"><feDropShadow dx="2" dy="24" stdDeviation="19" flood-opacity=".28"/></filter></defs><g filter="url(#bowlShadow)"><path d="M78 174c3 102 57 165 172 168 116-2 171-68 173-168Z" fill="url(#bowlSide)"/><ellipse cx="250" cy="174" rx="173" ry="72" fill="#211d22"/><ellipse cx="250" cy="171" rx="162" ry="63" fill="#b56e4b"/><ellipse cx="250" cy="171" rx="154" ry="56" fill="url(#bowlTop)"/><ellipse cx="250" cy="171" rx="140" ry="48" fill="none" stroke="#dca36d" stroke-width="2" opacity=".7"/><path d="M169 139c40-18 126-23 172-2" fill="none" stroke="#e8b082" stroke-width="2" opacity=".6"/><path d="M127 256c26 43 61 58 99 65" stroke="#da9470" stroke-width="5" opacity=".32" fill="none" stroke-linecap="round"/><path d="M203 341v12q45 16 94 0v-12" fill="#3b2525"/></g></svg></div>';
  }
  function card(p){
    return '<a class="product-card" href="#/product/'+p.id+'" aria-label="'+txt(p.name)+'">'+
      artwork(p.kind,p.name[lang])+
      '<div class="product-card__content"><div class="product-kicker"><span>'+esc(p.material)+'</span><span>'+esc(p.code)+'</span></div>'+
      '<h3>'+txt(p.name)+'</h3><p>'+txt(p.short)+'</p>'+
      '<div class="price-row"><span><strong>'+money(p.price)+'</strong> '+tx("参考価格 / デモ","sample price / demo")+'</span><span class="arrow" aria-hidden="true">↗</span></div></div></a>';
  }
  function header(){
    document.documentElement.lang=lang;
    var labels={ "nav-home":tx("ホーム","Home"),"nav-catalog":tx("作品を探す","Explore"),"nav-story":tx("私たちの構想","Our Story"),"nav-passport":tx("来歴を確かめる","Provenance"),"bag-label":tx("検討リスト","Inquiry list"),"footer-title":tx("手仕事には、受け継がれる理由がある。","Every handmade object has a story worth preserving."),"footer-cta":tx("作品を見る ↗","Explore pieces ↗"),"footer-disclaimer":tx("作品・作り手・価格・証明書はすべて架空のデモデータ。実販売・NFT発行はありません。","All works, makers, prices and records are fictional demo data. No sales or NFT issuance.")};
    Object.keys(labels).forEach(function(id){document.getElementById(id).textContent=labels[id]});
    var button=document.getElementById("lang-toggle");
    button.innerHTML=lang==="ja"?'EN <span aria-hidden="true">↗</span>':'日本語 <span aria-hidden="true">↗</span>';
    button.setAttribute("aria-label",lang==="ja"?"Switch language to English":"日本語に切り替える");
    document.getElementById("bag-count").textContent=bag.length;
    var active=route()[0]||"home";
    if(active==="product")active="catalog";
    document.querySelectorAll("[data-nav]").forEach(function(node){var on=node.getAttribute("data-nav")===active;node.classList.toggle("active",on);if(on)node.setAttribute("aria-current","page");else node.removeAttribute("aria-current")});
  }
  function home(){
    return '<section class="hero"><div class="hero-grid"><div class="hero-copy">'+
      '<span class="eyebrow">AIZU / FUKUSHIMA / JAPAN — GLOBAL CRAFT STORIES</span>'+
      '<h1>'+tx("会津の手仕事に、<em>世界という続き</em>を。","From Aizu hands to <em>the wider world.</em>")+'</h1>'+
      '<p class="lead">'+tx("雪深い土地で受け継がれた技と物語を、国境の向こうの暮らしへ。作品だけでなく、その背景まで届ける越境ECの未来を考える。","A window into the craft, care and stories of snowy Aizu — and a vision for taking them beyond borders, with their provenance intact.")+'</p>'+
      '<div class="btn-row"><a class="btn btn-dark" href="#/catalog">'+tx("コレクションを見る","Explore the collection")+' <span aria-hidden="true">↗</span></a><a class="btn btn-outline" href="#/story">'+tx("この構想について","The idea behind it")+'</a></div>'+
      '<div class="hero-meta"><span><b>01</b> '+tx("地域のものづくり","Craft & heritage")+'</span><span><b>02</b> '+tx("世界に向けた物語","Cross-border stories")+'</span></div></div>'+
      '<div class="hero-visual"><div class="art-scene">'+artwork("lacquer",tx("漆椀のイラスト","Illustration of a lacquer bowl"))+'</div><div class="hero-caption"><span>INSPIRED BY AIZU LACQUER</span><strong>Made of stories.</strong></div></div></div></section>'+
      '<div class="value-strip"><div class="value-grid"><div class="value-item"><span class="value-number">01</span><div><strong>'+tx("作り手の背景まで伝える","Tell the maker’s story")+'</strong><span>CRAFT & PEOPLE</span></div></div><div class="value-item"><span class="value-number">02</span><div><strong>'+tx("来歴をデジタルで扱う","Make provenance readable")+'</strong><span>PROVENANCE PASSPORT</span></div></div><div class="value-item"><span class="value-number">03</span><div><strong>'+tx("海外への販路を構想する","Connect to global audiences")+'</strong><span>GLOBAL COMMERCE</span></div></div></div></div>'+
      '<section class="section"><div class="container"><div class="section-heading"><div><span class="eyebrow">CURATED CONCEPT COLLECTION</span><h2>'+tx("会津から、暮らしの中へ。","Objects that hold a place.")+'</h2></div><a class="link-arrow" href="#/catalog">'+tx("作品をすべて見る","See the full collection")+' ↗</a></div><div class="products">'+PRODUCTS.map(card).join("")+'</div><p class="small muted" style="margin-top:23px">'+tx("※ 本展示の作品・価格・製作者は架空のサンプルです。実商品ではありません。","* These are fictional illustrations and sample prices, not actual products or artisans.")+'</p></div></section>'+
      '<section class="section story-band"><div class="container story-grid"><div><span class="eyebrow">WHY AIZUORIGIN</span><h2>'+tx("冬にも、地域から世界へ届く商いを。","A local craft economy that travels in every season.")+'</h2><p class="lead">'+tx("工房の場所や季節によって、販路が閉ざされないように。作品の価値だけでなく、技術と時間と背景も、正しく伝えるための実験です。","What if distance and winter no longer limited a maker's reach? We are exploring how commerce and transparent records can carry skill, time and context along with each object.")+'</p><a class="btn btn-light" href="#/story">'+tx("プロジェクトの思想","Read our vision")+' ↗</a></div><div class="story-quotation"><blockquote>'+tx("職人が、炬燵の中から世界と商いできる未来。","A future where an Aizu maker can reach the world, even from a warm kotatsu in winter.")+'</blockquote><span>AN AIZUORIGIN DESIGN PRINCIPLE</span></div></div></section>'+
      '<section class="section passport-preview"><div class="container passport-grid"><div><span class="eyebrow">DIGITAL CRAFT PASSPORT</span><h2>'+tx("「どこから来たか」を、作品と一緒に。","Let the story travel with the object.")+'</h2><p class="lead">'+tx("作り手、材料、制作地、修復の記録。将来は確認可能な発行者署名とNFTに結びつける構想です。Ver.0.5ではローカルなデモ記録の照合を体験できます。","Maker, materials, place and restoration history: our proposed passport would travel alongside a piece. Today you can try a local integrity check, not a blockchain or authenticity verification.")+'</p><div class="steps"><div class="step"><b>01</b><h3>'+tx("来歴を記録","Record")+'</h3><p>'+tx("出所と制作背景を残す","Document origin and context")+'</p></div><div class="step"><b>02</b><h3>'+tx("内容を照合","Compare")+'</h3><p>'+tx("サンプルのハッシュ照合","Compare a sample hash")+'</p></div><div class="step"><b>03</b><h3>'+tx("将来は署名・NFTへ","Extend")+'</h3><p>'+tx("発行主体の信頼を設計","Design issuer trust")+'</p></div></div><a class="btn btn-dark" href="#/passport" style="margin-top:24px">'+tx("来歴パスポートを試す","Try the passport demo")+' ↗</a></div>'+
      '<div class="certificate-card"><div class="cert-head"><div class="cert-logo">Aizu<span>Origin</span></div><small>DEMO RECORD / V0.5</small></div><div class="cert-seal"><div class="cert-seal__mark">AIZU</div><div><strong>Craft Passport</strong><p>'+tx("サンプル・未認証","Illustrative / unverified")+'</p></div></div><div class="cert-detail">RECORD ID: AO-DEMO-001<br>SHA-256: 506bff1f69ec7f80…<br>STATUS: '+tx("ローカル照合デモ","LOCAL DEMO CHECK")+'<br>ON-CHAIN: NOT ISSUED</div></div></div></section>';
  }
  function pageHero(kicker,title,description){
    return '<section class="page-hero"><div class="container"><span class="eyebrow">'+kicker+'</span><h1>'+title+'</h1><p class="lead">'+description+'</p></div></section>';
  }
  function filteredProducts(){
    return PRODUCTS.filter(function(p){
      var matchesType=filter==="all"||p.kind===filter;
      var needle=searchTerm.toLowerCase().trim();
      var haystack=[p.name.ja,p.name.en,p.short.ja,p.short.en,p.material,p.code,p.maker].join(" ").toLowerCase();
      return matchesType&&(!needle||haystack.indexOf(needle)!==-1);
    });
  }
  function catalog(){
    return pageHero("THE COLLECTION",tx("会津の技、その先の景色。","The Collection"),tx("伝統工芸や郷土玩具から着想したコンセプト作品。すべて架空の展示サンプルです。","Illustrative pieces inspired by Aizu craft and folk heritage. All entries are fictional demonstration items."))+
      '<section class="section"><div class="container"><div class="catalog-toolbar"><div class="filters" role="group" aria-label="'+tx("カテゴリ","Categories")+'">'+
      [["all",tx("すべて","All")],["lacquer",tx("漆器","Lacquer")],["fabric",tx("織物","Textiles")],["folk",tx("郷土玩具","Folk craft")]].map(function(item){return '<button type="button" class="filter-chip '+(filter===item[0]?"active":"")+'" data-filter="'+item[0]+'" aria-pressed="'+(filter===item[0])+'">'+item[1]+'</button>'}).join("")+
      '</div><label class="search-box"><span aria-hidden="true">⌕</span><input id="catalog-search" type="search" aria-label="'+tx("商品検索","Search pieces")+'" placeholder="'+tx("作品名や素材で探す","Search names or materials")+'" value="'+esc(searchTerm)+'"></label></div><div id="catalog-results" class="products">'+filteredProductsHtml()+'</div></div></section>';
  }
  function filteredProductsHtml(){var result=filteredProducts();return result.length?result.map(card).join(""):'<div class="catalog-empty">'+tx("該当する作品はありません。検索条件を変えてください。","No pieces match. Please try another search.")+'</div>'}
  function details(p){
    if(!p)return missing();
    return '<div class="container"><div class="breadcrumb"><a href="#/">'+tx("ホーム","Home")+'</a> / <a href="#/catalog">'+tx("コレクション","Collection")+'</a> / '+txt(p.name)+'</div>'+
      '<div class="detail-grid">'+artwork(p.kind,p.name[lang])+
      '<div class="detail-info"><span class="eyebrow">'+esc(p.material)+' / '+esc(p.code)+'</span><h1>'+txt(p.name)+'</h1><p class="lead">'+txt(p.short)+'</p>'+
      '<p class="demo-price">'+money(p.price)+'</p><p class="demo-warning">'+tx("参考価格・架空の作品。購入・決済はできません。","Illustrative price and fictional item. Not available for purchase.")+'</p>'+
      '<div class="btn-row"><button type="button" class="btn btn-accent" data-add="'+p.id+'">'+tx("検討リストに追加","Add to inquiry list")+' +</button><a class="btn btn-outline" href="#/passport/'+p.code+'">'+tx("来歴デモを確認","View passport demo")+' ↗</a></div>'+
      '<p class="note">'+tx("実商品との誤認を防ぐため、実在する職人・事業者名や真正性の保証は掲載していません。","No real artisan endorsement or guarantee of authenticity is implied. This is an independent demonstration.")+'</p>'+
      '<dl class="details-list"><div><dt>'+tx("デモ作品ID","Sample item ID")+'</dt><dd>'+esc(p.code)+'</dd></div><div><dt>'+tx("想定素材・分類","Material / craft")+'</dt><dd>'+txt(p.craft)+'</dd></div><div><dt>'+tx("産地設定","Sample region")+'</dt><dd>'+txt(p.origin)+'</dd></div><div><dt>'+tx("作り手設定","Sample maker")+'</dt><dd>'+esc(p.maker)+'</dd></div><div><dt>NFT</dt><dd>'+tx("未発行（設計構想のみ）","Not minted / planned only")+'</dd></div></dl></div></div>'+
      '<div class="section" style="padding-top:0"><div class="content-box narrow"><span class="eyebrow">THE STORY BEHIND THE CONCEPT</span><h3>'+tx("作品に込めたい物語","A story to be told")+'</h3><p>'+txt(p.story)+'</p></div></div></div>';
  }
  function story(){
    return pageHero("OUR PHILOSOPHY",tx("雪の国から、海の向こうへ。","From Snow Country to the World"),tx("AizuOriginは、会津の手仕事の価値が距離や季節に左右されず届く仕組みを考える、独立した試作プロジェクトです。","AizuOrigin is an independent prototype exploring how regional makers might carry their craft stories beyond distance and season."))+
      '<section class="section"><div class="container"><div class="story-image" aria-label="AizuOrigin visual identity"><span>Aizu / World.</span></div><div class="story-content"><div><span class="eyebrow">THE STARTING POINT</span><h2>'+tx("作品だけでなく、時間を届けたい。","Craft is more than an object.")+'</h2></div><div><p>'+tx("会津の冬は長い。だからこそ、季節に縛られずに作り手が海外の人とつながり、適正な価値を伝え、次の仕事を生み出す道具をつくりたい。","Winters in Aizu are long. We imagine a way for makers to reach global admirers regardless of season, explain the value of their skills, and build sustainable opportunities.")+'</p><p>'+tx("越境ECは「売る場所」。デジタル来歴は「語り継ぐ仕組み」。将来は許諾と本人確認に基づく証明書、修復履歴、所有者の同意に基づく移転記録を設計したいと考えています。","Cross-border commerce offers a channel. A provenance passport offers continuity. Future stages would require maker consent, verified issuers, repair documentation, and privacy-conscious transfers.")+'</p><p>'+tx("NFTは投機を目的とせず、発行者の証明と検証可能な記録の選択肢として扱います。NFT自体が現物の真贋を保証するわけではありません。","NFTs are considered as one possible record and issuer-signature mechanism, not speculation. A token by itself cannot prove a physical object is genuine.")+'</p></div></div><div class="story-principles"><div><b>01</b><h3>'+tx("作り手の尊重","Maker-first")+'</h3><p>'+tx("実在の作品や工房情報は許諾後に掲載する。","Publish real makers and objects only with permission.")+'</p></div><div><b>02</b><h3>'+tx("透明な出所","Transparent origin")+'</h3><p>'+tx("未確認情報を認証済みと表示しない。","Never label an unverified origin as authenticated.")+'</p></div><div><b>03</b><h3>'+tx("段階的な実装","Build with evidence")+'</h3><p>'+tx("取引やオンチェーン機能は責任体制を整えてから導入する。","Introduce real sales and on-chain functions only after safeguards.")+'</p></div></div></div></section>';
  }
  function passport(code){
    var entry=PRODUCTS.find(function(p){return p.code===code});
    var examples='<div class="example-links">'+PRODUCTS.map(function(p){return '<a href="#/passport/'+p.code+'">'+p.code+'</a>'}).join("")+'</div>';
    return pageHero("CRAFT PROVENANCE PASSPORT",tx("来歴を、ひとつずつ確かめる。","Explore a Craft Passport"),tx("作品IDからデモ記録を検索し、SHA-256によるローカル整合性チェックを試せます。実在の商品・認証機関・ブロックチェーンとは接続していません。","Look up a demo record and check its local SHA-256 fingerprint. No real inventory, certification authority or blockchain is connected."))+
      '<section class="section"><div class="container"><form id="passport-form" class="passport-search"><input class="input" required id="passport-code" autocomplete="off" aria-label="'+tx("証明書ID","Passport ID")+'" placeholder="AO-DEMO-001" value="'+esc(code||"")+'"><button class="btn btn-dark" type="submit">'+tx("照合する","Find record")+' ↗</button></form>'+
      '<p class="small muted" style="margin-top:13px">'+tx("試せるサンプルID","Try these example IDs")+':</p>'+examples+
      (code?'<div id="passport-result" class="passport-result">'+(entry?'<p>'+tx("サンプル照合中…","Checking sample record…")+'</p>':'<div class="note">'+tx("該当するデモ記録はありません。上記のIDで試してください。","No demo record found. Try one of the sample IDs above.")+'</div>')+'</div>':'<div class="passport-help"><p class="note">'+tx("Ver.0.5は実物の真贋を証明しません。署名・発行者審査・NFTミント・所有権移転は未実装です。","Version 0.5 does NOT verify physical authenticity. Issuer signatures, issuer vetting, NFT minting and ownership transfers are not implemented.")+'</p></div>')+
      '</div></section>';
  }
  async function hashRecord(p){
    if(!window.crypto||!window.crypto.subtle||!window.TextEncoder)return {ok:false,hash:null};
    var canonical=[p.code,p.maker,"Aizuwakamatsu, Fukushima","2026",p.material,"v1"].join("|");
    var digest=await window.crypto.subtle.digest("SHA-256",new TextEncoder().encode(canonical));
    var hash=Array.from(new Uint8Array(digest)).map(function(n){return n.toString(16).padStart(2,"0")}).join("");
    return {ok:hash===p.expectedHash,hash:hash};
  }
  async function paintPassport(code){
    var p=PRODUCTS.find(function(item){return item.code===code});
    if(!p)return;
    var result;try{result=await hashRecord(p)}catch(e){result={ok:false,hash:null}}
    var node=document.getElementById("passport-result");
    if(!node||route()[0]!=="passport"||route()[1]!==code)return;
    var status=result.hash?(result.ok?tx("✓ ローカル参照ハッシュと一致","✓ Matches local reference hash"):tx("⚠ ローカル参照ハッシュと不一致","⚠ Local hash mismatch")):tx("ブラウザがWeb Cryptoに対応していません","Web Crypto unavailable in this browser");
    node.innerHTML='<div class="record-grid"><div class="certificate-card"><div class="cert-head"><div class="cert-logo">Aizu<span>Origin</span></div><small>DEMO / NON-AUTHENTICATED</small></div><div class="cert-seal"><div class="cert-seal__mark">AIZU</div><div><strong>Craft Passport</strong><p>'+txt(p.name)+'</p></div></div><dl class="record-list"><div><dt>RECORD ID</dt><dd>'+esc(p.code)+'</dd></div><div><dt>ISSUER</dt><dd>AizuOrigin demonstration (unverified)</dd></div><div><dt>MAKER</dt><dd>'+esc(p.maker)+' (fictional)</dd></div><div><dt>REGION</dt><dd>Aizuwakamatsu, Fukushima (sample)</dd></div><div><dt>MEDIUM</dt><dd>'+esc(p.material)+'</dd></div><div><dt>VERSION</dt><dd>v1 (demo)</dd></div><div><dt>ON-CHAIN TOKEN</dt><dd>None — not minted</dd></div></dl></div>'+
      '<div class="content-box"><span class="eyebrow">LOCAL INTEGRITY CHECK</span><h3>'+tx("データの整合性を照合","Sample integrity check")+'</h3><p class="validation '+(result.ok?"good":"warn")+'">'+status+'</p><p class="small">'+tx("保存されたサンプル属性を正規化し、SHA-256をブラウザで再計算して、同梱された参照値と比較しました。","The browser hashes the bundled sample attributes and compares the result with a bundled reference digest.")+'</p><p class="small strong">'+tx("再計算されたハッシュ","Recalculated digest")+'</p><code class="hash-code">'+esc(result.hash||"Unavailable")+'</code><p class="small strong" style="margin-top:15px">'+tx("同梱された参照ハッシュ","Bundled reference digest")+'</p><code class="hash-code">'+p.expectedHash+'</code><p class="note" style="margin-top:20px">'+tx("重要：参照値も本サイト内に同梱されており、第三者署名による検証ではありません。両方が変更されれば検知できません。現物の真贋、作り手の本人性、所有権は証明しません。","Important: the reference is bundled in this site, not independently signed. Coordinated changes to both values cannot be detected. This does not establish object authenticity, maker identity or ownership.")+'</p><a class="link-arrow" href="#/product/'+p.id+'">'+tx("デモ作品を見る","View sample piece")+' ↗</a></div></div>';
  }
  function inquiryText(){
    var picked=bag.map(findProduct).filter(Boolean);
    if(!picked.length)return tx("検討リストは空です。","Your inquiry list is empty.");
    return ["AizuOrigin | "+tx("検討リスト（デモ）","Inquiry list (demo)"),"-----------------------------"].concat(picked.map(function(p,i){return (i+1)+". "+p.name[lang]+" / "+p.code+" / "+money(p.price)+" ["+tx("参考価格","sample price")+"]"})).concat(["",tx("全商品・価格は架空のデモです。注文や送信は行われていません。","All items and prices are fictional. No order or message has been sent.")]).join("\n");
  }
  function inquiry(){
    var picked=bag.map(findProduct).filter(Boolean);
    return pageHero("YOUR INQUIRY LIST",tx("気になる作品を、ひとつの場所に。","Your Shortlist"),tx("作品を検討リストにまとめるデモです。現在、購入・決済・問い合わせ送信機能はありません。","Collect demo pieces in a shortlist. Purchasing, payment and sending enquiries are not enabled."))+
      '<section class="section"><div class="container inquiry-grid"><div><span class="eyebrow">'+tx("保存されたサンプル","SAVED SAMPLES")+'</span>'+
      (picked.length?picked.map(function(p){return '<div class="inquiry-item">'+artwork(p.kind,p.name[lang])+'<div><h3><a href="#/product/'+p.id+'">'+txt(p.name)+'</a></h3><p class="small">'+p.code+' · '+money(p.price)+' '+tx("参考","sample")+'</p></div><button class="text-button" type="button" data-remove="'+p.id+'">'+tx("削除","Remove")+'</button></div>'}).join(""):'<div class="empty-state"><p>'+tx("リストはまだ空です。","Your list is currently empty.")+'</p><a class="btn btn-outline" href="#/catalog">'+tx("作品を見てみる","Explore pieces")+' ↗</a></div>')+
      '</div><div class="content-box"><h3>'+tx("検討リストのテキスト","Your demo summary")+'</h3><p class="small">'+tx("内容をコピーできます。外部送信や注文確定は行いません。","Copy the text for your own notes. Nothing is submitted or purchased.")+'</p><textarea id="inquiry-summary" class="inquiry-output" readonly aria-label="'+tx("検討リスト","Inquiry summary")+'">'+esc(inquiryText())+'</textarea><button type="button" class="btn btn-dark" id="copy-inquiry" style="margin-top:14px">'+tx("テキストをコピー","Copy summary")+'</button><ul class="notice-list"><li>'+tx("実在の商品や売主は登録されていません。","There are no actual sellers or products.")+'</li><li>'+tx("検討リストはこの端末のブラウザに保存されます。","Your shortlist is saved only in this browser.")+'</li><li>'+tx("通貨換算・送料・税・販売規約は未実装です。","Currency conversion, shipping, taxes and terms are not implemented.")+'</li></ul></div></div></section>';
  }
  function missing(){
    return pageHero("NOT FOUND",tx("ページが見つかりません。","Page not found"),tx("URLを確認するか、作品一覧に戻ってください。","Check the address or return to the collection."))+'<section class="section container"><a class="btn btn-dark" href="#/catalog">'+tx("作品一覧に戻る","Back to collection")+' ↗</a></section>';
  }
  function render(){
    header();
    var r=route(),name=r[0]||"home";
    if(name==="home")app.innerHTML=home();
    else if(name==="catalog")app.innerHTML=catalog();
    else if(name==="product")app.innerHTML=details(findProduct(r[1]));
    else if(name==="story")app.innerHTML=story();
    else if(name==="passport")app.innerHTML=passport((r[1]||"").toUpperCase());
    else if(name==="inquiry")app.innerHTML=inquiry();
    else app.innerHTML=missing();
    document.title=(name==="home"?"AizuOrigin":name.charAt(0).toUpperCase()+name.slice(1)+" | AizuOrigin")+" — "+tx("会津の手仕事と物語","Craft & Provenance");
    if(name==="passport"&&r[1])paintPassport(r[1].toUpperCase());
  }
  function addToBag(id){if(!findProduct(id))return;if(bag.indexOf(id)===-1){bag.push(id);store(BAG_KEY,bag);header();notify(tx("検討リストに追加しました","Added to your shortlist"))}else notify(tx("この作品は追加済みです","This piece is already saved"))}
  function removeFromBag(id){bag=bag.filter(function(item){return item!==id});store(BAG_KEY,bag);render();notify(tx("検討リストから削除しました","Removed from your shortlist"))}
  document.getElementById("lang-toggle").addEventListener("click",function(){lang=lang==="ja"?"en":"ja";store(LANG_KEY,lang);render()});
  document.addEventListener("click",function(event){
    var add=event.target.closest("[data-add]");if(add){addToBag(add.getAttribute("data-add"));return}
    var remove=event.target.closest("[data-remove]");if(remove){removeFromBag(remove.getAttribute("data-remove"));return}
    var type=event.target.closest("[data-filter]");if(type){filter=type.getAttribute("data-filter");document.querySelectorAll("[data-filter]").forEach(function(btn){var on=btn===type;btn.classList.toggle("active",on);btn.setAttribute("aria-pressed",String(on))});var results=document.getElementById("catalog-results");if(results)results.innerHTML=filteredProductsHtml();return}
    if(event.target.closest("#copy-inquiry")){
      var el=document.getElementById("inquiry-summary");if(!el)return;
      var contents=el.value;
      if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(contents).then(function(){notify(tx("コピーしました","Copied to clipboard"))}).catch(function(){el.focus();el.select();notify(tx("テキストを選択しました。手動でコピーしてください","Text selected. Please copy manually."))})}
      else{el.focus();el.select();notify(tx("テキストを選択しました。手動でコピーしてください","Text selected. Please copy manually."))}
    }
  });
  document.addEventListener("input",function(event){if(event.target.id==="catalog-search"){searchTerm=event.target.value;var results=document.getElementById("catalog-results");if(results)results.innerHTML=filteredProductsHtml()}});
  document.addEventListener("submit",function(event){if(event.target.id==="passport-form"){event.preventDefault();var code=document.getElementById("passport-code").value.trim().toUpperCase();if(code)location.hash="#/passport/"+encodeURIComponent(code)}});
  window.addEventListener("hashchange",function(){render();window.scrollTo({top:0,behavior:"auto"})});
  if(!location.hash){location.hash="#/"}else{render()}
})();