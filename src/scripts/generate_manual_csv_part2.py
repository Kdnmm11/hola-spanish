
import csv

# Manual Data 61-90
manual_data = [
    {
        "문장": "De joven, yo ( ) mucho deporte.",
        "단어원형": "hacer, 하다",
        "정답": "hacía",
        "번역": "젊었을 때, 나는 운동을 많이 [했었다].",
        "오답보기": "hago,haces,hace,hacemos,hacéis,hacen,hice,hiciste,hizo,hicimos,hicisteis,hicieron,hacía,hacías,hacía,hacíamos,hacíais,hacían,haré,harás,hará,haremos,haréis,harán,haría,harías,haríamos,haríais,harían,haga,hagas,hagamos,hagáis,hagan,hiciera,hicieras,hiciéramos,hicierais,hicieran",
        "시제및단서": "[불완전과거] 과거의 습관입니다."
    },
    {
        "문장": "Pronto ( ) Navidad.",
        "단어원형": "ser, 이다",
        "정답": "será",
        "번역": "곧 크리스마스가 [될 것이다].",
        "오답보기": "soy,eres,es,somos,sois,son,fui,fuiste,fue,fuimos,fuisteis,fueron,era,eras,era,éramos,erais,eran,seré,serás,será,seremos,seréis,serán,sería,serías,seríamos,seríais,serían,sea,seas,seamos,seáis,sean,fuera,fueras,fuéramos,fuerais,fueran",
        "시제및단서": "[미래] 'Pronto'(곧) 다가올 미래의 사실입니다."
    },
    {
        "문장": "Ayer ( ) fiebre todo el día.",
        "단어원형": "tener, 가지다(있다)",
        "정답": "tuve",
        "번역": "어제 하루 종일 열이 [있었다] (가졌다).",
        "오답보기": "tengo,tienes,tiene,tenemos,tenéis,tienen,tuve,tuviste,tuvo,tuvimos,tuvisteis,tuvieron,tenía,tenías,tenía,teníamos,teníais,tenían,tendré,tendrás,tendrá,tendremos,tendréis,tendrán,tendría,tendrías,tendríamos,tendríais,tendrían,tenga,tengas,tengamos,tengáis,tengan,tuviera,tuviéramos,tuvierais,tuvieran",
        "시제및단서": "[점과거] 'todo el día'(하루 종일)라는 기간 동안 완료된 상태입니다."
    },
    {
        "문장": "Espero que ( ) bien el examen.",
        "단어원형": "hacer, 하다(시험보다)",
        "정답": "hagas",
        "번역": "네가 시험을 잘 [보기를] (하기를) 바란다.",
        "오답보기": "hago,haces,hace,hacemos,hacéis,hacen,hice,hiciste,hizo,hicimos,hicisteis,hicieron,hacía,hacías,hacía,hacíamos,hacíais,hacían,haré,harás,hará,haremos,haréis,harán,haría,harías,haríamos,haríais,harían,haga,hagas,hagamos,hagáis,hagan,hiciera,hicieras,hiciéramos,hicierais,hicieran",
        "시제및단서": "[접속법 현재] 소망 표현입니다."
    },
    {
        "문장": "Cuando ( ) a la playa, llévate crema solar.",
        "단어원형": "ir, 가다",
        "정답": "vayas",
        "번역": "해변에 [갈 때], 선크림 가져가라.",
        "오답보기": "voy,vas,va,vamos,vais,van,fui,fuiste,fue,fuimos,fuisteis,fueron,iba,ibas,iba,íbamos,ibais,iban,iré,irás,irá,iremos,iréis,irán,iría,irías,iría,iríamos,iríais,irían,vaya,vayas,vayamos,vayáis,vayan,fuera,fueras,fuéramos,fuerais,fueran",
        "시제및단서": "[접속법 현재] 미래 시점의 'Cuando' 절입니다."
    },
    {
        "문장": "Ayer ( ) en casa todo el día.",
        "단어원형": "estar, 있다",
        "정답": "estuve",
        "번역": "어제 나는 하루 종일 집에 [있었다].",
        "오답보기": "estoy,estás,está,estamos,estáis,están,estuve,estuviste,estuvo,estuvimos,estuvisteis,estuvieron,estaba,estabas,estaba,estábamos,estabais,estaban,estaré,estarás,estará,estaremos,estaréis,estarán,estaría,estarías,estaríamos,estaríais,estarían,esté,estés,estemos,estéis,estén,estuviera,estuvieras,estuviéramos,estuvierais,estuvieran",
        "시제및단서": "[점과거] 'todo el día' 동안 지속되고 완료된 상태입니다."
    },
    {
        "문장": "Si ( ) más barato, lo compraríamos.",
        "단어원형": "ser, 이다",
        "정답": "fuera",
        "번역": "더 [싸다면], 우리는 그것을 살 텐데.",
        "오답보기": "soy,eres,es,somos,sois,son,fui,fuiste,fue,fuimos,fuisteis,fueron,era,eras,era,éramos,erais,eran,seré,serás,será,seremos,seréis,serán,sería,serías,seríamos,seríais,serían,sea,seas,seamos,seáis,sean,fuera,fueras,fuéramos,fuerais,fueran",
        "시제및단서": "[접속법 과거] 현재의 불가능한 가정을 나타냅니다."
    },
    {
        "문장": "Mañana ( ) a comer a tu casa.",
        "단어원형": "venir, 오다",
        "정답": "vendré",
        "번역": "내일 나는 네 집에 밥 먹으러 [올 것이다].",
        "오답보기": "vengo,vienes,viene,venimos,venís,vienen,vine,viniste,vino,vinimos,vinisteis,vinieron,venía,venías,venía,veníamos,veníais,venían,vendré,vendrás,vendrá,vendremos,vendréis,vendrán,vendría,vendrías,vendríamos,vendríais,vendrían,venga,vengas,vengamos,vengáis,vengan,viniera,vinieras,viniéramos,vinierais,vinieran",
        "시제및단서": "[미래] 내일의 계획입니다."
    },
    {
        "문장": "¡( ) la ventana, por favor!",
        "단어원형": "cerrar, 닫다",
        "정답": "Cierra",
        "번역": "창문 좀 [닫아] 줘!",
        "오답보기": "cierro,cierras,cierra,cerramos,cerráis,cierran,cerré,cerraste,cerró,cerramos,cerrasteis,cerraron,cerraba,cerrabas,cerrábamos,cerrabais,cerraban,cerraré,cerrarás,cerrará,cerraremos,cerraréis,cerrarán,cerraría,cerrarías,cerraríamos,cerraríais,cerrarían,cierre,cierres,cerremos,cerréis,cierren,cerrara,cerraras,cerráramos,cerrarais,cerraran",
        "시제및단서": "[명령법] 긍정 명령형(tú)입니다."
    },
    {
        "문장": "No creo que ( ) mañana.",
        "단어원형": "llover, 비오다",
        "정답": "llueva",
        "번역": "내일 비가 [올] 것 같지 않다.",
        "오답보기": "llueve,lloverá,llovió,llovía,llovería,llueva,lloviera",
        "시제및단서": "[접속법 현재] 부정적 추측(No creo que)입니다."
    },
    {
        "문장": "Ayer ( ) mucho frío.",
        "단어원형": "hacer, 하다(날씨)",
        "정답": "hizo",
        "번역": "어제는 날씨가 매우 [추웠다] (추운 날씨를 했다).",
        "오답보기": "hago,haces,hace,hacemos,hacéis,hacen,hice,hiciste,hizo,hicimos,hicisteis,hicieron,hacía,hacías,hacía,hacíamos,hacíais,hacían,haré,harás,hará,haremos,haréis,harán,haría,harías,haríamos,haríais,harían,haga,hagas,hagamos,hagáis,hagan,hiciera,hicieras,hiciéramos,hicierais,hicieran",
        "시제및단서": "[점과거] 어제 하루의 날씨를 완료된 사실로 봅니다."
    },
    {
        "문장": "Si ( ) tiempo, iré.",
        "단어원형": "tener, 가지다",
        "정답": "tengo",
        "번역": "시간이 [있으면], 갈게.",
        "오답보기": "tengo,tienes,tiene,tenemos,tenéis,tienen,tuve,tuviste,tuvo,tuvimos,tuvisteis,tuvieron,tenía,tenías,tenía,teníamos,teníais,tenían,tendré,tendrás,tendrá,tendremos,tendréis,tendrán,tendría,tendrías,tendríamos,tendríais,tendrían,tenga,tengas,tengamos,tengáis,tengan,tuviera,tuviéramos,tuvierais,tuvieran",
        "시제및단서": "[현재] 실현 가능한 조건절입니다."
    },
    {
        "문장": "Mañana ( ) a cenar.",
        "단어원형": "salir, 나가다/외출하다",
        "정답": "saldré",
        "번역": "내일 나는 저녁 먹으러 [나갈 것이다].",
        "오답보기": "salgo,sales,sale,salimos,salís,salen,salí,saliste,salió,salimos,salisteis,salieron,salía,salías,salía,salíamos,salíais,salían,saldré,saldrás,saldrá,saldremos,saldréis,saldrán,saldría,saldrías,saldríamos,saldríais,saldrían,salga,salgas,salgamos,salgáis,salgan,saliera,salieras,saliéramos,salierais,salieran",
        "시제및단서": "[미래] 내일의 계획입니다."
    },
    {
        "문장": "Me ( ) mucho la playa.",
        "단어원형": "gustar, 좋아하다",
        "정답": "gusta",
        "번역": "나는 해변을 많이 [좋아한다].",
        "오답보기": "gusto,gustas,gusta,gustamos,gustáis,gustan,gusté,gustaste,gustó,gustamos,gustasteis,gustaron,gustaba,gustabas,gustaba,gustábamos,gustabais,gustaban,gustaré,gustarás,gustará,gustaremos,gustaréis,gustarán,gustaría,gustarías,gustaríamos,gustaríais,gustarían,guste,gustes,gustemos,gustéis,gusten,gustara,gustaras,gustáramos,gustarais,gustaran",
        "시제및단서": "[현재] 현재의 기호입니다."
    },
    {
        "문장": "Es necesario que ( ) ahora.",
        "단어원형": "estudiar, 공부하다",
        "정답": "estudies",
        "번역": "네가 지금 [공부하는] 것이 필요하다.",
        "오답보기": "estudio,estudias,estudia,estudiamos,estudiáis,estudian,estudié,estudiaste,estudió,estudiamos,estudiasteis,estudiaron,estudiaba,estudiabas,estudiaba,estudiábamos,estudiabais,estudiaban,estudiaré,estudiarás,estudiará,estudiaremos,estudiaréis,estudiarán,estudiaría,estudiarías,estudiaríamos,estudiaríais,estudiarían,estudie,estudies,estudiemos,estudiéis,estudien,estudiara,estudiaras,estudiáramos,estudiarais,estudiaran",
        "시제및단서": "[접속법 현재] 필요성 표현입니다."
    },
    {
        "문장": "Ayer no ( ) nada.",
        "단어원형": "hacer, 하다",
        "정답": "hice",
        "번역": "어제 나는 아무것도 [하지 않았다].",
        "오답보기": "hago,haces,hace,hacemos,hacéis,hacen,hice,hiciste,hizo,hicimos,hicisteis,hicieron,hacía,hacías,hacía,hacíamos,hacíais,hacían,haré,harás,hará,haremos,haréis,harán,haría,harías,haríamos,haríais,harían,haga,hagas,hagamos,hagáis,hagan,hiciera,hicieras,hiciéramos,hicierais,hicieran",
        "시제및단서": "[점과거] 어제 완료된 행위입니다."
    },
    {
        "문장": "Si ( ) tiempo, te ayudaría.",
        "단어원형": "tener, 가지다",
        "정답": "tuviera",
        "번역": "시간이 [있다면], 너를 도울 텐데.",
        "오답보기": "tengo,tienes,tiene,tenemos,tenéis,tienen,tuve,tuviste,tuvo,tuvimos,tuvisteis,tuvieron,tenía,tenías,tenía,teníamos,teníais,tenían,tendré,tendrás,tendrá,tendremos,tendréis,tendrán,tendría,tendrías,tendríamos,tendríais,tendrían,tenga,tengas,tengamos,tengáis,tengan,tuviera,tuviéramos,tuvierais,tuvieran",
        "시제및단서": "[접속법 과거] 가정법 과거입니다."
    },
    {
        "문장": "¡( ) cuidado!",
        "단어원형": "tener, 가지다",
        "정답": "Ten",
        "번역": "조심[해]!",
        "오답보기": "tengo,tienes,tiene,tenemos,tenéis,tienen,tuve,tuviste,tuvo,tuvimos,tuvisteis,tuvieron,tenía,tenías,tenía,teníamos,teníais,tenían,tendré,tendrás,tendrá,tendremos,tendréis,tendrán,tendría,tendrías,tendríamos,tendríais,tendrían,tenga,tengas,tengamos,tengáis,tengan,tuviera,tuviéramos,tuvierais,tuvieran",
        "시제및단서": "[명령법] 긍정 명령형입니다."
    },
    {
        "문장": "Dudo que ( ) verdad.",
        "단어원형": "ser, 이다",
        "정답": "sea",
        "번역": "그것이 사실[인지] 의심스럽다.",
        "오답보기": "soy,eres,es,somos,sois,son,fui,fuiste,fue,fuimos,fuisteis,fueron,era,eras,era,éramos,erais,eran,seré,serás,será,seremos,seréis,serán,sería,serías,seríamos,seríais,serían,sea,seas,seamos,seáis,sean,fuera,fueras,fuéramos,fuerais,fueran",
        "시제및단서": "[접속법 현재] 의심 표현입니다."
    },
    {
        "문장": "Anoche ( ) muy bien.",
        "단어원형": "dormir, 자다",
        "정답": "dormí",
        "번역": "어젯밤 나는 아주 잘 [잤다].",
        "오답보기": "duermo,duermes,duerme,dormimos,dormís,duermen,dormí,dormiste,durmió,dormimos,dormisteis,durmieron,dormía,dormías,dormía,dormíamos,dormíais,dormían,dormiré,dormirás,dormirá,dormiremos,dormiréis,dormirán,dormiría,dormirías,dormiríamos,dormiríais,dormirían,duerma,duermas,durmamos,durmáis,duerman,durmiera,durmieras,durmiéramos,durmierais,durmieran",
        "시제및단서": "[점과거] 어젯밤 완료된 수면입니다."
    },
    {
        "문장": "Cuando ( ) a casa, avísame.",
        "단어원형": "volver, 돌아오다",
        "정답": "vuelvas",
        "번역": "집에 [돌아오면], 내게 알려줘.",
        "오답보기": "vuelvo,vuelves,vuelve,volvemos,volvéis,vuelven,volví,volviste,volvió,volvimos,volvisteis,volvieron,volvía,volvías,volvía,volvíamos,volvíais,volvían,volveré,volverás,volverá,volveremos,volveréis,volverán,volvería,volverías,volveríamos,volveríais,volverían,vuelva,vuelvas,volvamos,volváis,vuelvan,volviera,volvieras,volviéramos,volvierais,volvieran",
        "시제및단서": "[접속법 현재] 미래 시점입니다."
    },
    {
        "문장": "Ayer se ( ) la luz.",
        "단어원형": "ir, 가다/나가다",
        "정답": "fue",
        "번역": "어제 전기가 [나갔다].",
        "오답보기": "voy,vas,va,vamos,vais,van,fui,fuiste,fue,fuimos,fuisteis,fueron,iba,ibas,iba,íbamos,ibais,iban,iré,irás,irá,iremos,iréis,irán,iría,irías,iría,iríamos,iríais,irían,vaya,vayas,vayamos,vayáis,vayan,fuera,fueras,fuéramos,fuerais,fueran",
        "시제및단서": "[점과거] 어제 발생한 사건입니다."
    },
    {
        "문장": "Es importante que ( ) las manos.",
        "단어원형": "lavarse, 씻다",
        "정답": "te laves",
        "번역": "네가 손을 [씻는] 것이 중요하다.",
        "오답보기": "lavo,lavas,lava,lavamos,laváis,lavan,lavé,lavaste,lavó,lavamos,lavasteis,lavaron,lavaba,lavabas,lavaba,lavábamos,lavabais,lavaban,lavaré,lavarás,lavará,lavaremos,lavaréis,lavarán,lavaría,lavarías,lavaríamos,lavaríais,lavarían,lave,laves,lavemos,lavéis,laven,lavara,lavaras,laváramos,lavarais,lavaran",
        "시제및단서": "[접속법 현재] 중요성 표현입니다. (재귀 대명사 포함)"
    },
    {
        "문장": "El año pasado, ( ) mucho.",
        "단어원형": "trabajar, 일하다",
        "정답": "trabajé",
        "번역": "작년에 나는 일을 많이 [했다].",
        "오답보기": "trabajo,trabajas,trabaja,trabajamos,trabajáis,trabajan,trabajé,trabajaste,trabajó,trabajamos,trabajasteis,trabajaron,trabajaba,trabajabas,trabajaba,trabajábamos,trabajabais,trabajaban,trabajaré,trabajarás,trabajará,trabajaremos,trabajaréis,trabajarán,trabajaría,trabajarías,trabajaríamos,trabajaríais,trabajarían,trabaje,trabajes,trabajemos,trabajéis,trabajen,trabajara,trabajaras,trabajáramos,trabajarais,trabajaran",
        "시제및단서": "[점과거] 작년에 완료된 행위입니다."
    },
    {
        "문장": "Cuando era niño, ( ) mucho.",
        "단어원형": "jugar, 놀다",
        "정답": "jugaba",
        "번역": "어렸을 때, 나는 많이 [놀곤 했다].",
        "오답보기": "juego,juegas,juega,jugamos,jugáis,juegan,jugué,jugaste,jugó,jugamos,jugasteis,jugaron,jugabas,jugábamos,jugabais,jugaban,jugaré,jugarás,jugará,jugaremos,jugaréis,jugarán,jugaría,jugarías,jugaríamos,jugaríais,jugarían,juegue,juegues,jueguemos,jueguéis,jueguen,jugara,jugaras,jugáramos,jugarais,jugaran",
        "시제및단서": "[불완전과거] 과거의 습관입니다."
    },
    {
        "문장": "¡( ) aquí!",
        "단어원형": "venir, 오다",
        "정답": "Ven",
        "번역": "이리 [와]!",
        "오답보기": "vengo,vienes,viene,venimos,venís,vienen,vine,viniste,vino,vinimos,vinisteis,vinieron,venía,venías,venía,veníamos,veníais,venían,vendré,vendrás,vendrá,vendremos,vendréis,vendrán,vendría,vendrías,vendríamos,vendríais,vendrían,venga,vengas,vengamos,vengáis,vengan,viniera,vinieras,viniéramos,vinierais,vinieran",
        "시제및단서": "[명령법] 긍정 명령형입니다."
    },
    {
        "문장": "Me molesta que ( ) tarde.",
        "단어원형": "llegar, 도착하다",
        "정답": "llegues",
        "번역": "네가 늦게 [도착하는] 것이 짜증난다.",
        "오답보기": "llego,llegas,llega,llegamos,llegáis,llegan,llegué,llegaste,llegó,llegasteis,llegaron,llegaba,llegabas,llegábamos,llegabais,llegaban,llegaré,llegarás,llegará,llegaremos,llegaréis,llegarán,llegaría,llegarías,llegaríamos,llegaríais,llegarían,llegue,llegues,lleguemos,lleguéis,lleguen,llegara,llegaras,llegáramos,llegarais,llegaran",
        "시제및단서": "[접속법 현재] 감정 유발 원인입니다."
    },
    {
        "문장": "El mes pasado, ( ) un libro.",
        "단어원형": "leer, 읽다",
        "정답": "leí",
        "번역": "지난달에 나는 책을 한 권 [읽었다].",
        "오답보기": "leo,lees,lee,leemos,leéis,leen,leí,leíste,leyó,leímos,leísteis,leyeron,leía,leías,leía,leíamos,leíais,leían,leeré,leerás,leerá,leeremos,leeréis,leerán,leería,leerías,leeríamos,leeríais,leerían,lea,leas,leamos,leáis,lean,leyera,leyeras,leyéramos,leyerais,leyeran",
        "시제및단서": "[점과거] 지난달 완료된 행위입니다."
    },
    {
        "문장": "Si ( ) rico, viajaría.",
        "단어원형": "ser, 이다",
        "정답": "fuera",
        "번역": "내가 부자[라면], 여행할 텐데.",
        "오답보기": "soy,eres,es,somos,sois,son,fui,fuiste,fue,fuimos,fuisteis,fueron,era,eras,era,éramos,erais,eran,seré,serás,será,seremos,seréis,serán,sería,serías,seríamos,seríais,serían,sea,seas,seamos,seáis,sean,fuera,fueras,fuéramos,fuerais,fueran",
        "시제및단서": "[접속법 과거] 가정법 과거입니다."
    },
    {
        "문장": "Ojalá ( ) venir.",
        "단어원형": "poder, 할수있다",
        "정답": "puedas",
        "번역": "네가 올 수 [있기를] 바란다.",
        "오답보기": "puedo,puedes,puede,podemos,podéis,pueden,pudiste,pudo,pudimos,pudisteis,pudieron,podía,podías,podía,podíamos,podíais,podían,podré,podrás,podrá,podremos,podréis,podrán,podría,podrías,podríamos,podríais,podrían,pueda,puedas,podamos,podáis,puedan,pudiera,pudieras,pudiéramos,pudierais,pudieran",
        "시제및단서": "[접속법 현재] 소망 표현입니다."
    }
]

output_path = 'src/data/conjugation_dataset_v2.csv'
headers = ['시제', '문장 (빈칸 포함)', '동사 기본형', '정답', '번역', '설명', '오답보기']

with open(output_path, 'a', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=headers)
    for row in manual_data:
        writer.writerow({
            '시제': row['시제및단서'].split(']')[0].replace('[', ''),
            '문장 (빈칸 포함)': row['문장'],
            '동사 기본형': row['단어원형'],
            '정답': row['정답'],
            '번역': row['번역'],
            '설명': row['시제및단서'],
            '오답보기': row['오답보기']
        })

print(f"Appended {len(manual_data)} rows to {output_path}")
