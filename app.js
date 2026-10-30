const APP_VERSION = '2.1.0';
const stateKey = 'guoyu5_state_v2';
const defaults = { xp: 35, weeklyXp: 180, streak: 4, goalDone: 3, mastered: 12, rescued: 7, completedChars: [], lessonProgress: {} };
let state;
try { state = { ...defaults, ...(JSON.parse(localStorage.getItem(stateKey) || 'null') || {}) }; } catch { state = { ...defaults }; }

const lessons = [
  { id:1, unit:'第一單元｜品格小學堂', title:'幸福筆記本', genre:'記敘／生活省思', range:'midterm', icon:'📔', accent:'purple',
    summary:'從「把幸福記下來」的概念出發，練習觀察生活中的小事，理解幸福不一定來自昂貴或特別的事物，而可能藏在陪伴、分享與感謝裡。',
    goals:['找出事件中的人物、行動與感受','分辨「事情」和「感受」兩種資訊','練習用具體例子說明抽象的幸福'],
    chars:[['福','幸福','讓人感到滿足、安穩的狀態'],['憶','回憶','過去留在心中的記得'],['惜','珍惜','知道可貴而好好看待'],['暖','溫暖','令人感到舒服、被關心']],
    vocab:[['記錄','把事情寫下來或保存起來','我把今天最開心的事記錄在小卡上。'],['珍惜','重視並好好把握','我們要珍惜和家人相處的時間。'],['分享','把自己的東西、想法或感受與別人一起交流','他把成功的方法分享給同學。']],
    passage:['小安每天睡前都在筆記本上寫下一件開心的小事。','有時是同學借他橡皮擦，有時是媽媽留了一碗熱湯。','過了一個月，他發現幸福並不遙遠，而是藏在許多被忽略的小地方。','當他心情不好時，翻開筆記本，就會想起那些溫暖的時刻。'],
    quiz:[['小安每天睡前做什麼？',['寫下一件開心的小事','整理所有課本','背十個成語'],0,0],['小安後來發現幸福藏在哪裡？',['只有昂貴的禮物裡','許多容易忽略的小地方','只有考第一名的時候'],1,2],['這篇短文最想提醒我們什麼？',['每天都要買新筆記本','留意生活中的小幸福','心情不好就不要寫字'],1,3]],
    make:[['福',['幸福','福氣','祝福']],['暖',['溫暖','暖和','暖心']]], sentence:[['珍惜','請用「珍惜」寫一句和家人或朋友有關的話。'],['分享','請用「分享」寫一句完整句子。']] },
  { id:2, unit:'第一單元｜品格小學堂', title:'做人做事做長久', genre:'議論／生活智慧', range:'midterm', icon:'🌱', accent:'green',
    summary:'從做人與做事的態度思考「長久」的原因。真正可靠的關係與成果，常來自誠信、負責、耐心與持續，而不是只求眼前方便。',
    goals:['找出作者提出的做人做事原則','理解「短期方便」與「長久信任」的差別','用生活例子支持自己的看法'],
    chars:[['誠','誠實','不欺騙、真實可信'],['責','負責','把自己該做的事情做好'],['久','長久','持續很長的時間'],['穩','穩定','安定、不容易改變']],
    vocab:[['信用','別人對一個人可靠程度的信任','答應的事情做到，才能累積信用。'],['負責','承擔自己應做的事情與結果','小組工作要對自己的部分負責。'],['持續','不中斷地進行','每天持續閱讀，能力會慢慢進步。']],
    passage:['阿哲在小組報告中答應整理資料。','雖然週末很想玩遊戲，他仍先完成自己負責的部分。','報告當天，大家因為他的資料整理得清楚而順利完成任務。','同學說，下次還想和他同組，因為他是值得信任的夥伴。'],
    quiz:[['阿哲答應負責什麼？',['整理資料','畫海報','上臺唱歌'],0,0],['同學下次為什麼還想和阿哲同組？',['因為他遊戲玩得好','因為他值得信任','因為他話很多'],1,3],['哪一個行為最能累積信用？',['答應後做到','先答應再說','只做自己喜歡的'],0,1]],
    make:[['誠',['誠實','真誠','誠意']],['責',['負責','責任','職責']]], sentence:[['負責','請寫一句你在班上會負責做的事情。'],['持續','請用「持續」說明一個學習習慣。']] },
  { id:3, unit:'第一單元｜品格小學堂', title:'孔雀錯了', genre:'故事／寓意', range:'midterm', icon:'🦚', accent:'pink',
    summary:'透過動物故事思考自信、驕傲與尊重他人的差別。閱讀時要注意角色說了什麼、做了什麼，以及事件最後讓角色學到了什麼。',
    goals:['從對話推測角色個性','找出故事的轉折與結果','用自己的話說出故事寓意'],
    chars:[['傲','驕傲','過度覺得自己比別人好'],['耀','炫耀','故意顯示自己的長處'],['歉','道歉','承認不妥並表示歉意'],['尊','尊重','重視別人、不輕視']],
    vocab:[['炫耀','刻意顯示自己的優點，希望別人注意','一直炫耀成績，可能讓別人不舒服。'],['謙虛','有能力卻不自大','他得獎後仍然保持謙虛。'],['尊重','重視別人的想法與感受','討論時要尊重不同意見。']],
    passage:['森林舉辦才藝會，孔雀一上臺就不停展示美麗的羽毛。','牠笑小麻雀的歌聲不夠響，也嫌松鼠的動作不夠快。','輪到孔雀表演時，一陣風吹亂了羽毛，牠慌張得忘了原本準備的動作。','小麻雀和松鼠沒有嘲笑牠，反而上前幫忙，孔雀這才明白尊重比炫耀更重要。'],
    quiz:[['孔雀一開始有什麼問題？',['太害羞','愛炫耀並嘲笑別人','忘了參加活動'],1,0],['誰在孔雀出狀況時幫忙？',['小麻雀和松鼠','只有裁判','沒有人'],0,3],['孔雀最後明白什麼？',['羽毛最重要','尊重比炫耀更重要','比賽一定要得第一'],1,3]],
    make:[['尊',['尊重','尊敬','自尊']],['歉',['道歉','歉意','抱歉']]], sentence:[['謙虛','請用「謙虛」寫一句稱讚別人的話。'],['尊重','請寫一句在討論時如何尊重別人。']] },
  { id:4, unit:'第二單元｜自然筆記', title:'特別的海', genre:'說明／自然觀察', range:'midterm', icon:'🌊', accent:'blue',
    summary:'從海洋的特殊現象出發，練習閱讀說明性文字：先找「現象是什麼」，再找「為什麼會這樣」，最後整理作者提供的例子與特色。',
    goals:['辨認說明文中的現象與原因','整理自然現象的特色','練習用因果句說明觀察'],
    chars:[['潮','潮水','海水週期性的升降'],['灣','海灣','陸地向內凹、海水進入的地方'],['鹽','鹽分','水中鹽類的含量'],['奇','奇特','不尋常、特別']],
    vocab:[['潮汐','海水因月球等因素出現規律升降','觀察潮汐可以幫助安排海邊活動。'],['景觀','可供觀看欣賞的自然或人文景色','這片海岸有特殊的地形景觀。'],['變化','從一種狀態變成另一種狀態','海面的顏色會隨光線產生變化。']],
    passage:['清晨的海面看起來像一面灰藍色的大鏡子。','太陽升高後，海水反射光線，顏色也跟著變亮。','到了退潮時，原本被海水蓋住的礁石露了出來，小水窪裡還能看到螃蟹和小魚。','同一片海，會因時間、光線和潮汐呈現不同模樣。'],
    quiz:[['海面顏色為什麼會變亮？',['因為光線改變','因為魚變多','因為沙子消失'],0,1],['退潮後出現什麼？',['高山','礁石和小水窪','雪地'],1,2],['這篇短文主要說明什麼？',['同一片海會呈現不同模樣','海邊不能活動','只有清晨的海最美'],0,3]],
    make:[['潮',['潮水','退潮','潮汐']],['灣',['海灣','港灣','灣岸']]], sentence:[['變化','請用「變化」描述天空或海面的不同。'],['潮汐','請用「潮汐」寫一句和海邊活動有關的話。']] },
  { id:5, unit:'第二單元｜自然筆記', title:'漫遊花東', genre:'遊記／景物描寫', range:'midterm', icon:'🚆', accent:'orange',
    summary:'用旅行視角閱讀景物描寫，注意作者如何安排移動順序、觀察景色，並用感官描寫把看到、聽到與感受到的事寫得更有畫面。',
    goals:['依旅程順序整理地點','辨認視覺、聽覺等感官描寫','練習把景色寫得更具體'],
    chars:[['縱','縱谷','兩山之間狹長的低地'],['野','田野','鄉間開闊的土地'],['稻','稻田','種植稻米的田地'],['峽','峽谷','兩側陡峭的狹長谷地']],
    vocab:[['縱谷','兩山脈之間狹長的低地','火車穿過開闊的縱谷。'],['遼闊','寬廣而看不到明顯邊界','站在高處可以看到遼闊的田野。'],['沿途','一路經過的地方','沿途的風景讓人捨不得睡覺。']],
    passage:['火車離開城市後，窗外的房屋漸漸變少。','遠處是連綿的山，近處則是一大片稻田，風一吹，稻穗像波浪一樣起伏。','經過小站時，月臺旁的樹影快速向後退。','我把臉靠近窗邊，想把沿途的山、田野和天空都記在心裡。'],
    quiz:[['火車離開城市後，什麼變少了？',['房屋','山','天空'],0,0],['稻穗被比成什麼？',['波浪','白雲','火車'],0,1],['作者為什麼靠近窗邊？',['想睡覺','想記住沿途景色','想找座位'],1,3]],
    make:[['野',['田野','野外','野花']],['峽',['峽谷','海峽','山峽']]], sentence:[['沿途','請用「沿途」寫一句旅行中的所見。'],['遼闊','請用「遼闊」形容一個景色。']] },
  { id:6, unit:'第二單元｜自然筆記', title:'護送螃蟹過馬路', genre:'記敘／環境行動', range:'midterm', icon:'🦀', accent:'red',
    summary:'從人們協助野生動物安全移動的行動，理解環境保護不只是一句口號，而需要觀察問題、採取方法並持續合作。',
    goals:['找出問題、行動與結果三個部分','理解人與野生動物共享環境的概念','提出自己能做的環境行動'],
    chars:[['蟹','螃蟹','甲殼類動物'],['護','保護','避免受到傷害'],['遷','遷移','從一個地方移到另一個地方'],['警','警示','提醒危險或注意']],
    vocab:[['護送','陪同並保護安全到達','志工護送小動物安全通過道路。'],['棲地','生物生活、覓食與繁殖的環境','開發前應先了解當地生物的棲地。'],['警示','提醒人注意可能的危險或狀況','路旁設置警示牌提醒駕駛減速。']],
    passage:['每到繁殖季，山邊會有螃蟹從森林往海邊移動。','牠們經過道路時，容易遇到快速通過的車輛。','志工在重要時段提醒駕駛減速，並協助螃蟹安全通過。','小小的減速與等待，就能讓人和野生動物有更多共存的機會。'],
    quiz:[['螃蟹為什麼要經過道路？',['往海邊移動','找停車場','參加比賽'],0,0],['志工做了什麼？',['提醒駕駛減速並協助通過','把螃蟹帶回家','關閉所有道路'],0,2],['短文最後強調什麼？',['人和野生動物可以靠行動共存','車子一定比動物重要','看到螃蟹要離開'],0,3]],
    make:[['護',['保護','護送','守護']],['遷',['遷移','搬遷','遷徙']]], sentence:[['護送','請用「護送」寫一句完整句子。'],['棲地','請用「棲地」說明動物需要怎樣的環境。']] },
  { id:7, unit:'第三單元｜用心看世界', title:'高第的魔法建築', genre:'人物／建築藝術', range:'final', icon:'🏛️', accent:'purple',
    summary:'從建築師高第的作品思考觀察、想像與創意。閱讀人物文章時，要找出他受到什麼啟發、做了哪些選擇，以及作品展現哪些特色。',
    goals:['從事件推論人物特質','找出自然觀察和創作之間的關係','用特色詞描述建築作品'],
    chars:[['築','建築','建造房屋或工程'],['曲','曲線','彎曲不直的線'],['靈','靈感','突然產生的創作想法'],['創','創意','產生新的想法或做法']],
    vocab:[['靈感','引發創作的新想法','他從樹葉形狀得到設計靈感。'],['曲線','彎曲而不是筆直的線條','這棟建築大量使用柔和的曲線。'],['獨特','和一般不同，有自己的特色','每個人的觀察角度都很獨特。']],
    passage:['設計師小宇喜歡觀察自然。','他發現樹幹很少完全筆直，貝殼也有一圈圈的曲線。','於是他畫房子時，不再只用方正的形狀，而把自然的線條放進設計。','朋友看到圖後說：「這棟房子好像會呼吸！」'],
    quiz:[['小宇喜歡觀察什麼？',['自然','電視','考卷'],0,0],['他從哪些東西發現曲線？',['樹幹和貝殼','鉛筆和尺','書桌和黑板'],0,1],['這篇短文最能表現哪種能力？',['觀察轉化成創意','只會照著畫','避免新的想法'],0,2]],
    make:[['築',['建築','築巢','築起']],['創',['創意','創作','創新']]], sentence:[['靈感','請用「靈感」寫一句創作相關的話。'],['獨特','請用「獨特」形容一件作品。']] },
  { id:8, unit:'第三單元｜用心看世界', title:'嘗嘗我的家鄉味', genre:'記敘／飲食文化', range:'final', icon:'🍜', accent:'orange',
    summary:'從家鄉食物認識味道背後的文化與記憶。寫食物不只寫「好吃」，還能描寫顏色、香氣、口感、做法以及和人的連結。',
    goals:['用感官詞描寫食物','理解食物與地方文化的連結','練習介紹一道熟悉的家鄉味'],
    chars:[['鄉','家鄉','出生或長期生活的地方'],['香','香氣','聞起來舒服的氣味'],['嚐','品嚐','吃一點來感受味道'],['味','味道','食物帶來的感覺']],
    vocab:[['家鄉味','具有地方或家庭特色、讓人想起家鄉的味道','那碗湯是外婆最熟悉的家鄉味。'],['香氣','食物或物品散發的氣味','麵包剛出爐，香氣飄滿廚房。'],['口感','食物入口時軟硬、脆嫩等感受','這道菜外脆內軟，口感很豐富。']],
    passage:['奶奶煮湯時，總會先把香菇慢慢炒香。','熱氣升起，廚房裡立刻有熟悉的味道。','我最喜歡喝第一口湯，先是淡淡的甜，接著才吃到蔬菜清脆的口感。','長大後，只要聞到相似的香氣，我就會想起和奶奶一起吃飯的晚上。'],
    quiz:[['奶奶先做什麼？',['把香菇炒香','先吃甜點','關掉爐火'],0,0],['作者喝湯時先感受到什麼？',['淡淡的甜','很辣','很苦'],0,2],['香氣讓作者想起什麼？',['和奶奶吃飯的晚上','考試時間','運動會'],0,3]],
    make:[['鄉',['家鄉','鄉下','鄉親']],['香',['香氣','香甜','清香']]], sentence:[['口感','請用「口感」介紹一樣食物。'],['家鄉味','請用「家鄉味」寫一句和家人有關的話。']] },
  { id:9, unit:'第三單元｜用心看世界', title:'小小力量將世界照亮', genre:'人物／公益行動', range:'final', icon:'💡', accent:'yellow',
    summary:'從小小行動看見改變世界的可能。閱讀時要注意「問題是什麼、誰做了什麼、產生什麼影響」，並思考個人也能從身邊開始。',
    goals:['整理公益行動的起因與結果','理解小行動累積成影響力','提出自己可以做到的一件事'],
    chars:[['亮','照亮','使黑暗的地方有光'],['助','幫助','提供力量讓事情更順利'],['善','善意','友善、想幫助人的心'],['改','改變','讓原本狀態產生不同']],
    vocab:[['行動','實際去做，而不只停留在想法','關心環境之後，更重要的是採取行動。'],['影響','一件事對另一件事產生作用','一句鼓勵也可能對別人產生好影響。'],['善意','希望對別人友善或有幫助的心意','他用善意提醒，而不是責備。']],
    passage:['班上發現圖書角有些書破了。','小晴沒有抱怨，而是先找老師討論，再邀同學一起修補書頁。','幾個人完成後，其他同學也主動整理書架。','原本只是一個人的小想法，最後讓整個圖書角變得更舒服。'],
    quiz:[['小晴發現什麼問題？',['書有些破了','沒有黑板','沒有椅子'],0,0],['她第一步做什麼？',['找老師討論','把書丟掉','責怪同學'],0,1],['故事顯示小行動可能帶來什麼？',['帶動更多人一起改善','一定要花很多錢','只有老師能改變'],0,3]],
    make:[['助',['幫助','協助','互助']],['善',['善意','友善','善良']]], sentence:[['行動','請用「行動」寫一句從想法到實踐的句子。'],['影響','請用「影響」寫一句完整句子。']] },
  { id:10, unit:'第四單元｜作家風華', title:'男生說，女生說', genre:'對話／多元觀點', range:'final', icon:'💬', accent:'green',
    summary:'透過不同角色的觀點練習傾聽與表達。重點不是判斷哪一方一定對，而是學會找理由、看證據，也理解每個人都可能有不同經驗。',
    goals:['辨認不同角色的觀點','用「我認為…因為…」完整表達','避免只用性別刻板印象判斷人'],
    chars:[['觀','觀點','看事情的角度與想法'],['辯','辯論','針對不同意見提出理由'],['同','同意','認為別人的想法合理'],['異','差異','不一樣的地方']],
    vocab:[['觀點','一個人看待事情的角度','先了解對方的觀點，再回應比較公平。'],['理由','支持一個想法的原因','說出答案時，也要補上理由。'],['差異','彼此不相同的地方','興趣的差異不一定和性別有關。']],
    passage:['班上討論運動會要選哪個活動。','有人喜歡接力，有人喜歡趣味競賽，也有人希望能加入音樂表演。','老師沒有立刻決定，而是請每個人說明理由，再一起比較時間、場地和參與人數。','大家發現，好的決定不是誰聲音最大，而是能不能把想法說清楚並聽見別人。'],
    quiz:[['班上在討論什麼？',['運動會活動','午餐菜單','校服顏色'],0,0],['老師怎麼做？',['直接決定','請大家說明理由再比較','取消活動'],1,2],['好的決定需要什麼？',['聲音最大','說清楚並聽別人','只聽自己的'],1,3]],
    make:[['觀',['觀點','觀察','觀看']],['異',['差異','異同','異常']]], sentence:[['觀點','請用「我認為……因為……」表達一個觀點。'],['差異','請用「差異」寫一句不帶批評的描述。']] },
  { id:11, unit:'第四單元｜作家風華', title:'耶誕禮物', genre:'故事／情感轉折', range:'final', icon:'🎁', accent:'red',
    summary:'故事閱讀要特別注意人物想要什麼、遇到什麼困難，以及最後的選擇如何改變讀者對「禮物」的理解。',
    goals:['找出人物的願望與困難','理解故事中的轉折','從行動推論人物的感情'],
    chars:[['禮','禮物','送給別人表達心意的物品'],['贈','贈送','把東西送給別人'],['驚','驚喜','出乎意料的喜悅'],['捨','捨得','願意放下或付出']],
    vocab:[['心意','內心想表達的感情或想法','禮物不一定昂貴，重要的是心意。'],['驚喜','出乎意料而令人開心','同學偷偷準備卡片給他一個驚喜。'],['珍貴','很有價值、值得珍惜','一起努力的回憶比獎品更珍貴。']],
    passage:['小妍想送爸爸一份生日禮物，但她的零用錢不多。','她想了很久，最後決定把兩人旅行的照片整理成一本小冊子。','每一頁旁邊，她都寫下一句當時最記得的事。','爸爸收到後看了很久，笑著說：「這是我今年最珍貴的禮物。」'],
    quiz:[['小妍遇到什麼困難？',['零用錢不多','沒有照片','忘了生日'],0,0],['她最後做了什麼？',['買昂貴玩具','做旅行照片小冊子','什麼都沒送'],1,1],['爸爸為什麼覺得禮物珍貴？',['因為很貴','因為包含共同回憶和心意','因為很大'],1,3]],
    make:[['禮',['禮物','禮貌','禮讓']],['贈',['贈送','贈品','贈與']]], sentence:[['心意','請用「心意」寫一句送禮相關的話。'],['珍貴','請寫一句你覺得珍貴的事物或回憶。']] },
  { id:12, unit:'第四單元｜作家風華', title:'漫遊詩情', genre:'詩歌／意象欣賞', range:'final', icon:'🍃', accent:'blue',
    summary:'讀詩時不只找字面意思，也要感受畫面、聲音、節奏與情緒。可以把詩句想成一幅幅小畫面，再說出自己看見了什麼。',
    goals:['從詞語想像畫面','感受重複、節奏與停頓','用自己的語言說出詩帶來的感受'],
    chars:[['詩','詩情','詩所帶來的情感與意境'],['韻','韻味','讀來具有節奏與餘味'],['景','景象','眼前看見的畫面'],['境','意境','文字形成的情感與想像空間']],
    vocab:[['意象','文字讓人聯想到的具體畫面或事物','「月光」常能形成安靜的意象。'],['節奏','聲音或語句規律的快慢與強弱','朗讀詩時要注意節奏。'],['意境','作品營造出的整體畫面與情感','短短幾行也能形成深遠的意境。']],
    passage:['風從樹梢走過，葉子輕輕拍手。','一小片雲慢慢移動，把陽光暫時收進口袋。','操場安靜了一秒，又傳來遠處孩子的笑聲。','我抬頭看著天空，覺得平凡的下午忽然像一首詩。'],
    quiz:[['「葉子輕輕拍手」用了什麼想像？',['把葉子想成人','把葉子想成石頭','沒有任何想像'],0,0],['雲把什麼「收進口袋」？',['陽光','操場','孩子'],0,1],['作者最後有什麼感受？',['平凡下午也有詩意','下午很可怕','天空完全沒有變化'],0,3]],
    make:[['詩',['詩情','詩句','詩人']],['景',['景色','景象','風景']]], sentence:[['意境','請用「意境」說說一幅畫或一首詩帶給你的感覺。'],['節奏','請用「節奏」寫一句和朗讀或音樂有關的話。']] }
];

