import moment from 'moment'
import { IReservationModel } from '../map/model/reservation'

export default (lang: 'fi' | 'sv' | 'en', reserv: IReservationModel) =>
  ({
    fi: `
    <div style="font-family: Calibri,Candara,Segoe,Segoe UI,Optima,Arial,sans-serif">
    <h3>Kiitos, että lähdette siivoamaan Helsingin rantoja!</h3>

    <h2>Varauksen tiedot</h2>
    <ul>
      <li>Päivämäärä: ${moment(reserv.startdate).format('DD.MM.YYYY')} klo ${
      reserv.starttime
    } - ${reserv.endtime}</li>
      <li>Noin ${Math.round(reserv.multiLength)} metriä rantaa</li>
    </ul>
    
    <p>Tässä käytännön tietoa ja vinkkejä siivousta varten:</p>
  
    <h4>Roskapihdit tai talkoosetti lainaan kirjastosta</h4>
    <p>
        Kirjastosta saa lainaan yksittäiset roskapihdit tai noin kymmenen hengen talkoosetin. Lainaavat kirjastot näkyvät kartalla www.satakolkyt.fi. 
        <br/>
        <strong>Huom!</strong> Jos tarvitsette suuremman määrän roskapihtejä, voitte olla yhteydessä kaupungin talkootoiminnan koordinaattoriin Armi Koskelaan, 040-7190824, armi.koskela@hel.fi
    </p>
  
    <h4>Mitä kerätyille roskille tehdään?</h4>
    <p>
        Karttaan on merkitty suuret jäteastiat, joihin talkooroskat voi jättää. Jos lähettyvillä ei ole roskiksia tai roskat eivät helposti mahdu sinne, ne voi myös jättää tiiviisti suljetuissa jätesäkeissä johonkin helposti löydettävään paikkaan. Ilmoita pois haettavista roskasäkeistä samalla kun ilmoitat rannan siivotuksi kartalle. Kaupungin työntekijät hakevat säkit pois muutaman päivän sisällä.
        <br/>
        <strong>Huom!</strong> Pieniä roskiksia ei kannata täyttää aivan täyteen talkooroskilla, sillä niissä on hyvä olla tilaa myös tavallisille roskille. Eläimet myös repivät liian täyteen ahdettuja roskiksia.
    </p>
  
    <h4>Muista ilmoittaa ranta siivotuksi</h4>
    <p>
        Ilmoita mahdollisimman pian siivouksen jälkeen siivottu ranta satakolkyt.fi -karttaan. Näin pidetään kartta ajantasaisena ja saatte oman siivousporukkanne nimen näkyviin!
    </p>
  
    <h4>Liity Itämeren suojelijoiden ihmisketjuun</h4>
    <p>Paras lopetus siivoukselle on ihmisketju siivotulla rannalla. Kuvaa ketju ja jaa tunnisteilla #satakolkyt ja #pelastanitämerta. Tägää kuviin @satakolkyt, niin saamme ne näkyviin uutisvirtaamme. Katso kuvia <a href="https://www.instagram.com/SATAKOLKYT/">täältä</a>.</p>
  
    <h4>Lisävinkki: Bongaa vieraslaji rannalta</h4>
    <p>Rannoillemme levittäytyy haitallisia vieraslajeja vieden elintilaan alkuperäisiltä lajeiltamme. Keräämme havaintoja kurtturuusu- ja jättipalsamiesiintymistä. Auta vieraslajien torjunnan suunnittelussa ja ilmoita havaintosi karttaan samalla kun ilmoitat rannan siivotuksi. Tietoa ja tunnistusohjeet vieraslajeista <a href="https://satakolkyt.fi/">täältä</a>.</p>
  
    <p>
        Mukavaa rantaretkeä toivottaen,
        <br>
        SATAKOLKYT-tiimi
    </p>
  
    <p>Ja hei, kysymykset, toiveet tai palautteet voi laittaa SATAKOLKYT- koordinaattorille: info@satakolkyt.fi tai 044 270 0573</p>
  
    <p style="margin-bottom:0;">Seuraa meitä:</p>
    <table cellpadding="0" cellspacing="15">
    <tr>
        <td><a href="https://www.facebook.com/SATAKOLKYT/"><img src="cid:d0557c41-f196-41fd-abbf-cfe3dd5356dd" style="vertical-align: middle; height: 34px;"/></a></td>
        <td><a href="https://www.instagram.com/SATAKOLKYT/"><img src="cid:350673a5-5d18-4966-a9cb-fde89287b726" style="vertical-align: middle; height: 34px;"/></a></td>
        <td><a href="https://twitter.com/satakolkyt"><img src="cid:abb0ad98-b191-4afb-8266-4b97c05938ea" style="vertical-align: middle; height: 34px;"/></a></td>
    </tr>
  </table>
  <a href="https://satakolkyt.fi/"><img src="cid:29137d21-03d2-4f7f-a944-4c0949dff9e4" style="width: 340px; display: block;"/></a>
  </div>
  `,
    sv: `
  <div style="font-family: Calibri,Candara,Segoe,Segoe UI,Optima,Arial,sans-serif">
  <h3>Tack för att ni vill vara med och städa upp Helsingfors stränder!</h3>

  <h2>Bokningsinformation</h2>
  <ul>
    <li>Datum: ${moment(reserv.startdate).format('DD.MM.YYYY')} kl ${
      reserv.starttime
    } - ${reserv.endtime}</li>
    <li>Ungefär ${Math.round(reserv.multiLength)} meter strand</li>
  </ul>

  <p>Här följer praktisk information och tips inför städandet:</p>

  <h4>Låna skräptänger eller talko-set från biblioteken</h4>
  <p>
      På biblioteket kan du låna enskilda skräptänger eller talko-set för ca tio personer. De bibliotek som är med i projektet finns utmärkta på kartan www.satakolkyt.fi.  
      <br/>
      <strong>Obs!</strong> Om ni behöver fler skräptänger kan ni kontakta koordinatorn för stadens talkoverksamhet, Armi Koskela, 040-719 0824, armi.koskela@hel.fi
  </p>

  <h4>Vad göra med skräpet?</h4>
  <p>
        Skräpet från talkot kan lämnas i de stora sopkärlen utmärkta på kartan. Det kan också lämnas i tätt åtslutna sopsäckar på ett ställe som är lätt att hitta. Meddela om sopsäckarna samtidigt som du fyller i att stranden är städad. Stadens anställda hämtar säckarna inom några dagar.
      <br/>
      <strong>Obs!</strong> Det lönar sig inte att fylla de små papperskorgarna med skräp från talkot så det finns plats också för vanligt skräp. Djur gräver också i överfulla papperskorgar.
  </p>

  <h4>Kom ihåg att meddela att stranden är städad</h4>
  <p>
  Pricka in stranden på satakolkyt.fi-kartan så snart som möjligt, så hålls den uppdaterad och ni får er talkogrupps namn på kartan!
  </p>

  <h4>Bli en del av den mänskliga kedjan för skyddandet av Östersjön</h4>
  <p>Höjdpunkten på städtalkot är en mänsklig kedja på en snygg strand. Ta en bild av kedjan, och dela den med hashtagen #satakolkyt. Tagga bilden med @satakolkyt så syns den i vårt flöde. Se bilder <a href="https://www.instagram.com/SATAKOLKYT/">här</a>.</p>

  <h4>Extratips: Bonga invasiva arter på stranden</h4>
  <p>Längs våra stränder sprids invasiva arter som tränger undan våra ursprungliga arter. Vi samlar in vresros- och jättebalsaminobservationer. Hjälp till med bekämpningen av invasiva arter och meddela eventuella observationer samtidigt som du prickar in stranden som städad på kartan.</p>

  <p>
      Vi hoppas ni får ett trevligt strandtalko!
      <br>
      HUNDRATRETTI-teamet
  </p>

  <p>Ps. frågor, önskemål eller respons kan skickas till HUNDRATRETTI-koordinator: info@satakolkyt.fi eller 044 270 0573</p>

  <p style="margin-bottom:0;">Följ oss:</p>
  <table cellpadding="0" cellspacing="15">
  <tr>
      <td><a href="https://www.facebook.com/SATAKOLKYT/"><img src="cid:d0557c41-f196-41fd-abbf-cfe3dd5356dd" style="vertical-align: middle; height: 34px;"/></a></td>
      <td><a href="https://www.instagram.com/SATAKOLKYT/"><img src="cid:350673a5-5d18-4966-a9cb-fde89287b726" style="vertical-align: middle; height: 34px;"/></a></td>
      <td><a href="https://twitter.com/satakolkyt"><img src="cid:abb0ad98-b191-4afb-8266-4b97c05938ea" style="vertical-align: middle; height: 34px;"/></a></td>
  </tr>
</table>
<a href="https://satakolkyt.fi/"><img src="cid:29137d21-03d2-4f7f-a944-4c0949dff9e4" style="width: 340px; display: block;"/></a>
</div>
`,
    en: `
<div style="font-family: Calibri,Candara,Segoe,Segoe UI,Optima,Arial,sans-serif">
<h3>Thank you for participating in the cleanup of Helsinki beaches!</h3>

<h2>Varauksen tiedot</h2>
<ul>
  <li>Date: ${moment(reserv.startdate).format('DD.MM.YYYY')} ${
      reserv.starttime
    } - ${reserv.endtime} o'clock</li>
  <li>About ${Math.round(reserv.multiLength)} meters of beach</li>
</ul>

<p>Please find below some practical information and tips for cleaning:</p>

<h4>Trash pliers or a cleanup kit can be borrowed from the library</h4>
<p>
You can borrow trash pliers or a cleanup kit for a group of approx. ten people from the library. The participating libraries can be found on the map www.satakolkyt.fi
    <br/>
    <strong>Note!</strong> If you need more than ten trash pliers, you can contact the city's operational coordinator Armi Koskela, 040-7190824, armi.koskela@hel.fi
</p>

<h4>Where to put the collected trash?</h4>
<p>
    The trash can be left in large waste bins that are marked on the cleaning map. If there ara no waste bins or you have a lot of trash, you can also left trash in tightly sealed waste bags in an easily discoverable place. Include information about the trash bags when reporting the beach cleanup. City employees will remove the bags within a few days.
    <br/>
    <strong>Note!</strong> Please do not to fill up small garbage bins with the cleanup waste, as it is useful to leave space for ordinary garbage. Animals also tend to tear up crowded garbage bins. 
</p>

<h4>Remember to report the cleaned beach</h4>
<p>
    Report the cleaned beach as soon as possible to the map www.satakolkyt.fi . This will keep the map updated and you can place the name of your own cleanup team on the map!
</p>

<h4>Join the human chain of Baltic Sea protectors</h4>
<p>The best ending for a cleanup effort is a human chain on the clean beach. Snap a picture of the chain and share with tags #satakolkyt  or tag @Satakolkyt, so we'll see them in our news feed. See pictures <a href="https://www.instagram.com/SATAKOLKYT/">here</a>.</p>

<h4>Additional tip: Spot invasive alien species on the shoreline</h4>
<p>Invasive alien species spread on our shores and take over the living space of our native species. We collect observations of Japanese rose and Himalayan balm. Help us in the fight against alien species and report your findings on the map when you report the cleaned beach. You can find information and identification instructions for invasive species <a href="https://satakolkyt.fi/">here</a>.</p>

<p>
    We hope you enjoy your excursion to the Helsinki shoreline,
    <br>
    SATAKOLKYT team
</p>

<p>Questions, wishes or feedback can be sent to the SATAKOLKYT coordinator: info@satakolkyt.fi or 044 270 0573</p>

<p style="margin-bottom:0;">Follow us on:</p>
<table cellpadding="0" cellspacing="15">
<tr>
    <td><a href="https://www.facebook.com/SATAKOLKYT/"><img src="cid:d0557c41-f196-41fd-abbf-cfe3dd5356dd" style="vertical-align: middle; height: 34px;"/></a></td>
    <td><a href="https://www.instagram.com/SATAKOLKYT/"><img src="cid:350673a5-5d18-4966-a9cb-fde89287b726" style="vertical-align: middle; height: 34px;"/></a></td>
    <td><a href="https://twitter.com/satakolkyt"><img src="cid:abb0ad98-b191-4afb-8266-4b97c05938ea" style="vertical-align: middle; height: 34px;"/></a></td>
</tr>
</table>
<a href="https://satakolkyt.fi/"><img src="cid:29137d21-03d2-4f7f-a944-4c0949dff9e4" style="width: 340px; display: block;"/></a>
</div>
`
  }[lang])
