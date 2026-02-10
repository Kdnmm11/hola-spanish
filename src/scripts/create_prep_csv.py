import csv

# Data from prepositionData.ts (Final synchronized version)
data = [
    {'id': 'a', 'name': 'a', 'usages': [
        {'category': 'loc_direction', 'categoryLabel': '방향/목적지', 'description': '이동의 목적지 (~로)', 'example': 'Este verano iremos *a* la costa sur para disfrutar del mar.', 'translation': '이번 여름에 우리는 바다를 즐기기 위해 남쪽 해안으로 갈 것이다.'},
        {'category': 'time_point', 'categoryLabel': '시점', 'description': '구체적인 시각 (~에)', 'example': 'La ceremonia de graduación comenzará puntualmente *a* las once.', 'translation': '졸업식은 11시 정각에 시작될 것이다.'},
        {'category': 'loc_position', 'categoryLabel': '위치/거리', 'description': '거리 (~만큼 떨어져)', 'example': 'El aeropuerto está *a* veinte kilómetros del centro de la ciudad.', 'translation': '공항은 도심에서 20킬로미터 떨어져 있다.'},
        {'category': 'company', 'categoryLabel': '인칭 목적어', 'description': '특정 사람을 목적어로 취할 때', 'example': 'Ayer vi *a* tu hermano en el supermercado pero no me saludó.', 'translation': '어제 슈퍼마켓에서 네 동생을 봤는데 나에게 인사하지 않았다.'},
        {'category': 'manner', 'categoryLabel': '방식', 'description': '행동의 방식 (~으로)', 'example': 'Siempre va *a* pie al trabajo para mantenerse en forma.', 'translation': '그는 건강을 유지하기 위해 항상 걸어서(도보로) 출근한다.'},
        {'category': 'method', 'categoryLabel': '비율/속도', 'description': '속도나 가격의 비율', 'example': 'El coche iba *a* ciento veinte kilómetros por hora cuando ocurrió el accidente.', 'translation': '사고가 났을 때 그 차는 시속 120km로 달리고 있었다.'}
    ]},
    {'id': 'de', 'name': 'de', 'usages': [
        {'category': 'loc_origin', 'categoryLabel': '출신/기원', 'description': '출신 (~에서, ~의)', 'example': 'El nuevo profesor de español es *de* una pequeña ciudad de Andalucía.', 'translation': '새로 오신 스페인어 선생님은 안달루시아의 작은 도시 출신이다.'},
        {'category': 'company', 'categoryLabel': '소유', 'description': '소유 (~의)', 'example': 'La decision del director sorprendió a todos los empleados.', 'translation': '이사님의 결정은 모든 직원들을 놀라게 했다.'},
        {'category': 'material', 'categoryLabel': '재료', 'description': '재료 (~로 만든)', 'example': 'Me regalaron una hermosa caja *de* madera tallada a mano.', 'translation': '나는 손으로 조각된 아름다운 나무 상자를 선물 받았다.'},
        {'category': 'topic', 'categoryLabel': '주제', 'description': '주제 (~에 대해)', 'example': 'No me gusta hablar *de* política en las reuniones familiares.', 'translation': '나는 가족 모임에서 정치에 대해 이야기하는 것을 좋아하지 않는다.'},
        {'category': 'cause', 'categoryLabel': '원인', 'description': '감정이나 행동의 원인', 'example': 'La niña lloraba *de* alegría al ver a su padre regresar.', 'translation': '그 소녀는 아버지가 돌아오는 것을 보고 기뻐서 울었다.'},
        {'category': 'method', 'categoryLabel': '자격/신분', 'description': '직업이나 역할 (~로서)', 'example': 'Trabaja *de* camarero los fines de semana para pagar sus estudios.', 'translation': '그는 학비를 벌기 위해 주말에는 웨이터로 일한다.'},
        {'category': 'material', 'categoryLabel': '부분/수량', 'description': '전체 중의 일부', 'example': '¿Quieres un poco *de* agua?', 'translation': '물 좀 마실래?'},
        {'category': 'time_point', 'categoryLabel': '시점(시간대)', 'description': '하루 중 특정 시간대 (구체적 시간 뒤)', 'example': 'Son las tres *de* la tarde.', 'translation': '오후 3시이다.'}
    ]},
    {'id': 'en', 'name': 'en', 'usages': [
        {'category': 'loc_position', 'categoryLabel': '위치(내부/위)', 'description': '장소의 내부나 위 (~에)', 'example': 'Las llaves que habías perdido estaban guardadas *en* el cajón del escritorio.', 'translation': '네가 잃어버렸던 열쇠들은 책상 서랍 안에 보관되어 있었다.'},
        {'category': 'method', 'categoryLabel': '수단(교통)', 'description': '교통 수단 (~을 타고)', 'example': 'Es mucho más ecológico viajar *en* transporte público que utilizar el coche privado.', 'translation': '개인용 차를 이용하는 것보다 대중교통을 타고 여행하는 것이 훨씬 친환경적이다.'},
        {'category': 'time_point', 'categoryLabel': '시점(기간)', 'description': '계절, 달, 연도 (~에)', 'example': '*En* verano, las temperaturas en el sur de España son muy altas.', 'translation': '여름에는 스페인 남부의 기온이 매우 높다.'},
        {'category': 'time_duration', 'categoryLabel': '소요 시간', 'description': '걸리는 시간 (~만에)', 'example': 'El equipo de ingenieros logró resolver el problem técnico *en* apenas dos horas.', 'translation': '엔지니어 팀은 기술적인 문제를 불과 2시간 만에 해결해냈다.'},
        {'category': 'manner', 'categoryLabel': '상태/방식', 'description': '어떤 상태로', 'example': 'Me lo dijo *en* broma, pero me sentó mal.', 'translation': '그는 농담으로 말했지만, 나는 기분이 나빴다.'}
    ]},
    {'id': 'por', 'name': 'por', 'usages': [
        {'category': 'cause', 'categoryLabel': '원인/이유', 'description': '원인 (~때문에)', 'example': 'El vuelo fue cancelado *por* las adversas condiciones meteorológicas en el aeropuerto.', 'translation': '그 비행편은 공항의 열악한 기상 조건 때문에 취소되었다.'},
        {'category': 'loc_path', 'categoryLabel': '경로/경유', 'description': '지나가는 곳 (~를 통해)', 'example': 'Para llegar al museo, tienes que pasar *por* el parque central.', 'translation': '박물관에 가려면 중앙 공원을 지나가야 한다.'},
        {'category': 'time_duration', 'categoryLabel': '기간/빈도', 'description': '대략적인 기간/시간대', 'example': 'Normalmente, prefiero estudiar *por* la tarde cuando el ambiente es más tranquilo.', 'translation': '보통 나는 분위기가 더 차분한 오후 시간대에 공부하는 것을 선호한다.'},
        {'category': 'exchange', 'categoryLabel': '교환/대체', 'description': '교환 (~대신에, ~를 받고)', 'example': 'Te cambio mi bocadillo de jamón por tu manzana.', 'translation': '내 햄 샌드위치를 네 사과와 바꾸자.'},
        {'category': 'method', 'categoryLabel': '행위자(수동태)', 'description': '수동태의 행위자 (~에 의해)', 'example': 'El libro fue escrito *por* un autor desconocido en el siglo XV.', 'translation': '그 책은 15세기에 무명 작가에 의해 쓰여졌다.'},
        {'category': 'method', 'categoryLabel': '배분', 'description': '~당 (단위)', 'example': 'Nos dieron un regalo *por* persona.', 'translation': '우리에게 1인당 선물 하나씩을 주었다.'}
    ]},
    {'id': 'para', 'name': 'para', 'usages': [
        {'category': 'purpose', 'categoryLabel': '목적/용도', 'description': '목적 (~을 위해)', 'example': 'Ella está ahorrando cada céntimo *para* poder comprarse una casa propia el próximo año.', 'translation': '그녀는 내년에 내 집 마련을 하기 위해 한 푼 한 푼 아끼고 있다.'},
        {'category': 'loc_direction', 'categoryLabel': '방향/목적지', 'description': '최종 목적지 (~행)', 'example': 'El tren que sale de la vía tres va directamente *para* la frontera con Francia.', 'translation': '3번 승강장에서 출발하는 기차는 프랑스 국경 쪽으로 바로 간다.'},
        {'category': 'time_deadline', 'categoryLabel': '기한', 'description': '기한 (~까지)', 'example': 'Necesito que entregues el informe de ventas *para* el próximo viernes sin falta.', 'translation': '다음 주 금요일까지 판매 보고서를 반드시 제출해 주길 바란다.'},
        {'category': 'company', 'categoryLabel': '수혜자', 'description': '대상 (~에게)', 'example': 'He preparado esta presentación especial *para* los nuevos inversores del proyecto.', 'translation': '나는 프로젝트의 새로운 투자자들을 위해 이 특별 발표를 준비했다.'},
        {'category': 'topic', 'categoryLabel': '의견', 'description': '관점 (~에게는)', 'example': '*Para* mí, lo más importante en la vida es la salud.', 'translation': '나에게 있어서 인생에서 가장 중요한 것은 건강이다.'},
        {'category': 'topic', 'categoryLabel': '비교/기준', 'description': '기준에 비하여 (~치고는)', 'example': 'Habla muy bien español *para* ser extranjero.', 'translation': '외국인치고는 스페인어를 매우 잘한다.'}
    ]},
    {'id': 'con', 'name': 'con', 'usages': [
        {'category': 'company', 'categoryLabel': '동반', 'description': '함께함 (~와 함께)', 'example': 'Ayer me encontré *con* mi antiguo jefe en una feria tecnológica.', 'translation': '어제 나는 기술 박람회에서 옛 상사와 마주쳤다.'},
        {'category': 'method', 'categoryLabel': '도구', 'description': '도구 (~을 가지고)', 'example': 'Es imposible abrir esta cerradura antigua *con* una llave moderna.', 'translation': '현대식 열쇠로 이 오래된 자물쇠를 여는 것은 불가능하다.'},
        {'category': 'manner', 'categoryLabel': '태도/방식', 'description': '태도 (~하게)', 'example': 'Me miró *con* tristeza cuando le dije la verdad.', 'translation': '내가 진실을 말했을 때 그는 슬프게 나를 바라보았다.'}
    ]},
    {'id': 'sin', 'name': 'sin', 'usages': [
        {'category': 'company', 'categoryLabel': '부재/결핍', 'description': '없음 (~없이)', 'example': 'No puedo imaginar mi vida diaria *sin* conexión a internet o teléfono móvil.', 'translation': '나는 인터넷 연결이나 휴대전화 없이 일상생활을 하는 것을 상상할 수 없다.'},
        {'category': 'method', 'categoryLabel': '조건', 'description': '~하지 않고', 'example': 'Se fue *sin* decir adiós a nadie.', 'translation': '그는 아무에게도 작별 인사를 하지 않고 떠났다.'}
    ]},
    {'id': 'sobre', 'name': 'sobre', 'usages': [
        {'category': 'loc_position', 'categoryLabel': '위치(표면)', 'description': '표면 위 (~위에)', 'example': 'Había una gran cantidad de documentos desordenados *sobre* el escritorio del director.', 'translation': '이사님의 책상 위에는 엄청난 양의 서류들이 어질러져 있었다.'},
        {'category': 'topic', 'categoryLabel': '주제', 'description': '주제 (~에 대하여)', 'example': 'El profesor escribió un artículo muy crítico *sobre* el impacto de las redes sociales.', 'translation': '그 교수는 소셜 미디어의 영향에 대하여 매우 비판적인 기사를 썼다.'},
        {'category': 'time_point', 'categoryLabel': '어림', 'description': '대략적인 시간/수량 (~쯤)', 'example': 'Llegaremos *sobre* las ocho de la tarde.', 'translation': '우리는 오후 8시쯤 도착할 것이다.'}
    ]},
    {'id': 'entre', 'name': 'entre', 'usages': [
        {'category': 'loc_position', 'categoryLabel': '위치(사이)', 'description': '공간적 사이', 'example': 'Mi casa está entre la farmacia y la panadería.', 'translation': '우리 집은 약국과 빵집 사이에 있다.'},
        {'category': 'time_duration', 'categoryLabel': '기간(사이)', 'description': '시간적 사이', 'example': 'Llámame *entre* las dos y las tres.', 'translation': '2시에서 3시 사이에 전화해 줘.'},
        {'category': 'company', 'categoryLabel': '협력', 'description': '우리끼리 (~끼리)', 'example': 'Lo arreglamos *entre* todos.', 'translation': '우리 모두가 함께(우리끼리) 그것을 해결했다.'}
    ]},
    {'id': 'hasta', 'name': 'hasta', 'usages': [
        {'category': 'time_deadline', 'categoryLabel': '종료 시점', 'description': '시간의 끝 (~까지)', 'example': 'La tienda permanecerá abierta *hasta* que se agoten todas las existencias del producto.', 'translation': '그 가게는 제품의 모든 재고가 소진될 때까지 문을 열어둘 것이다.'},
        {'category': 'loc_direction', 'categoryLabel': '도착 지점', 'description': '장소의 끝 (~까지)', 'example': 'Caminamos hasta la cima de la montaña sin descansar.', 'translation': '우리는 쉬지 않고 산 정상까지 걸어갔다.'}
    ]},
    {'id': 'desde', 'name': 'desde', 'usages': [
        {'category': 'time_point', 'categoryLabel': '시작 시점', 'description': '기점 (~부터)', 'example': 'No he tenido noticias suyas *desde* que se mudó a otro país el año pasado.', 'translation': '그가 작년에 다른 나라로 이사한 이후로 그에게서 소식을 듣지 못했다.'},
        {'category': 'loc_origin', 'categoryLabel': '출발 지점', 'description': '출발점 (~에서부터)', 'example': '*Desde* la cima de la montaña se puede apreciar una vista panorámica del valle.', 'translation': '산 정상에서부터 계곡의 파노라마 뷰를 감상할 수 있다.'}
    ]},
    {'id': 'hacia', 'name': 'hacia', 'usages': [
        {'category': 'loc_direction', 'categoryLabel': '방향', 'description': '막연한 방향 (~쪽으로)', 'example': 'Todos los pasajeros corrieron *hacia* la salida de emergencia cuando sonó la alarma.', 'translation': '알람이 울리자 모든 승객들이 비상구 쪽으로 달려갔다.'},
        {'category': 'time_point', 'categoryLabel': '무렵', 'description': '대략적인 시간 (~경에)', 'example': 'El embajador llegará al palacio presidencial *hacia* el mediodía para la ceremonia.', 'translation': '대사는 예식을 위해 정오 무렵에 대통령궁에 도착할 것이다.'}
    ]},
    {'id': 'ante', 'name': 'ante', 'usages': [
        {'category': 'loc_position', 'categoryLabel': '위치(앞)', 'description': '앞에 (직면/권위)', 'example': 'El acusado tuvo que declarar *ante* el juez por los hechos ocurridos anoche.', 'translation': '피고인은 어젯밤 발생한 사건에 대해 판사 앞에서 증언해야 했다.'},
        {'category': 'cause', 'categoryLabel': '직면', 'description': '~에 직면하여', 'example': '*Ante* tal problema, no supimos qué hacer.', 'translation': '그런 문제에 직면해서, 우리는 무엇을 해야 할지 몰랐다.'}
    ]},
    {'id': 'tras', 'name': 'tras', 'usages': [
        {'category': 'loc_position', 'categoryLabel': '위치(뒤)', 'description': '뒤에 (공간/시간)', 'example': 'El perro corrió *tras* la pelota.', 'translation': '개가 공 뒤를 쫓아 달려갔다.'},
        {'category': 'time_point', 'categoryLabel': '시간(후)', 'description': '~한 후에', 'example': '*Tras* varios meses de intensas negociaciones, finalmente se firmó el acuerdo de paz.', 'translation': '몇 달간의 치열한 협상 끝에, 마침내 평화 협정이 체결되었다.'}
    ]},
    {'id': 'contra', 'name': 'contra', 'usages': [
        {'category': 'loc_position', 'categoryLabel': '위치(맞은편)', 'description': '기대어 / 부딪혀', 'example': 'El coche chocó *contra* un árbol.', 'translation': '차가 나무에 부딪혔다.'},
        {'category': 'topic', 'categoryLabel': '반대', 'description': '~에 반대하여', 'example': 'Luchar *contra* las injusticias sociales es un deber de todos los ciudadanos.', 'translation': '사회적 불평등에 맞서 싸우는 것은 모든 시민의 의무이다.'}
    ]},
    {'id': 'durante', 'name': 'durante', 'usages': [
        {'category': 'time_duration', 'categoryLabel': '기간(동안)', 'description': '특정 기간 내내 혹은 그 사이에', 'example': 'Mucha gente viaja al extranjero *durante* las vacaciones de verano.', 'translation': '많은 사람들이 여름 휴가 기간 동안 해외로 여행을 간다.'}
    ]},
    {'id': 'segun', 'name': 'según', 'usages': [
        {'category': 'topic', 'categoryLabel': '출처/인용', 'description': '~에 따르면', 'example': '*Según* el pronóstico del tiempo, mañana va a llover todo el día.', 'translation': '일기 예보에 따르면, 내일은 하루 종일 비가 올 것이다.'},
        {'category': 'manner', 'categoryLabel': '방식/의존', 'description': '~에 따라 (상황에 따라)', 'example': 'El precio del billete varía *según* la temporada en la que viajes.', 'translation': '티켓 가격은 네가 여행하는 시즌에 따라 달라진다.'}
    ]},
    {'id': 'mediante', 'name': 'mediante', 'usages': [
        {'category': 'method', 'categoryLabel': '수단', 'description': '~을 통하여 (격식)', 'example': 'El conflicto se resolvió *mediante* el diálogo pacífico entre ambas partes.', 'translation': '그 갈등은 양측 간의 평화적인 대화를 통해 해결되었다.'}
    ]},
    {'id': 'excepto', 'name': 'excepto', 'usages': [
        {'category': 'company', 'categoryLabel': '제외', 'description': '~를 제외하고', 'example': 'Todos los estudiantes aprobaron el examen *excepto* Juan.', 'translation': '후안을 제외하고 모든 학생들이 시험에 합격했다.'}
    ]},
    {'id': 'salvo', 'name': 'salvo', 'usages': [
        {'category': 'company', 'categoryLabel': '제외', 'description': '~를 제외하고', 'example': 'Abren todos los días *salvo* los domingos.', 'translation': '그들은 일요일을 제외하고 매일 문을 연다.'}
    ]},
    {'id': 'via', 'name': 'vía', 'usages': [
        {'category': 'loc_path', 'categoryLabel': '경유', 'description': '~를 경유하여', 'example': 'Volaremos a Londres *vía* París.', 'translation': '우리는 파리를 경유하여 런던으로 갈 것이다.'},
        {'category': 'method', 'categoryLabel': '수단', 'description': '~편으로/통해 (통신/전송)', 'example': 'Te enviaré los documentos *vía* correo electrónico.', 'translation': '이메일 편으로 서류를 보내줄게.'}
    ]},
    {'id': 'a_pesar_de', 'name': 'a pesar de', 'usages': [
        {'category': 'cause', 'categoryLabel': '양보', 'description': '~에도 불구하고', 'example': 'Salimos a pasear *a pesar de* la fuerte lluvia.', 'translation': '우리는 거센 비에도 불구하고 산책하러 나갔다.'}
    ]},
    {'id': 'debido_a', 'name': 'debido a', 'usages': [
        {'category': 'cause', 'categoryLabel': '원인', 'description': '~때문에 (격식/객관적)', 'example': 'La carretera está cerrada *debido a* un accidente de tráfico.', 'translation': '교통사고 때문에 도로가 폐쇄되었다.'}
    ]},
    {'id': 'junto_a', 'name': 'junto a', 'usages': [
        {'category': 'loc_position', 'categoryLabel': '위치(옆)', 'description': '~바로 옆에/붙어서', 'example': 'La farmacia está *junto a* la entrada del metro.', 'translation': '약국은 지하철 입구 바로 옆에 있다.'}
    ]},
    {'id': 'frente_a', 'name': 'frente a', 'usages': [
        {'category': 'loc_position', 'categoryLabel': '위치(맞은편)', 'description': '~의 맞은편에/마주보고', 'example': 'Se sentó *frente a* mí durante la cena.', 'translation': '그는 저녁 식사 내내 내 맞은편에 앉아 있었다.'},
        {'category': 'topic', 'categoryLabel': '직면', 'description': '~에 직면하여/대하여', 'example': 'Tenemos que estar unidos *frente a* la crisis.', 'translation': '우리는 위기에 맞서 단결해야 한다.'}
    ]},
    {'id': 'en_cuanto_a', 'name': 'en cuanto a', 'usages': [
        {'category': 'topic', 'categoryLabel': '주제/한정', 'description': '~에 관해서는', 'example': '*En cuanto a*l proyecto, hablaremos mañana.', 'translation': '프로젝트에 관해서는 내일 이야기하자.'}
    ]},
    {'id': 'en_lugar_de', 'name': 'en lugar de', 'usages': [
        {'category': 'exchange', 'categoryLabel': '대체', 'description': '~대신에 (장소/행동)', 'example': 'Podemos ir al cine *en lugar de* cenar fuera.', 'translation': '우리는 외식하는 대신에 영화관에 갈 수 있다.'}
    ]},
    {'id': 'a_traves_de', 'name': 'a través de', 'usages': [
        {'category': 'loc_path', 'categoryLabel': '경로(통과)', 'description': '~을 통하여/가로질러', 'example': 'La luz del sol entraba *a través de* las cortinas.', 'translation': '햇빛이 커튼을 뚫고(통해) 들어오고 있었다.'},
        {'category': 'method', 'categoryLabel': '수단', 'description': '~을 통해 (매개)', 'example': 'Conseguí el trabajo *a través de* un amigo.', 'translation': '나는 친구를 통해 그 일자리를 얻었다.'}
    ]},
    {'id': 'en_vez_de', 'name': 'en vez de', 'usages': [
        {'category': 'exchange', 'categoryLabel': '대체', 'description': '~대신에', 'example': 'Deberías comer fruta *en vez de* dulces.', 'translation': '너는 사탕 대신에 과일을 먹어야 한다.'}
    ]},
    {'id': 'a_causa_de', 'name': 'a causa de', 'usages': [
        {'category': 'cause', 'categoryLabel': '원인', 'description': '~때문에 (부정적 뉘앙스)', 'example': 'El vuelo se retrasó *a causa de* la niebla.', 'translation': '안개 때문에 비행기가 지연되었다.'}
    ]},
    {'id': 'gracias_a', 'name': 'gracias a', 'usages': [
        {'category': 'cause', 'categoryLabel': '원인(감사)', 'description': '~덕분에 (긍정적)', 'example': 'Aprobé el examen *gracias a* tu ayuda.', 'translation': '네 도움 덕분에 시험에 합격했다.'}
    ]},
    {'id': 'cerca_de', 'name': 'cerca de', 'usages': [
        {'category': 'loc_position', 'categoryLabel': '위치(근처)', 'description': '가까이 (~근처에)', 'example': 'Mi casa está situada muy *cerca de* un gran parque donde suelo ir a correr.', 'translation': '우리 집은 내가 자주 달리러 가는 큰 공원 아주 근처에 위치해 있다.'}
    ]},
    {'id': 'lejos_de', 'name': 'lejos de', 'usages': [
        {'category': 'loc_position', 'categoryLabel': '위치(멀리)', 'description': '멀리 (~에서 멀리)', 'example': 'Muchos estudiantes prefieren vivir *lejos de*l centro de la ciudad para pagar menos alquiler.', 'translation': '많은 학생들은 월세를 아끼기 위해 도심에서 멀리 떨어진 곳에 사는 것을 선호한다.'}
    ]},
    {'id': 'delante_de', 'name': 'delante de', 'usages': [
        {'category': 'loc_position', 'categoryLabel': '위치(앞)', 'description': '물리적 위치 앞', 'example': 'Por favor, no estaciones tu coche justo *delante de* la entrada principal del hospital.', 'translation': '제발 병원 정문 바로 앞에 주차하지 마세요.'}
    ]},
    {'id': 'detras_de', 'name': 'detrás de', 'usages': [
        {'category': 'loc_position', 'categoryLabel': '위치(뒤)', 'description': '물리적 위치 뒤', 'example': 'Había un gato escondido *detrás de* las cortinas del salón esperando a su dueño.', 'translation': '거실 커튼 뒤에 숨어서 주인을 기다리는 고양이가 있었다.'}
    ]},
    {'id': 'encima_de', 'name': 'encima de', 'usages': [
        {'category': 'loc_position', 'categoryLabel': '위치(위)', 'description': '바로 위에 (접촉/비접촉)', 'example': 'Deja las llaves *encima de* la mesa de la entrada para no olvidarlas.', 'translation': '잊어버리지 않게 현관 탁자 위에 열쇠를 두렴.'}
    ]},
    {'id': 'debajo_de', 'name': 'debajo de', 'usages': [
        {'category': 'loc_position', 'categoryLabel': '위치(아래)', 'description': '바로 아래에', 'example': 'Escondí el regalo de cumpleaños *debajo de* la cama para que no lo encontrara antes de tiempo.', 'translation': '미리 발견하지 못하게 침대 밑에 생일 선물을 숨겨두었다.'}
    ]},
    {'id': 'dentro_de', 'name': 'dentro de', 'usages': [
        {'category': 'loc_position', 'categoryLabel': '위치(안)', 'description': '내부에', 'example': 'Había una carta de amor guardada *dentro de* aquel libro antiguo de la biblioteca.', 'translation': '그 도서관의 오래된 책 속에 연애편지 한 통이 보관되어 있었다.'}
    ]},
    {'id': 'fuera_de', 'name': 'fuera de', 'usages': [
        {'category': 'loc_position', 'categoryLabel': '위치(밖)', 'description': '외부에', 'example': 'Los niños estaban jugando *fuera de* la escuela esperando a que sus padres vinieran a recogerlos.', 'translation': '아이들은 부모님이 데리러 오기를 기다리며 학교 밖에서 놀고 있었다.'}
    ]},
    {'id': 'al_lado_de', 'name': 'al lado de', 'usages': [
        {'category': 'loc_position', 'categoryLabel': '위치(옆)', 'description': '옆에', 'example': 'El nuevo centro comercial se está construyendo justo *al lado de*l parque central.', 'translation': '새로운 쇼핑센터가 중앙공원 바로 옆에 지어지고 있다.'}
    ]},
    {'id': 'antes_de', 'name': 'antes de', 'usages': [
        {'category': 'time_point', 'categoryLabel': '시점(이전)', 'description': '~전에', 'example': 'Es muy recomendable revisar todos los documentos *antes de* firmar el contrato de alquiler.', 'translation': '임대 계약서에 서명하기 전에 모든 서류를 검토하는 것을 강력히 권장한다.'}
    ]},
    {'id': 'despues_de', 'name': 'después de', 'usages': [
        {'category': 'time_point', 'categoryLabel': '시점(이후)', 'description': '~후에', 'example': '*Después de* graduarse en la universidad, ella planea viajar por toda Latinoamérica durante un año.', 'translation': '대학교를 졸업한 후에, 그녀는 1년 동안 라틴 아메리카 전역을 여행할 계획이다.'}
    ]},
    {'id': 'alrededor_de', 'name': 'alrededor de', 'usages': [
        {'category': 'loc_position', 'categoryLabel': '위치(주변)', 'description': '~주위에', 'example': 'Hay muchos árboles *alrededor de*l lago.', 'translation': '호수 주위에 나무가 많이 있다.'},
        {'category': 'time_point', 'categoryLabel': '어림', 'description': '대략 (~쯤)', 'example': 'Llegaré *alrededor de* las seis.', 'translation': '6시쯤 도착할게.'}
    ]}
]

with open('src/data/preposition_dataset.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['전치사', '카테고리ID', '카테고리명', '설명', '예문', '해석'])
    
    for item in data:
        for usage in item['usages']:
            writer.writerow([
                item['name'],
                usage['category'],
                usage['categoryLabel'],
                usage['description'],
                usage['example'],
                usage['translation']
            ])

print("Final updated CSV file created.")