# Software Design Description
## Pro Hotel Anipia

**Verze:** 1.0

**Autor:** Yelyzaveta Yefremova

**Datum:** 22.05.2025

Obsah
=================
* 1 [Úvod](#1-úvod)
  * 1.1 [Účel dokumentu](#11-účel-dokumentu)
  * 1.2 [Rozsah systému](#12-rozsah-systému)
  * 1.3 [Definice a zkratky](#13-definice-a-zkratky)
* 2 [Obecný popis](#2-obecný-popis)
  * 2.1 [Perspektiva produktu](#21-perspektiva-produktu)
  * 2.2 [Funkce systému](#22-funkce-systému)
  * 2.3 [Uživatelské charakteristiky](#23-uživatelské-rozhraní)
  * 2.4 [Omezení](#24-omezení)
* 3 [Architektura systému](#3-architektura-systemu)
* 4 [Detailní návrh](#4-detailní-návrh)
  * 4.1 [Frontend](#41-frontend)
  * 4.2 [Backend](#42-backend)
  * 4.3 [Databáze](#43-databáze)
* 5 [Bezpečnostní návrh](#5-bezpečnostní-návrh)
* 6 [Uživatelské rozhraní (UI/UX)](#6-Uživatelské-rozhraní-(UI/UX))
* 7 [Testování](#7-testování)
  * 7.1 [Typy testů](#71-typy-testů)
  * 7.2 [Testovací scénáře](#72-testovací-scénáře)
* 8 [Deployment](#8-deployment)
* 9 [Budoucí rozšíření](#9-budoucí-rozšíření)
* 10 [Přílohy](#10-přílohy)

---

## 1. Úvod

### 1.1 Účel dokumentu 
Tento dokument popisuje návrh a architekturu webové aplikace Hotel Anipia, která umožňuje uživatelům (zákazníkům) vytvořit rezervaci pokojů pro své domácí mazlíčky. Dokument slouží jako technický podklad pro vývojáře a správce systému, a definuje klíčové komponenty, rozhraní, datové struktury a celkové funkce aplikace.

### 1.2 Rozsah systému 
Hotel Anipia je webová aplikace, která má několik hlávních funkcí, jako je odesílání kontaktního formuláře (uložení do databáze, odeslání e-mailu), registrace uživatelů a jejich autentizace (přihlášení a odhlášení). Systém také zahrnuje frontend (HTML, CSS, JS) a backend (Java Spring Boot), používá relační databázi H2 a simuluje e-mailový server pomocí Mailtrap.

### 1.3 Definice a zkratky
- **API** – Application Programming Interface
- **AJAX** – Asynchronous JavaScript and XML
- **H2** – databáze využívaná pro účely vývoje a testování
- **BCrypt** – hashovací algoritmus pro bezpečné ukládání hesel
- **SMTP** – Simple Mail Transfer Protocol – protokol pro odesílání e-mailových zpráv
- **REST** – Representational State Transfer (architektura API)
- **JS**: JavaScript je programovací jazyk, který se používá hlavně pro tvorbu interaktivních a dynamických webových stránek a aplikací
- **CSS**: Jazyk, který se používá k definování vzhledu a rozložení webových stránek
- **HTML**: Je to hypertextový značkovací jazyk, který slouží k definování struktury a obsahu webových stránek

---

## 2. Obecný popis

### 2.1 Perspektiva produktu 
Hotel Anipia je samostatná webová aplikace, která je postavena na architektuře klient-server. Frontend je tvořen statickými webovými stránkami, které pomocí AJAXu komunikují s backendem poskytujícím REST API. Hlavní funkčnost aplikace zahrnuje odesílání kontaktního formuláře, kde uživatel vyplní své jméno, e-mail a zprávu, která je následně uložena do databáze a odeslána e-mailem. Dále aplikace podporuje registraci nových uživatelů, kde probíhá ověření jedinečnosti e-mailu a bezpečné uložení hesla pomocí hashování. Přihlášení umožňuje uživateli přístup do jeho profilu, kde se může také odhlásit.

### 2.2 Funkce systému
- **Kontaktní formulář:** Uživatel vyplní jméno, e-mail a samotnou zprávu, pak se data pošlou AJAX voláním na backend. Zpráva se uloží a odešle se e-mailem, po čem uživatel dostane potvrzení.

- **Registrace uživatele:** Uživatel zadá své údaje. Backend ověří jedinečnost e-mailu, jsetli uživatel už není s tímto emailem v databázi. Heslo se zahashuje a uživatel se uloží do DB. Uživatel dostane potvrzení o úspěchu nebo chybě.

- **Přihlášení:** Uživatel zadá e-mail a heslo potom backend je ověří jestli jsou v systému. Při úspěchu se vrátí uživatelská data a frontend uloží stav přihlášení.

- **Profil:** V budoucnu se zobrazí údaje přihlášeného uživatele a umožní momentálně je možnost odhlášení.

### 2.3 Uživatelské charakteristiky
- **Uživatel:** má docela jednoduché rozhraní, nápovědy a validace vstupů.

- **Administrátor (budoucí rozšíření):** má celý přístup k databázi zpráv a uživatelů.

### 2.4 Omezení
Zatím aplikace je určena pouze pro lokální nebo vývojové prostředí (jako je H2 databáze). SMTP server je simulován pomocí Mailtrap, což není produkční a určeno pouze pro testování funkčnosti aplikace.

---

## 3. Obecný popis
Celá aplikace je navržena jako systém klient-server, kde frontend funguje jako klientská část běžící v prohlížeči uživatele, zatímco backend je serverová aplikace poskytující rozhraní API. Backend je napsán v Javě s využitím Spring Boot frameworku, který usnadňuje vývoj REST API, správu databáze a odesílání e-mailů. Databáze H2 je použita jako relační databáze pro ukládání dat o uživatelích a kontaktních zprávách. Pro odesílání e-mailů je využit Mailtrap, který slouží k bezpečné simulaci e-mailových zpráv bez nutnosti reálného SMTP serveru. Pro správu závislostí a buildování projektu je použit Maven.

---

## 4. Detailní návrh

### 4.1 Frontend
Frontendová část aplikace je tvořena HTML stránkami, které obsahují formuláře pro kontaktní zprávy i registraci a přihlášení uživatelů. Jsou taky použité CSS a JS soubory.
CSS zajišťuje vizuální styl a responsivitu webu, zatímco JavaScript je použit pro zachycení událostí odesílání formulářů, validaci vstupních dat a AJAX komunikaci s backendem. 
Data jsou odesílána ve formátu JSON na příslušné endpointy backendu a odpovědi jsou použity k aktualizaci uživatelského rozhraní, například zobrazením potvrzujících nebo chybových hlášek.

### 4.2 Backend
Backendová část je rozdělena do několika vrstev. Controller přijímá HTTP požadavky, převádí JSON data do Java objektů a předává je dalším službám.
Služby obsahují obchodní logiku, jako je ukládání dat do databáze a odesílání e-mailů, zatímco repository vrstva komunikuje přímo s databází. Pro ukládání uživatelů a jejich hesel je nasázena bezpečnostní logika, která zahrnuje hashování hesel pomocí BCrypt.

### 4.3 Databáze
Celkově databáze obsahuje spoustu tabulek, ale zatím je použito jenom dvě. Jedna z nich je tabulka Zakaznik, která obsahuje sloupce pro identifikaci uživatele, jeho jméno, příjmení, telefon, e-mail a hash hesla. Druhá tabulka ContactForm ukládá odeslané zprávy s informacemi o odesílateli a časovém razítku.

---

## 5. Bezpečnostní návrh
Bezpečnost aplikace je řešena především hashováním hesel uživatelů pomocí BCrypt, což zabraňuje uložení hesel v prostém textu. Při přihlášení jsou uživatelská hesla ověřována vůči hashovaným hodnotám v databázi. Přístup k uživatelskému profilu je chráněn kontrolou stavu přihlášení na frontendové i backendové straně. 

---

## 6. Uživatelské rozhraní (UI/UX)
Uživatelské rozhraní je navrženo tak, aby bylo přehledné a jednoduché pro každého. Stránky jsou responzivní a kompatibilní s většinou moderních zařízení. Při vyplňování formulářů probíhá validace na klientské straně, která uživatele informuje o případných chybách nebo vynechaných povinných polích. Po odeslání formuláře je uživateli vždycky zobrazena jasná zpětná vazba.

---

## 7. Testování
Integrační testy ověřují správnou funkčnost API endpointů a jsou prováděny pomocí nástroju jako curl. Manuální testování se zaměřuje na uživatelské rozhraní, kontrolu funkčnosti formulářů, registrace, přihlášení a odhlášení uživatelů. Scénáře zahrnují testování úspěšných a neúspěšných registrací, přihlášení, odesílání zpráv i chybové hlášky.

### 7.1 Typy testů
Celkově je tři typů testů:
- **Jednotkové testy:** backendové služby (hashování hesla, validace)
- **Integrační testy:** testování API endpointů pomocí curl.
- **UI testy: manuální** různé testování formulářů, přihlášení a odhlášení.

### 7.2 Testovací scénáře
- Úspěšná nebo chybná registrace nového uživatele.
- Registrace s duplicitním e-mailem, který už je v systému.
- Přihlášení s platnými a neplatnými údaji.
- Odeslání kontaktního formuláře s validními i nevalidními daty.
- Zobrazení správných chybových a úspěšných hlášek.

---

## 8. Deployment
Projekt je sestavován pomocí nástroje Maven, který zajišťuje správu závislostí a build aplikace. Backend se spouští jako Spring Boot aplikace, kterou lze spustit příkazem java -jar. Frontend je statický a může být spuštěn přímo ve vývojovém prostředí nebo pomocí libovolného HTTP serveru. Pro vývojové účely je databáze H2 použita jako in-memory databáze, což umožňuje rychlé a snadné spuštění bez nutnosti instalace složitější databáze. Je to ideální varianta pro začátek.

---

## 9. Budoucí rozšíření
Jedním z hlavních kroků bude nahrazení dočasně používané databáze H2 lepší databázi MySQL. To umožní dlouhodobé ukládání dat, větší škálovatelnost systému a možnost práce s větší velikosti informací.
Dalším vylepšením bude zavedení pokročilejší autentizační vrstvy pomocí JWT, která umožní bezpečnější a flexibilnější správu uživatelských relací, zejména v případě, že aplikace bude rozšířena o samostatné administrátorské rozhraní. Správa administrátorů a možnost jejich přístupu k přehledu zpráv, registrací nebo statistik bude dalším logickým krokem v rozvoji aplikace.
Rozšíření funkcí by mohlo zahrnovat také rezervace služeb přes kalendář, platby online, automatické odpovědi na e-maily, notifikace pro uživatele a další možností.

---

## 10. Přílohy
- Dokument [Business story.pdf] obsahující scénář použití systému  
- Use Case diagram v PNG formátu  
- Ukázky UI – screenshoty s přehledem stránek na různých zařízeních
- Ukázkové příkazy pro `curl` testování API endpointů.