const rescueMissions = [
  { char:'憶', sentence:'多年以後，我仍清楚記＿＿那一天發生的事情。', hints:['部首提示：這個字和「心」有關。','結構提示：左邊是「忄」，右邊可以想成「意」。','看一眼字形，再把提示關掉重新寫。'] },
  { char:'謙', sentence:'他得到稱讚後，仍然保持＿＿虛的態度。', hints:['部首提示：這個字和說話、言語有關。','結構提示：左邊是「言」，右邊是「兼」。','看一眼字形，再把提示關掉重新寫。'] },
  { char:'擾', sentence:'請不要在圖書館大聲說話，以免打＿＿別人。', hints:['部首提示：這個字常和動作有關。','結構提示：左邊是「扌」。','看一眼字形，再把提示關掉重新寫。'] },
  { char:'嚷', sentence:'市場裡人聲＿＿＿＿，到處都很熱鬧。', hints:['部首提示：和嘴巴、說話有關。','結構提示：左邊是「口」。','看一眼字形，再把提示關掉重新寫。'] },
  { char:'綻', sentence:'春天一到，花園裡的花朵陸續＿＿放。', hints:['部首提示：左邊和絲線有關。','結構提示：左邊是「糸」，右邊是「定」。','看一眼字形，再把提示關掉重新寫。'] }
];

