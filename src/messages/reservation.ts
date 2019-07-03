import moment from 'moment'

export const ReservationMessage = (len, date, starttime, endtime) => {
  return `
<h1>Kiitos, että olette lähdössä siivoamaan Helsingin rantaviivaa!</h1>

<h2>Varauksen tiedot</h2>
<ul>
  <li>Päivämäärä: ${moment(date).format(
    'DD.MM.YYYY'
  )} klo ${starttime} - ${endtime}</li>
  <li>Noin ${len} metriä rantaa</li>
</ul>

<p>Tässä vielä käytännön tietoa ja vinkkejä rantatalkoita varten:</p>

<h3>Roskapihdit lainaan kirjastosta</h3>
<p>Talkoita varten voitte lainata kirjastosta yksittäiset roskapihdit tai SATAKOLKYT-
talkoosetin, joka sisältää kymmenet roskapihdit, 1 rll roskapusseja ja muutaman 
jätesäkin. Talkoosetin laina-aika on 3 vrk ja yksittäisten roskapihtien 14 vrk. 
Roskapihtejä lainaavat kirjastot näkyvät www.satakolkyt.fi -sivuston kartalla. 
Jos tiedossa on suuremmat talkoot, joihin tarvitsette enemmän roskapihtejä, voitte olla 
suoraan yhteydessä kaupungin talkootoiminnan koordinaattoriin Armi Koskelaan (puh. 
040-7190824, armi.koskela@hel.fi).</p>

<h3>Mitä kerätyille roskille tehdään?</h3>
<p>Kartalla näkyvät rannoilla olevat suuret jäteastiat, joihin talkooroskat voi jättää. Pieniä 
roskiksia ei kannata täyttää aivan täyteen talkooroskilla, sillä niissä on hyvä olla tilaa 
myös tavallisille roskille. Eläimet repivät helposti roskia liian täyteen ahdetuista 
roskiksista. Jos rannalle ei ole tarpeeksi jäteastioita tai roskat eivät mahdu niihin, 
talkooroskat voi jättää tiiviisti suljetuissa jätesäkeissä roskisten viereen tai muuhun 
helposti löydettävään paikkaan. Ilmoittakaa silloin pois haettavista roskasäkeistä 
samalla kun ilmoitatte rannan siivotuksi www.satakolkyt.fi -sivuston kartalla. 
Kaupungin työntekijät hakevat roskat pois muutaman päivän sisällä.</p>

<h3>Bongatkaa vieraslaji rannalta</h3>
<p>Rannoillemme levittäytyy myös haitallisia vieraslajeja, jotka vievät elintilaan 
alkuperäisiltä lajeiltamme. Keräämme havaintoja kurtturuusu- ja 
jättipalsamiesiintymistä Helsingin rannoilta. Voit ilmoittaa vieraslajihavaintosi samalla 
kun ilmoitat rannan siivotuksi. Vieraslajiesiintyminen kartoittaminen auttaa vieraslajien
torjunnan suunnittelussa. Tarkempaa tietoa vieraslajeista ja tunnistusohjeet löydät 
täältä: www.satakolkyt.f/index.php/2019/06/04/rantojen-vieraslajit/</p>

<h3>Liittykää Itämeren suojelijoiden ihmisketjuun</h3>
<p>Paras lopetus talkoille on Itämeren suojelijoiden ihmisketjun muodostaminen siivotulle 
rannalle. Asettukaa riviin rannalle katse merelle päin, ottakaa kaveria käsistä kiinni ja 
levittäkää ketjun niin pitkälle kuin yllätte. Ottakaa ketjusta kuva rannan puolelta 
merelle päin.  Jakakaa kuvat ja tunnelmat talkoistanne #satakolkyt 
#pelastanitämertaaskelaskeleelta. Lisätietoa ja esimerkkikuvia: 
www.satakolkyt.f/index.php/2019/05/31/liity-itameren-suojelijoiden-ketjuun/</p>

<h3>Muistakaa ilmoittaa talkoot pidetyiksi</h3>
<p>Kun talkoot on pidetty, klikatkaa sivulle 
www.satakolkyt.fi ja ilmoittakaa ranta siivotuksi, niin rantaviivan väri kartalla muuttuu 
vihreäksi. Samalla saatte oman siivousporukkanne nimen näkyviin kartalle.</p>

<p>Jos teillä on jotain kysyttävää, toiveita tai palautetta, voitte olla yhteydessä 
SATAKOLKYT-hankkeen koordinaattoriin Eevaan: eeva.puustjarvi@hel.fi 044 270 0573.</p>

<p>Mukavaa rantaretkeä!</p>

<p>T. SATAKOLKYT-tiimi</p>

<p>Seuraa meitä:<br/>
www.facebook.com/SATAKOLKYT<br/>
Instagram: @satakolkyt</p>
`
}
