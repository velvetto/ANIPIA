<<<<<<< HEAD
# Software Requirements Specification
## Pro Hotel Anipia

**Verze:** 1.0

**Autor:** Yelyzaveta Yefremova

**Datum:** 22.05.2025

Obsah
=================
* 1 [Úvod](#1-úvod)
  * 1.1 [Účel dokumentu](#11-účel-dokumentu)
  * 1.2 [Rozsah systému](#12-rozsah-systému)
  * 1.3 [Definice, zkratky a pojmy](#13-definice-zkratky-a-pojmy)
* 2 [Obecný popis](#2-obecný-popis)
  * 2.1 [Perspektiva produktu](#21-perspektiva-produktu)
  * 2.2 [Funkce systému](#22-funkce-systému)
  * 2.3 [Uživatelské rozhraní](#23-uživatelské-rozhraní)
  * 2.4 [Omezení](#24-omezení)
  * 2.5 [Předpoklady a závislosti](#25-předpoklady-a-závislosti)
* 3 [Požadavky](#3-požadavky)
  * 3.1 [Funkční požadavky](#31-funkční-požadavky)
    * 3.1.1 [Registrace uživatele](#311-registrace-uživatele)
    * 3.1.2 [Přihlášení uživatele](#312-přihlášení-uživatele)
    * 3.1.3 [Odeslání kontaktního formuláře](#313-odeslání-kontaktního-formuláře)
    * 3.1.4 [Zabezpečení profilu](#314-zabezpečení-profilu)
    * 3.1.5 [Export do PDF](#315-export-do-PDF)
  * 3.2 [Nefunkční požadavky](#32-nefunkční-požadavky)
    * 3.2.1 [Výkon](#321-výkon)
    * 3.2.2 [Dostupnost](#322-dostupnost)
    * 3.2.3 [Bezpečnost](#323-bezpečnost)
    * 3.2.4 [Testovatelnost](#324-testovatelnost)
* 4 [Přílohy](#4-přílohy)

---

## 1. Úvod

### 1.1 Účel dokumentu  
Tento dokument popisuje požadavky na vývoj webové aplikace pro hotel Anipia, který nabízí ubytování pro domácí mazlíčky. Dokument slouží jako vodítko pro vývojový tým, testery a další zainteresované osoby, a definuje jak funkční, tak nefunkční požadavky na systém. Popisuje chování aplikace z pohledu uživatele i systému, poskytuje nezbytné technické specifikace a objasňuje interakce mezi jednotlivými komponentami systému.

### 1.2 Rozsah systému  
Systém bude tvořen webovou aplikací, která umožní uživatelům registraci a přihlášení, odesílání kontaktních formulářů s dotazy nebo rezervacemi, a zobrazování uživatelského profilu. Backendová část systému bude zajišťovat validaci a zpracování formulářových dat, jejich ukládání do databáze a odesílání e-mailových notifikací přes SMTP službu. Také správci systému budou mít k dispozici funkci pro export přijatých zpráv do PDF formátu. Celkově aplikace má sloužit jako prototyp pro menší podnik typu hotel pro zvířata, což je školní projekt.

### 1.3 Definice, zkratky a pojmy  
- **SRS**: Software Requirements Specification – dokument, který definuje požadavky na software.
- **SMTP**: Simple Mail Transfer Protocol – protokol pro odesílání e-mailových zpráv. 
- **H2**: Databáze využívaná pro účely vývoje a testování.
- **AJAX**: Technologie, která umožňuje asynchronní komunikaci mezi klientem a serverem bez reloadu stránky. 
- **Hashování hesel**: Proces zakódování hesla tak, aby nebylo možné zpětně získat jeho původní podobu.
- **JS**: JavaScript je programovací jazyk, který se používá hlavně pro tvorbu interaktivních a dynamických webových stránek a aplikací.
- **CSS**: Jazyk, který se používá k definování vzhledu a rozložení webových stránek.
- **HTML**: Je to hypertextový značkovací jazyk, který slouží k definování struktury a obsahu webových stránek.
- **API** – Application Programming Interface

---

## 2. Obecný popis

### 2.1 Perspektiva produktu  
Webová aplikace je samostatným informačním systémem s architekturou klient-server. Klientská část běží ve webovém prohlížeči a je tvořena statickým HTML, CSS a JS. Serverová část je vyvinuta v jazyce Java za použití frameworku Spring Boot. Systém využívá databázi H2 pro ukládání uživatelských dat a kontaktních zpráv. Součástí je i integrace se službou Mailtrap, která simuluje odesílání e-mailů.  

### 2.2 Funkce systému  
Aplikace umožní návštěvníkovi se nejprve zaregistrovat pomocí jednoduchého formuláře. Registrovaný uživatel se poté může přihlásit a získat přístup ke svému profilu. Dále je možné odeslat kontaktní formulář, který je zpracován serverem, uložen do databáze a odeslán na určitou e-mailovou adresu firmy. Administrativní funkce umožňují export těchto zpráv do PDF dokumentu pro pozdější zpracování a celkový přehled.  

### 2.3 Uživatelské rozhraní  
Uživatelské rozhraní je minimalistické a přehledné, což usnadňuje hledání věcí na webu. Skládá se z mnoha stránek, jako je úvodní, ze stránky s obrázky, kontakty a jiné. Formulář na stránce "About" je validovány pomocí JS a zpětná vazba bude poskytována bez nutnosti reloadu stránky. Kontaktní formulář obsahuje vstupní pole pro jméno, e-mail a samotní zprávu.  

### 2.4 Omezení  
Aplikace je určena pouze pro demonstrační účely. Vzhledem k použití služby Mailtrap nejsou e-maily odesílány reálným adresátům. Hesla zatím nelze resetovat a neexistuje správa uživatelských práv ani rozdělení rolí. V budoucnu tyhle možností budou přidáná. Systém zatím není připraven pro nasazení do produkčního prostředí a není optimalizován pro vysoké zatížení, což bude také vyřešeno v pozdějších fázích.  

### 2.5 Předpoklady a závislosti  
K běhu aplikace je použito prostředí s Java 17, Maven a Spring Boot frameworkem. Dále byl vytvořen účet pro přístup k Mailtrap SMTP. Ceůková vývoj byl testován pomoci příkazového řádku CMD ve Windows a běh systému byl ověřen na adrese `localhost:8080`.

---

## 3. Požadavky

### 3.1 Funkční požadavky

#### 3.1.1 Registrace uživatele  
Uživatel vyplní registrační formulář obsahující jméno, příjmení, e-mailovou adresu, telefonní číslo a heslo (musí zadát heslo dvakrát pro ověření). Po odeslání formuláře dojde k validaci zadaných údajů. Pokud je vše v pořádku, uživatelský účet bude vytvořen a heslo bude bezpečně uloženo ve formě hashovaného řetězce v databázi.

#### 3.1.2 Přihlášení uživatele  
Přihlášení je umožněno pouze registrovaným uživatelům. Po zadání správné kombinace e-mailu a hesla je uživatel přesměrován na profilovou stránku, kde může zobrazit nebo upravit své údaje. Zatím má pouze možnost se odhlásit, ale pozdějí budou přidáné i jiné možnosti využítí účtu, například vytvoření rezervace.

#### 3.1.3 Odeslání kontaktního formuláře  
Host webu může vyplnit kontaktní formulář bez nutnosti přihlášení. Formulář bude obsahovat jméno, e-mail a jeho zprávu. Po odeslání budou data uložena do databáze a e-mail s obsahem zprávy bude odeslán přes Mailtrap na definovanou adresu správce firmy - hotelu.

#### 3.1.4 Zabezpečení profilu  
Přístup na stránku s uživatelským profilem je chráněn autentifikací. Neautorizovaní uživatelé nemohou zobrazit ani upravit žádná osobní data. K dispozici je funkce pro odhlášení uživatele, která bezpečně ukončí jeho relaci s aplikaci.

#### 3.1.5 Export do PDF  
Správce systému může jedním kliknutím exportovat všechny přijaté zprávy z kontaktního formuláře do PDF dokumentu. Tato funkce je dostupná pouze administrátorům a je implementována na serverové straně pomocí PDF knihovny. Dokument lze dostat buď přes prohlížeč, nebo pomocí příkazového řádku.

### 3.2 Nefunkční požadavky

#### 3.2.1 Výkon  
Odezva serveru při běžných požadavcích (např. registrace, přihlášení, odeslání dormuláře a načítání stránek) by neměla přesáhnout 2 sekundy. Při běžném zatížení by měl systém reagovat bez zpoždění.

#### 3.2.2 Dostupnost  
Systém je dostupný pouze v rámci lokálního vývojového prostředí na adrese `http://localhost:8080`. V produkčním nasazení by bylo nutné doplnit HTTPS, správu domén a další infrastrukturní prvky, které budou přidány v pozdější fázi vývoje.

#### 3.2.3 Bezpečnost  
Systém implementuje hashování hesel pomocí bezpečného algoritmu (konkretně pro danou aplikaci - BCrypt). Vstupy od uživatelů jsou validovány a sanitizovány, čímž se předchází útokům. Přístup k privátním částem aplikace je omezen pouze na přihlášené uživatele.

#### 3.2.4 Testovatelnost  
Funkčnost REST API lze jednoduše otestovat pomocí nástrojů jako Postman nebo `curl`, který byl použit nejčastějí. Pro ověření e-mailové funkcionality je použita služba Mailtrap, která umožňuje sledovat a ladit odeslané zprávy bez nutnosti použít skutečný SMTP server.

---

## 4. Přílohy  
- Dokument [Business story.pdf] obsahující scénář použití systému  
- Use Case diagram v PNG formátu  
- Ukázky UI – screenshoty s přehledem stránek na různých zařízeních
=======
# Software Requirements Specification
## Pro Hotel Anipia

**Verze:** 1.0

**Autor:** Yelyzaveta Yefremova

**Datum:** 22.05.2025

Obsah
=================
* 1 [Úvod](#1-úvod)
  * 1.1 [Účel dokumentu](#11-účel-dokumentu)
  * 1.2 [Rozsah systému](#12-rozsah-systému)
  * 1.3 [Definice, zkratky a pojmy](#13-definice-zkratky-a-pojmy)
* 2 [Obecný popis](#2-obecný-popis)
  * 2.1 [Perspektiva produktu](#21-perspektiva-produktu)
  * 2.2 [Funkce systému](#22-funkce-systému)
  * 2.3 [Uživatelské rozhraní](#23-uživatelské-rozhraní)
  * 2.4 [Omezení](#24-omezení)
  * 2.5 [Předpoklady a závislosti](#25-předpoklady-a-závislosti)
* 3 [Požadavky](#3-požadavky)
  * 3.1 [Funkční požadavky](#31-funkční-požadavky)
    * 3.1.1 [Registrace uživatele](#311-registrace-uživatele)
    * 3.1.2 [Přihlášení uživatele](#312-přihlášení-uživatele)
    * 3.1.3 [Odeslání kontaktního formuláře](#313-odeslání-kontaktního-formuláře)
    * 3.1.4 [Zabezpečení profilu](#314-zabezpečení-profilu)
    * 3.1.5 [Export do PDF](#315-export-do-PDF)
  * 3.2 [Nefunkční požadavky](#32-nefunkční-požadavky)
    * 3.2.1 [Výkon](#321-výkon)
    * 3.2.2 [Dostupnost](#322-dostupnost)
    * 3.2.3 [Bezpečnost](#323-bezpečnost)
    * 3.2.4 [Testovatelnost](#324-testovatelnost)
* 4 [Přílohy](#4-přílohy)

---

## 1. Úvod

### 1.1 Účel dokumentu  
Tento dokument popisuje požadavky na vývoj webové aplikace pro hotel Anipia, který nabízí ubytování pro domácí mazlíčky. Dokument slouží jako vodítko pro vývojový tým, testery a další zainteresované osoby, a definuje jak funkční, tak nefunkční požadavky na systém. Popisuje chování aplikace z pohledu uživatele i systému, poskytuje nezbytné technické specifikace a objasňuje interakce mezi jednotlivými komponentami systému.

### 1.2 Rozsah systému  
Systém bude tvořen webovou aplikací, která umožní uživatelům registraci a přihlášení, odesílání kontaktních formulářů s dotazy nebo rezervacemi, a zobrazování uživatelského profilu. Backendová část systému bude zajišťovat validaci a zpracování formulářových dat, jejich ukládání do databáze a odesílání e-mailových notifikací přes SMTP službu. Také správci systému budou mít k dispozici funkci pro export přijatých zpráv do PDF formátu. Celkově aplikace má sloužit jako prototyp pro menší podnik typu hotel pro zvířata, což je školní projekt.

### 1.3 Definice, zkratky a pojmy  
- **SRS**: Software Requirements Specification – dokument, který definuje požadavky na software.
- **SMTP**: Simple Mail Transfer Protocol – protokol pro odesílání e-mailových zpráv. 
- **H2**: Databáze využívaná pro účely vývoje a testování.
- **AJAX**: Technologie, která umožňuje asynchronní komunikaci mezi klientem a serverem bez reloadu stránky. 
- **Hashování hesel**: Proces zakódování hesla tak, aby nebylo možné zpětně získat jeho původní podobu.
- **JS**: JavaScript je programovací jazyk, který se používá hlavně pro tvorbu interaktivních a dynamických webových stránek a aplikací.
- **CSS**: Jazyk, který se používá k definování vzhledu a rozložení webových stránek.
- **HTML**: Je to hypertextový značkovací jazyk, který slouží k definování struktury a obsahu webových stránek.
- **API** – Application Programming Interface

---

## 2. Obecný popis

### 2.1 Perspektiva produktu  
Webová aplikace je samostatným informačním systémem s architekturou klient-server. Klientská část běží ve webovém prohlížeči a je tvořena statickým HTML, CSS a JS. Serverová část je vyvinuta v jazyce Java za použití frameworku Spring Boot. Systém využívá databázi H2 pro ukládání uživatelských dat a kontaktních zpráv. Součástí je i integrace se službou Mailtrap, která simuluje odesílání e-mailů.  

### 2.2 Funkce systému  
Aplikace umožní návštěvníkovi se nejprve zaregistrovat pomocí jednoduchého formuláře. Registrovaný uživatel se poté může přihlásit a získat přístup ke svému profilu. Dále je možné odeslat kontaktní formulář, který je zpracován serverem, uložen do databáze a odeslán na určitou e-mailovou adresu firmy. Administrativní funkce umožňují export těchto zpráv do PDF dokumentu pro pozdější zpracování a celkový přehled.  

### 2.3 Uživatelské rozhraní  
Uživatelské rozhraní je minimalistické a přehledné, což usnadňuje hledání věcí na webu. Skládá se z mnoha stránek, jako je úvodní, ze stránky s obrázky, kontakty a jiné. Formulář na stránce "About" je validovány pomocí JS a zpětná vazba bude poskytována bez nutnosti reloadu stránky. Kontaktní formulář obsahuje vstupní pole pro jméno, e-mail a samotní zprávu.  

### 2.4 Omezení  
Aplikace je určena pouze pro demonstrační účely. Vzhledem k použití služby Mailtrap nejsou e-maily odesílány reálným adresátům. Hesla zatím nelze resetovat a neexistuje správa uživatelských práv ani rozdělení rolí. V budoucnu tyhle možností budou přidáná. Systém zatím není připraven pro nasazení do produkčního prostředí a není optimalizován pro vysoké zatížení, což bude také vyřešeno v pozdějších fázích.  

### 2.5 Předpoklady a závislosti  
K běhu aplikace je použito prostředí s Java 17, Maven a Spring Boot frameworkem. Dále byl vytvořen účet pro přístup k Mailtrap SMTP. Ceůková vývoj byl testován pomoci příkazového řádku CMD ve Windows a běh systému byl ověřen na adrese `localhost:8080`.

---

## 3. Požadavky

### 3.1 Funkční požadavky

#### 3.1.1 Registrace uživatele  
Uživatel vyplní registrační formulář obsahující jméno, příjmení, e-mailovou adresu, telefonní číslo a heslo (musí zadát heslo dvakrát pro ověření). Po odeslání formuláře dojde k validaci zadaných údajů. Pokud je vše v pořádku, uživatelský účet bude vytvořen a heslo bude bezpečně uloženo ve formě hashovaného řetězce v databázi.

#### 3.1.2 Přihlášení uživatele  
Přihlášení je umožněno pouze registrovaným uživatelům. Po zadání správné kombinace e-mailu a hesla je uživatel přesměrován na profilovou stránku, kde může zobrazit nebo upravit své údaje. Zatím má pouze možnost se odhlásit, ale pozdějí budou přidáné i jiné možnosti využítí účtu, například vytvoření rezervace.

#### 3.1.3 Odeslání kontaktního formuláře  
Host webu může vyplnit kontaktní formulář bez nutnosti přihlášení. Formulář bude obsahovat jméno, e-mail a jeho zprávu. Po odeslání budou data uložena do databáze a e-mail s obsahem zprávy bude odeslán přes Mailtrap na definovanou adresu správce firmy - hotelu.

#### 3.1.4 Zabezpečení profilu  
Přístup na stránku s uživatelským profilem je chráněn autentifikací. Neautorizovaní uživatelé nemohou zobrazit ani upravit žádná osobní data. K dispozici je funkce pro odhlášení uživatele, která bezpečně ukončí jeho relaci s aplikaci.

#### 3.1.5 Export do PDF  
Správce systému může jedním kliknutím exportovat všechny přijaté zprávy z kontaktního formuláře do PDF dokumentu. Tato funkce je dostupná pouze administrátorům a je implementována na serverové straně pomocí PDF knihovny. Dokument lze dostat buď přes prohlížeč, nebo pomocí příkazového řádku.

### 3.2 Nefunkční požadavky

#### 3.2.1 Výkon  
Odezva serveru při běžných požadavcích (např. registrace, přihlášení, odeslání dormuláře a načítání stránek) by neměla přesáhnout 2 sekundy. Při běžném zatížení by měl systém reagovat bez zpoždění.

#### 3.2.2 Dostupnost  
Systém je dostupný pouze v rámci lokálního vývojového prostředí na adrese `http://localhost:8080`. V produkčním nasazení by bylo nutné doplnit HTTPS, správu domén a další infrastrukturní prvky, které budou přidány v pozdější fázi vývoje.

#### 3.2.3 Bezpečnost  
Systém implementuje hashování hesel pomocí bezpečného algoritmu (konkretně pro danou aplikaci - BCrypt). Vstupy od uživatelů jsou validovány a sanitizovány, čímž se předchází útokům. Přístup k privátním částem aplikace je omezen pouze na přihlášené uživatele.

#### 3.2.4 Testovatelnost  
Funkčnost REST API lze jednoduše otestovat pomocí nástrojů jako Postman nebo `curl`, který byl použit nejčastějí. Pro ověření e-mailové funkcionality je použita služba Mailtrap, která umožňuje sledovat a ladit odeslané zprávy bez nutnosti použít skutečný SMTP server.

---

## 4. Přílohy  
- Dokument [Business story.pdf] obsahující scénář použití systému  
- Use Case diagram v PNG formátu  
- Ukázky UI – screenshoty s přehledem stránek na různých zařízeních
>>>>>>> ad13098284dc6165a63b79bddd17c20d47609d36
- Ukázkové příkazy pro `curl` testování API endpointů.