let currentLesson = lessons[0];
let missionQueue = rescueMissions.slice();
let missionIndex = 0, hintStage = 0, strokes = [], currentStroke = null, canvas, ctx, dpr = 1, toastTimer, isDrawing = false;
let speechSession = 0, followIndex = -1;
const $ = s => document.querySelector(s); const $$ = s => [...document.querySelectorAll(s)];

function saveState(){ try{ localStorage.setItem(stateKey, JSON.stringify(state)); }catch{} }
function updateUI(){ $('#xpValue').textContent=state.xp; $('#streakCount').textContent=state.streak; $('#goalDone').textContent=Math.min(state.goalDone,5); $('#achievementStreak').textContent=`${state.streak} 天`; $('#masteredCount').textContent=`${state.mastered} 字`; $('#rescuedCount').textContent=`${state.rescued} 字`; $('#totalXp').textContent=`${state.weeklyXp} XP`; $('#progressRing').style.setProperty('--progress',Math.min(100,(state.goalDone/5)*100)); }
function showToast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove('show'),2400); }
function escapeHtml(s=''){ return s.replace(/[&<>'"]/g,c=>({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' }[c])); }

function navigate(name){
  speechSynthesis?.cancel?.(); speechSession++;
  document.body.classList.toggle('lesson-mode', name==='lesson');
  $$('.view').forEach(v=>v.classList.toggle('active',v.dataset.view===name));
  $$('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.nav===name));
  if(name!=='lesson') location.hash=name;
  window.scrollTo({top:0,behavior:'smooth'});
}
$$('[data-nav]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();navigate(b.dataset.nav);}));
window.addEventListener('hashchange',()=>{ const n=location.hash.slice(1); if($(`[data-view="${n}"]`)) navigate(n); });

function renderLessonCards(filter='all'){
  const list=filter==='all'?lessons:lessons.filter(l=>l.range===filter);
  const html=list.map(l=>`<article class="lesson-card ${l.accent}" data-open-lesson="${l.id}"><div class="lesson-card-top"><span class="lesson-num">${l.id}</span><span class="lesson-icon">${l.icon}</span></div><p class="eyebrow">${escapeHtml(l.unit.split('｜')[0])}</p><h3>${escapeHtml(l.title)}</h3><p>${escapeHtml(l.summary.slice(0,54))}…</p><div class="lesson-tags"><span>${escapeHtml(l.genre)}</span><span>${l.range==='midterm'?'期中':'期末'}</span></div><button type="button" class="lesson-open">開始學習 →</button></article>`).join('');
  $('#lessonGrid').innerHTML=html;
  $('#readingLessonList').innerHTML=lessons.map(l=>`<article class="lesson-card mini-card ${l.accent}" data-open-lesson="${l.id}"><span class="lesson-icon">${l.icon}</span><div><small>第 ${l.id} 課</small><strong>${escapeHtml(l.title)}</strong><p>原創短文＋3 題閱讀偵探</p></div><button type="button" class="round-go">→</button></article>`).join('');
  bindLessonOpeners();
}
function bindLessonOpeners(){ $$('[data-open-lesson]').forEach(b=>{ b.onclick=()=>openLesson(Number(b.dataset.openLesson)); }); }
$$('.range-tab').forEach(b=>b.addEventListener('click',()=>{ $$('.range-tab').forEach(x=>x.classList.remove('active')); b.classList.add('active'); renderLessonCards(b.dataset.filter); }));
$$('[data-range]').forEach(b=>b.addEventListener('click',()=>{ navigate('lessons'); const filter=b.dataset.range; const tab=$(`.range-tab[data-filter="${filter}"]`); tab?.click(); }));

function openLesson(id){ currentLesson=lessons.find(l=>l.id===id)||lessons[0]; renderLesson(currentLesson); navigate('lesson'); location.hash=`lesson-${currentLesson.id}`; }
function renderLesson(l){
  $('#lessonUnitLabel').textContent=l.unit; $('#lessonTitle').textContent=`第 ${l.id} 課｜${l.title}`; $('#lessonMeta').textContent=`${l.genre} · ${l.range==='midterm'?'期中範圍':'期末範圍'}`;
  $('#lessonSummary').textContent=l.summary; $('#lessonGoals').innerHTML=l.goals.map((g,i)=>`<div><span>${i+1}</span><p>${escapeHtml(g)}</p></div>`).join('');
  renderPassage(l); renderWords(l); renderWriting(l); renderQuiz(l); renderHandChars(l); setStep('guide'); updateLessonProgress();
}
function setStep(step){ $$('.step-tab').forEach(b=>b.classList.toggle('active',b.dataset.step===step)); $$('.lesson-step').forEach(p=>p.classList.toggle('active',p.dataset.stepPanel===step)); window.scrollTo({top:0,behavior:'smooth'}); }
$$('.step-tab').forEach(b=>b.addEventListener('click',()=>setStep(b.dataset.step)));
function updateLessonProgress(){ const p=state.lessonProgress[currentLesson.id]||{}; const done=['read','words','write','quiz','hand'].filter(k=>p[k]).length; $('#lessonProgress').textContent=`${Math.round(done/5*100)}%`; }
function markLessonStep(step){ state.lessonProgress[currentLesson.id]={...(state.lessonProgress[currentLesson.id]||{}),[step]:true}; saveState(); updateLessonProgress(); }

function renderPassage(l){ $('#readalongPassage').innerHTML=l.passage.map((s,i)=>`<p class="read-sentence" data-sentence="${i}"><span>${i+1}</span>${escapeHtml(s)}</p>`).join(''); $('#followPanel').hidden=true; followIndex=-1; }
function clearReadHighlight(){ $$('.read-sentence').forEach(x=>x.classList.remove('speaking','follow-turn')); }
function speakText(text,rate=.86,onend){ if(!('speechSynthesis' in window)){showToast('這個瀏覽器不支援語音朗讀。');return;} const u=new SpeechSynthesisUtterance(text); u.lang='zh-TW'; u.rate=rate; u.pitch=1; u.onend=()=>onend?.(); speechSynthesis.speak(u); }
function listenAll(){ speechSynthesis.cancel(); const token=++speechSession; clearReadHighlight(); const rate=Number($('#speechRate').value||.86); let i=0; const next=()=>{ if(token!==speechSession||i>=currentLesson.passage.length){clearReadHighlight();markLessonStep('read');return;} clearReadHighlight(); $(`.read-sentence[data-sentence="${i}"]`)?.classList.add('speaking'); speakText(currentLesson.passage[i],rate,()=>{i++;next();}); }; next(); }
$('#listenAll').addEventListener('click',listenAll);
$('#followRead').addEventListener('click',()=>{ speechSynthesis.cancel(); speechSession++; followIndex=0; $('#followPanel').hidden=false; followSpeakCurrent(); });
function followSpeakCurrent(){ clearReadHighlight(); if(followIndex>=currentLesson.passage.length){ $('#followPanel').hidden=true; clearReadHighlight(); markLessonStep('read'); showToast('跟讀完成！今天這一課多熟了一點 🌟'); return; } const el=$(`.read-sentence[data-sentence="${followIndex}"]`); el?.classList.add('speaking'); $('#followPrompt').textContent=`先聽第 ${followIndex+1} 句，再自己讀一次`; speakText(currentLesson.passage[followIndex],Number($('#speechRate').value||.86),()=>{ el?.classList.remove('speaking'); el?.classList.add('follow-turn'); $('#followPrompt').textContent='輪到你：把亮起來的這一句讀一次'; }); }
$('#followNext').addEventListener('click',()=>{ followIndex++; followSpeakCurrent(); });

function renderWords(l){ $('#wordLearningGrid').innerHTML=l.chars.map(([c,w,m])=>`<article class="char-card"><button class="char-sound" type="button" data-say="${escapeHtml(c)}" aria-label="念出${escapeHtml(c)}">🔊</button><strong>${escapeHtml(c)}</strong><b>${escapeHtml(w)}</b><p>${escapeHtml(m)}</p><button class="tiny-hand" type="button" data-hand-char="${escapeHtml(c)}">✍️ 寫一次</button></article>`).join('') + l.vocab.map(([w,m,e])=>`<article class="vocab-card"><div><strong>${escapeHtml(w)}</strong><button class="char-sound inline" type="button" data-say="${escapeHtml(w)}">🔊</button></div><p>${escapeHtml(m)}</p><small>${escapeHtml(e)}</small></article>`).join('');
  $$('[data-say]').forEach(b=>b.addEventListener('click',()=>{speechSynthesis.cancel();speakText(b.dataset.say,.82);})); $$('[data-hand-char]').forEach(b=>b.addEventListener('click',()=>openHandwritingForChars([b.dataset.handChar])));
}

$('#wordsDoneBtn').addEventListener('click',()=>{ markLessonStep('words'); state.xp+=2; state.weeklyXp+=2; saveState(); updateUI(); showToast('字詞關卡完成 +2 XP 🧩'); });

function renderWriting(l){
  $('#wordMakingArea').innerHTML=l.make.map(([c,ans],i)=>`<div class="open-practice"><label><span class="practice-char">${escapeHtml(c)}</span><span>請造 2 個詞</span><input type="text" data-make-index="${i}" placeholder="例如：……、……" autocomplete="off"></label><button class="small-button" type="button" data-show-make="${i}">看參考</button><div class="reference-answer" id="makeRef${i}" hidden>${ans.map(escapeHtml).join('、')}</div></div>`).join('');
  $('#sentenceArea').innerHTML=l.sentence.map(([w,p],i)=>`<div class="open-practice sentence-practice"><label><strong>指定詞：${escapeHtml(w)}</strong><span>${escapeHtml(p)}</span><textarea data-sentence-index="${i}" rows="3" placeholder="把「${escapeHtml(w)}」放進你的句子裡……"></textarea></label><button class="small-button" type="button" data-check-sentence="${i}" data-word="${escapeHtml(w)}">自我檢查</button><div class="sentence-check" id="sentenceCheck${i}"></div></div>`).join('');
  $$('[data-show-make]').forEach(b=>b.addEventListener('click',()=>{ const ref=$(`#makeRef${b.dataset.showMake}`); ref.hidden=!ref.hidden; }));
  $$('[data-check-sentence]').forEach(b=>b.addEventListener('click',()=>{ const i=b.dataset.checkSentence, w=b.dataset.word, v=$(`[data-sentence-index="${i}"]`).value.trim(), out=$(`#sentenceCheck${i}`); const has=v.includes(w), long=v.length>=10; out.innerHTML=`<span class="${has?'ok':'wait'}">${has?'✓':'○'} 有用到「${escapeHtml(w)}」</span><span class="${long?'ok':'wait'}">${long?'✓':'○'} 句子夠完整（約 10 字以上）</span>`; if(has&&long){ markLessonStep('write'); showToast('句子基本條件完成！再自己讀一遍看看通不通順。'); } }));
}
function renderQuiz(l){ $('#quizScore').textContent='0'; $('#quizArea').innerHTML=l.quiz.map((q,qi)=>`<article class="quiz-card" data-q="${qi}"><div class="quiz-number">${qi+1}</div><div><h3>${escapeHtml(q[0])}</h3><div class="quiz-options">${q[1].map((o,oi)=>`<button type="button" data-answer="${oi}">${String.fromCharCode(65+oi)}. ${escapeHtml(o)}</button>`).join('')}</div><div class="quiz-feedback" hidden></div></div></article>`).join('');
  let score=0, answered=new Set(); $$('.quiz-card').forEach(card=>{ card.querySelectorAll('[data-answer]').forEach(btn=>btn.addEventListener('click',()=>{ const qi=Number(card.dataset.q); if(answered.has(qi)) return; answered.add(qi); const q=l.quiz[qi], chosen=Number(btn.dataset.answer), good=chosen===q[2]; if(good) score++; $('#quizScore').textContent=score; card.querySelectorAll('[data-answer]').forEach((b,i)=>{b.disabled=true;b.classList.toggle('correct',i===q[2]);b.classList.toggle('wrong',i===chosen&&!good);}); const fb=card.querySelector('.quiz-feedback'); fb.hidden=false; fb.className=`quiz-feedback ${good?'good':'needs-work'}`; fb.innerHTML=`<strong>${good?'答對了！':'再找一次證據。'}</strong><span>線索在短文第 ${q[3]+1} 句。</span>`; const sentence=$(`.read-sentence[data-sentence="${q[3]}"]`); sentence?.classList.add('evidence'); setTimeout(()=>sentence?.classList.remove('evidence'),3500); if(answered.size===l.quiz.length){markLessonStep('quiz'); if(score===3){state.xp+=5;state.weeklyXp+=5;saveState();updateUI();showToast('閱讀偵探 3/3！+5 XP 🔎');}} })); });
}
function renderHandChars(l){ $('#lessonHandChars').innerHTML=l.chars.map(([c,w])=>`<button type="button" class="hand-char-button" data-hand-char="${escapeHtml(c)}"><strong>${escapeHtml(c)}</strong><span>${escapeHtml(w)}</span></button>`).join('')+`<button type="button" class="primary-button start-all-hand">一次練這課 4 個字</button>`; $$('[data-hand-char]').forEach(b=>b.addEventListener('click',()=>openHandwritingForChars([b.dataset.handChar]))); $('.start-all-hand').addEventListener('click',()=>openHandwritingForChars(l.chars.map(x=>x[0]))); }

function buildMissionForChar(ch){
  const known=rescueMissions.find(m=>m.char===ch); if(known) return {...known};
  const entry=currentLesson.chars.find(x=>x[0]===ch) || lessons.flatMap(l=>l.chars).find(x=>x[0]===ch);
  const word=entry?.[1]||ch; return {char:ch,sentence:`請回想「${word}」中的「＿＿」怎麼寫。`,hints:[`詞語提示：${word}`,`意思提示：${entry?.[2]||'想想這個字在詞語中的意思。'}`,'看一眼字形，再把提示關掉重新寫。']};
}
function openHandwritingForChars(chars){ missionQueue=chars.map(buildMissionForChar); missionIndex=0; loadMission(0); openHandwritingDialog(); }
function openHandwriting(){ missionQueue=rescueMissions.slice(); const first=missionQueue.findIndex(m=>!state.completedChars.includes(m.char)); missionIndex=first<0?0:first; loadMission(missionIndex); openHandwritingDialog(); }
$$('[data-open-handwriting]').forEach(b=>b.addEventListener('click',openHandwriting));

function openHandwritingDialog(){ const d=$('#handwritingDialog'); d.showModal(); document.documentElement.classList.add('modal-open'); document.body.classList.add('modal-open'); requestAnimationFrame(()=>{resizeCanvas();setTimeout(resizeCanvas,80);}); }
function closeHandwritingDialog(){ document.documentElement.classList.remove('modal-open'); document.body.classList.remove('modal-open'); }
$('#handwritingDialog').addEventListener('close',closeHandwritingDialog); $('#handwritingDialog').addEventListener('cancel',closeHandwritingDialog);

function resizeCanvas(){ if(!canvas)return; const rect=canvas.getBoundingClientRect(); dpr=Math.min(window.devicePixelRatio||1,2); const old=strokes.map(s=>s.map(p=>({...p}))); canvas.width=Math.max(1,Math.floor(rect.width*dpr)); canvas.height=Math.max(1,Math.floor(rect.height*dpr)); ctx=canvas.getContext('2d'); ctx.setTransform(dpr,0,0,dpr,0,0); strokes=old; redraw(); }
function getPoint(e){const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top,p:e.pressure||.5};}
function drawStroke(points){ if(!points||points.length<2)return; ctx.save();ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle='#242743';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(points[0].x,points[0].y);for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i];ctx.quadraticCurveTo(a.x,a.y,(a.x+b.x)/2,(a.y+b.y)/2);}ctx.stroke();ctx.restore(); }
function redraw(){if(!ctx)return;const r=canvas.getBoundingClientRect();ctx.clearRect(0,0,r.width,r.height);strokes.forEach(drawStroke);if(currentStroke)drawStroke(currentStroke);}
function clearWriting(){strokes=[];currentStroke=null;redraw();}
function startStroke(e){ if(e.pointerType==='touch'||e.pointerType==='pen'||e.pointerType==='mouse'){e.preventDefault();e.stopPropagation();} isDrawing=true; canvas.setPointerCapture?.(e.pointerId); currentStroke=[getPoint(e)]; redraw(); }
function moveStroke(e){ if(!isDrawing||!currentStroke)return; e.preventDefault();e.stopPropagation();currentStroke.push(getPoint(e));redraw(); }
function endStroke(e){ if(!currentStroke)return; e.preventDefault();e.stopPropagation();if(currentStroke.length>1)strokes.push(currentStroke);currentStroke=null;isDrawing=false;redraw(); }
function blockTouchScroll(e){ if(e.cancelable)e.preventDefault(); e.stopPropagation(); }
function loadMission(index){missionIndex=Math.max(0,Math.min(index,missionQueue.length-1));hintStage=0;clearWriting();const m=missionQueue[missionIndex];$('#missionIndex').textContent=missionIndex+1;$('#missionTotal').textContent=missionQueue.length;$('#missionTitle').textContent=`把「${m.char}」寫回來`;$('#promptSentence').textContent=m.sentence;$('#hintStage').textContent='0 / 3';$('#hintText').textContent='先不要看答案，想想這個字的部首或結構。';$('#ghostCharacter').textContent='';$('#answerCharacter').textContent=m.char;$('#imeInput').value='';}
$('#hintButton').addEventListener('click',()=>{const m=missionQueue[missionIndex];hintStage=Math.min(3,hintStage+1);$('#hintStage').textContent=`${hintStage} / 3`;$('#hintText').textContent=m.hints[hintStage-1]||m.hints[2];$('#ghostCharacter').textContent=hintStage===3?m.char:'';if(hintStage===3)setTimeout(()=>{$('#ghostCharacter').textContent='';showToast('字形提示已收起，現在自己寫一次！');},2300);});
$('#undoButton').addEventListener('click',()=>{strokes.pop();redraw();}); $('#clearButton').addEventListener('click',clearWriting);
function copyCanvasToPreview(){const p=$('#previewCanvas'),size=180,pdpr=Math.min(window.devicePixelRatio||1,2);p.width=size*pdpr;p.height=size*pdpr;const c=p.getContext('2d');c.setTransform(pdpr,0,0,pdpr,0,0);c.fillStyle='#fff';c.fillRect(0,0,size,size);const source=canvas.getBoundingClientRect(),scale=size/source.width;c.save();c.scale(scale,scale);strokes.forEach(points=>{c.lineCap='round';c.lineJoin='round';c.strokeStyle='#242743';c.lineWidth=8;c.beginPath();c.moveTo(points[0].x,points[0].y);for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i];c.quadraticCurveTo(a.x,a.y,(a.x+b.x)/2,(a.y+b.y)/2);}c.stroke();});c.restore();}
$('#checkButton').addEventListener('click',()=>{if(strokes.length<2){showToast('再寫完整一點，我們再來核對。');return;}copyCanvasToPreview();$('#answerCharacter').textContent=missionQueue[missionIndex].char;$('#checkDialog').showModal();});
$('#retryButton').addEventListener('click',()=>{$('#checkDialog').close();clearWriting();showToast('很好，再回想一次會記得更牢。');});
$('#correctButton').addEventListener('click',()=>{const ch=missionQueue[missionIndex].char;if(!state.completedChars.includes(ch)){state.completedChars.push(ch);state.xp+=4;state.weeklyXp+=4;state.rescued+=1;state.goalDone=Math.min(5,state.goalDone+1);}saveState();updateUI();$('#checkDialog').close();if(missionIndex<missionQueue.length-1){loadMission(missionIndex+1);showToast(`「${ch}」救回來了 +4 XP`);setTimeout(resizeCanvas,50);}else{$('#handwritingDialog').close();closeHandwritingDialog();markLessonStep('hand');showToast('這組手寫任務完成！🎉');}});
$('#readSentence').addEventListener('click',()=>{speechSynthesis.cancel();speakText($('#promptSentence').textContent.replaceAll('＿＿','空格'),.82);});
$('#imeInput').addEventListener('input',e=>{if(e.target.value===missionQueue[missionIndex].char)showToast('系統輸入辨識到了！接著也試試田字格默寫。');});
window.addEventListener('resize',()=>{if($('#handwritingDialog').open)resizeCanvas();});
canvas=$('#writingCanvas');canvas.addEventListener('pointerdown',startStroke,{passive:false});canvas.addEventListener('pointermove',moveStroke,{passive:false});canvas.addEventListener('pointerup',endStroke,{passive:false});canvas.addEventListener('pointercancel',endStroke,{passive:false});canvas.addEventListener('touchstart',blockTouchScroll,{passive:false});canvas.addEventListener('touchmove',blockTouchScroll,{passive:false});$('#canvasWrap').addEventListener('touchmove',blockTouchScroll,{passive:false});

function renderRescue(){ $('#rescueWords').innerHTML=rescueMissions.map((m,i)=>`<button class="word-chip" type="button" data-rescue-index="${i}"><span>${m.char}</span><small>${i===0?'昨天忘了 2 次':i===1?'3 天後複習':'今日練習'}</small></button>`).join(''); $$('[data-rescue-index]').forEach(b=>b.addEventListener('click',()=>{missionQueue=[rescueMissions[Number(b.dataset.rescueIndex)]];loadMission(0);openHandwritingDialog();})); }

if('serviceWorker' in navigator){
  window.addEventListener('load', async ()=>{
    try{
      const reg=await navigator.serviceWorker.register('./sw.js?v=2.1.0', {updateViaCache:'none'});
      await reg.update();
    }catch(err){ console.warn('Service Worker update skipped:',err); }
  });
}
renderLessonCards();renderRescue();bindLessonOpeners();updateUI();
const hash=location.hash.slice(1); if(hash.startsWith('lesson-'))openLesson(Number(hash.split('-')[1])); else if(hash&&$(`[data-view="${hash}"]`))navigate(hash);
