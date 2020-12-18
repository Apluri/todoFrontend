# 4A00EZ61-3001 Frontend-kehitys - Todo-applikaatio

## Ryhmä 04 - Toni Salminen, Aleksi Hietala

### Toiminnallisuus

Simppeli todo-applikaatio, jossa on mahdollista listata tehtäviä muistiin.  
Tietokantaan tallennettaviin tehtäviin voi lisätä pakollisen otsikon (title) lisäksi kuvauksen (description), kansion (folder) ja määräajan (deadline).

- Tasks / päänäkymä
  > Päänäkymässä on listattu tehtävät, jossa niitä voi järjestää, etsiä, poistaa tai avata.
- Add
  > Oikealla yläkulmassa sijaitseva ikoni avaa uuden tehtävän luomis-ikkunan.
- Navigointi
  > Vasemmassa yläkulmassa oleva ikoni avaa navigointipalkin, josta löytyy linkki pää-näkymään (Tasks), kansioihin (Folders) ja asetuksiin (Settings).
- Edit & Save
  > Tehtävää klikattaessa se avautuu näkymään, jossa on esitelty kaikki tehtävään tallennetut tiedot. Tietojen yläpuolella on kaksi ikonia joista tehtävä voi poistaa tai muokata. Muokkausta painaessa muokkausikoni vaihtuu tallennusikoniin.
- Sort & Search
  > Tehtävien yläpuolella löytyy toiminnallisuus järjestämiseen (sort) määriteltyjen parametrien mukaan tai hakuun liittyen käyttäjän syötteeseen. Haku ottaa huomioon otsikon (title), kuvauksen (description), kansion (folder) ja määräajan (deadline).
- Settings

  > Asetus-näkymässä on mahdollista poistaa kaikki tehtävät, kansiot tai molemmat.

- Folders

  > Kansionäkymässä voi valita, luoda tai poistaa kansion. Kun kansio on valittu, kansioon sisältyvät tehtävät on listattu alle.

- Merkkaus ja poisto
  > Päänäkymässä (tasks) listattujen tehtävien vasemmalla puolella löytyy checkbox, jolla tehtävän voi merkata suoritetuksi. Oikealta puolelta löytyy poisto-ikoni, joka poistaa tehtävän.

### Huomioon otettavaa

- Mobile-first
  > Applikaatiota rakennettiin alusta lähtien mobile-first periaatteella, joten on pyritty, että se näyttää hyvältä käytettäessä puhelinta. Sivupalkin toiminnallisuus eroaa mobiilinäkymässä siten, että se blurraa alle jäävät elementit.
- Realtime-search
  > Search toiminnallisuus suorittaa hakua "reaaliajassa" eli kun kenttään on syötetty arvoja, myös search triggeröityy.
- Käytettävyys
  > Käytettävyyttä on pyritty helpottamaan siten, että ruudulla ei ole liikaa dataa, vaikka toiminnallisuuksia onkin verrattain runsaasti ja ikonit on pyritty valitsemaan sen mukaan, että ne olisivat kuvaavia. Aktiiviset ikonit, joilla on toiminnallisuus on korostettu väreillä.

### Linkki Herokuun

- https://tamk-4a00ez62-3001-group04.herokuapp.com/
