import { Language } from './i18n/translations';

export interface GospelVerse {
  id: string;
  reference: string;
  texts: Record<Language, string>;
}

export const GOSPEL_VERSES: GospelVerse[] = [
  {
    id: 'mt-7-7',
    reference: 'Mt 7, 7',
    texts: {
      vi: '“Anh em cứ xin thì sẽ được, cứ tìm thì sẽ thấy, cứ gõ cửa thì sẽ mở cho.” (Mt 7, 7)',
      en: '“Ask, and it will be given to you; seek, and you will find; knock, and it will be opened to you.” (Matthew 7:7)',
      zh: '“你们祈求，就给你们；寻找，就寻见；叩门，就给你们开门。”（玛 7:7）',
      fr: '« Demandez, et l\'on vous donnera ; cherchez, et vous trouverez ; frappez, et l\'on vous ouvrira. » (Mt 7, 7)',
      es: '«Pedid, y se os dará; buscad, y hallaréis; llamad, y se os abrirá.» (Mt 7, 7)',
      ja: '「求めなさい。そうすれば、与えられる。探しなさい。そうすれば、見つかる。門をたたきなさい。そうすれば、開かれる。」（マタイ 7:7）',
      ko: '“청하여라, 너희에게 주실 것이다. 찾아라, 너희가 얻을 것이다. 문을 두드려라, 너희에게 열릴 것이다.” (마태 7,7)',
      ru: '«Просите, и дано будет вам; ищите, и найдете; стучите, и отворят вам.» (Мф 7:7)',
      de: '„Bittet, so wird euch gegeben; suchet, so werdet ihr finden; klopfet an, so wird euch aufgetan.“ (Mt 7,7)',
      pt: '“Pedi e vos será dado; buscai e achareis; batei e abrir-se-vos-á.” (Mt 7, 7)',
      it: '«Chiedete e vi sarà dato, cercate e troverete, bussate e vi sarà aperto.» (Mt 7, 7)',
      ar: '«اسْأَلُوا تُعْطَوْا، اُطْلُبُوا تَجِدُوا، اِقْرَعُوا يُفْتَحْ لَكُمْ.» (متى ٧: ٧)',
      hi: '“मांगो, तो तुम्हें दिया जाएगा; ढूंढो, तो तुम पाओगे; खटखटाओ, तो तुम्हारे लिए खोला जाएगा।” (मत्ती 7:7)'
    }
  },
  {
    id: 'mt-11-28',
    reference: 'Mt 11, 28',
    texts: {
      vi: '“Tất cả những ai đang vất vả mang gánh nặng nề, hãy đến cùng Ta, Ta sẽ cho nghỉ ngơi bồi dưỡng.” (Mt 11, 28)',
      en: '“Come to me, all you who are weary and burdened, and I will give you rest.” (Matthew 11:28)',
      zh: '“凡劳苦和负重担的，你们都到我跟前来，我要使你们安息。”（玛 11:28）',
      fr: '« Venez à moi, vous tous qui peinez sous le poids du fardeau, et moi, je vous procurerai le repos. » (Mt 11, 28)',
      es: '«Venid a mí todos los que estáis fatigados y sobrecargados, y yo os daré descanso.» (Mt 11, 28)',
      ja: '「疲れた者、重荷を背負う者は、だれでもわたしのもとに来なさい。休ませてあげよう。」（マタイ 11:28）',
      ko: '“고생하며 무거운 짐을 진 너희는 모두 나에게 오너라. 내가 너희에게 안식을 주겠다.” (마태 11,28)',
      ru: '«Придите ко Мне все труждающиеся и обремененные, и Я успокою вас.» (Мф 11:28)',
      de: '„Kommt alle zu mir, die ihr mühselig und beladen seid; ich will euch erquicken.“ (Mt 11,28)',
      pt: '“Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.” (Mt 11, 28)',
      it: '«Venite a me, voi tutti che siete affaticati e oppressi, e io vi darò riposo.» (Mt 11, 28)',
      ar: '«تَعَالَوْا إِلَيَّ يَا جَمِيعَ الْمُتْعَبِينَ وَالثَّقِيلِي الأَحْمَالِ، وَأَنَا أُرِيحُكُمْ.» (متى ١١: ٢٨)',
      hi: '“हे सब परिश्रम करने वालो और बोझ से दबे हुए लोगो, मेरे पास आओ; मैं तुम्हें विश्राम दूंगा।” (मत्ती 11:28)'
    }
  },
  {
    id: 'ga-14-27',
    reference: 'Ga 14, 27',
    texts: {
      vi: '“Thầy để lại bình an cho anh em, Thầy ban cho anh em bình an của Thầy.” (Ga 14, 27)',
      en: '“Peace I leave with you; my peace I give you. Do not let your hearts be troubled and do not be afraid.” (John 14:27)',
      zh: '“我把平安留给你们，我将我的平安赐给你们。你们心里不要烦乱，也不要胆怯。”（若 14:27）',
      fr: '« Je vous laisse la paix, je vous donne ma paix. Que votre cœur ne soit pas troublé ni effrayé. » (Jn 14, 27)',
      es: '«La paz os dejo, mi paz os doy. No se turbe vuestro corazón ni tenga miedo.» (Jn 14, 27)',
      ja: '「わたしは、平和をあなたがたに残し、わたしの平和を与える。心を騒がせるな。おびえるな。」（ヨハネ 14:27）',
      ko: '“나는 너희에게 평화를 남기고 간다. 내 평화를 너희에게 준다. 너희 마음이 산란해지는 일도, 겁을 내는 일도 없도록 하여라.” (요한 14,27)',
      ru: '«Мир оставляю вам, мир Мой даю вам. Да не смущается сердце ваше и да не устрашается.» (Ин 14:27)',
      de: '„Frieden hinterlasse ich euch, meinen Frieden gebe ich euch. Euer Herz beunruhige sich nicht und verzage nicht.“ (Joh 14,27)',
      pt: '“Deixo-vos a paz, a minha paz vos dou. Não se turbe o vosso coração, nem se atemorize.” (Jo 14, 27)',
      it: '«Vi lascio la pace, vi do la mia pace. Non sia turbato il vostro cuore e non abbia timore.» (Gv 14, 27)',
      ar: '«سَلاَمًا أَتْرُكُ لَكُمْ. سَلاَمِي أُعْطِيكُمْ. لاَ تَضْطَرِبْ قُلُوبُكُمْ وَلاَ تَرْهَبْ.» (يوحنا ١٤: ٢٧)',
      hi: '“मैं तुम्हें शांति दिए जाता हूँ; अपनी शांति तुम्हें देता हूँ। तुम्हारा मन व्याकुल न हो और न डरे।” (यूहन्ना 14:27)'
    }
  },
  {
    id: 'ga-13-34',
    reference: 'Ga 13, 34',
    texts: {
      vi: '“Thầy ban cho anh em một điều răn mới là anh em hãy yêu thương nhau như Thầy đã yêu thương anh em.” (Ga 13, 34)',
      en: '“A new command I give you: Love one another. As I have loved you, so you must love one another.” (John 13:34)',
      zh: '“我给你们一条新诫命：你们该彼此相爱；如同我爱了你们，你们也该照样彼此相爱。”（若 13:34）',
      fr: '« Je vous donne un commandement nouveau : c\'est de vous aimer les uns les autres. Comme je vous ai aimés, vous aussi aimez-vous les uns les autres. » (Jn 13, 34)',
      es: '«Un mandamiento nuevo os doy: Que os améis unos a otros; como yo os he amado, que también os améis unos a otros.» (Jn 13, 34)',
      ja: '「あなたがたに新しい掟を与える。互いに愛し合いなさい。わたしがあなたがたを愛したように、あなたがたも互いに愛し合いなさい。」（ヨハネ 13:34）',
      ko: '“내가 너희에게 새 계명을 준다. 서로 사랑하여라. 내가 너희를 사랑한 것처럼 너희도 서로 사랑하여라.” (요한 13,34)',
      ru: '«Заповедь новую даю вам, да любите друг друга; как Я возлюбил вас, так и вы да любите друг друга.» (Ин 13:34)',
      de: '„Ein neues Gebot gebe ich euch: Liebt einander! Wie ich euch geliebt habe, so sollt auch ihr einander lieben.“ (Joh 13,34)',
      pt: '“Um novo mandamento vos dou: Que vos ameis uns aos outros; como eu vos amei a vós, que também vós uns aos outros vos ameis.” (Jo 13, 34)',
      it: '«Vi do un comandamento nuovo: che vi amiate gli uni gli altri; come io ho amato voi, così amatevi anche voi gli uni gli altri.» (Gv 13, 34)',
      ar: '«وَصِيَّةً جَدِيدَةً أَنَا أُعْطِيكُمْ: أَنْ تُحِبُّوا بَعْضُكُمْ بَعْضًا. كَمَا أَحْبَبْتُكُمْ أَنَا تُحِبُّونَ أَنْتُمْ أَيْضًا بَعْضُكُمْ بَعْضًا.» (يوحنا ١٣: ٣٤)',
      hi: '“मैं तुम्हें एक नई आज्ञा देता हूँ, कि एक दूसरे से प्रेम रखो: जैसा मैं ने तुम से प्रेम रखा है, वैसा ही तुम भी एक दूसरे से प्रेम रखो।” (यूहन्ना 13:34)'
    }
  },
  {
    id: 'tv-119-105',
    reference: 'Tv 119, 105',
    texts: {
      vi: '“Lời Chúa là ngọn đèn soi cho con bước, là ánh sáng chỉ đường con đi.” (Tv 119, 105)',
      en: '“Your word is a lamp for my feet, a light on my path.” (Psalm 119:105)',
      zh: '“你的语言是我步履前的灵灯，是我路途上的光明。”（咏 119:105）',
      fr: '« Ta parole est une lampe à mes pieds, et une lumière sur mon sentier. » (Ps 119, 105)',
      es: '«Lámpara es a mis pies tu palabra, y lumbrera a mi camino.» (Sal 119, 105)',
      ja: '「あなたの御言葉は、わたしの歩みを照らす灯、わたしの道を照らす光。」（詩編 119:105）',
      ko: '“당신의 말씀은 제 발에 등불, 저의 길에 빛입니다.” (시편 119,105)',
      ru: '«Слово Твое — светильник ноге моей и свет стезе моей.» (Пс 118:105)',
      de: '„Dein Wort ist meines Fußes Leuchte und ein Licht auf meinem Wege.“ (Ps 119,105)',
      pt: '“Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.” (Sl 119, 105)',
      it: '«La tua parola è una lampada al mio piede e una luce sul mio sentiero.» (Sal 119, 105)',
      ar: '«سِرَاجٌ لِرِجْلِي كَلاَمُكَ وَنُورٌ لِسَبِيلِي.» (مزمور ١١٩: ١٠٥)',
      hi: '“तेरा वचन मेरे पांव के लिये दीपक, और मेरे मार्ग के लिये उजियाला है।” (भजन संहिता 119:105)'
    }
  },
  {
    id: 'mt-28-20',
    reference: 'Mt 28, 20',
    texts: {
      vi: '“Và đây, Thầy ở cùng anh em mọi ngày cho đến tận thế.” (Mt 28, 20)',
      en: '“And surely I am with you always, to the very end of the age.” (Matthew 28:20)',
      zh: '“看！我同你们天天在一起，直到今世的终结。”（玛 28:20）',
      fr: '« Et moi, je suis avec vous tous les jours jusqu\'à la fin du monde. » (Mt 28, 20)',
      es: '«Y he aquí yo estoy con vosotros todos los días, hasta el fin del mundo.» (Mt 28, 20)',
      ja: '「わたしは世の終わりまで、いつもあなたがたと共にいる。」（マタイ 28:20）',
      ko: '“보라, 내가 세상 끝 날까지 언제나 너희와 함께 있겠다.” (마태 28,20)',
      ru: '«И се, Я с вами во все дни до скончания века.» (Мф 28:20)',
      de: '„Und siehe, ich bin bei euch alle Tage bis an das Ende der Welt.“ (Mt 28,20)',
      pt: '“E eis que eu estou convosco todos os dias, até à consumação dos séculos.” (Mt 28, 20)',
      it: '«Ed ecco, io sono con voi tutti i giorni, fino alla fine del mondo.» (Mt 28, 20)',
      ar: '«وَهَا أَنَا مَعَكُمْ كُلَّ الأَيَّامِ إِلَى انْقِضَاءِ الدَّهْرِ.» (متى ٢٨: ٢٠)',
      hi: '“और देखो, मैं जगत के अन्त तक सदैव तुम्हारे संग हूँ।” (मत्ती 28:20)'
    }
  },
  {
    id: 'pl-4-13',
    reference: 'Pl 4, 13',
    texts: {
      vi: '“Với Đấng ban sức mạnh cho tôi, tôi chịu được hết mọi sự.” (Pl 4, 13)',
      en: '“I can do all this through him who gives me strength.” (Philippians 4:13)',
      zh: '“我赖加强我力量的那位，能应付一切。”（斐 4:13）',
      fr: '« Je peux tout en celui qui me fortifie. » (Ph 4, 13)',
      es: '«Todo lo puedo en Cristo que me fortalece.» (Fil 4, 13)',
      ja: '「わたしを強めてくださる方のお陰で、わたしにはすべてが可能です。」（フィリピ 4:13）',
      ko: '“나에게 힘을 주시는 분 안에서 나는 모든 것을 할 수 있습니다.” (필리피 4,13)',
      ru: '«Все могу в укрепляющем меня Иисусе Христе.» (Флп 4:13)',
      de: '„Ich vermag alles durch den, der mich mächtig macht.“ (Phil 4,13)',
      pt: '“Tudo posso naquele que me fortalece.” (Fp 4, 13)',
      it: '«Tutto posso in colui che mi dà la forza.» (Fil 4, 13)',
      ar: '«أَسْتَطِيعُ كُلَّ شَيْءٍ فِي الْمَسِيحِ الَّذِي يُقَوِّينِي.» (فيلبي ٤: ١٣)',
      hi: '“जो मुझे सामर्थ्य देता है उसमें मैं सब कुछ कर सकता हूँ।” (फिलिप्पियों 4:13)'
    }
  },
  {
    id: 'ga-8-12',
    reference: 'Ga 8, 12',
    texts: {
      vi: '“Tôi là ánh sáng thế gian. Ai theo tôi, sẽ không phải đi trong bóng tối, nhưng sẽ nhận được ánh sáng đem lại sự sống.” (Ga 8, 12)',
      en: '“I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life.” (John 8:12)',
      zh: '“我是世界的光；跟随我的，决不在黑暗中行走，必有生命的光。”（若 8:12）',
      fr: '« Moi, je suis la lumière du monde. Celui qui me suit ne marchera pas dans les ténèbres, il aura la lumière de la vie. » (Jn 8, 12)',
      es: '«Yo soy la luz del mundo; el que me sigue, no andará en tinieblas, sino que tendrá la luz de la vida.» (Jn 8, 12)',
      ja: '「わたしは世の光である。わたしに従う者は暗闇の中を歩かず、命の光を持つ。」（ヨハネ 8:12）',
      ko: '“나는 세상의 빛이다. 나를 따르는 이는 어둠 속을 걷지 않고 생명의 빛을 얻을 것이다.” (요한 8,12)',
      ru: '«Я свет миру; кто последует за Мною, тот не будет ходить во тьме, но будет иметь свет жизни.» (Ин 8:12)',
      de: '„Ich bin das Licht der Welt. Wer mir nachfolgt, der wird nicht wandeln in der Finsternis, sondern wird das Licht des Lebens haben.“ (Joh 8,12)',
      pt: '“Eu sou a luz do mundo; quem me segue não andará em trevas, mas terá a luz da vida.” (Jo 8, 12)',
      it: '«Io sono la luce del mondo; chi segue me, non camminerà nelle tenebre, ma avrà la luce della vita.» (Gv 8, 12)',
      ar: '«أَنَا هُوَ نُورُ الْعَالَمِ. مَنْ يَتْبَعْنِي فَلاَ يَمْشِي فِي الظُّلْمَةِ بَلْ يَكُونُ لَهُ نُورُ الْحَيَاةِ.» (يوحنا ٨: ١٢)',
      hi: '“जगत की ज्योति मैं हूँ; जो मेरे पीछे हो लेगा, वह अन्धकार में न चलेगा, परन्तु जीवन की ज्योति पाएगा।” (यूहन्ना 8:12)'
    }
  },
  {
    id: '1ga-4-16',
    reference: '1 Ga 4, 16',
    texts: {
      vi: '“Thiên Chúa là tình yêu: ai ở lại trong tình yêu thì ở lại trong Thiên Chúa, và Thiên Chúa ở lại trong người ấy.” (1 Ga 4, 16)',
      en: '“God is love. Whoever lives in love lives in God, and God in them.” (1 John 4:16)',
      zh: '“天主是爱，那存留在爱内的，就存留在天主内，天主也存留在他内。”（若一 4:16）',
      fr: '« Dieu est amour : qui demeure dans l\'amour demeure en Dieu, et Dieu demeure en lui. » (1 Jn 4, 16)',
      es: '«Dios es amor; y el que permanece en amor, permanece en Dios, y Dios en él.» (1 Jn 4, 16)',
      ja: '「神は愛です。愛にとどまる人は、神にとどまり、神もその人の内にとどまってくださいます。」（一ヨハネ 4:16）',
      ko: '“하느님은 사랑이십니다. 사랑 안에 머무르는 사람은 하느님 안에 머무르고 하느님께서도 그 사람 안에 머무르십니다.” (1요한 4,16)',
      ru: '«Бог есть любовь, и пребывающий в любви пребывает в Боге, и Бог в нем.» (1 Ин 4:16)',
      de: '„Gott ist die Liebe; und wer in der Liebe bleibt, der bleibt in Gott und Gott in ihm.“ (1 Joh 4,16)',
      pt: '“Deus é amor; e quem está em amor está em Deus, e Deus nele.” (1 Jo 4, 16)',
      it: '«Dio è amore; chi rimane nell\'amore rimane in Dio e Dio rimane in lui.» (1 Gv 4, 16)',
      ar: '«اَللهُ مَحَبَّةٌ، وَمَنْ يَثْبُتْ فِي الْمَحَبَّةِ، يَثْبُتْ فِي اللهِ وَاللهُ فِيهِ.» (١ يوحنا ٤: ١٦)',
      hi: '“परमेश्वर प्रेम है: और जो प्रेम में बना रहता है, वह परमेश्वर में बना रहता है, और परमेश्वर उसमें बना रहता है।” (1 यूहन्ना 4:16)'
    }
  },
  {
    id: 'tv-23-1',
    reference: 'Tv 23, 1',
    texts: {
      vi: '“Chúa là mục tử chăn dắt tôi, tôi chẳng thiếu thốn gì.” (Tv 23, 1)',
      en: '“The Lord is my shepherd, I lack nothing.” (Psalm 23:1)',
      zh: '“上主是我的牧者，我实在一无所缺。”（咏 23:1）',
      fr: '« Le Seigneur est mon berger : je ne manque de rien. » (Ps 23, 1)',
      es: '«El Señor es mi pastor; nada me faltará.» (Sal 23, 1)',
      ja: '「主は羊飼い、わたしには何も欠けることがない。」（詩編 23:1）',
      ko: '“주님은 나의 목자, 아쉬울 것 없어라.” (시편 23,1)',
      ru: '«Господь — Пастырь мой; я ни в чем не буду нуждаться.» (Пс 22:1)',
      de: '„Der Herr ist mein Hirte, mir wird nichts mangeln.“ (Ps 23,1)',
      pt: '“O Senhor é o meu pastor, nada me faltará.” (Sl 23, 1)',
      it: '«Il Signore è il mio pastore: non manco di nulla.» (Sal 23, 1)',
      ar: '«الرَّبُّ رَاعِيَّ فَلاَ يُعْوِزُنِي شَيْءٌ.» (مزمور ٢٣: ١)',
      hi: '“यहोवा मेरा चरवाहा है, मुझे कोई घटी न होगी।” (भजन संहिता 23:1)'
    }
  }
];

export function getRandomGospelVerseIndex(): number {
  return Math.floor(Math.random() * GOSPEL_VERSES.length);
}
